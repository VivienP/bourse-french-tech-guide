import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Read llms-full.txt once at cold start
const KNOWLEDGE_BASE = `
# Guide Complet — Bourse French Tech 2026

Ce document est la version exhaustive du guide sur la Bourse French Tech (BFT), subvention publique non remboursable de Bpifrance destinée aux startups innovantes françaises de moins d'un an. Il couvre l'intégralité du dispositif avec un niveau de détail maximal.

## Chiffres clés
- Montant maximum théorique : 50 000 €, en pratique ≤ 30 000 €
- Taux d'intervention : jusqu'à 70 % des dépenses éligibles
- Taux de succès : environ 25 %
- Durée maximale : 24 mois
- Entreprise de moins d'un an au dépôt
- Non remboursable, sans sûreté ni caution

## Définition
La BFT est une subvention publique de Bpifrance pour accompagner les entreprises innovantes de moins d'un an. Elle finance R&D, études de faisabilité, prototypage, propriété intellectuelle.

## Critères d'éligibilité entreprise
- Société commerciale (SAS, SASU, SARL, EURL) — auto-entrepreneurs et EI exclus
- Immatriculée depuis moins d'un an au dépôt
- Fonds propres : idéalement 20 000–30 000 €, parfois 15 000 € en région

## Critères projet
- Innovation démontrée (technologique, d'usage, de procédé ou organisationnelle)
- Complexité de développement nécessitant une phase de maturation
- Durée ≤ 24 mois
- Fort potentiel de croissance et scalabilité
- Équipe dédiée avec compétences pertinentes

## Exclusions
- Personnes physiques, EI, EIRL
- Laboratoires publics, établissements publics
- Associations (sauf activité économique réelle)
- SCI, promotion immobilière, marchands de biens
- Intermédiation financière (hors Fintech)
- Entreprises en procédure collective
- Non à jour des obligations fiscales/sociales

## Dépenses éligibles — Frais externes
Conception/prototypage, études de marché/faisabilité, conseil/accompagnement, dépôts de brevet, formations techniques, prestations juridiques, frais de déplacement.

## Dépenses éligibles — Frais internes
Rémunérations équipe projet, frais généraux forfaitaires (20% des salaires), consommables, entretien matériel.

## Non éligible
Dépenses engagées avant le dépôt, communication, activité commerciale.

## Financement
- Plafond : 50 000 € (30 000 € en pratique)
- Taux : jusqu'à 70 %
- Sans sûreté ni caution
- Versement en 2 tranches : 70 % à la signature, 30 % sur justificatifs
- Justificatif de trésorerie et plan de trésorerie viable requis

## Processus de candidature (5 phases)
1. Dépôt en ligne sur app.bel.bpifrance.fr
2. Entretien téléphonique avec chargé d'affaires (30-60 min)
3. Étude du dossier par chargé d'affaires / pré-comité
4. Instruction en comité
5. Réponse officielle + versement des fonds

## Contenu du dossier
Pitch deck, business plan, plan de trésorerie 24 mois, fiche de présentation (6 pages), annexe financière, table de capitalisation.

## Critères d'évaluation (5 axes)
1. Équipe fondatrice (expérience, complémentarité)
2. Qualité du projet (innovation, proposition de valeur, marché)
3. Structuration (cohérence étapes, livrables, planning, budget)
4. Innovation vs concurrence (différenciation, rupture)
5. Impact global (bénéfices utilisateurs, sociétal/environnemental, emplois)

## Bonnes pratiques
- Présenter des verrous technologiques réels
- Valoriser équipe solide et complémentaire
- S'appuyer sur marqueurs de confiance (incubation, prêt d'honneur, partenariats, premiers clients)
- Alignement avec thématiques prioritaires Bpifrance (impact social/environnemental, industrie, santé, greentech)

## Pièges à éviter
- Timing prématuré (vision/objectifs/roadmap non clarifiés)
- Manque de transparence (surévaluation de l'innovation)
- Fragilité financière (trésorerie < 9 mois)
- Négligence relationnelle (soigner la relation chargé d'affaires)

## La différence décisive
Développer une relation de confiance avec le chargé d'affaires Bpifrance. C'est tout aussi important que la qualité du dossier.

## Spécificités régionales
- Île-de-France : incubateur référencé obligatoire
- Paris (75) : seul le FPI est accessible (jusqu'à 30 000 €), via 25 incubateurs labellisés
- Délégations moins sollicitées (zones rurales) = plus accessibles
- Grandes métropoles (Paris, Lyon, Lille, Marseille, Bordeaux, Grenoble) = plus compétitives

## Incubateurs FPI Paris
104factory, Agoranov, Bureau du design/mode/métiers d'arts, Incubateur CNAM, Créatis, Créative Valley, Paris Dauphine, EDHEC, L'Escalator, La Ruche, Liberté Living-Lab, MakeSense, Matrice, Paris&Co, Paris Biotech Santé, Pépinière 27, PULSE Montreuil, Sciences Po, Schoolab, SINGA, Télécom Paris, WACANO, Willa, PC'UP (ESPCI), Arts et Métiers.

## Exemples de projets financés
1. App IA itinéraires faible carbone : 30 000 € / 43 000 € total
2. Plateforme économie circulaire blockchain : 29 500 € / 42 000 € total
3. Solution rééducation réalité augmentée : 30 000 € / 53 000 € total

## BFTE (Bourse French Tech Émergence)
- Jusqu'à 90 000 €, pour projets deeptech issus de la recherche
- Finance jusqu'à 70 % (faisabilité, brevets, personnel, prestations)
- Proposée par le chargé d'affaires, non choisie par le porteur

## FAQ
- Entreprise doit être immatriculée pour déposer, mais contact possible avant
- Fonds propres = capital + réserves + bénéfices + report à nouveau
- Capital social : pas de seuil mais 500 € = signal négatif
- Incubateur obligatoire en IDF, recommandé ailleurs
- Seuls les frais futurs sont éligibles
- EI et auto-entrepreneurs non éligibles
- Tous secteurs éligibles si innovation démontrée
- Transfert techno éligible si critères remplis
- Déposer tôt dans l'année (enveloppes s'épuisent T3-T4)
- Moins d'un an = au dépôt complet, pas à la validation

## Contact
Expert en financement public des startups innovantes
LinkedIn : https://taap.it/M96y4a
`;

