

## Plan: Add "thinking" indicator during GPT reasoning phase

### What it does
Shows an animated "Analyse en cours…" indicator while GPT-5.2 is reasoning (before content starts streaming). Disappears once the actual response begins. Does NOT show raw reasoning text — just a visual cue.

### Changes

**`src/lib/chatUtils.ts`** — Extend `parseSSELine` to detect reasoning phase

Add a new return type to distinguish reasoning chunks from content chunks:
```typescript
export type SSEResult = 
  | { type: 'content'; text: string }
  | { type: 'reasoning' }
  | typeof SSE_DONE
  | null;
```

Update `parseSSELine` to check for `delta.reasoning_content` or `delta.reasoning` in the parsed JSON. If present (and no `delta.content`), return `{ type: 'reasoning' }`. If `delta.content` exists, return `{ type: 'content', text: content }`.

**`src/pages/Chat.tsx`** — Add reasoning state and UI indicator

1. Add `isReasoning` boolean state
2. Set it to `true` when first reasoning chunk arrives
3. Set it to `false` when first content chunk arrives
4. Show a pulsing indicator (brain icon + "Analyse en cours…") in the message area while `isReasoning` is true

### Files modified
- `src/lib/chatUtils.ts` (~10 lines changed)
- `src/pages/Chat.tsx` (~15 lines added)

### Risk
Very low — the reasoning field is simply ignored today; we're just detecting its presence. If the API doesn't send reasoning tokens (e.g. model changes), the indicator simply won't appear and the chat works as before.

