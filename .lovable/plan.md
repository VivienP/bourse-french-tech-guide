

## Plan : Corriger l'évaluation d'éligibilité — exigence équipe, pénalisation "info manquante", calibration des notes

### Problèmes identifiés

1. **L'agent génère un rapport sans info sur l'équipe** — La machine d'état passe en `report_ready` dès que la description du projet est "suffisamment longue" (>80 chars + 2 keywords), sans vérifier si les 3 piliers critiques (innovation, équipe, marché) sont couverts.

2. **"Information non fournie" ne pénalise pas la note** — Le prompt dit de ne pas noter les critères manquants et de calculer la moyenne sur les critères notés, ce qui gonfle artificiellement le score.

3. **Notes sur-évaluées** — Le prompt ne donne pas assez de calibration au modèle. Des projets peu innovants (app de livraison, presse en ligne, réseau social basique) reçoivent des notes trop hautes.

### Données d'exemples réels extraites du fichier

Projets **NON innovants** (score attendu < 2) :
- Logiciel pour auberges sur le chemin de Compostelle
- Sous-traitant médical (pas de projet propre)
- Service de livraison CBD + sextoys
- Presse en ligne sur le handicap
- Réseau social avec avatar
- Plateforme mutualiste TDAH
- Dentifrice

Projets **innovants** (éligibles BFT/CII) :
- Shelfie : IA locale embarquée smartphone pour diagnostic pharmacie hors-ligne
- IA + cybersécurité pour rétro-ingénierie de code source (dual-use)
- Purificateur d'air à base de microalgues
- IA pour gestion automatisée de centres de stretching
- Ollyo : fintech d'épargne collaborative (tontine)

### Étapes d'implémentation

**1. Renforcer la machine d'état pour exiger les 3 piliers** (`eligibility-chat/index.ts`)

Modifier `detectPhase` et ajouter une phase `project_missing_info` :
- Après la première description projet (`n === 4`), analyser le contenu pour détecter la présence des 3 piliers : innovation/techno, équipe, marché/concurrence
- Si un ou plusieurs piliers manquent → nouvelle phase `project_missing_info` qui demande spécifiquement les infos manquantes
- Si `n === 5` et toujours vague → `report_ready` quand même (on ne boucle pas indéfiniment)
- Ajouter une fonction `detectMissingPillars(text)` qui cherche des keywords pour équipe (`fondateur, co-fondateur, CTO, équipe, associé, profil, expérience`), marché (`marché, client, concurrent, cible, segment, utilisateur`), innovation (`innov, techno, brevet, algorithme, IA, prototype, R&D, différen`)

**2. Modifier le REPORT_PROMPT pour pénaliser l'info manquante** (`eligibility-chat/index.ts`)

- Remplacer la règle "pas de note si info manquante" par : **"Si l'information n'est pas fournie pour un critère, attribuer la note de 1/5 avec la mention 'Information non fournie — note pénalisée'."**
- Cela force la moyenne à baisser quand l'utilisateur ne fournit pas d'information.

**3. Ajouter des exemples de calibration au REPORT_PROMPT** (`eligibility-chat/index.ts`)

Injecter dans le prompt une section `EXEMPLES DE CALIBRATION` basée sur les données réelles :

```text
━━━ CALIBRATION — EXEMPLES RÉELS ━━━

Projets NON innovants (score < 2) — pas de complexité technique réelle :
— Application/site web standard sans techno propriétaire (ex: app de réservation, presse en ligne, marketplace classique, réseau social sans IA, livraison de produits)
— Commercialisation de produits existants (compléments alimentaires, cosmétiques, produits physiques sans R&D)
— Plateforme communautaire ou d'entraide sans moteur technologique différenciant
— Sous-traitance ou revente de services existants

Projets INNOVANTS (score ≥ 2.5) — complexité technique avérée :
— IA embarquée hors-ligne sur smartphone (traitement d'image en local, modèle frugal)
— Cybersécurité / rétro-ingénierie avec IA (dual-use défense)
— Hardware deeptech (purificateur d'air par microalgues, biotech)
— Framework agentique, moteur de génération procédurale

RÈGLE CLÉ : La BFT finance l'INNOVATION TECHNOLOGIQUE, pas les bonnes idées business. Un projet sans complexité de développement technique significative doit recevoir un score d'innovation ≤ 2/5.
```

**4. Ajuster la logique `isVague`** (`eligibility-chat/index.ts`)

Actuellement, `isVague` ne regarde que la longueur et le nombre de keywords. Problème : "Application mobile pour gérer des locations" fait >80 chars mais ne couvre pas l'équipe → ne déclenche pas le followup.

Remplacer par `needsMoreInfo(text, allUserMessages)` qui :
- Vérifie la présence des 3 piliers dans l'ENSEMBLE des messages utilisateur (pas juste le dernier)
- Retourne `true` si un pilier manque

### Fichiers modifiés

- `supabase/functions/eligibility-chat/index.ts` — machine d'état, prompts, logique de détection

### Résultat attendu

- L'agent demande systématiquement des précisions si l'équipe, le marché ou l'innovation ne sont pas décrits
- Les critères sans information reçoivent 1/5 au lieu d'être exclus du calcul
- Les projets non-innovants (app basique, service de livraison, marketplace) reçoivent un score < 2
- Les projets véritablement innovants (deeptech, IA embarquée, biotech) conservent des scores ≥ 2.5

