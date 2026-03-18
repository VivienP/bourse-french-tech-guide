import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Square } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type Intent = 'bft' | 'non_dilutif';
type Message = { role: 'user' | 'assistant'; content: string; intent?: Intent };

function detectIntent(messages: Message[]): Intent {
  const recentUserText = messages
    .filter((m) => m.role === 'user')
    .slice(-3)
    .map((m) => m.content.toLowerCase())
    .join(' ');

  const ndKeywords = [
    'financement non dilutif', 'non-dilutif', 'subvention', 'aide publique',
    'crédit impôt', 'cir ', 'cii ', 'jei ',
    'jeune entreprise innovante', "prêt d'honneur", 'financement public',
    'autres aides', 'en dehors de la bft', 'alternatives', 'autres dispositifs',
    'quel financement', 'comment financer',
  ];

  const bftKeywords = [
    'bft', 'bourse french tech', 'bfte', 'fpi', 'fonds parisien',
    'éligible', 'éligibilité', 'dossier', 'candidature',
  ];

  const ndScore = ndKeywords.filter((kw) => recentUserText.includes(kw)).length;
  const bftScore = bftKeywords.filter((kw) => recentUserText.includes(kw)).length;
  return ndScore > bftScore ? 'non_dilutif' : 'bft';
}

const DAILY_LIMIT = 7;
const STORAGE_KEY = 'bft_chat_quota';

function getQuota(): { date: string; count: number } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const today = new Date().toISOString().slice(0, 10);
      if (parsed.date === today) return parsed;
    }
  } catch {}
  return { date: new Date().toISOString().slice(0, 10), count: 0 };
}

function incrementQuota() {
  const quota = getQuota();
  quota.count++;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quota));
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Bonjour, posez vos questions sur la Bourse French Tech / subvention innovation de Bpifrance.",
};

const ChatBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const remaining = DAILY_LIMIT - getQuota().count;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsLoading(false);
  }, []);

  const sendMessage = useCallback(async (directText?: string) => {
    const trimmed = (directText ?? input).trim();
    if (!trimmed || isLoading) return;
    setInput('');

    if (remaining <= 0) {
      setError("Vous avez atteint la limite de messages pour aujourd'hui. Revenez demain !");
      return;
    }

    setError(null);
    const userMsg: Message = { role: 'user', content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);
    incrementQuota();

    const intent = detectIntent(newMessages.filter((m) => m !== WELCOME_MESSAGE));

    const controller = new AbortController();
    abortRef.current = controller;

    let assistantContent = '';

    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: newMessages.filter((m) => m !== WELCOME_MESSAGE),
        }),
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

      const upsert = (text: string) => {
        assistantContent += text;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant' && last !== WELCOME_MESSAGE) {
            return prev.map((m, i) =>
              i === prev.length - 1 ? { ...m, content: assistantContent } : m
            );
          }
          return [...prev, { role: 'assistant', content: assistantContent, intent }];
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
          if (jsonStr === '[DONE]') {
            done = true;
            break;
          }
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
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) upsert(content);
          } catch {}
        }
      }
    } catch (e: any) {
      if (e.name === 'AbortError') return;
      console.error('Chat error:', e);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Une erreur est survenue. Veuillez réessayer.' },
      ]);
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [input, isLoading, messages, remaining]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const currentRemaining = DAILY_LIMIT - getQuota().count;

  return (
    <>
      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-[400px] h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-secondary text-secondary-foreground">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold text-sm">Assistant IA BFT</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted text-foreground rounded-bl-md'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <>
                      <div className="prose prose-sm max-w-none dark:prose-invert [&>p]:my-1 [&>ul]:my-1 [&>ol]:my-1 [&>li]:my-0.5 [&_*]:font-[inherit]">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                      {msg.intent && (
                        <div className="mt-2">
                          {msg.intent === 'non_dilutif' ? (
                            <a
                              href="https://vivienperrelle.notion.site/tout-sur-le-financement-non-dilutif-pour-l-innovation"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-[10px] text-muted-foreground border border-gray-200 rounded-full px-2 py-0.5 hover:bg-gray-100 transition-colors"
                            >
                              Tout sur le financement non dilutif
                            </a>
                          ) : (
                            <span className="inline-flex items-center text-[10px] text-muted-foreground border border-gray-200 rounded-full px-2 py-0.5 hover:bg-gray-100 transition-colors cursor-default">
                              Boursefrenchtech.fr
                            </span>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>


          {/* Predefined prompts */}
          {currentRemaining > 0 && !messages.some((m) => m.role === 'user') && !isLoading && (
            <div className="px-3 pb-1 flex flex-wrap gap-1.5">
              {['Évaluer mon éligibilité ?', 'Dois-je avoir déjà immatriculé mon entreprise ?', 'Comment augmenter mes fonds propres ?'].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-xs border border-border rounded-full px-3 py-1.5 text-muted-foreground hover:bg-muted transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-border p-3">
            {currentRemaining > 0 ? (
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Posez votre question..."
                  className="flex-1 bg-muted rounded-xl px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
                />
                {isLoading ? (
                  <button
                    onClick={stopGeneration}
                    className="flex items-center justify-center w-9 h-9 rounded-xl bg-destructive text-destructive-foreground hover:opacity-90 transition-opacity"
                  >
                    <Square className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-2">
                <p className="text-sm text-muted-foreground text-center">Vous avez atteint la limite de messages.</p>
                <a
                  href="https://www.cal.eu/boursefrenchtech/decouverte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center rounded-xl bg-primary text-primary-foreground font-semibold py-3 px-4 text-sm hover:opacity-90 transition-opacity"
                >
                  Prendre rendez-vous avec un expert
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
        aria-label="Ouvrir le chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
};

export default ChatBubble;
