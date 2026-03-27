

## Plan : Suggestions contextuelles dans la bulle Q/A selon l'étape d'éligibilité

### Approche

Passer le `preQualStep` et l'état `conversationClosed` de la page `/chat` au composant `ChatBubble` via une nouvelle prop `eligibilityStep`. Le ChatBubble utilisera cette info pour afficher des suggestions pertinentes liées à la question d'éligibilité en cours, sans toucher au backend.

### Mapping des suggestions par étape

| `eligibilityStep` | Question affichée dans /chat | Suggestion contextuelle dans la bulle |
|---|---|---|
| 0 | "Société française déjà immatriculée ?" | "Quelles formes juridiques sont éligibles à la BFT ?" |
| 1 | "Société immatriculée depuis moins d'un an ?" | "Comment est calculée la date limite d'un an ?" |
| 2 | "Au moins 20 000 € de fonds propres ?" | "Qu'est-il considéré comme fonds propres ou quasi-fonds propres par Bpifrance ?" |
| 3+ (projet) | Description du projet | "Quels types de projets innovants sont éligibles ?" |

### Modifications

**`src/components/ChatBubble.tsx`**
- Ajouter une prop `eligibilityStep?: number` à côté de `hideEligibility`
- Créer un tableau `ELIGIBILITY_CONTEXTUAL_SUGGESTIONS` indexé par étape
- Dans le calcul de `contextualSuggestions` : si `eligibilityStep` est défini (on est sur /chat), utiliser la suggestion contextuelle correspondante en première position, suivie des suggestions existantes (sans "Évaluer mon éligibilité")

**`src/pages/Chat.tsx`**
- Passer `<ChatBubble hideEligibility eligibilityStep={preQualStep} />` au composant

### Détails techniques

- Aucune modification backend
- Les suggestions contextuelles sont un simple tableau statique côté client
- La suggestion contextuelle est ajoutée en premier dans la liste, les autres suggestions générales restent disponibles après
- Si `eligibilityStep` dépasse la taille du tableau (conversation avancée/fermée), on retombe sur les suggestions par défaut

