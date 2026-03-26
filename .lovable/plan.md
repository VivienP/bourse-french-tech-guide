

## Problem

The LLM is not reliably starting with the first pre-qualification question. Instead it sometimes jumps to "Pouvez-vous présenter votre projet ?" (the Cas A follow-up). This happens because the initial call sends empty messages and the LLM decides what to say first — which is non-deterministic.

## Fix

**Hardcode the first assistant message client-side** instead of relying on the LLM to generate it. Remove the empty initial API call entirely.

### Changes

**1. `src/pages/Chat.tsx`** — Replace the LLM-generated intro with a hardcoded first message:

- Remove the `sendMessage('')` initial call on mount
- Instead, initialize `messages` state with the first assistant message already set:
  ```ts
  const INITIAL_MESSAGE = "Votre entreprise est-elle une société française déjà **immatriculée** (SAS/SARL/...) ?";
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: INITIAL_MESSAGE }
  ]);
  ```
- Remove the `initialCallDone` ref and the `useEffect` that triggers `sendMessage('')`

**2. `supabase/functions/eligibility-chat/index.ts`** — Update the system prompt to align with the new flow:

- Update the pre-qualification wording to match: "Votre entreprise est-elle une société française déjà **immatriculée** (SAS/SARL/...) ?"
- Update the 3 questions to match the user's exact formulations:
  1. "Votre entreprise est-elle une société française déjà **immatriculée** (SAS/SARL/...) ?"
  2. "Votre société a-t-elle moins d'un an ?"
  3. "Avez-vous au moins 20 000 € de fonds propres et quasi-fonds propres ?"
- Clarify in the prompt that the first question has already been asked (it's the hardcoded intro), so the LLM should wait for the answer, then ask question 2, then question 3
- Keep all other sections (scoring, report, markers) identical

This eliminates the non-determinism of the initial message and guarantees the conversation always starts with the correct pre-qualification question.

