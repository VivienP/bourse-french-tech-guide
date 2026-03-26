

## Diagnostic

**Two issues identified:**

### 1. Edge function `eligibility-chat` not deployed (CRITICAL — causes the runtime error)

The function exists in `supabase/functions/eligibility-chat/index.ts` but returns 404 when called — it was never deployed (or a previous deployment failed silently). The `/chat` page calls this function on mount with `{"messages":[]}`, gets a network failure, and displays the error message.

**Fix:** Deploy the `eligibility-chat` edge function. No code change needed — just a deployment.

### 2. Build error in `src/pages/Chat.tsx` (line 52)

The `cssVarsPerTheme` property expects both `light` and `dark` keys (`Record<Theme, Record<string, string>>`), but only `light` is provided.

**Fix:** Add the missing `dark` key:
```ts
cssVarsPerTheme: {
  light: { 'cal-brand': '#1B2A4A' },
  dark: { 'cal-brand': '#1B2A4A' },
},
```

## Plan

1. **Fix the TypeScript build error** in `src/pages/Chat.tsx` — add `dark` theme to `cssVarsPerTheme`
2. **Deploy the `eligibility-chat` edge function** — the code is correct, it just needs to be deployed
3. **Verify** — curl the function to confirm it responds, then confirm the `/chat` page loads without error

