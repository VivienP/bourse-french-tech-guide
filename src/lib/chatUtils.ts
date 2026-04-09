// ── Chat utility functions ─────────────────────────────────────────────────────
// Shared across Chat.tsx (eligibility chatbot) and ChatBubble.tsx (Q&A widget).
// Pure functions only — no React, no side effects.

// ── Text matchers ─────────────────────────────────────────────────────────────

/** Returns true if the user answered "Non" to the gate question. */
export function isNo(text: string): boolean {
  return /^(non|no|n)\b/i.test(text.trim());
}

/** Extracts the numeric score from a SCORE_FINAL marker, or null if absent/invalid. */
export function extractScore(text: string): number | null {
  const match = text.match(/SCORE_FINAL:\s*([\d.]+)/i);
  if (!match) return null;
  const val = parseFloat(match[1]);
  if (isNaN(val) || val < 0 || val > 5) return null;
  return val;
}

/** Returns true if the backend emitted a CONVERSATION_CLOSED marker. */
export function extractClosed(text: string): boolean {
  return /CONVERSATION_CLOSED/i.test(text);
}

/** Removes backend protocol markers (SCORE_FINAL, CONVERSATION_CLOSED) for display. */
export function stripMarkers(text: string): string {
  return text
    .replace(/\nSCORE_FINAL:\s*[\d.]+/gi, '')
    .replace(/\nCONVERSATION_CLOSED/gi, '')
    .trimEnd();
}

// ── SSE parsing ───────────────────────────────────────────────────────────────

/** Sentinel returned when the SSE stream is complete. */
export const SSE_DONE = Symbol('SSE_DONE');

/**
 * Parses a single `data: ...` SSE line.
 * Returns:
 *   - a non-empty string with the delta content chunk
 *   - SSE_DONE when the stream has ended ([DONE] marker)
 *   - null when the line carries no content (skip and continue)
 * Throws when the JSON is incomplete (caller should re-buffer the line).
 */
export function parseSSELine(line: string): string | typeof SSE_DONE | null {
  if (line.endsWith('\r')) line = line.slice(0, -1);
  if (line.startsWith(':') || line.trim() === '') return null;
  if (!line.startsWith('data: ')) return null;

  const jsonStr = line.slice(6).trim();
  if (jsonStr === '[DONE]') return SSE_DONE;

  const parsed = JSON.parse(jsonStr); // throws on incomplete JSON — caller must re-buffer
  const content: string | undefined = parsed.choices?.[0]?.delta?.content;
  return content ?? null;
}
