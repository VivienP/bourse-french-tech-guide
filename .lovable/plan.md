

## Plan: Boutons Oui/Non pour les 3 questions de préqualification

### Approche

Ajouter un état `preQualStep` (0, 1, 2, 3) qui suit la progression dans les 3 questions de tri. Tant que `preQualStep < 3`, le textarea est masqué et remplacé par deux boutons **Oui** / **Non**. Quand l'utilisateur clique, le message "Oui" ou "Non" est envoyé automatiquement via `sendMessage()`.

Les 3 questions sont hardcodées côté client (pas besoin d'attendre le LLM) :
1. Q1 (déjà affichée) : "Votre entreprise est-elle une société française déjà **immatriculée** ?"
2. Q2 : "Votre société a-t-elle moins d'un an ?"
3. Q3 : "Avez-vous au moins 20 000 € de fonds propres et quasi-fonds propres ?"

### Changements dans `src/pages/Chat.tsx`

1. **Nouvel état** : `const [preQualStep, setPreQualStep] = useState(0);`

2. **Fonction `handlePreQualAnswer(answer: 'Oui' | 'Non')`** :
   - Appelle `sendMessage(answer)` pour envoyer la réponse au LLM
   - Incrémente `preQualStep`
   - Si `preQualStep < 2` (questions 2 et 3 restantes), ajouter la question suivante côté client comme message assistant après un court délai — ou laisser le LLM la poser (le prompt est déjà configuré pour enchaîner les questions)

3. **Zone de saisie conditionnelle** : dans le footer, remplacer le textarea par deux boutons quand `preQualStep < 3` et `!isLoading` :
   ```
   ┌─────────────────────────┐
   │   [ Oui ]    [ Non ]    │
   └─────────────────────────┘
   ```
   Boutons stylés avec les classes existantes (bg-primary pour Oui, outline pour Non).

4. **Bloquer le textarea** : quand `preQualStep < 3`, ne pas rendre le textarea ni le bouton Send — uniquement les boutons Oui/Non.

### Détails techniques

- `preQualStep` commence à 0 (Q1 affichée, en attente de réponse)
- Après clic → `sendMessage('Oui')` ou `sendMessage('Non')` → le LLM répond et pose la question suivante → `preQualStep` passe à 1, puis 2, puis 3
- À `preQualStep === 3`, le textarea normal réapparaît pour la suite de la conversation
- Les boutons sont désactivés pendant `isLoading` pour éviter les double-clics

