import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Trash2, Edit, Plus } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  sequence_type: string;
  step_number: number;
  delay_days: number;
  subject: string;
  html_content: string;
  is_active: boolean;
}

export const EmailTemplateManager = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    sequence_type: 'ebook',
    step_number: 1,
    delay_days: 1,
    subject: '',
    html_content: '',
    is_active: true
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('sequence_type, step_number');

      if (error) throw error;
      setTemplates(data || []);
    } catch (error: any) {
      toast.error('Erro ao carregar templates: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingTemplate) {
        const { error } = await supabase
          .from('email_templates')
          .update(formData)
          .eq('id', editingTemplate.id);

        if (error) throw error;
        toast.success('Template atualizado com sucesso!');
      } else {
        const { error } = await supabase
          .from('email_templates')
          .insert([formData]);

        if (error) throw error;
        toast.success('Template criado com sucesso!');
      }

      fetchTemplates();
      resetForm();
    } catch (error: any) {
      toast.error('Erro ao salvar template: ' + error.message);
    }
  };

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      sequence_type: template.sequence_type,
      step_number: template.step_number,
      delay_days: template.delay_days,
      subject: template.subject,
      html_content: template.html_content,
      is_active: template.is_active
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este template?')) return;

    try {
      const { error } = await supabase
        .from('email_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Template excluído com sucesso!');
      fetchTemplates();
    } catch (error: any) {
      toast.error('Erro ao excluir template: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      sequence_type: 'ebook',
      step_number: 1,
      delay_days: 1,
      subject: '',
      html_content: '',
      is_active: true
    });
    setEditingTemplate(null);
    setIsCreating(false);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Carregando templates...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Templates de Email</h2>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Template
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingTemplate ? 'Editar Template' : 'Criar Novo Template'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome do Template</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Ebook Welcome"
                />
              </div>
              <div>
                <Label htmlFor="sequence_type">Tipo de Sequência</Label>
                <Select value={formData.sequence_type} onValueChange={(value) => setFormData({ ...formData, sequence_type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ebook">E-book</SelectItem>
                    <SelectItem value="webinar">Webinar</SelectItem>
                    <SelectItem value="diagnostic">Diagnóstico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="step_number">Número do Step</Label>
                <Input
                  id="step_number"
                  type="number"
                  min="1"
                  value={formData.step_number}
                  onChange={(e) => setFormData({ ...formData, step_number: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div>
                <Label htmlFor="delay_days">Delay (dias)</Label>
                <Input
                  id="delay_days"
                  type="number"
                  min="0"
                  value={formData.delay_days}
                  onChange={(e) => setFormData({ ...formData, delay_days: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Ativo</Label>
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Assunto do Email</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="🎁 Seu E-book: Os 7 Segredos..."
              />
            </div>

            <div>
              <Label htmlFor="html_content">Conteúdo HTML</Label>
              <Textarea
                id="html_content"
                value={formData.html_content}
                onChange={(e) => setFormData({ ...formData, html_content: e.target.value })}
                placeholder="HTML do template... Use {{name}} para personalizar"
                rows={10}
                className="font-mono text-sm"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>
                {editingTemplate ? 'Atualizar' : 'Criar'} Template
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {template.name}
                    <Badge variant={template.is_active ? 'default' : 'secondary'}>
                      {template.is_active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {template.sequence_type} - Step {template.step_number} (Delay: {template.delay_days} dias)
                  </p>
                  <p className="text-sm font-medium mt-1">{template.subject}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(template)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(template.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {templates.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">Nenhum template encontrado.</p>
            <Button className="mt-4" onClick={() => setIsCreating(true)}>
              Criar Primeiro Template
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};