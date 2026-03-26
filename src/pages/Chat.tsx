import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, Send, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Cal, { getCalApi } from '@calcom/embed-react';

type Message = { role: 'user' | 'assistant'; content: string };

const ELIGIBILITY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/eligibility-chat`;
const SEND_EMAIL_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`;
const AUTH_HEADER = `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`;

const CAL_NAMESPACE = 'eligibilite';

// Strip the SCORE_FINAL marker from displayed content
function stripScoreMarker(text: string): string {
  return text.replace(/\nSCORE_FINAL:\s*[\d.]+\s*$/i, '').trimEnd();
}

// Extract score from assistant content — validates range [0, 5]
function extractScore(text: string): number | null {
  const match = text.match(/SCORE_FINAL:\s*([\d.]+)/i);
  if (!match) return null;
  const val = parseFloat(match[1]);
  if (isNaN(val) || val < 0 || val > 5) return null;
  return val;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const initialCallDone = useRef(false);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Init Cal.com widget when score is eligible
  useEffect(() => {
    if (score === null || score < 2.5) return;
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE, embedJsUrl: 'https://app.cal.eu/embed/embed.js' });
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: { light: { 'cal-brand': '#1B2A4A' }, dark: { 'cal-brand': '#1B2A4A' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, [score]);

  const sendToEmail = useCallback(async (conversation: Message[], finalScore: number) => {
    try {
      await fetch(SEND_EMAIL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: AUTH_HEADER },
        body: JSON.stringify({ conversation, score: finalScore }),
      });
    } catch (e) {
      console.error('send-email error:', e);
    }
  }, []);

  const sendMessage = useCallback(async (directText?: string) => {
    const trimmed = (directText ?? input).trim();

    // Allow empty call only for the initial trigger (directText === '')
    if (directText !== '' && !trimmed) return;
    if (isLoading) return;

    setInput('');

    const userMsg: Message | null = trimmed ? { role: 'user', content: trimmed } : null;
    const newMessages: Message[] = userMsg ? [...messages, userMsg] : messages;
    if (userMsg) setMessages(newMessages);
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const timeoutId = setTimeout(() => controller.abort(), 90_000); // 90s max
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
          const displayed = stripScoreMarker(assistantContent);
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

      // Check for score marker in full response
      const detectedScore = extractScore(assistantContent);
      if (detectedScore !== null) {
        setScore(detectedScore);
        // Build full conversation for email (replace last assistant msg with clean version)
        const finalConversation: Message[] = [
          ...newMessages,
          { role: 'assistant', content: stripScoreMarker(assistantContent) },
        ];
        if (!emailSent) {
          setEmailSent(true);
          sendToEmail(finalConversation, detectedScore);
        }
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
  }, [input, isLoading, messages, emailSent, sendToEmail]);

  // Abort stream on unmount
  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  // Trigger intro message on mount
  useEffect(() => {
    if (initialCallDone.current) return;
    initialCallDone.current = true;
    sendMessage('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const isEligible = score !== null && score >= 2.5;
  const reportDone = score !== null;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card shrink-0">
        <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="font-semibold text-sm text-foreground">Évaluation d'éligibilité BFT</h1>
          <p className="text-xs text-muted-foreground">Décrivez votre projet — l'IA évalue votre dossier</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-muted text-foreground rounded-bl-sm'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert [&>p]:my-2 [&>ul]:my-2 [&>ol]:my-2 [&_*]:text-sm">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}

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

          {/* Cal.eu widget — shown when eligible */}
          {isEligible && (
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

          {/* Non-eligible notice */}
          {reportDone && !isEligible && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-sm text-orange-800">
              <strong>Score : {score}/5.</strong> Votre projet nécessite des ajustements avant de candidater. Consultez les recommandations dans le rapport ci-dessus.
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input footer */}
      <div className="border-t border-border px-4 py-3 bg-card shrink-0">
        <div className="max-w-2xl mx-auto flex gap-2 items-end">
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
    </div>
  );
};

export default Chat;
