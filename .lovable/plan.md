

## Plan: Chatbot IA en bulle pop-up

### Prérequis
Le projet n'a pas de Supabase connecté ni de Lovable Cloud activé. Pour utiliser Lovable AI (gateway), il faut activer Lovable Cloud, ce qui fournira automatiquement le `LOVABLE_API_KEY` et permettra de déployer une edge function.

### Architecture

```text
┌─────────────┐     ┌──────────────────────┐     ┌─────────────────────┐
│  ChatBubble │────▶│  Edge Function /chat  │────▶│ Lovable AI Gateway  │
│  (React)    │◀────│  (Deno, streaming)    │◀────│ gemini-3-flash      │
└─────────────┘     └──────────────────────┘     └─────────────────────┘
```

### Composants à créer

**1. Edge Function `supabase/functions/chat/index.ts`**
- Reçoit les messages du visiteur + historique de conversation
- Injecte le contenu de `llms-full.txt` comme system prompt (contexte de la BFT)
- Appelle Lovable AI Gateway en mode streaming (SSE)
- Retourne le stream au client

**2. Composant `src/components/ChatBubble.tsx`**
- Bulle flottante en bas à droite (fixed, z-50)
- Icône MessageCircle de lucide-react, au clic ouvre un panneau de chat
- Zone de messages scrollable + champ de saisie
- Streaming token par token avec rendu markdown (`react-markdown` à installer)
- Animation d'ouverture/fermeture

**3. Limites d'usage par visiteur**
- Stockage dans `localStorage` d'un compteur de messages par session/jour
- Limite configurable (ex: 15 messages par jour par visiteur)
- Message d'avertissement quand la limite est atteinte, pas d'appel API au-delà
- Compteur visible discrètement dans le chat (ex: "12/15 messages restants")

### Modifications existantes

- **`src/pages/Index.tsx`** : Ajouter `<ChatBubble />` dans le layout
- **`supabase/config.toml`** : Ajouter la config de la function avec `verify_jwt = false`
- **`package.json`** : Ajouter `react-markdown`

### System prompt de l'edge function

Le system prompt contiendra le texte intégral de `llms-full.txt` (environ 345 lignes) et instruira l'assistant de :
- Répondre uniquement sur la Bourse French Tech
- Être concis et précis
- Répondre en français
- Ne pas inventer d'informations non présentes dans le document

### Étapes d'implémentation

1. Activer Lovable Cloud (nécessaire pour edge functions + LOVABLE_API_KEY)
2. Créer l'edge function `/chat` avec streaming SSE et le contenu de llms-full.txt en system prompt
3. Créer le composant `ChatBubble` avec UI, streaming, et limites d'usage localStorage
4. Intégrer le composant dans la page Index
5. Installer `react-markdown` pour le rendu des réponses
6. Tester le flux complet

### Style visuel
- Bulle : ronde, couleur `primary`, ombre portée, en bas à droite
- Panneau : carte blanche avec bordure, max 400px de large, 500px de haut
- Messages utilisateur à droite (fond primary), messages assistant à gauche (fond muted)
- Cohérent avec le design existant (Tailwind, shadcn/ui)

