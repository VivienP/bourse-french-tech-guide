

## Plan : Corriger les deux problèmes d'UI sur /chat

### Problème 1 — Bulle Q/A qui chevauche le bouton "Envoyer" en mobile

La bulle flottante est positionnée `fixed bottom-6 right-4` et le panneau de chat s'ouvre aussi à droite, ce qui chevauche le footer d'input de la page /chat sur mobile.

**Solution** : Ajouter une prop `position` au composant `ChatBubble` pour permettre de placer la bulle à gauche. Sur la page `/chat`, passer `position="left"`.

**Fichiers modifiés** :
- `src/components/ChatBubble.tsx` — Ajouter prop `position?: 'left' | 'right'` (défaut `'right'`). Changer les classes du bouton flottant et du panneau selon la position :
  - Bouton : `right-4 sm:right-6` → `left-4 sm:left-6` quand `position="left"`
  - Panneau : `sm:left-auto sm:right-6` → `sm:right-auto sm:left-6` quand `position="left"`
- `src/pages/Chat.tsx` — Passer `position="left"` au `<ChatBubble>`

### Problème 2 — Rapport affiché en double

Le rapport apparait dans le dernier message assistant ET dans l'encart `showReport`. Actuellement, le message n'est masqué que quand `!leadCaptured` (blurred preview). Une fois le lead capturé, le message complet réapparait.

**Solution** : Aussi cacher le message du rapport quand `showReport` est vrai (lead capturé + score présent).

**Fichier modifié** :
- `src/pages/Chat.tsx` — Modifier la condition `isReportMsg` (ligne 401) :
  ```
  const isReportMsg = reportDone && msg.role === 'assistant' && i === messages.length - 1;
  ```
  Puis conditionner : si `isReportMsg && showReport` → ne pas rendre le message du tout (au lieu de le montrer normalement après lead capture).

### Détails techniques

- Aucune modification backend
- 2 fichiers modifiés : `ChatBubble.tsx`, `Chat.tsx`
- Changements purement CSS/conditionnels

