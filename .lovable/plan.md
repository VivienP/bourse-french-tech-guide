

## Plan: Fix reasoning, improve scoring calibration, add recommendation section

### Problems identified

1. **No reasoning phase**: `max_completion_tokens: 2500` is too low when `reasoning_effort: "high"` — the model skips reasoning to fit the output within the token budget. Reasoning tokens count against `max_completion_tokens`.

2. **Score too harsh**: The current 5-dimension formula with "Clarté" weighted at 0.5 and division by 4.5 creates a strict scale. Early-stage projects with real innovation but limited traction get penalized too heavily.

3. **No recommendation section**: The prompt explicitly forbids recommendations. We need a targeted "point d'amélioration clé" section that highlights the single most impactful action to secure BFT.

### Changes

**`supabase/functions/eligibility-chat/index.ts`**

1. **Increase `max_completion_tokens`** from `2500` to `4096` (line 285) — gives the model room for both reasoning and a full report.

2. **Update `REPORT_PROMPT`** (lines 107-165):
   - **Scoring calibration**: Adjust the eligibility threshold and add guidance that early-stage projects with genuine innovation should score 3+ on innovation. Rebalance: lower the penalty for missing traction when innovation is strong.
   - **Add recommendation section**: After the conclusion, add a new mandatory section:
     ```
     ## 💡 Recommandation clé
     [Identifier LE point d'amélioration qui aurait le plus d'impact pour sécuriser la BFT. 
     Formuler en 2-3 phrases actionables.]
     ```
   - Remove the "INTERDIT ABSOLU" on recommendations and replace with: individual dimension analyses must remain factual (no advice), but the dedicated "Recommandation clé" section at the end must contain one actionable improvement.

**`src/pages/Chat.tsx`** — No changes needed (the recommendation renders as markdown automatically).

**`src/components/ScoreGauge.tsx`** — No changes needed.

### Technical details

- The `max_completion_tokens` parameter in OpenAI's API includes reasoning tokens. With `reasoning_effort: "high"`, the model may use 1000-2000 tokens for reasoning alone, leaving very little for the actual report at 2500.
- Setting it to 4096 gives ~2000 tokens for reasoning + ~2000 for the report — sufficient for the 8-section format.
- The prompt update keeps internal scoring invisible but adds one final recommendation block.
- Edge function `eligibility-chat` will be redeployed.

### Files modified
- `supabase/functions/eligibility-chat/index.ts` (~20 lines changed)

