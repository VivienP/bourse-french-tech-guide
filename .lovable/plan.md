

## Plan : Ajouter les coordonnées du prospect dans l'email envoyé à Aline

### Approche

Passer `contactEmail` et `contactPhone` dans le `templateData` de l'appel CC vers Aline, puis afficher ces infos dans le template email uniquement quand elles sont présentes (l'email utilisateur ne les affiche pas).

### Étapes

**1. `src/pages/Chat.tsx`** — Ajouter `contactEmail` et `contactPhone` au `templateData` de l'appel CC (lignes 369-379) :
```typescript
templateData: {
  score,
  conversation: conversationRef.current,
  prospectEmail: contactEmail.trim(),
  prospectPhone: contactPhone.trim(),
},
```

**2. `supabase/functions/_shared/transactional-email-templates/conversation-report.tsx`** — Ajouter les props `prospectEmail?` et `prospectPhone?` à l'interface, puis afficher un encart « Coordonnées du prospect » entre le score et la conversation quand ces props sont présentes :
```tsx
{(prospectEmail || prospectPhone) && (
  <Section style={contactSection}>
    <Text style={contactTitle}>📋 Coordonnées du prospect</Text>
    {prospectEmail && <Text style={contactInfo}>Email : {prospectEmail}</Text>}
    {prospectPhone && <Text style={contactInfo}>Tél : {prospectPhone}</Text>}
  </Section>
)}
```

**3. Redéployer** `send-transactional-email` après modification du template.

### Fichiers modifiés
- `src/pages/Chat.tsx` (1 ligne)
- `supabase/functions/_shared/transactional-email-templates/conversation-report.tsx` (props + section conditionnelle)

