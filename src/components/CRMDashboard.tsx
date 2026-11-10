import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Bot, Calendar, Copy, Eye, Filter, Loader2, Mail, MessageSquare, Phone, Sparkles, TrendingUp, User, WandSparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

type Level = 'alta' | 'media' | 'baixa';
type LeadAnalysis = {
  priority: Level;
  intent: Level;
  urgency: Level;
  summary: string;
  reasons: string[];
  next_action: string;
  draft_message: string;
  confidence: number;
};
type Lead = {
  id: string;
  name: string;
  email: string;
  whatsapp: string | null;
  company_name: string | null;
  lead_source: string;
  lead_status: string;
  lead_score: number | null;
  sequence_type: string | null;
  sequence_step: number | null;
  created_at: string;
  utm_source: string | null;
  utm_medium: string | null;
  tags: string[] | null;
  notes: string | null;
  metadata: Record<string, unknown> | null;
};
type Analytics = { total_leads: number; leads_today: number; ebook_leads: number; webinar_leads: number; conversion_rate: number };

const levelStyles: Record<Level, string> = {
  alta: 'border-red-200 bg-red-50 text-red-800',
  media: 'border-amber-200 bg-amber-50 text-amber-800',
  baixa: 'border-emerald-200 bg-emerald-50 text-emerald-800',
};
const sourceNames: Record<string, string> = { ebook: 'E-book', webinar: 'Webinar', diagnostic: 'Diagnóstico', contact: 'Contato' };

