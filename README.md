# Bourse French Tech Guide

Site public décrivant la Bourse French Tech et ses conditions. C’est un frontend React + Vite avec quelques fonctions Supabase pour le chat.

Le site est disponible sur **https://boursefrenchtech.fr** et appartient à **Vivien Perrelle**.

## Démarrage local

### Pré-requis
- Node.js 18+ (ou plus récent)
- npm (ou bun si vous préférez, mais les scripts sont en `npm`)

### Installation

```sh
git clone <VOTRE_URL_GIT>
cd bourse-french-tech-guide
npm install
```

### Lancer le serveur de dev

```sh
npm run dev
```

Le site sera disponible sur `http://localhost:5173` par défaut.

### Build pour production

```sh
npm run build
```

### Preview du build

```sh
npm run preview
```

## Structure du dépôt

- `src/` : frontend React + composants shadcn-ui
- `public/` : assets statiques
- `supabase/functions/` : fonctions edge Supabase (chat)

## Déploiement

Ce projet peut se déployer sur n’importe quel service compatible avec Vite (Netlify, Vercel, Cloudflare Pages, etc.).

### Environnements Supabase

Les fonctions dans `supabase/functions/` doivent être déployées sur un projet Supabase et configurées avec les variables d’environnement appropriées.

## Notes

- Le dossier `supabase/functions/chat/` contient plusieurs fichiers Markdown utilisés par le chatbot.
- La configuration Tailwind est dans `tailwind.config.ts`.
- Le code UI est dans `src/components/`.
