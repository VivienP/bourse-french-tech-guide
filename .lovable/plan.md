

## Plan: Hide individual criterion scores, show only the overall average

### Change

**`supabase/functions/eligibility-chat/index.ts`** — Update `REPORT_PROMPT` (lines 107-164)

Modify the report format instructions so the LLM:
- Still evaluates all 5 dimensions internally (for accurate scoring)
- Does **not** display individual "Note : X/5" per criterion
- Writes a qualitative paragraph per dimension (strengths/weaknesses) without showing the score
- Shows **only the final average** in the conclusion section

Key prompt edits:
1. **Lines 147-150** — Replace format instructions: remove "Notes en gras : **Note : X/5**", replace with "Ne jamais afficher la note individuelle de chaque critère. Rédiger un paragraphe d'analyse factuelle par dimension sans mentionner de note chiffrée."
2. **Lines 154-157** — Update conclusion format to prominently display the average: "Afficher uniquement la **Note globale : X.X/5** suivie du verdict d'éligibilité."
3. **Lines 139-145** — Update scoring rules to clarify these are internal-only: "Ces notes sont internes au calcul et ne doivent pas apparaître dans le rapport."

### Files modified
- `supabase/functions/eligibility-chat/index.ts` (~10 lines in REPORT_PROMPT)
- Redeploy edge function `eligibility-chat`

