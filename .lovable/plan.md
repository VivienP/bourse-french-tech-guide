

## Analysis

**Two separate issues identified:**

### 1. Build Error (Vite / @swc/core)
The `@swc/core` native binding error is an **infrastructure-level issue** in the Lovable build sandbox — not caused by any code change. The `@vitejs/plugin-react-swc` plugin requires native binaries that occasionally fail to load in the sandbox environment. This is transient and will resolve on retry. No code fix needed.

### 2. Edge Function — File Reading

**Current state:** All files are correctly placed in `supabase/functions/chat/` alongside `index.ts`:
- `llms-full.txt` ✓
- 11 `.md` files ✓ (including `financement-non-dilutif.md`)
- 2 `.csv` files

**Current code** (line 10-13) reads only 2 files using `new URL()` without `.pathname`:
```ts
const KNOWLEDGE_BFT = Deno.readTextFileSync(new URL("./llms-full.txt", import.meta.url));
const KNOWLEDGE_ND = Deno.readTextFileSync(new URL("./financement-non-dilutif.md", import.meta.url));
```

### Plan

**Single change in `supabase/functions/chat/index.ts` (lines 9-13):**

Replace the two static file reads with the user's exact approach:

```ts
// Read knowledge files once at cold start
const KNOWLEDGE_BFT = Deno.readTextFileSync(
  new URL("./llms-full.txt", import.meta.url).pathname
);

const functionDir = new URL(".", import.meta.url).pathname;
const KNOWLEDGE_ND = Array.from(Deno.readDirSync(functionDir))
  .filter((entry) => entry.isFile && entry.name.endsWith(".md"))
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((entry) => Deno.readTextFileSync(`${functionDir}/${entry.name}`))
  .join("\n\n---\n\n");
```

This:
- Uses `.pathname` to get a string path (required by `readTextFileSync` in some Deno runtimes)
- Dynamically reads **all** `.md` files in the function directory, sorted alphabetically, concatenated with separators
- Keeps everything else untouched (detectIntent, buildSystemPrompt, rate limiting, streaming, error handling)

After deploying, I'll check the edge function logs to confirm cold start succeeds or capture the exact error.