export const CRMDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [analyses, setAnalyses] = useState<Record<string, LeadAnalysis>>({});
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);

  useEffect(() => { void fetchLeads(); void fetchAnalytics(); }, [statusFilter, sourceFilter]);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      let query = supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(100);
      if (statusFilter !== 'all') query = query.eq('lead_status', statusFilter);
      if (sourceFilter !== 'all') query = query.eq('lead_source', sourceFilter);
      const { data, error } = await query;
      if (error) throw error;
      const results = (data ?? []) as Lead[];
      setLeads(results);
      setSelectedLead((current) => current ? results.find((lead) => lead.id === current.id) ?? current : null);
    } catch (error) {
      toast.error(`Erro ao carregar leads: ${error instanceof Error ? error.message : 'erro desconhecido'}`);
    } finally { setIsLoading(false); }
  };

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase.from('leads').select('id, created_at, lead_source, lead_status');
      if (error) throw error;
      const rows = data ?? [];
      const today = new Date().toISOString().slice(0, 10);
      const total = rows.length;
      const converted = rows.filter((lead) => lead.lead_status === 'converted').length;
      setAnalytics({
        total_leads: total,
        leads_today: rows.filter((lead) => lead.created_at.startsWith(today)).length,
        ebook_leads: rows.filter((lead) => lead.lead_source === 'ebook').length,
        webinar_leads: rows.filter((lead) => lead.lead_source === 'webinar').length,
        conversion_rate: total ? converted / total * 100 : 0,
      });
    } catch (error) { console.error('Erro ao carregar analytics:', error); }
  };

  const analyzeLead = async (lead: Lead) => {
    setAnalyzingId(lead.id);
    try {
      // Enviar apenas contexto comercial; nome, e-mail e WhatsApp ficam no CRM.
      const metadata = lead.metadata ?? {};
      const { data, error } = await supabase.functions.invoke('ai-lead-analysis', {
        body: {
          company_name: lead.company_name,
          lead_source: lead.lead_source,
          lead_status: lead.lead_status,
          lead_score: lead.lead_score,
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
      if (error) throw error;
      if (!data?.analysis) throw new Error(data?.error ?? 'A IA não retornou uma análise válida.');
      setAnalyses((current) => ({ ...current, [lead.id]: data.analysis as LeadAnalysis }));
      setSelectedLead(lead);
      toast.success(`Resumo de IA pronto para ${lead.company_name || lead.name}.`);
    } catch (error) {
      toast.error(error instanceof Error && error.message.includes('FunctionsHttpError')
        ? 'Não foi possível analisar. Confira a publicação da função, a chave do provedor e sua sessão autenticada.'
        : `Falha na análise: ${error instanceof Error ? error.message : 'erro desconhecido'}`);
    } finally { setAnalyzingId(null); }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase.from('leads').update({ lead_status: newStatus, updated_at: new Date().toISOString() }).eq('id', leadId);
      if (error) throw error;
      await supabase.from('lead_interactions').insert({ lead_id: leadId, interaction_type: 'status_changed', interaction_data: { new_status: newStatus } });
      toast.success('Status atualizado com sucesso!');
      await fetchLeads(); await fetchAnalytics();
    } catch (error) { toast.error(`Erro ao atualizar status: ${error instanceof Error ? error.message : 'erro desconhecido'}`); }
  };

  const addNote = async () => {
    if (!selectedLead || !newNote.trim()) return;
    try {
      const note = `[${new Date().toLocaleString('pt-BR')}] ${newNote.trim()}`;
      const notes = selectedLead.notes ? `${selectedLead.notes}\n\n${note}` : note;
      const { error } = await supabase.from('leads').update({ notes, updated_at: new Date().toISOString() }).eq('id', selectedLead.id);
      if (error) throw error;
      await supabase.from('lead_interactions').insert({ lead_id: selectedLead.id, interaction_type: 'note_added', interaction_data: { note: newNote.trim() } });
      setNewNote(''); toast.success('Nota adicionada com sucesso!'); await fetchLeads();
    } catch (error) { toast.error(`Erro ao adicionar nota: ${error instanceof Error ? error.message : 'erro desconhecido'}`); }
  };

  const statusClass = (status: string) => ({ new: 'bg-blue-100 text-blue-800', contacted: 'bg-yellow-100 text-yellow-800', qualified: 'bg-purple-100 text-purple-800', converted: 'bg-green-100 text-green-800', lost: 'bg-red-100 text-red-800' }[status] ?? 'bg-gray-100 text-gray-800');
  const sourceClass = (source: string) => ({ ebook: 'bg-orange-100 text-orange-800', webinar: 'bg-blue-100 text-blue-800', diagnostic: 'bg-purple-100 text-purple-800', contact: 'bg-green-100 text-green-800' }[source] ?? 'bg-gray-100 text-gray-800');

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Carregando CRM" /></div>;

  return (
    <main className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div><h1 className="text-3xl font-bold">CRM de Vendas</h1><p className="mt-1 text-muted-foreground">Gerencie oportunidades e use IA como apoio à priorização comercial.</p></div>
          <Button asChild variant="outline"><Link to="/ai-assistant"><Bot className="mr-2 h-4 w-4" />Abrir Assistente IA</Link></Button>
        </header>

        {analytics && <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          {[
            { label: 'Total de Leads', value: analytics.total_leads, icon: User },
            { label: 'Leads Hoje', value: analytics.leads_today, icon: Calendar },
            { label: 'E-book', value: analytics.ebook_leads, icon: Mail },
            { label: 'Webinar', value: analytics.webinar_leads, icon: Eye },
            { label: 'Conversão', value: `${analytics.conversion_rate.toFixed(1)}%`, icon: TrendingUp },
          ].map(({ label, value, icon: Icon }) => <Card key={label}><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">{label}</CardTitle><Icon className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{value}</div></CardContent></Card>)}
        </div>}

        <Card className="overflow-hidden border-primary/20 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
          <CardContent className="flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
            <div className="flex gap-3"><div className="rounded-xl bg-primary/10 p-3 text-primary"><Sparkles className="h-6 w-6" /></div><div><h2 className="font-semibold">Priorização comercial com IA</h2><p className="mt-1 text-sm text-muted-foreground">Gere resumo, intenção, urgência e um próximo passo sugerido direto no cartão do lead.</p></div></div>
            <Button asChild><Link to="/ai-assistant"><WandSparkles className="mr-2 h-4 w-4" />Ver assistente completo</Link></Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="leads" className="w-full">
          <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="leads">Leads</TabsTrigger><TabsTrigger value="detail">Detalhes do Lead</TabsTrigger></TabsList>
          <TabsContent value="leads" className="space-y-4 pt-4">
            <div className="flex flex-wrap items-center gap-3"><div className="flex items-center gap-2"><Filter className="h-4 w-4" /><span className="text-sm font-medium">Filtros:</span></div>
              <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-48"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">Todos os Status</SelectItem><SelectItem value="new">Novo</SelectItem><SelectItem value="contacted">Contatado</SelectItem><SelectItem value="qualified">Qualificado</SelectItem><SelectItem value="converted">Convertido</SelectItem><SelectItem value="lost">Perdido</SelectItem></SelectContent></Select>
              <Select value={sourceFilter} onValueChange={setSourceFilter}><SelectTrigger className="w-48"><SelectValue placeholder="Origem" /></SelectTrigger><SelectContent><SelectItem value="all">Todas as Origens</SelectItem><SelectItem value="ebook">E-book</SelectItem><SelectItem value="webinar">Webinar</SelectItem><SelectItem value="diagnostic">Diagnóstico</SelectItem><SelectItem value="contact">Contato</SelectItem></SelectContent></Select>
            </div>
            {leads.length === 0 ? <Card><CardContent className="p-8 text-center text-muted-foreground">Nenhum lead encontrado para esses filtros.</CardContent></Card> : <div className="grid gap-4">
              {leads.map((lead) => {
                const analysis = analyses[lead.id]; const busy = analyzingId === lead.id;
                return <Card key={lead.id} className="transition-shadow hover:shadow-md">
                  <CardContent className="space-y-4 p-4">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                      <button type="button" className="min-w-0 flex-1 text-left" onClick={() => setSelectedLead(lead)} aria-label={`Ver detalhes de ${lead.name}`}>
                        <div className="mb-2 flex flex-wrap items-center gap-2"><h3 className="text-lg font-semibold">{lead.name}</h3><Badge className={statusClass(lead.lead_status)}>{lead.lead_status}</Badge><Badge className={sourceClass(lead.lead_source)}>{sourceNames[lead.lead_source] ?? lead.lead_source}</Badge>{lead.lead_score != null && lead.lead_score > 0 && <Badge variant="outline">Score: {lead.lead_score}</Badge>}</div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground"><span className="flex items-center gap-1"><Mail className="h-3 w-3" />{lead.email}</span>{lead.whatsapp && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{lead.whatsapp}</span>}{lead.company_name && <span>{lead.company_name}</span>}</div>
                        {lead.utm_source && <div className="mt-1 text-xs text-muted-foreground">UTM: {lead.utm_source} / {lead.utm_medium}</div>}
                      </button>
                      <div className="flex shrink-0 flex-col items-start gap-2 md:items-end"><span className="text-sm text-muted-foreground">{new Date(lead.created_at).toLocaleDateString('pt-BR')}</span><span className="text-xs text-muted-foreground">Sequência: {lead.sequence_step || 0}/4</span><Button size="sm" variant={analysis ? 'outline' : 'default'} disabled={busy} onClick={() => void analyzeLead(lead)}><Sparkles className="mr-2 h-4 w-4" />{busy ? 'Analisando…' : analysis ? 'Refazer resumo IA' : 'Gerar resumo IA'}</Button></div>
                    </div>
                    {busy && <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground" role="status"><Loader2 className="h-4 w-4 animate-spin" />Analisando dados comerciais…</div>}
                    {analysis && <div className="rounded-xl border border-primary/20 bg-primary/[0.03] p-4" aria-live="polite">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h4 className="flex items-center gap-2 font-semibold"><Bot className="h-4 w-4 text-primary" />Resumo IA</h4><Badge className={levelStyles[analysis.priority]}>Prioridade {analysis.priority}</Badge></div>
                      <p className="text-sm leading-relaxed">{analysis.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2"><Badge variant="outline">Intenção: {analysis.intent}</Badge><Badge variant="outline">Urgência: {analysis.urgency}</Badge><Badge variant="outline">Confiança: {analysis.confidence}%</Badge></div>
                      <div className="mt-3 rounded-lg bg-background p-3"><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Próxima ação sugerida</p><p className="mt-1 text-sm">{analysis.next_action}</p></div>
                      <details className="mt-3"><summary className="cursor-pointer text-sm font-medium text-primary">Ver sinais e rascunho de mensagem</summary><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">{analysis.reasons.map((reason, index) => <li key={`${index}-${reason}`}>{reason}</li>)}</ul><div className="mt-3 flex flex-wrap items-start justify-between gap-2"><p className="whitespace-pre-wrap rounded-lg bg-background p-3 text-sm">{analysis.draft_message}</p><Button size="sm" variant="outline" onClick={() => { void navigator.clipboard.writeText(analysis.draft_message).then(() => toast.success('Rascunho copiado.')).catch(() => toast.error('Não foi possível copiar o rascunho.')); }}><Copy className="mr-2 h-4 w-4" />Copiar rascunho</Button></div></details>
                      <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground"><AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />Sugestão de IA, não decisão automática. Revise antes de entrar em contato; nenhuma mensagem é enviada automaticamente.</p>
                    </div>}
                  </CardContent>
                </Card>;
              })}
            </div>}
          </TabsContent>

          <TabsContent value="detail" className="space-y-4 pt-4">
            {selectedLead ? <div className="grid gap-6">
              <Card><CardHeader><CardTitle className="flex flex-wrap items-center justify-between gap-3">{selectedLead.name}<div className="flex gap-2"><Badge className={statusClass(selectedLead.lead_status)}>{selectedLead.lead_status}</Badge><Badge className={sourceClass(selectedLead.lead_source)}>{sourceNames[selectedLead.lead_source] ?? selectedLead.lead_source}</Badge></div></CardTitle><CardDescription>Lead criado em {new Date(selectedLead.created_at).toLocaleString('pt-BR')}</CardDescription></CardHeader>
                <CardContent className="space-y-5"><div className="grid gap-4 sm:grid-cols-2"><div><label className="text-sm font-medium">E-mail</label><p>{selectedLead.email}</p></div><div><label className="text-sm font-medium">WhatsApp</label><p>{selectedLead.whatsapp || 'Não informado'}</p></div><div><label className="text-sm font-medium">Empresa</label><p>{selectedLead.company_name || 'Não informado'}</p></div><div><label className="text-sm font-medium">Score atual</label><p>{selectedLead.lead_score ?? 0}</p></div></div>
                  <div><label className="text-sm font-medium">Status</label><Select value={selectedLead.lead_status} onValueChange={(value) => void updateLeadStatus(selectedLead.id, value)}><SelectTrigger className="mt-1 w-48"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="new">Novo</SelectItem><SelectItem value="contacted">Contatado</SelectItem><SelectItem value="qualified">Qualificado</SelectItem><SelectItem value="converted">Convertido</SelectItem><SelectItem value="lost">Perdido</SelectItem></SelectContent></Select></div>
                  <div><div className="mb-2 flex flex-wrap items-center justify-between gap-2"><label className="text-sm font-medium">Resumo IA do lead</label><Button size="sm" disabled={analyzingId === selectedLead.id} onClick={() => void analyzeLead(selectedLead)}><Sparkles className="mr-2 h-4 w-4" />{analyzingId === selectedLead.id ? 'Analisando…' : analyses[selectedLead.id] ? 'Atualizar resumo IA' : 'Gerar resumo IA'}</Button></div>{analyses[selectedLead.id] ? <div className="space-y-3 rounded-lg border border-primary/20 bg-primary/[0.03] p-4"><div className="flex flex-wrap gap-2"><Badge className={levelStyles[analyses[selectedLead.id].priority]}>Prioridade {analyses[selectedLead.id].priority}</Badge><Badge variant="outline">Intenção: {analyses[selectedLead.id].intent}</Badge><Badge variant="outline">Urgência: {analyses[selectedLead.id].urgency}</Badge></div><p className="text-sm">{analyses[selectedLead.id].summary}</p><p className="text-sm"><strong>Próxima ação:</strong> {analyses[selectedLead.id].next_action}</p></div> : <p className="text-sm text-muted-foreground">Gere uma análise para ver prioridade, sinais e próximo passo sugerido.</p>}</div>
                  {selectedLead.notes && <div><label className="text-sm font-medium">Notas</label><div className="mt-1 whitespace-pre-wrap rounded-md bg-muted p-3 text-sm">{selectedLead.notes}</div></div>}
                  <div><label className="text-sm font-medium">Adicionar nota</label><div className="mt-1 flex flex-col gap-2 sm:flex-row"><Textarea value={newNote} onChange={(event) => setNewNote(event.target.value)} placeholder="Digite uma nota…" className="flex-1" /><Button onClick={() => void addNote()} disabled={!newNote.trim()}><MessageSquare className="mr-1 h-4 w-4" />Adicionar</Button></div></div>
                </CardContent>
              </Card>
            </div> : <Card><CardContent className="p-8 text-center text-muted-foreground">Selecione um lead na aba “Leads” para ver os detalhes.</CardContent></Card>}
          </TabsContent>
        </Tabs>
        <p className="text-xs text-muted-foreground">A análise é exibida nesta sessão e não altera automaticamente os dados do lead. A IA pode errar; confira as recomendações antes de agir.</p>
      </div>
    </main>
  );
};
