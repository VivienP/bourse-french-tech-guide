

## Plan : Supprimer les 2 questions de triage dupliquées

### Diagnostic

Le code source actuel est correct : la gate combinée (3 conditions en un bloc) est bien en place côté frontend ET backend. Mais la fonction edge `eligibility-chat` **déployée** exécute encore une ancienne version du code qui contenait les questions de triage individuelles ("Votre société a-t-elle moins d'un an ?", "Avez-vous au moins 20 000 € de fonds propres…") comme premières questions structurées.

### Correction

Redéployer la fonction edge `eligibility-chat` pour que la version actuelle du code (qui ne contient que des questions projet dans `STRUCTURED_QUESTIONS`) soit effective en production.

### Fichiers modifiés

Aucune modification de code nécessaire. Déploiement uniquement.

