

## Plan : Supprimer ChatBubble de /chat + corriger scroll/zoom mobile sur toutes les pages

### Problèmes

1. **Double chatbot sur /chat** : la bulle ChatBubble chevauche l'input du chatbot principal
2. **Zoom mobile non verrouillé** : le `<meta name="viewport">` ne bloque pas le pinch-to-zoom, ce qui provoque des zooms intempestifs quand l'utilisateur interagit avec les inputs (double-tap, pinch accidentel)
3. **Bulle fixe sur la page Index** : la bulle en `position: fixed` peut créer des rebonds de scroll sur iOS (interaction avec le viewport mobile et le clavier virtuel)

### Modifications

**1. `src/pages/Chat.tsx`** — Supprimer ChatBubble
- Supprimer l'import `ChatBubble` (ligne 17)
- Supprimer le rendu `<ChatBubble ... />` (ligne 627)

**2. `index.html`** — Verrouiller le zoom mobile
Remplacer :
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```
Par :
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```
Cela empêche le pinch-to-zoom et le zoom automatique sur focus d'input (iOS), éliminant les bugs de scroll/zoom sur toutes les pages.

**3. `src/components/ChatBubble.tsx`** — Stabiliser le scroll mobile sur Index
- Ajouter `touch-action: manipulation` sur le bouton bulle et le panneau de chat pour éviter les double-tap zoom et les conflits de gestes tactiles
- Ajouter `-webkit-overflow-scrolling: touch` sur la zone de messages pour un scroll fluide sur iOS

### Fichiers modifiés
- `src/pages/Chat.tsx` (2 lignes supprimées)
- `index.html` (1 ligne modifiée)
- `src/components/ChatBubble.tsx` (ajout de classes CSS tactiles)

