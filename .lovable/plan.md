

## Plan: Upgrade chat model to openai/gpt-5.2 with reasoning

### Change

**`supabase/functions/chat/index.ts`** — lines 290-297

Replace the model, add reasoning config, and increase max_tokens:

```typescript
// Before
model: "google/gemini-2.5-flash",
messages: [{ role: "system", content: systemPrompt }, ...truncatedMessages],
stream: true,
temperature: 0.2,
top_p: 1,
max_tokens: 500,

// After
model: "openai/gpt-5.2",
messages: [{ role: "system", content: systemPrompt }, ...truncatedMessages],
stream: true,
max_tokens: 2000,
reasoning: {
  effort: "medium",
},
```

Note: `temperature` and `top_p` are removed as reasoning models typically manage these internally.

### Impact
- Significantly better analysis quality for eligibility reports
- Higher latency per response (~5-15s vs ~2-5s)
- Higher cost per request

### Files modified
- `supabase/functions/chat/index.ts` (1 block, ~6 lines)
- Edge function `chat` redeployed

