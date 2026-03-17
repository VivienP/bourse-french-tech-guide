

## Audit des couleurs actuelles

### Jaunes identifiés (6 nuances distinctes)

| Variable / Classe | HSL | Usage | Probleme |
|---|---|---|---|
| `--primary` | `43 92% 68%` | Boutons, icones, badges, barres decoratives, bordures top cartes | Jaune dore principal - OK |
| `bg-primary/20` | primary a 20% opacite | Fond CTA section | Jaune dilue |
| `bg-primary/10` | primary a 10% opacite | Fonds icones, badges flexibles, encarts chiffres | Jaune tres leger |
| `bg-primary/5` | primary a 5% opacite | Encarts secondaires (Definition, Financement) | A peine visible, quasi blanc |
| `--accent` | `43 70% 96%` | Fonds de listes, encarts checklist, lignes financieres | Jaune tres pale |
| `--warm-bg` / `--warm-bg-alt` | `38 30% 97%` / `35 25% 96%` | Classes utilitaires section-warm (non utilisees actuellement) | Beige-gris, non utilise |

### Gris identifiés (5 nuances)

| Variable | HSL | Usage |
|---|---|---|
| `--background` | `40 33% 99%` | Fond page - blanc legerement chaud |
| `--muted` | `38 30% 96%` | Fonds muted, badges par defaut |
| `--muted-foreground` | `220 15% 46%` | Texte secondaire |
| `--border` / `--input` | `38 20% 90%` | Bordures, inputs |
| `--foreground` | `220 40% 13%` | Texte principal (bleu tres fonce) |

### Incohérences détectées

1. **Trop de nuances jaunes proches** : `bg-primary/5`, `bg-primary/10`, `--accent` et `--muted` sont visuellement quasi-identiques, creant une confusion sans hierarchie claire.
2. **`--warm-bg` et `--warm-bg-alt` sont inutilisées** dans les composants mais polluent la palette.
3. **`--background` a une teinte chaude** (`40 33% 99%`) qui ajoute un voile jaunatre au fond de page, conflictant avec les sections blanches des cartes.
4. **`--muted` et `--border` ont des teintes chaudes** (`38`) qui tirent vers le beige plutot qu'un gris neutre.
5. **shadow-warm** (ombres jaunes) ajoute du jaune partout sur chaque carte et la navbar.

---

## Palette simplifiée proposée

### 3 Jaunes maximum

| Role | Nom | HSL | HEX approx | Usage |
|---|---|---|---|---|
| **Jaune primaire** | `--primary` | `43 92% 68%` (inchangé) | `#F8D164` | Boutons, nav active, barres decoratives, badges |
| **Jaune leger** | `--accent` | `43 60% 96%` | ~`#FBF6E8` | Fonds encarts informatifs, checklist, lignes financieres |
| **Jaune CTA** | `bg-primary/15` | Opacite sur primary | - | Uniquement fond section CTA |

Suppression de `bg-primary/5` (remplace par `bg-accent`) et `--warm-bg` / `--warm-bg-alt`.

### Gris neutralisés

| Role | Nom | HSL actuel | HSL proposé | Impact |
|---|---|---|---|---|
| **Fond page** | `--background` | `40 33% 99%` | `0 0% 99%` | Blanc pur, supprime le voile jaune |
| **Fond muted** | `--muted` | `38 30% 96%` | `220 10% 96%` | Gris froid neutre, complementaire au bleu texte |
| **Texte secondaire** | `--muted-foreground` | `220 15% 46%` | Inchangé | Bon contraste WCAG AA |
| **Bordures** | `--border` / `--input` | `38 20% 90%` | `220 10% 90%` | Gris neutre, plus de teinte beige |

### Ombres

Remplacer les `shadow-warm` (ombres jaunes) par des ombres neutres standard pour reduire la saturation visuelle :
- `shadow-warm` → `shadow-sm`
- `shadow-warm-lg` → `shadow-md`
- `shadow-warm-hover` → `shadow-lg`

---

## Plan d'implementation

### 1. Mettre a jour `src/index.css` (variables CSS)
- `--background: 0 0% 99%`
- `--muted: 220 10% 96%`
- `--accent: 43 60% 96%`
- `--border: 220 10% 90%`
- `--input: 220 10% 90%`
- Supprimer `--warm-bg` et `--warm-bg-alt`

### 2. Mettre a jour `tailwind.config.ts`
- Supprimer `warm-bg`, `warm-bg-alt` des couleurs
- Remplacer les 3 `boxShadow` warm par des ombres neutres standard
- Supprimer les classes utilitaires `.section-warm` / `.section-warm-alt` de index.css

### 3. Uniformiser les opacites dans les composants (13 fichiers)
- Remplacer `bg-primary/5` → `bg-accent` partout
- Uniformiser `bg-primary/10` pour les fonds d'icones uniquement
- Remplacer `shadow-warm` → `shadow-sm`, `shadow-warm-lg` → `shadow-md`, `shadow-warm-hover` → `shadow-lg` dans tous les composants
- Section CTA : `bg-primary/20` → `bg-primary/15`

Fichiers concernes : NavigationBar, HeroSection, StatsSection, DefinitionSection, CriteriaGrid, EligibilitySection, ExpensesSection, FinancingSection, ApplicationProcessSection, ProcessTimeline, EvaluationSection, PracticalAdviceSection, ProjectExamples, FAQSection, CTASection.

### Conformite WCAG
- Texte principal (`--foreground` #1B2A4A) sur fond blanc : ratio ~14:1 (AAA)
- Texte muted (`--muted-foreground`) sur fond blanc : ratio ~5.5:1 (AA)
- Jaune primaire comme fond de bouton avec texte fonce : ratio ~8:1 (AAA)
- Aucune regression d'accessibilite

### Ce qui ne change pas
- `--primary` (jaune dore principal)
- `--secondary` (bleu fonce)
- `--foreground` / `--card` / `--destructive`
- Structure HTML et layout des composants

