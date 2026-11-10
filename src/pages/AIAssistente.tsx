import { useEffect, useMemo, useState } from "react";
import { AlertCircle, ArrowLeft, Bot, Building2, CheckCircle2, Clock3, Copy, Loader2, RefreshCw, Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

type Lead = {
  id: string;
  name: string;
  email: string;
  company_name: string | null;
  lead_source: string;
  lead_status: string;
  lead_score: number | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

type LeadAnalysis = {
  priority: "alta" | "media" | "baixa";
  intent: "alta" | "media" | "baixa";
  urgency: "alta" | "media" | "baixa";
  summary: string;
  reasons: string[];
  next_action: string;
  draft_message: string;
  confidence: number;
};

const priorityStyles: Record<LeadAnalysis["priority"], string> = {
  alta: "border-red-200 bg-red-50 text-red-800",
  media: "border-amber-200 bg-amber-50 text-amber-800",
  baixa: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

const readableSource = (source: string) => ({
  ebook: "E-book",
  webinar: "Webinar",
  diagnostic: "Diagnóstico",
  contact: "Contato",
}[source] ?? source);

export function AIAssistente() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [analysis, setAnalysis] = useState<LeadAnalysis | null>(null);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [loadError, setLoadError] = useState("");

  const selectedLead = useMemo(() => leads.find((lead) => lead.id === selectedId), [leads, selectedId]);

  const loadLeads = async () => {
    setLoadingLeads(true);
    setLoadError("");
    const { data, error } = await supabase
      .from("leads")
      .select("id, name, email, company_name, lead_source, lead_status, lead_score, metadata, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      setLoadError(error.message);
      setLeads([]);
    } else {
      setLeads((data ?? []) as Lead[]);
      setSelectedId((current) => current || data?.[0]?.id || "");
    }
    setLoadingLeads(false);
  };

  useEffect(() => {
    void loadLeads();
  }, []);

  useEffect(() => {
    setAnalysis(null);
  }, [selectedId]);

  const analyzeLead = async () => {
    if (!selectedLead) return;
    setAnalyzing(true);
    setAnalysis(null);

    // Only send business context to the model; name and email remain in the CRM.
    const metadata = selectedLead.metadata ?? {};
    const { data, error } = await supabase.functions.invoke("ai-lead-analysis", {
      body: {
        company_name: selectedLead.company_name,
        lead_source: selectedLead.lead_source,
        lead_status: selectedLead.lead_status,
        lead_score: selectedLead.lead_score,
        metadata: {
          industry: metadata.industry,
          company_size: metadata.company_size,
          average_score: metadata.average_score,
          digital_presence_score: metadata.digital_presence_score,
          marketing_strategy_score: metadata.marketing_strategy_score,
          customer_acquisition_score: metadata.customer_acquisition_score,
          data_analytics_score: metadata.data_analytics_score,
          challenges_goals: metadata.challenges_goals,
        },
      },
    });

    setAnalyzing(false);
    if (error) {
      toast.error(error.message.includes("FunctionsHttpError")
        ? "Não foi possível analisar. Verifique se a função está publicada, se a chave OpenAI foi configurada e se você está autenticado."
        : `Falha na análise: ${error.message}`);
      return;
    }
    if (!data?.analysis) {
      toast.error(data?.error ?? "A análise não retornou um resultado válido.");
      return;
    }
    setAnalysis(data.analysis as LeadAnalysis);
    toast.success("Análise concluída. Revise a sugestão antes de entrar em contato.");
  };

  const copyDraft = async () => {
    if (!analysis) return;
    await navigator.clipboard.writeText(analysis.draft_message);
    toast.success("Mensagem copiada.");
  };

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Button asChild variant="ghost" className="mb-2 -ml-3">
              <Link to="/crm"><ArrowLeft className="mr-2 h-4 w-4" />Voltar ao CRM</Link>
            </Button>
            <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
              <span className="rounded-xl bg-primary/10 p-2 text-primary"><Bot className="h-7 w-7" /></span>
              Assistente de leads com IA
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Priorize oportunidades e prepare o próximo contato com base nos dados comerciais disponíveis.
            </p>
          </div>
          <Button variant="outline" onClick={() => void loadLeads()} disabled={loadingLeads}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loadingLeads ? "animate-spin" : ""}`} />Atualizar leads
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" />Escolha uma oportunidade</CardTitle>
            <CardDescription>São carregados até 50 leads recentes do CRM. Dados pessoais não são enviados ao modelo de IA.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadError ? (
              <div role="alert" className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <div><p className="font-medium">Não foi possível carregar os leads.</p><p className="mt-1 text-muted-foreground">{loadError}. Confira a configuração do Supabase e as permissões de leitura da tabela leads.</p></div>
              </div>
            ) : loadingLeads ? (
              <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Carregando leads…</div>
            ) : leads.length === 0 ? (
              <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">Nenhum lead disponível. Cadastre um lead ou ajuste as permissões de acesso no Supabase.</div>
            ) : (
              <>
                <Select value={selectedId} onValueChange={setSelectedId}>
                  <SelectTrigger aria-label="Selecionar lead"><SelectValue placeholder="Selecione um lead" /></SelectTrigger>
                  <SelectContent>
                    {leads.map((lead) => <SelectItem key={lead.id} value={lead.id}>{lead.company_name || lead.name} · {readableSource(lead.lead_source)}</SelectItem>)}
                  </SelectContent>
                </Select>
                {selectedLead && (
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-lg bg-muted/60 p-4 text-sm">
                    <span className="flex items-center gap-2 font-medium"><Building2 className="h-4 w-4 text-muted-foreground" />{selectedLead.company_name || "Empresa não informada"}</span>
                    <span className="text-muted-foreground">Contato: {selectedLead.name}</span>
                    <Badge variant="outline">Origem: {readableSource(selectedLead.lead_source)}</Badge>
                    <Badge variant="outline">Status: {selectedLead.lead_status}</Badge>
                    {selectedLead.lead_score != null && <Badge variant="outline">Score atual: {selectedLead.lead_score}</Badge>}
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="h-3.5 w-3.5" />{new Date(selectedLead.created_at).toLocaleDateString("pt-BR")}</span>
                  </div>
                )}
                <Button onClick={() => void analyzeLead()} disabled={!selectedLead || analyzing}>
                  {analyzing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analisando…</> : <><Sparkles className="mr-2 h-4 w-4" />Analisar lead</>}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {analysis && (
          <section aria-live="polite" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div><CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" />Resumo comercial</CardTitle><CardDescription className="mt-1">Sugestão gerada por IA — valide antes de agir.</CardDescription></div>
                <Badge className={priorityStyles[analysis.priority]}>Prioridade {analysis.priority}</Badge>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="leading-relaxed">{analysis.summary}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[{ label: "Intenção", value: analysis.intent }, { label: "Urgência", value: analysis.urgency }, { label: "Confiança do modelo", value: `${analysis.confidence}%` }].map((item) => (
                    <div key={item.label} className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">{item.label}</p><p className="mt-1 font-semibold capitalize">{item.value}</p></div>
                  ))}
                </div>
                <div><h3 className="mb-2 font-semibold">Sinais considerados</h3><ul className="space-y-2">{analysis.reasons.map((reason, index) => <li key={`${index}-${reason}`} className="flex gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{reason}</li>)}</ul></div>
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4"><h3 className="font-semibold">Próxima ação sugerida</h3><p className="mt-1 text-sm leading-relaxed">{analysis.next_action}</p></div>
                <div className="space-y-2"><div className="flex items-center justify-between gap-3"><h3 className="font-semibold">Rascunho de mensagem</h3><Button variant="outline" size="sm" onClick={() => void copyDraft()}><Copy className="mr-2 h-4 w-4" />Copiar</Button></div><blockquote className="whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm leading-relaxed">{analysis.draft_message}</blockquote><p className="text-xs text-muted-foreground">A mensagem é apenas um rascunho. Revise e personalize antes de enviar.</p></div>
              </CardContent>
            </Card>
          </section>
        )}

        <p className="text-xs leading-relaxed text-muted-foreground">A IA pode cometer erros e não conhece informações que não estejam no cadastro. A prioridade é uma recomendação, não uma decisão automática; não há envio automático de mensagens.</p>
      </div>
    </main>
  );
}
