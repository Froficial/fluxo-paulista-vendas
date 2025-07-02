import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { User, Mail, Phone, Calendar, MessageSquare, TrendingUp, Eye, Filter } from 'lucide-react';
import { toast } from 'sonner';

interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  company_name: string;
  lead_source: string;
  lead_status: string;
  lead_score: number;
  sequence_type: string;
  sequence_step: number;
  created_at: string;
  utm_source: string;
  utm_medium: string;
  tags: string[];
  notes: string;
}

interface Analytics {
  total_leads: number;
  leads_today: number;
  ebook_leads: number;
  webinar_leads: number;
  conversion_rate: number;
}

export const CRMDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchLeads();
    fetchAnalytics();
  }, [statusFilter, sourceFilter]);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('lead_status', statusFilter);
      }
      
      if (sourceFilter !== 'all') {
        query = query.eq('lead_source', sourceFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLeads(data || []);
    } catch (error: any) {
      toast.error('Erro ao carregar leads: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('id, created_at, lead_source, lead_status');

      if (error) throw error;

      const today = new Date().toISOString().split('T')[0];
      const total_leads = data?.length || 0;
      const leads_today = data?.filter(lead => 
        lead.created_at.startsWith(today)
      ).length || 0;
      const ebook_leads = data?.filter(lead => lead.lead_source === 'ebook').length || 0;
      const webinar_leads = data?.filter(lead => lead.lead_source === 'webinar').length || 0;
      const converted = data?.filter(lead => lead.lead_status === 'converted').length || 0;
      
      setAnalytics({
        total_leads,
        leads_today,
        ebook_leads,
        webinar_leads,
        conversion_rate: total_leads > 0 ? (converted / total_leads) * 100 : 0
      });
    } catch (error: any) {
      console.error('Erro ao carregar analytics:', error);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ 
          lead_status: newStatus,
          updated_at: new Date().toISOString() 
        })
        .eq('id', leadId);

      if (error) throw error;

      await supabase
        .from('lead_interactions')
        .insert({
          lead_id: leadId,
          interaction_type: 'status_changed',
          interaction_data: { new_status: newStatus }
        });

      toast.success('Status atualizado com sucesso!');
      fetchLeads();
    } catch (error: any) {
      toast.error('Erro ao atualizar status: ' + error.message);
    }
  };

  const addNote = async () => {
    if (!selectedLead || !newNote.trim()) return;

    try {
      const { error } = await supabase
        .from('leads')
        .update({ 
          notes: selectedLead.notes ? `${selectedLead.notes}\n\n[${new Date().toLocaleString()}] ${newNote}` : `[${new Date().toLocaleString()}] ${newNote}`,
          updated_at: new Date().toISOString() 
        })
        .eq('id', selectedLead.id);

      if (error) throw error;

      await supabase
        .from('lead_interactions')
        .insert({
          lead_id: selectedLead.id,
          interaction_type: 'note_added',
          interaction_data: { note: newNote }
        });

      setNewNote('');
      toast.success('Nota adicionada com sucesso!');
      fetchLeads();
    } catch (error: any) {
      toast.error('Erro ao adicionar nota: ' + error.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-purple-100 text-purple-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'ebook': return 'bg-orange-100 text-orange-800';
      case 'webinar': return 'bg-blue-100 text-blue-800';
      case 'diagnostic': return 'bg-purple-100 text-purple-800';
      case 'contact': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">CRM Dashboard</h1>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.total_leads}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads Hoje</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.leads_today}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">E-book</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.ebook_leads}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Webinar</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.webinar_leads}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversão</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.conversion_rate.toFixed(1)}%</div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="leads" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="detail">Detalhes do Lead</TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-4">
            {/* Filters */}
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filtros:</span>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="new">Novo</SelectItem>
                  <SelectItem value="contacted">Contatado</SelectItem>
                  <SelectItem value="qualified">Qualificado</SelectItem>
                  <SelectItem value="converted">Convertido</SelectItem>
                  <SelectItem value="lost">Perdido</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Origem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Origens</SelectItem>
                  <SelectItem value="ebook">E-book</SelectItem>
                  <SelectItem value="webinar">Webinar</SelectItem>
                  <SelectItem value="diagnostic">Diagnóstico</SelectItem>
                  <SelectItem value="contact">Contato</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Leads List */}
            <div className="grid gap-4">
              {leads.map((lead) => (
                <Card key={lead.id} className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedLead(lead)}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{lead.name}</h3>
                          <Badge className={getStatusColor(lead.lead_status)}>
                            {lead.lead_status}
                          </Badge>
                          <Badge className={getSourceColor(lead.lead_source)}>
                            {lead.lead_source}
                          </Badge>
                          {lead.lead_score > 0 && (
                            <Badge variant="outline">Score: {lead.lead_score}</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </span>
                          {lead.whatsapp && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {lead.whatsapp}
                            </span>
                          )}
                          {lead.company_name && (
                            <span>{lead.company_name}</span>
                          )}
                        </div>
                        {lead.utm_source && (
                          <div className="text-xs text-muted-foreground mt-1">
                            UTM: {lead.utm_source} / {lead.utm_medium}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Sequência: {lead.sequence_step || 0}/4
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="detail" className="space-y-4">
            {selectedLead ? (
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {selectedLead.name}
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(selectedLead.lead_status)}>
                          {selectedLead.lead_status}
                        </Badge>
                        <Badge className={getSourceColor(selectedLead.lead_source)}>
                          {selectedLead.lead_source}
                        </Badge>
                      </div>
                    </CardTitle>
                    <CardDescription>
                      Lead criado em {new Date(selectedLead.created_at).toLocaleString('pt-BR')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Email:</label>
                        <p>{selectedLead.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">WhatsApp:</label>
                        <p>{selectedLead.whatsapp || 'Não informado'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Empresa:</label>
                        <p>{selectedLead.company_name || 'Não informado'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Score:</label>
                        <p>{selectedLead.lead_score}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Status:</label>
                      <Select 
                        value={selectedLead.lead_status} 
                        onValueChange={(value) => updateLeadStatus(selectedLead.id, value)}
                      >
                        <SelectTrigger className="w-48 mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Novo</SelectItem>
                          <SelectItem value="contacted">Contatado</SelectItem>
                          <SelectItem value="qualified">Qualificado</SelectItem>
                          <SelectItem value="converted">Convertido</SelectItem>
                          <SelectItem value="lost">Perdido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedLead.notes && (
                      <div>
                        <label className="text-sm font-medium">Notas:</label>
                        <div className="mt-1 p-3 bg-muted rounded-md text-sm whitespace-pre-wrap">
                          {selectedLead.notes}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium">Adicionar Nota:</label>
                      <div className="flex gap-2 mt-1">
                        <Textarea
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          placeholder="Digite uma nota..."
                          className="flex-1"
                        />
                        <Button onClick={addNote} disabled={!newNote.trim()}>
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Selecione um lead na aba "Leads" para ver os detalhes
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};