const SYSTEM_PROMPT = `Tu es un assistant expert sur la Bourse French Tech (BFT) et le financement de l'innovation en France. Tu travailles pour le site bourse-tech-explorer.lovable.app.

RÈGLES STRICTES :
1. Réponds UNIQUEMENT en français.
2. Réponds UNIQUEMENT sur des sujets liés à la Bourse French Tech, au Fonds Parisien pour l'Innovation (FPI), à la BFTE, et au financement de l'innovation par Bpifrance.
3. N'invente JAMAIS d'informations absentes du document source ci-dessous.
4. Sois concis et précis. Utilise des listes à puces quand c'est pertinent.
5. Si un visiteur te pose une question hors-scope, refuse poliment et redirige vers le sujet de la BFT.
6. Si le visiteur souhaite évaluer son éligibilité, pose les questions pertinentes sous forme de liste numérotée (une à la fois, pas toutes d'un coup).
7. Quand tu cites des montants ou des chiffres, sois exact par rapport au document source.

DOCUMENT SOURCE :
${KNOWLEDGE_BASE}`;

// Simple in-memory rate limiter by IP hash
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 30; // requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  entry.count++;
  return true;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limit by IP
    const clientIP =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ error: "Trop de requêtes. Veuillez réessayer plus tard." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages invalides." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Truncate history to last 10 messages to manage context window
    const truncatedMessages = messages.slice(-10);

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...truncatedMessages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requêtes atteinte. Veuillez réessayer plus tard." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporairement indisponible." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "Erreur du service IA." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
