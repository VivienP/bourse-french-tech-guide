/**
 * Chat.tsx — Chatbot d'éligibilité BFT
 *
 * State machine (backend-driven, synchronisé via comptage de messages) :
 *   gate_pending → [Oui] → structured_q1..q7 → ready_for_eval (rapport + lead gate)
 *                → [Non] → gate_rejected (CONVERSATION_CLOSED)
 *
 * Persistence : localStorage clé "bft_chat_state" (JSON)
 * Streaming   : SSE via /eligibility-chat edge function
 * Scoring     : SCORE_FINAL marker dans le dernier message assistant
 */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Square, Lock, Calendar, RotateCcw } from 'lucide-react';
import ScoreGauge from '@/components/ScoreGauge';
import ReactMarkdown from 'react-markdown';
import Cal, { getCalApi } from '@calcom/embed-react';
import NavigationBar from '@/components/NavigationBar';

import { supabase } from '@/integrations/supabase/client';
import { isNo, extractScore, extractClosed, stripMarkers, parseSSELine, SSE_DONE, type SSEResult } from '@/lib/chatUtils';

type Message = { role: 'user' | 'assistant'; content: string };

const ERROR_PREFIX = '⚠️ ';
const isErrorMessage = (msg: Message) =>
  msg.role === 'assistant' && msg.content.startsWith(ERROR_PREFIX);

const ELIGIBILITY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/eligibility-chat`;
const SEND_EMAIL_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`;
const AUTH_HEADER = `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`;
const CC_EMAIL = import.meta.env.VITE_CC_EMAIL ?? '';
const CAL_NAMESPACE = 'eligibilite';
const CAL_ORIGIN = 'https://app.cal.eu';
const CAL_EMBED_JS_URL = `${CAL_ORIGIN}/embed/embed.js`;
const MAX_INPUT_LENGTH = 10000;
const SESSION_STORAGE_KEY = 'bft_session_id';
const CHAT_STATE_KEY = 'bft_chat_state';
const CHAT_STATE_VERSION = 2;

interface SavedChatState {
  version: number;
  messages: Message[];
  preQualStep: number;
  conversationClosed: boolean;
  score: number | null;
  reportContent: string | null;
  leadCaptured: boolean;
  contactEmail: string;
  contactPhone: string;
  sessionId: string;
}

function loadChatState(): SavedChatState | null {
  try {
    const raw = localStorage.getItem(CHAT_STATE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<SavedChatState>;
    if (parsed.version !== CHAT_STATE_VERSION) return null;
    if (!Array.isArray(parsed.messages)) return null;

    return parsed as SavedChatState;
  } catch {}
  return null;
}

function saveChatState(state: SavedChatState) {
  try {
    localStorage.setItem(CHAT_STATE_KEY, JSON.stringify(state));
  } catch {}
}

function getOrCreateSessionId(forceNew = false): string {
  if (forceNew) {
    const nextId = crypto.randomUUID();
    localStorage.setItem(SESSION_STORAGE_KEY, nextId);
    return nextId;
  }

  let id = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_STORAGE_KEY, id);
  }
  return id;
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

const INITIAL_MESSAGE =
  "Ce programme est réservé aux startups qui remplissent les **3 conditions suivantes** :\n\n" +
  "- Société commerciale immatriculée (SAS, SARL, SASU, EURL…)\n" +
  "- Créée il y a **moins d'un an**\n" +
  "- Au moins **20 000 € de fonds propres** et quasi-fonds propres\n\n" +
  "**Confirmez-vous que vous remplissez l'ensemble de ces conditions ?**";

