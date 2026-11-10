import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("APP_ORIGIN") ?? "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const levels = ["alta", "media", "baixa"] as const;

type Analysis = {
  priority: (typeof levels)[number];
  intent: (typeof levels)[number];
  urgency: (typeof levels)[number];
  summary: string;
  reasons: string[];
  next_action: string;
  draft_message: string;
  confidence: number;
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function isText(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.length <= maxLength;
}

function validateAnalysis(value: unknown): value is Analysis {
  if (!value || typeof value !== "object") return false;
  const result = value as Record<string, unknown>;
  return levels.includes(result.priority as (typeof levels)[number])
    && levels.includes(result.intent as (typeof levels)[number])
    && levels.includes(result.urgency as (typeof levels)[number])
    && isText(result.summary, 1200)
    && Array.isArray(result.reasons)
    && result.reasons.length <= 5
    && result.reasons.every((reason) => isText(reason, 240))
    && isText(result.next_action, 600)
    && isText(result.draft_message, 1200)
    && typeof result.confidence === "number"
    && result.confidence >= 0
    && result.confidence <= 100;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Método não permitido." }, 405);

  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return jsonResponse({ error: "Autenticação necessária." }, 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const openAiKey = Deno.env.get("OPENAI_API_KEY");
  if (!supabaseUrl || !anonKey || !openAiKey) {
    console.error("Missing required function secrets.");
    return jsonResponse({ error: "A função ainda não está configurada. Defina OPENAI_API_KEY nos secrets do Supabase." }, 503);
  }

  const authClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: { user }, error: authError } = await authClient.auth.getUser();
  if (authError || !user) return jsonResponse({ error: "Sessão inválida ou expirada. Entre novamente para continuar." }, 401);

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "Corpo da solicitação inválido." }, 400);
  }

  const metadata = payload.metadata && typeof payload.metadata === "object"
    ? payload.metadata as Record<string, unknown>
    : {};
  const challenge = metadata.challenges_goals;
  const businessContext = {
    company_name: isText(payload.company_name, 120) ? payload.company_name : "Não informado",
    lead_source: isText(payload.lead_source, 40) ? payload.lead_source : "unknown",
    lead_status: isText(payload.lead_status, 40) ? payload.lead_status : "new",
    lead_score: typeof payload.lead_score === "number" ? Math.max(0, Math.min(100, payload.lead_score)) : null,
    industry: isText(metadata.industry, 80) ? metadata.industry : "Não informado",
    company_size: isText(metadata.company_size, 80) ? metadata.company_size : "Não informado",
    average_score: typeof metadata.average_score === "number" ? Math.max(1, Math.min(10, metadata.average_score)) : null,
    digital_presence_score: typeof metadata.digital_presence_score === "number" ? Math.max(1, Math.min(10, metadata.digital_presence_score)) : null,
    marketing_strategy_score: typeof metadata.marketing_strategy_score === "number" ? Math.max(1, Math.min(10, metadata.marketing_strategy_score)) : null,
    customer_acquisition_score: typeof metadata.customer_acquisition_score === "number" ? Math.max(1, Math.min(10, metadata.customer_acquisition_score)) : null,
    data_analytics_score: typeof metadata.data_analytics_score === "number" ? Math.max(1, Math.min(10, metadata.data_analytics_score)) : null,
    challenges_goals: isText(challenge, 1200) ? challenge : "Não informado",
  };

  try {
    const model = Deno.env.get("OPENAI_MODEL") ?? "gpt-4o-mini";
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${openAiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: "Você é um assistente de operações comerciais B2B. Analise somente os dados fornecidos. Não invente fatos, resultados ou necessidades; quando faltarem dados, deixe explícita a incerteza e recomende uma pergunta de descoberta. Priorize critérios comerciais, nunca características sensíveis. Produza uma resposta em português brasileiro, concisa e útil para um vendedor humano. Retorne somente JSON com priority, intent e urgency (cada um: alta, media ou baixa), summary (string), reasons (array de até 5 strings), next_action (string), draft_message (string) e confidence (número de 0 a 100). A mensagem é um rascunho, sem promessa ou desconto não autorizado.",
          },
          { role: "user", content: `Analise este contexto comercial sem dados pessoais de contato:\n${JSON.stringify(businessContext)}` },
        ],
      }),
    });

    if (!completion.ok) {
      const details = await completion.text();
      console.error("AI provider returned an error:", completion.status, details.slice(0, 500));
      return jsonResponse({ error: completion.status === 429 ? "Limite de uso da IA atingido. Tente novamente mais tarde." : "O provedor de IA não conseguiu concluir a análise." }, 502);
    }

    const result = await completion.json();
    const content = result.choices?.[0]?.message?.content;
    if (typeof content !== "string") throw new Error("Empty model response");
    const analysis: unknown = JSON.parse(content);
    if (!validateAnalysis(analysis)) throw new Error("Invalid model response schema");
    return jsonResponse({ analysis });
  } catch (error) {
    console.error("Lead analysis failed:", error instanceof Error ? error.message : "Unknown error");
    return jsonResponse({ error: "Não foi possível gerar uma análise válida. Tente novamente." }, 502);
  }
});
