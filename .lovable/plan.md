

## Problem

The edge function crashes at cold start because `Deno.readTextFileSync(new URL("./llms-full.txt", import.meta.url))` fails in the Supabase Edge Functions runtime. The deployed runtime resolves `import.meta.url` to a path like `/var/tmp/sb-compile-edge-runtime/chat/index.ts`, but the companion files (`llms-full.txt`, `financement-non-dilutif.md`) are not placed alongside the compiled function.

This is a persistent issue — the previous fix (switching from `.pathname` to passing the `URL` object directly) did not resolve it. The runtime simply does not bundle non-TS files for `readTextFileSync`.

## Solution

Inline the knowledge base content directly into the edge function as string constants. This eliminates the file read entirely and guarantees the content is available at runtime.

### Steps

1. **Read the full content** of `llms-full.txt` and `financement-non-dilutif.md`
2. **Embed them as template literal constants** in `index.ts`, replacing the `Deno.readTextFileSync` calls with `const KNOWLEDGE_BFT = \`...\`` and `const KNOWLEDGE_ND = \`...\``
3. **Escape any backticks and `${` sequences** in the content to prevent template literal injection
4. **Redeploy** the edge function

### Risk

The files may be large. If the combined size exceeds the edge function size limit (~2MB), we would need an alternative approach (e.g., fetching from Supabase Storage at cold start). But for typical knowledge base documents this should be fine.

### Alternative (if too large)

Upload the files to a Supabase Storage bucket and fetch them with `fetch()` at cold start instead of reading from the filesystem.

