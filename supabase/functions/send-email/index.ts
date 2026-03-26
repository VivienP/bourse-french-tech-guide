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
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Build plain-text transcript
    const transcript = conversation
      .map((m) => `[${m.role === "user" ? "Utilisateur" : "Assistant"}]\n${m.content}`)
      .join("\n\n---\n\n");

    const scoreLabel = score >= 2.5
      ? `✅ ÉLIGIBLE (score : ${score}/5)`
      : `❌ NON ÉLIGIBLE (score : ${score}/5)`;

    const html = `
<h2>Nouvelle évaluation d'éligibilité BFT</h2>
<p><strong>Résultat :</strong> ${scoreLabel}</p>
<hr/>
<h3>Conversation complète</h3>
<pre style="font-family: monospace; white-space: pre-wrap; background: #f5f5f5; padding: 16px; border-radius: 4px;">${escapeHtml(transcript)}</pre>
`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "BFT Éligibilité <onboarding@resend.dev>",
        to: ["vivien.perrelle@gmail.com"],
        subject: `[BFT] Évaluation éligibilité — ${scoreLabel}`,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Resend error:", res.status, text);
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
