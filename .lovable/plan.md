

## Audit typographique et contrastes gris

### Problemes identifies

**Tailles de texte incohérentes :**

```text
Élément              | Actuel (varie)              | Cible
─────────────────────┼─────────────────────────────┼──────────────────────
Section subtitle     | text-xl / text-lg / text-base| text-lg partout
Card title           | text-lg / text-xl / text-2xl | text-lg partout
Card body            | text-sm / (rien=base)        | text-sm partout
List items           | text-sm / text-base          | text-sm partout
Stats sublabel       | text-xs                      | text-sm
Section label (tag)  | text-sm                      | text-sm (ok)
Section h2           | text-3xl md:text-4xl         | text-3xl md:text-4xl (ok)
Sub-h3               | text-2xl                     | text-xl
```

**Gris trop clairs (contraste insuffisant) :**
- `text-foreground/80` (StatsSection labels) -- remplacer par `text-muted-foreground`
- `text-secondary-foreground/70` (Footer links) -- remplacer par `text-secondary-foreground/80`
- `text-secondary-foreground/50` (Footer copyright) -- remplacer par `text-secondary-foreground/60`
- `text-destructive/80` et `text-destructive/90` -- remplacer par `text-destructive`
- `text-muted-foreground` dans la variable CSS : `220 15% 46%` est correct, pas de changement

### Plan d'implémentation

**1. Harmoniser les sous-titres de section** (7 fichiers)
- EligibilitySection, EvaluationSection, ExpensesSection, BenefitsSection, CTASection : passer tous les sous-titres en `text-lg`

**2. Harmoniser les titres de cartes** (5 fichiers)
- PracticalAdviceSection, EvaluationSection, ExpensesSection, FinancingSection, CriteriaGrid : uniformiser en `text-lg`
- PracticalAdviceSection "La différence décisive" : `text-2xl` → `text-xl`
- Sub-headings (h3) dans ApplicationProcessSection et PracticalAdviceSection : `text-2xl` → `text-xl`

**3. Harmoniser le corps de texte des cartes** (4 fichiers)
- EvaluationSection, PracticalAdviceSection, EligibilitySection, FinancingSection : ajouter `text-sm` là où il manque sur les `text-muted-foreground` dans les CardContent

**4. Corriger les gris trop clairs** (3 fichiers)
- StatsSection : `text-foreground/80` → `text-muted-foreground`, `text-xs` → `text-sm`
- Footer : `/70` → `/80`, `/50` → `/60`
- ExpensesSection : `text-destructive/80` → `text-destructive/70` (garder une nuance mais plus lisible)

**5. Harmoniser le tip/callout de PracticalAdviceSection**
- `text-xl font-semibold text-primary` → `text-lg font-semibold text-primary`
- `text-lg text-muted-foreground` → `text-base text-muted-foreground`

Au total : ~10 fichiers modifiés, aucun changement structurel ni de layout.

