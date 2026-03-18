

## Plan: Add CTA button when daily message limit is reached

When the user hits the 10-message limit, replace the error text with a call-to-action button linking to the Cal.com booking page.

### Changes in `src/components/ChatBubble.tsx`

1. **Replace the error banner and the "limite atteinte" footer text** with a styled button that:
   - Shows "Vous avez atteint la limite de messages." as label
   - Links to `https://cal.eu/boursefrenchtech/decouverte` opening in a new tab (`target="_blank"`)
   - Appears in place of the input area when `currentRemaining <= 0`

2. **Update the footer section**: When limit is reached, instead of showing the input + disabled state, show the CTA button with the same text style as the rest of the chat, plus a secondary line "Prenez rendez-vous avec un expert" or similar.

### No backend changes needed.

