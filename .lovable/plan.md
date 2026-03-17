

## Plan: Replace CTA sections with embedded Cal.com calendar

### Current state
- `CTASection` is used **twice** in Index.tsx (lines 58 and 78) — once mid-page after ApplicationProcessSection, once at the bottom before Footer.
- Both display the same text + two buttons linking to external URLs.
- Navigation bar button "Réserver un créneau" and Hero button "Échangez avec un expert" both scroll to `#cta`.

### Proposed changes

**1. Replace CTASection content with Cal.com inline embed**

Rewrite `CTASection.tsx` to:
- Keep the section wrapper with `id="cta"`, consistent padding (`py-20 px-4 sm:px-6 lg:px-8`), and `max-w-6xl` container.
- Replace the title/description/buttons card with a new heading like "Échangez avec un expert" and a subtitle like "Réservez un créneau de découverte directement en ligne."
- Embed the Cal.com widget using a `useEffect` hook that loads the Cal embed script and initializes it on a `#my-cal-inline-decouverte` div.
- Style the calendar container with a minimum height (~600px), rounded corners, and consistent card styling.
- Use the provided Cal.com config with `cal-brand: "#1B2A4A"` (matches secondary color).

**2. Remove duplicate CTA**

Since the calendar is a heavier element than a simple CTA card, keep only **one** instance. Remove the second `<CTASection />` (line 78 in Index.tsx, before Footer) to avoid loading two calendar embeds. The mid-page placement (line 58) remains — users scroll to it via nav/hero buttons.

**3. Script loading approach**

- Load `embed.js` once via `useEffect` with cleanup.
- Use a `ref` to track initialization and prevent double-init in React StrictMode.
- The script URL is `https://app.cal.eu/embed/embed.js` (EU instance as specified).

### Files to modify
- `src/components/CTASection.tsx` — full rewrite with Cal.com embed
- `src/pages/Index.tsx` — remove second `<CTASection />` on line 78

