

# Plan de refonte visuelle globale

## Diagnostic actuel

Le site est fonctionnel mais souffre de plusieurs faiblesses visuelles :

1. **Monotonie des sections** : alternance simple blanc / gris-50 sans rythme visuel marqué
2. **Typographie plate** : mêmes styles `text-gray-600` / `text-gray-900` partout, pas de hiérarchie forte
3. **Couleur primaire sous-exploitée** : le jaune doré `#F8D164` est utilisé timidement (petits badges, icônes) mais ne structure pas l'identité visuelle
4. **Cards génériques** : toutes les cartes ont le même style shadcn par défaut, aucune personnalité
5. **Hero section sobre** : pas de visuel fort, pas de gradient de fond accrocheur
6. **Navigation bar basique** : fond blanc simple, pas de contraste fort
7. **CTA répété 3 fois** : le même `CTASection` apparaît 3 fois dans la page, ce qui dilue l'impact
8. **Sections texte dense** : `DefinitionSection` et `BenefitsSection` sont des blocs de texte sans mise en forme visuelle

## Modifications proposées

### 1. Palette et variables CSS enrichies
- Ajouter des variables pour un gradient de fond subtil (warm beige → blanc)
- Définir une couleur secondaire complémentaire (bleu foncé `#1B2A4A`) pour le contraste
- Utiliser le jaune doré plus audacieusement comme accent principal

### 2. Hero section impactante
- Fond avec gradient radial doré subtil
- Ajouter un motif géométrique léger (dots ou grid) en arrière-plan CSS
- Typographie plus grande et plus contrastée pour le titre
- Badge "Subvention Bpifrance" au-dessus du titre

### 3. Navigation bar modernisée
- Style glassmorphism plus prononcé avec `backdrop-blur-md`
- Indicateur actif animé sous les liens (barre dorée)
- Ombre plus marquée au scroll

### 4. Sections avec rythme visuel
- Alterner les fonds : blanc pur → beige très léger `#FEFCF3` → blanc → gris chaud `#F9F7F4`
- Ajouter des séparateurs visuels entre sections (ligne dorée fine ou forme ondulée SVG)
- Encadrer les titres de section avec un trait doré à gauche ou en dessous

### 5. Cards et composants personnalisés
- Bordure supérieure dorée sur les cartes clés
- Ombre plus douce et chaude (`shadow-warm`)
- Hover plus marqué avec légère translation Y et glow doré
- Coins plus arrondis (`rounded-xl`)

### 6. Typographie et espacement
- Titres de section : plus gros, avec un sous-titre stylisé
- Texte courant : interligne augmenté, taille `text-base` minimum
- Utiliser `font-display` ou une Google Font (Inter déjà disponible via Tailwind)

### 7. Section Définition et Bénéfices
- Transformer les blocs de texte en layout avec icône/illustration à côté
- Ajouter des chiffres clés en encarts colorés

### 8. Réduire les CTA à 2 occurrences
- Un après la section Processus/Évaluation (milieu de page)
- Un avant le Footer (fin de page)
- Supprimer le CTA entre Hero et Évaluation

### 9. Footer modernisé
- Fond plus sombre avec gradient subtil
- Espacement plus généreux
- Liens avec hover doré

## Fichiers impactés

- `src/index.css` : nouvelles variables CSS, utilitaires
- `tailwind.config.ts` : couleurs complémentaires, ombres custom
- `src/pages/Index.tsx` : réorganiser les sections, supprimer un CTA
- `src/components/HeroSection.tsx` : refonte visuelle
- `src/components/NavigationBar.tsx` : style glassmorphism
- `src/components/DefinitionSection.tsx` : layout enrichi
- `src/components/BenefitsSection.tsx` : layout enrichi
- `src/components/CriteriaGrid.tsx` : cards améliorées
- `src/components/ExpensesSection.tsx` : cards améliorées
- `src/components/FinancingSection.tsx` : cards améliorées
- `src/components/EvaluationSection.tsx` : cards améliorées
- `src/components/CTASection.tsx` : ajustements mineurs
- `src/components/PracticalAdviceSection.tsx` : cards améliorées
- `src/components/ProcessTimeline.tsx` : timeline plus visuelle
- `src/components/Footer.tsx` : style modernisé
- `src/components/StatsSection.tsx` : style renforcé

## Approche d'implémentation

Les modifications seront faites par lots pour garder le site fonctionnel à chaque étape :
1. Variables CSS et config Tailwind (fondation)
2. Navigation + Hero (première impression)
3. Sections de contenu (corps de page)
4. CTA + Footer (fin de page)

