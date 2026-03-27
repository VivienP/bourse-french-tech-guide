
Objectif : rendre le comportement fiable même quand l’utilisateur répond de façon incomplète comme “Application mobile”, en évitant que le modèle clôture la conversation à tort.

1. Reprendre l’orchestration côté backend au lieu de laisser le LLM “deviner”
- Ajouter une vraie machine d’état dans `supabase/functions/eligibility-chat/index.ts` :
  - `prequal_q1`, `prequal_q2`, `prequal_q3`
  - `project_initial`
  - `project_followup`
  - `report_ready`
  - `closed`
- Déterminer l’étape à partir de l’historique des messages avant d’appeler le modèle.
- N’autoriser `CONVERSATION_CLOSED` que dans les cas de préqualification négative ou refus répété de répondre aux questions Oui/Non.

2. Séparer strictement les deux logiques aujourd’hui mélangées
- Préqualification : règles déterministes, avec réponses limitées à Oui/Non.
- Qualification projet : si la description est vague/incomplète, ne jamais fermer ; poser automatiquement un lot court de questions complémentaires.
- Ne plus confier cette décision critique uniquement au prompt.

3. Mettre en place une détection robuste des informations manquantes
- Créer une fonction serveur qui vérifie explicitement si les 3 blocs minimaux sont présents :
  - innovation / problème résolu
  - équipe
  - marché / concurrents
- Si un bloc manque ou si la réponse est trop courte/générique (“Application mobile”, “Projet IA”, etc.), répondre avec une relance structurée au lieu de lancer le scoring.
- Garder une seule relance maximale avant de produire un rapport partiel, sans fermeture.

4. Simplifier et durcir le prompt
- Réécrire le prompt pour qu’il reçoive l’étape courante en entrée.
- Lui interdire explicitement :
  - de clôturer en étape projet pour manque d’informations
  - de scorer sans prérequis suffisants
  - d’interpréter une réponse projet vague comme un refus de répondre
- Réduire les instructions ambiguës qui se chevauchent aujourd’hui entre préqualification, relance et clôture.

5. Aligner le frontend `/chat` avec cette orchestration
- Dans `src/pages/Chat.tsx`, conserver les boutons Oui/Non pour les 3 premières questions.
- Ajouter une notion d’étape dérivée de la conversation côté client pour mieux contrôler :
  - quand la saisie libre réapparaît
  - quand une conversation est réellement terminée
  - quand afficher la relance projet au lieu du message de fin
- Éviter de se baser uniquement sur les marqueurs LLM pour piloter l’UX.

6. Corriger la logique de fermeture de conversation
- Aujourd’hui, si le backend renvoie `CONVERSATION_CLOSED`, l’UI bloque tout de suite l’échange.
- La correction devra faire en sorte que ce marqueur ne puisse plus sortir en étape projet.
- Ainsi, un message vague déclenchera forcément une question de clarification et non un arrêt définitif.

7. Prévoir des garde-fous de robustesse
- Ajouter des helpers explicites côté serveur :
  - extraction des réponses de préqualification
  - détection de réponse Oui/Non valide
  - détection de projet trop vague
  - calcul de l’étape courante
- Cela rendra le comportement stable même si le modèle varie légèrement.

8. Vérifications à faire après implémentation
- Cas nominal : 3 Oui → “Application mobile” → l’agent pose les 3 questions complémentaires.
- Cas plus précis : 3 Oui → description complète → génération directe du rapport.
- Cas refus partiel en préqualification : l’agent reformule, puis ferme seulement à cette étape si nécessaire.
- Cas Non à un critère : fermeture justifiée sans rapport.
- Vérifier aussi que l’UI ne réactive pas la zone de saisie si une vraie clôture a eu lieu.

Détails techniques
- Cause racine principale : l’architecture actuelle repose trop sur le prompt pour inférer l’état conversationnel.
- Problème aggravant : le prompt contient des règles concurrentes sur “relancer” vs “clôturer”, et le client traite `CONVERSATION_CLOSED` comme vérité absolue.
- Solution robuste : déplacer les décisions de workflow critiques dans du code déterministe, et utiliser le modèle seulement pour formuler les questions, analyses et rapports dans le cadre de l’étape décidée par le backend.
