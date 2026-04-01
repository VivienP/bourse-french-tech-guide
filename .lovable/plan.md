

## Diagnostic

**Cause racine identifiée** : dans `classifyPillarsSemanticly()` (ligne 37-38), si le texte combiné fait moins de 100 caractères, la fonction retourne `[]` (tableau vide). Or dans la logique d'évaluation (ligne ~280), `[]` est interprété comme "aucun pilier manquant = tous couverts" → le rapport est généré immédiatement sans poser de questions.

Le texte "Saas de visualisation et analyse partagées de données biologiques" fait ~65 caractères, donc il tombe dans ce cas.

Ce n'est ni un problème d'email ni un contournement utilisateur — c'est un bug dans la logique de détection des piliers.

## Correction

**Fichier** : `supabase/functions/eligibility-chat/index.ts`

**Changement** : Quand le texte est trop court pour évaluer sémantiquement, retourner TOUS les piliers comme manquants au lieu d'un tableau vide. Cela forcera l'agent à poser des questions complémentaires.

```typescript
// Ligne 37-38 : remplacer
if (combined.length < 100) return [];

// Par
if (combined.length < 100) return ["innovation", "team", "market", "supports", "gtm"];
```

Cela garantit que toute description courte déclenche systématiquement les questions de relance sur les 5 piliers, au lieu de sauter directement au rapport.

Redéployer la fonction `eligibility-chat` après la modification.

