import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Square, Lock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Cal, { getCalApi } from '@calcom/embed-react';
import NavigationBar from '@/components/NavigationBar';

type Message = { role: 'user' | 'assistant'; content: string };

const ELIGIBILITY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/eligibility-chat`;
const SEND_EMAIL_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`;
const AUTH_HEADER = `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`;

const CAL_NAMESPACE = 'eligibilite';

function stripMarkers(text: string): string {
  return text
    .replace(/\nSCORE_FINAL:\s*[\d.]+/gi, '')
    .replace(/\nCONVERSATION_CLOSED/gi, '')
    .trimEnd();
}

function extractScore(text: string): number | null {
  const match = text.match(/SCORE_FINAL:\s*([\d.]+)/i);
  if (!match) return null;
  const val = parseFloat(match[1]);
  if (isNaN(val) || val < 0 || val > 5) return null;
  return val;
}

function extractClosed(text: string): boolean {
  return /CONVERSATION_CLOSED/i.test(text);
}

// Simple email validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Simple phone validation (French format)
function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s.\-()]/g, '');
  return /^(\+33|0)[1-9]\d{8}$/.test(cleaned);
}

const Chat: React.FC = () => {
  const INITIAL_MESSAGE = "Votre entreprise est-elle une société française déjà **immatriculée** (SAS/SARL/...) ?";
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: INITIAL_MESSAGE }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [conversationClosed, setConversationClosed] = useState(false);
  const [reportContent, setReportContent] = useState<string | null>(null);

  // Lead capture state
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [leadError, setLeadError] = useState('');

  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const conversationRef = useRef<Message[]>([]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, leadCaptured]);

  // Init Cal.com
  useEffect(() => {
    if (score === null || score < 2.5 || conversationClosed) return;
    if (!leadCaptured) return;
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE, embedJsUrl: 'https://app.cal.eu/embed/embed.js' });
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: { light: { 'cal-brand': '#1B2A4A' }, dark: { 'cal-brand': '#1B2A4A' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, [score, conversationClosed, leadCaptured]);

  const sendToEmail = useCallback(async (conversation: Message[], finalScore: number, email?: string, phone?: string) => {
    try {
      await fetch(SEND_EMAIL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: AUTH_HEADER },
        body: JSON.stringify({ conversation, score: finalScore, contactEmail: email, contactPhone: phone }),
      });
    } catch (e) {
      console.error('send-email error:', e);
    }
  }, []);

  const sendMessage = useCallback(async (directText?: string) => {
    const trimmed = (directText ?? input).trim();

    if (!trimmed) return;
    if (isLoading) return;
    if (conversationClosed) return;

    setInput('');

    const userMsg: Message | null = trimmed ? { role: 'user', content: trimmed } : null;
    const newMessages: Message[] = userMsg ? [...messages, userMsg] : messages;
    if (userMsg) setMessages(newMessages);
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const timeoutId = setTimeout(() => controller.abort(), 90_000);
    let assistantContent = '';

    try {
      const resp = await fetch(ELIGIBILITY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: AUTH_HEADER },
        body: JSON.stringify({ messages: newMessages }),
        signal: controller.signal,
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.error || `Erreur ${resp.status}`);
      }

      if (!resp.body) throw new Error('Pas de stream');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const upsert = (chunk: string) => {
        assistantContent += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          const displayed = stripMarkers(assistantContent);
          if (last?.role === 'assistant') {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: displayed } : m));
          }
          return [...prev, { role: 'assistant', content: displayed }];
        });
      };

      let done = false;
      while (!done) {
        const { done: readerDone, value } = await reader.read();
        if (readerDone) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') { done = true; break; }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) upsert(content);
          } catch {
            buffer = line + '\n' + buffer;
            break;
          }
        }
      }

      // Final flush
      if (buffer.trim()) {
        for (let raw of buffer.split('\n')) {
          if (!raw || !raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) upsert(content);
          } catch {}
        }
      }

      if (extractClosed(assistantContent)) {
        setConversationClosed(true);
      }

      const detectedScore = extractScore(assistantContent);
      if (detectedScore !== null) {
        setScore(detectedScore);
        setReportContent(stripMarkers(assistantContent));
        // Store conversation for later email send (after lead capture)
        conversationRef.current = [
          ...newMessages,
          { role: 'assistant', content: stripMarkers(assistantContent) },
        ];
      }
    } catch (e: any) {
      if (e.name === 'AbortError') return;
      console.error('eligibility-chat error:', e);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Une erreur est survenue. Veuillez réessayer.' },
      ]);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [input, isLoading, messages, conversationClosed]);

  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const stopGeneration = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsLoading(false);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadError('');

    if (!contactEmail.trim() || !contactPhone.trim()) {
      setLeadError('Veuillez remplir les deux champs.');
      return;
    }
    if (!isValidEmail(contactEmail.trim())) {
      setLeadError('Adresse email invalide.');
      return;
    }
    if (!isValidPhone(contactPhone.trim())) {
      setLeadError('Numéro de téléphone invalide (format français attendu).');
      return;
    }

    setLeadCaptured(true);

    // Now send the email with contact info
    if (!emailSent && score !== null && conversationRef.current.length > 0) {
      setEmailSent(true);
      sendToEmail(conversationRef.current, score, contactEmail.trim(), contactPhone.trim());
    }
  };

  const isEligible = score !== null && score >= 2.5 && !conversationClosed;
  const reportDone = score !== null;
  const showLeadGate = reportDone && !leadCaptured && !conversationClosed;
  const showReport = reportDone && leadCaptured && !conversationClosed;

  const navigateToSection = (sectionId: string) => {
    window.location.href = `/#${sectionId}`;
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <NavigationBar activeSection="" scrollToSection={navigateToSection} minimal />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pt-[96px] pb-6 space-y-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg, i) => {
            // Hide the report message (last assistant) if lead not captured yet
            const isReportMsg = reportDone && !leadCaptured && msg.role === 'assistant' && i === messages.length - 1;

            return (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-muted text-foreground rounded-bl-sm'
                  } ${isReportMsg ? 'relative' : ''}`}
                >
                  {isReportMsg ? (
                    // Blurred report preview
                    <div className="relative">
                      <div className="blur-[6px] select-none pointer-events-none max-h-[200px] overflow-hidden">
                        <div className="prose prose-sm max-w-none dark:prose-invert [&>p]:my-2 [&>ul]:my-2 [&>ol]:my-2 [&_*]:text-sm">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/80 to-muted flex items-end justify-center pb-4">
                        <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                          <Lock className="h-3.5 w-3.5" />
                          Renseignez vos coordonnées pour accéder au rapport
                        </div>
                      </div>
                    </div>
                  ) : msg.role === 'assistant' ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert [&>p]:my-2 [&>ul]:my-2 [&>ol]:my-2 [&_*]:text-sm">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading indicator */}
          {isLoading && (messages.length === 0 || messages[messages.length - 1]?.role === 'user') && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          {/* Lead capture gate */}
          {showLeadGate && (
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Accédez à votre rapport d'évaluation</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Renseignez vos coordonnées pour débloquer votre rapport complet et recevoir des recommandations personnalisées.
              </p>
              <form onSubmit={handleLeadSubmit} className="space-y-3">
                <div>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Adresse email"
                    className="w-full bg-muted rounded-xl px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="Numéro de téléphone"
                    className="w-full bg-muted rounded-xl px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                {leadError && (
                  <p className="text-xs text-destructive">{leadError}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground rounded-xl py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Voir mon rapport
                </button>
              </form>
            </div>
          )}

          {/* Full report display after lead capture */}
          {showReport && reportContent && (
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="prose prose-sm max-w-none dark:prose-invert [&>h2]:text-base [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-2 [&>h3]:text-sm [&>h3]:font-semibold [&>p]:my-2 [&>ul]:my-2 [&>ol]:my-2">
                <ReactMarkdown>{reportContent}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Cal.eu widget — shown when eligible AND lead captured */}
          {isEligible && leadCaptured && (
            <div className="mt-6">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-4 text-sm text-green-800">
                <strong>Score : {score}/5 — Projet éligible.</strong> Prenez rendez-vous avec un expert pour préparer votre dossier.
              </div>
              <Cal
                namespace={CAL_NAMESPACE}
                calLink="boursefrenchtech/decouverte"
                calOrigin="https://app.cal.eu"
                style={{ width: '100%', height: '100%', overflow: 'auto', minHeight: 600 }}
                config={{ layout: 'month_view', theme: 'light' }}
              />
            </div>
          )}

          {/* Non-eligible notice — shown after lead capture */}
          {reportDone && !isEligible && !conversationClosed && leadCaptured && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-sm text-orange-800">
              <strong>Score : {score}/5.</strong> Votre projet nécessite des ajustements avant de candidater. Consultez les recommandations dans le rapport ci-dessus.
            </div>
          )}

          {/* Conversation closed notice */}
          {conversationClosed && (
            <div className="bg-muted border border-border rounded-2xl p-4 text-sm text-muted-foreground text-center">
              Conversation terminée. Actualisez la page pour démarrer une nouvelle évaluation.
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input footer — hidden when lead gate is showing or conversation closed */}
      {!conversationClosed && !showLeadGate && (
        <div className="border-t border-border px-4 py-3 bg-card shrink-0">
          <div className="max-w-3xl mx-auto flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={reportDone ? 'Rapport généré — posez une question complémentaire...' : 'Décrivez votre projet...'}
              rows={1}
              className="flex-1 bg-muted rounded-xl px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground resize-none min-h-[40px] max-h-[160px] overflow-y-auto"
              style={{ height: 'auto' }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = 'auto';
                el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
              }}
            />
            {isLoading ? (
              <button
                onClick={stopGeneration}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-destructive text-destructive-foreground hover:opacity-90 transition-opacity shrink-0"
              >
                <Square className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40 shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
