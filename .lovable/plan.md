

## Current State

**Nav items (5):** Définition, Critères, Processus, Exemples, FAQ

**Page sections (11):** Définition → Critères (Éligibilité) → Dépenses → Financement → Processus → CTA → Évaluation → Conseils → Exemples → Avantages → FAQ

**Missing from nav:** Dépenses, Financement, Évaluation, Conseils, Avantages — 5 sections are unreachable from the header.

## Proposed Improvement

Group related sections under dropdown menus to cover all content without cluttering the navbar. Use a compact mega-menu approach:

```text
Nav layout (desktop):
[Logo]  Comprendre | Financer | Préparer | Exemples | FAQ  [Réserver un créneau]

Comprendre (dropdown):
  - Définition
  - Critères d'éligibilité
  - Dépenses éligibles

Financer (dropdown):
  - Financement & calcul
  - Avantages

Préparer (dropdown):
  - Processus de candidature
  - Évaluation
  - Conseils pratiques
```

**Exemples** and **FAQ** remain as direct links (no dropdown).

## Technical Plan

1. **NavigationBar.tsx** — Restructure nav items into grouped categories using Radix `DropdownMenu` (already available via shadcn). Each group gets a trigger button with a chevron, and a dropdown listing sub-items with labels and short descriptions.

2. **Mobile** — Use the existing Sheet component to show a collapsible accordion-style menu grouping the same sections.

3. **Active state** — Keep scroll-based active detection; highlight the parent group when any child section is active.