const Chat: React.FC = () => {
  const saved = React.useMemo(() => loadChatState(), []);

  const [messages, setMessages] = useState<Message[]>(
    saved?.messages ?? [{ role: 'assistant', content: INITIAL_MESSAGE }]
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState<number | null>(saved?.score ?? null);
  const [emailSent, setEmailSent] = useState(false);
  const [conversationClosed, setConversationClosed] = useState(saved?.conversationClosed ?? false);
  const [reportContent, setReportContent] = useState<string | null>(saved?.reportContent ?? null);

  // Pre-qualification state
  const [preQualStep, setPreQualStep] = useState(saved?.preQualStep ?? 0);

  // Lead capture state
  const [leadCaptured, setLeadCaptured] = useState(saved?.leadCaptured ?? false);
  const [contactEmail, setContactEmail] = useState(saved?.contactEmail ?? '');
  const [contactPhone, setContactPhone] = useState(saved?.contactPhone ?? '');
  const [leadError, setLeadError] = useState('');
  const [rgpdConsent, setRgpdConsent] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const conversationRef = useRef<Message[]>([]);
  const sessionIdRef = useRef<string>(saved?.sessionId ?? getOrCreateSessionId(true));

  // Save chat state to localStorage
  useEffect(() => {
    saveChatState({
      version: CHAT_STATE_VERSION,
      messages,
      preQualStep,
      conversationClosed,
      score,
      reportContent,
      leadCaptured,
      contactEmail,
      contactPhone,
      sessionId: sessionIdRef.current,
    });
  }, [messages, preQualStep, conversationClosed, score, reportContent, leadCaptured, contactEmail, contactPhone]);

  const resetConversation = useCallback(() => {
    localStorage.removeItem(CHAT_STATE_KEY);
    localStorage.removeItem(SESSION_STORAGE_KEY);
    window.location.reload();
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cal.com init
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({
        namespace: CAL_NAMESPACE,
        embedJsUrl: CAL_EMBED_JS_URL,
      });
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#1B2A4A' },
          dark: { 'cal-brand': '#1B2A4A' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

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
        body: JSON.stringify({ messages: newMessages, sessionId: sessionIdRef.current }),
        signal: controller.signal,
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        if (resp.status === 429) {
          const backendMessage = typeof data.error === 'string'
            ? data.error
            : 'Limite atteinte. Actualisez la page pour démarrer une nouvelle évaluation.';
          const reachedSessionLimit = data.code === 'SESSION_LIMIT_REACHED' || /session atteinte/i.test(backendMessage);

          if (reachedSessionLimit) {
            setConversationClosed(true);
          }

          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: reachedSessionLimit
                ? 'Vous avez atteint la limite de messages de cette session. Actualisez la page ou relancez une nouvelle évaluation.'
                : `⚠️ ${backendMessage}`,
            },
          ]);
          return;
        }
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
          const line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          try {
            const result = parseSSELine(line);
            if (result === SSE_DONE) { done = true; break; }
            if (result) upsert(result);
          } catch {
            buffer = line + '\n' + buffer;
            break;
          }
        }
      }

      // Final flush
      if (buffer.trim()) {
        for (const raw of buffer.split('\n')) {
          try {
            const result = parseSSELine(raw);
            if (result && result !== SSE_DONE) upsert(result);
          } catch {}
        }
      }

      if (extractClosed(assistantContent)) {
        // Only honor CONVERSATION_CLOSED when the gate was rejected (first user message = "Non")
        const userMsgs = newMessages.filter(m => m.role === 'user');
        if (userMsgs.length >= 1 && isNo(userMsgs[0].content)) {
          setConversationClosed(true);
        }
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
        { role: 'assistant', content: `${ERROR_PREFIX}Une erreur est survenue. Veuillez réessayer.` },
      ]);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [input, isLoading, messages, conversationClosed]);

  const retryLastMessage = useCallback(() => {
    setMessages((prev) => {
      // Remove trailing error message(s)
      const cleaned = [...prev];
      while (cleaned.length > 0 && isErrorMessage(cleaned[cleaned.length - 1])) {
        cleaned.pop();
      }
      // Find last user message to re-send
      const lastUserMsg = [...cleaned].reverse().find((m) => m.role === 'user');
      if (lastUserMsg) {
        // We'll trigger sendMessage after state update via a ref
        retryTextRef.current = lastUserMsg.content;
      }
      return cleaned;
    });
  }, []);

  const retryTextRef = useRef<string | null>(null);

  useEffect(() => {
    if (retryTextRef.current && !isLoading) {
      const text = retryTextRef.current;
      retryTextRef.current = null;
      // Re-send using existing messages (error already removed)
      sendMessage(text);
    }
  }, [messages, isLoading, sendMessage]);

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

  const handlePreQualAnswer = useCallback((answer: 'Oui' | 'Non') => {
    if (isLoading) return;
    sendMessage(answer);
    setPreQualStep((prev) => prev + 1);
  }, [isLoading, sendMessage]);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadError('');

    if (!contactEmail.trim() || !contactPhone.trim()) {
      setLeadError('Veuillez remplir les deux champs.');
      return;
    }
    if (!rgpdConsent) {
      setLeadError('Veuillez accepter la politique de confidentialité pour continuer.');
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

    // Now send the email with contact info (existing Resend notification)
    if (!emailSent && score !== null && conversationRef.current.length > 0) {
      setEmailSent(true);
      sendToEmail(conversationRef.current, score, contactEmail.trim(), contactPhone.trim());

      // Send transactional email to user
      supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'conversation-report',
          recipientEmail: contactEmail.trim(),
          idempotencyKey: `conversation-report-${sessionIdRef.current}`,
          templateData: {
            score,
            conversation: conversationRef.current,
          },
        },
      }).catch((e) => console.error('transactional email error:', e));

      // Send CC to the configured address (VITE_CC_EMAIL)
      if (CC_EMAIL) supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'conversation-report',
          recipientEmail: CC_EMAIL,
          idempotencyKey: `conversation-report-cc-${sessionIdRef.current}`,
          templateData: {
            score,
            conversation: conversationRef.current,
            prospectEmail: contactEmail.trim(),
            prospectPhone: contactPhone.trim(),
          },
        },
      }).catch((e) => console.error('transactional cc email error:', e));
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
            // Hide report message: blurred preview if not lead-captured, completely hidden if report card is shown
            const isLastAssistant = reportDone && msg.role === 'assistant' && i === messages.length - 1;
            if (isLastAssistant && showReport) return null;
            const isReportMsg = isLastAssistant && !leadCaptured;

            const isError = isErrorMessage(msg);

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
                  ) : isError ? (
                    <div className="flex items-center gap-3">
                      <span>{msg.content}</span>
                      <button
                        onClick={retryLastMessage}
                        disabled={isLoading}
                        className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-40"
                        aria-label="Réessayer"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
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
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rgpdConsent}
                    onChange={(e) => setRgpdConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-border accent-primary shrink-0"
                  />
                  <span className="text-[11px] text-muted-foreground leading-tight">
                    J'accepte que mes données personnelles (email, téléphone) soient collectées et traitées par BFT dans le cadre de cette évaluation d'éligibilité, conformément au{' '}
                    <a href="/mentions-legales" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                      RGPD et à notre politique de confidentialité
                    </a>. Ces données sont utilisées uniquement pour vous recontacter et ne sont jamais cédées à des tiers.
                  </span>
                </label>
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
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
              {/* Score gauge */}
              {score !== null && (
                <div className="flex justify-center py-2">
                  <ScoreGauge score={score} />
                </div>
              )}
              <div className="prose prose-sm max-w-none dark:prose-invert [&>h2]:text-base [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-2 [&>h3]:text-sm [&>h3]:font-semibold [&>p]:my-2 [&>ul]:my-2 [&>ol]:my-2">
                <ReactMarkdown>{reportContent}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Eligible notice — shown after lead capture */}
          {isEligible && leadCaptured && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-sm text-green-800">
              Votre dossier a bien été transmis. Un expert vous contactera prochainement pour préparer votre candidature.
            </div>
          )}

          {/* Non-eligible notice — shown after lead capture */}
          {reportDone && !isEligible && !conversationClosed && leadCaptured && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-sm text-orange-800">
              Votre projet nécessite des ajustements avant de candidater. Consultez les constats dans le rapport ci-dessus.
            </div>
          )}

          {/* Cal.com booking widget — shown after lead capture */}
          {showReport && (
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Prenez rendez-vous avec un expert</h3>
              </div>
              <Cal
                namespace={CAL_NAMESPACE}
                calLink="boursefrenchtech/decouverte"
                calOrigin={CAL_ORIGIN}
                embedJsUrl={CAL_EMBED_JS_URL}
                style={{ width: '100%', height: '100%', overflow: 'auto' }}
                config={{ layout: 'month_view', theme: 'light' }}
              />
            </div>
          )}

          {/* Conversation closed notice */}
          {conversationClosed && (
            <div className="bg-muted border border-border rounded-2xl p-4 text-sm text-muted-foreground text-center space-y-3">
              <p>Conversation terminée.</p>
              <button
                onClick={resetConversation}
                className="text-xs font-medium text-primary hover:underline transition-colors"
              >
                Démarrer une nouvelle évaluation
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input footer — hidden when lead gate, cal widget, or conversation closed */}
      {!conversationClosed && !showLeadGate && !showReport && (
        <div className="border-t border-border px-4 py-3 bg-card shrink-0">
          <div className="max-w-3xl mx-auto">
            {preQualStep < 1 ? (
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => handlePreQualAnswer('Oui')}
                  disabled={isLoading}
                  className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  Oui
                </button>
                <button
                  onClick={() => handlePreQualAnswer('Non')}
                  disabled={isLoading}
                  className="px-6 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium hover:bg-muted transition-colors disabled:opacity-40"
                >
                  Non
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-end">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
                    onKeyDown={handleKeyDown}
                    placeholder={reportDone ? 'Rapport généré — posez une question complémentaire...' : 'Votre réponse...'}
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
                      disabled={!input.trim() || input.length > MAX_INPUT_LENGTH}
                      className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40 shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {input.length >= MAX_INPUT_LENGTH && (
                  <p className="text-xs text-destructive text-right">
                    Limite de {MAX_INPUT_LENGTH} caractères atteinte.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Chat;
