

## Plan : Envoyer la conversation par email à l'utilisateur après le formulaire de leads

### Contexte

Le domaine `notify.boursefrenchtech.fr` est vérifié et prêt. L'infrastructure email (queues pgmq, cron) est en place. Il manque le scaffolding des emails transactionnels (`send-transactional-email`, `handle-email-unsubscribe`, etc.) et le template de la conversation.

### Étapes

1. **Scaffolder l'infrastructure transactionnelle** via l'outil dédié — crée les Edge Functions `send-transactional-email`, `handle-email-unsubscribe`, `handle-email-suppression`, le registre de templates et la page de désinscription.

2. **Créer le template `conversation-report`** dans `_shared/transactional-email-templates/` — un composant React Email qui affiche :
   - Le résultat d'éligibilité (score, éligible/non éligible)
   - La conversation complète formatée proprement
   - Le branding BFT (couleur navy #1B2A4A)
   - Le template accepte des props : `score`, `conversation` (tableau de messages)

3. **Enregistrer le template** dans `registry.ts`.

4. **Déployer les Edge Functions** transactionnelles.

5. **Modifier `src/pages/Chat.tsx`** — dans `handleLeadSubmit`, après `setLeadCaptured(true)` :
   - Appeler `supabase.functions.invoke('send-transactional-email', ...)` avec :
     - `templateName: 'conversation-report'`
     - `recipientEmail: contactEmail` (l'email de l'utilisateur)
     - `templateData: { score, conversation: conversationRef.current }`
     - `idempotencyKey: conversation-report-${sessionIdRef.current}`
   - L'email sera envoyé depuis `notify.boursefrenchtech.fr` à l'utilisateur
   - **CC ademuynck@odaliaconseil.com** : le template `send-transactional-email` ne supporte pas nativement le CC. Solution : déclencher un second appel `send-transactional-email` vers `ademuynck@odaliaconseil.com` avec le même contenu et un idempotency key distinct (`conversation-report-cc-${sessionIdRef.current}`)
   - Conserver l'appel existant `sendToEmail` (notification interne via Resend) pour l'équipe

### Résultat

Quand l'utilisateur soumet email + téléphone + RGPD :
- Il reçoit la conversation par email sur son adresse personnelle (via Lovable Email)
- ademuynck@odaliaconseil.com reçoit la même conversation (second envoi transactionnel)
- L'équipe interne reçoit toujours la notification existante (via Resend)

### Détails techniques

- Template React Email avec styles inline, fond blanc, accents navy #1B2A4A
- Deux invocations `send-transactional-email` (utilisateur + CC) avec idempotency keys distincts
- Import `supabase` client dans Chat.tsx pour `functions.invoke()`
- Page de désinscription créée automatiquement par le scaffolding

