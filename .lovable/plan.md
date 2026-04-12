

## Plan: Restore original message + show lead gate during report generation

### Two changes

**1. Restore original INITIAL_MESSAGE and desktop-sized styles**

Revert the condensed mobile text and reduced font sizes back to the original version:
- INITIAL_MESSAGE: restore "Ce programme est réservé aux startups qui remplissent les **3 conditions suivantes**..." with bullet points and full text
- Restore `text-sm` (remove `text-[13px] sm:text-sm`), `px-4 py-3` (remove responsive variants), `pt-[72px]`, `pb-6`, `space-y-4`, `px-4 py-3` on footer
- Keep the mobile scroll fix from the previous iteration (the `pt-[64px] sm:pt-[96px]` pattern was good — we keep responsive padding top only)

**2. Show lead gate popup immediately when report generation starts (not after it finishes)**

Currently: `showLeadGate = reportDone && !leadCaptured` — the lead form only appears after the score is extracted (report fully generated).

New behavior:
- Add a `reportGenerating` state set to `true` when the backend enters the report phase (detected by the last user message being the 7th+ structured answer, or when reasoning starts on the final call)
- Simpler approach: trigger `showLeadGate` as soon as `isReasoning` becomes true on the final question (the report generation call). This means: `showLeadGate = (isGeneratingReport || reportDone) && !leadCaptured`
- Add a new state `isGeneratingReport` set to `true` right before the report-generation `sendMessage` call (when all 5 pillars are answered)
- The report continues generating in background; once `reportDone` becomes true and user has already filled in their details, the report is immediately revealed

Detection: The report phase starts when the backend sends reasoning tokens after all structured questions are done. We can detect this by checking if `isReasoning` is true AND the conversation has enough messages (7+ user messages). Alternatively, simpler: set `isGeneratingReport = true` when `sendMessage` is called and there are already 6+ user messages (gate + 5 pillars + follow-up).

**Simplest approach**: Count user messages. When user sends their answer to the last structured question (the one that triggers report generation), set `isGeneratingReport = true`. The lead gate appears immediately. Report streams in background. When score is extracted, `reportDone` becomes true and the report is available as soon as the user submits the form.

### Files modified
- `src/pages/Chat.tsx` (~25 lines changed)

### Technical details
- New state: `const [isGeneratingReport, setIsGeneratingReport] = useState(false)`
- In `sendMessage`, after building `newMessages`, check `newMessages.filter(m => m.role === 'user').length >= 7` — if true, `setIsGeneratingReport(true)`
- Update: `const showLeadGate = (isGeneratingReport || reportDone) && !leadCaptured && !conversationClosed`
- The blurred report preview only shows when `reportDone` is true (otherwise just the lead form without the blurred preview behind it)

