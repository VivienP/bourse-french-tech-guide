import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface Message {
  role: "user" | "assistant";
  content: string;
}

const RESEND_API_URL = "https://api.resend.com/emails";
const FROM_EMAIL = "BFT Éligibilité <onboarding@resend.dev>";
const RECIPIENTS = ["vivienperrelle@gmail.com", "ademuynck@odaliaconseil.com"];
const SANDBOX_ALLOWED_RECIPIENT = "vivienperrelle@gmail.com";

async function sendResendEmail({
  apiKey,
  to,
  subject,
  html,
}: {
  apiKey: string;
  to: string[];
  subject: string;
  html: string;
}) {
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    }),
  });

  const text = await response.text();

  return {
    ok: response.ok,
    status: response.status,
    text,
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { conversation, score, contactEmail, contactPhone } = await req.json() as {
      conversation: Message[];
      score: number;
      contactEmail?: string;
      contactPhone?: string;
    };

    if (!Array.isArray(conversation)) {
      return new Response(JSON.stringify({ error: "Payload invalide." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate score is a finite number in [0, 5]
    if (typeof score !== "number" || !isFinite(score) || score < 0 || score > 5) {
      return new Response(JSON.stringify({ error: "Score invalide." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const escapeHtml = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

    // Build plain-text transcript
    const transcript = conversation
      .map((m) => `[${m.role === "user" ? "Utilisateur" : "Assistant"}]\n${m.content}`)
      .join("\n\n---\n\n");

    const scoreLabel = score >= 2.5
      ? `✅ ÉLIGIBLE (score : ${score}/5)`
      : `❌ NON ÉLIGIBLE (score : ${score}/5)`;

    const contactInfo = (contactEmail || contactPhone)
      ? `<h3>Coordonnées du prospect</h3>
<p><strong>Email :</strong> ${escapeHtml(contactEmail || 'Non renseigné')}</p>
<p><strong>Téléphone :</strong> ${escapeHtml(contactPhone || 'Non renseigné')}</p>
<hr/>`
      : '';

    const html = `
<h2>Nouvelle évaluation d'éligibilité BFT</h2>
<p><strong>Résultat :</strong> ${scoreLabel}</p>
<hr/>
${contactInfo}
<h3>Conversation complète</h3>
<pre style="font-family: monospace; white-space: pre-wrap; background: #f5f5f5; padding: 16px; border-radius: 4px;">${escapeHtml(transcript)}</pre>
`;

    const subject = `[BFT] Évaluation éligibilité — ${scoreLabel}`;
    const initialSend = await sendResendEmail({
      apiKey: RESEND_API_KEY,
      to: RECIPIENTS,
      subject,
      html,
    });

    if (!initialSend.ok) {
      const isSandboxRestriction =
        initialSend.status === 403 &&
        initialSend.text.includes(
          "You can only send testing emails to your own email address",
        );

      if (isSandboxRestriction) {
        const sandboxHtml = `${html}
<p><em>Note automatique : en mode sandbox email, seul ${escapeHtml(SANDBOX_ALLOWED_RECIPIENT)} peut recevoir ce message tant qu'un domaine d'envoi n'est pas vérifié.</em></p>`;

        const fallbackSend = await sendResendEmail({
          apiKey: RESEND_API_KEY,
          to: [SANDBOX_ALLOWED_RECIPIENT],
          subject,
          html: sandboxHtml,
        });

        if (!fallbackSend.ok) {
          console.error("Resend fallback error:", fallbackSend.status, fallbackSend.text);
          return new Response(JSON.stringify({ error: "Échec d'envoi du mail." }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        console.warn(
          "Resend sandbox fallback applied: secondary recipients skipped until a sending domain is verified.",
        );

        return new Response(JSON.stringify({ success: true, sandboxFallback: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      console.error("Resend error:", initialSend.status, initialSend.text);
      return new Response(JSON.stringify({ error: "Échec d'envoi du mail." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-email error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
