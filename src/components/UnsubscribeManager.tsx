import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CheckCircle, Mail, AlertCircle } from 'lucide-react';

export const UnsubscribeManager = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [preferences, setPreferences] = useState({
    marketing: true,
    product_updates: true,
    educational: true
  });

  const leadId = searchParams.get('id');
  const emailParam = searchParams.get('email');

  useEffect(() => {
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [emailParam]);

  const handleUnsubscribe = async (completeUnsubscribe = false) => {
    if (!email) {
      toast.error('Email é obrigatório');
      return;
    }

    setIsProcessing(true);

    try {
      if (completeUnsubscribe) {
        // Unsubscribe completo - marcar como não ativo
        const { error } = await supabase
          .from('leads')
          .update({
            sequence_completed: true,
            next_email_date: null,
            metadata: {
              unsubscribed: true,
              unsubscribed_at: new Date().toISOString(),
              unsubscribe_reason: 'user_request'
            }
          })
          .eq('email', email);

        if (error) throw error;

        // Log da interação
        const { data: leadData } = await supabase
          .from('leads')
          .select('id')
          .eq('email', email)
          .single();

        if (leadData) {
          await supabase
            .from('lead_interactions')
            .insert({
              lead_id: leadData.id,
              interaction_type: 'unsubscribed',
              interaction_data: {
                type: 'complete_unsubscribe',
                email: email
              }
            });
        }

        toast.success('Você foi removido de todas as listas com sucesso!');
      } else {
        // Atualizar preferências específicas
        const { error } = await supabase
          .from('leads')
          .update({
            metadata: {
              email_preferences: preferences,
              preferences_updated_at: new Date().toISOString()
            }
          })
          .eq('email', email);

        if (error) throw error;

        toast.success('Suas preferências foram atualizadas!');
      }

      setIsSuccess(true);
    } catch (error: any) {
      console.error('Error updating subscription:', error);
      toast.error('Erro ao processar solicitação: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">✅ Processado com Sucesso</h1>
            <p className="text-muted-foreground mb-6">
              Suas preferências de email foram atualizadas conforme solicitado.
            </p>
            <p className="text-sm text-muted-foreground">
              Se você mudou de ideia, pode sempre se inscrever novamente em nosso site.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle className="flex items-center text-center">
            <Mail className="w-6 h-6 mr-2" />
            Gerenciar Inscrição de Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Antes de cancelar...</p>
                <p>Você pode escolher receber apenas os emails que realmente interessam. Veja as opções abaixo.</p>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="email">Seu email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Escolha o que deseja receber:</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="educational"
                  checked={preferences.educational}
                  onCheckedChange={(checked) => 
                    setPreferences({ ...preferences, educational: !!checked })
                  }
                />
                <Label htmlFor="educational" className="text-sm">
                  📚 Conteúdo educacional (E-books, dicas de crescimento)
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="product_updates"
                  checked={preferences.product_updates}
                  onCheckedChange={(checked) => 
                    setPreferences({ ...preferences, product_updates: !!checked })
                  }
                />
                <Label htmlFor="product_updates" className="text-sm">
                  🚀 Atualizações de produtos e novidades
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketing"
                  checked={preferences.marketing}
                  onCheckedChange={(checked) => 
                    setPreferences({ ...preferences, marketing: !!checked })
                  }
                />
                <Label htmlFor="marketing" className="text-sm">
                  📧 Convites para webinars e eventos exclusivos
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => handleUnsubscribe(false)}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? "Atualizando..." : "Atualizar Preferências"}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleUnsubscribe(true)}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? "Processando..." : "Cancelar TODOS os emails"}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            <p>Respeitamos sua privacidade. Seus dados são protegidos conforme nossa política de privacidade.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};