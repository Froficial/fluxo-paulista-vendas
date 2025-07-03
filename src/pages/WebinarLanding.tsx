import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWebinarSubmit } from '@/hooks/useWebinarSubmit';
import { SEOHead } from '@/components/SEOHead';
import { CheckCircle, Video, TrendingUp, Users, Clock, ArrowRight, Star, Gift } from 'lucide-react';

export default function WebinarLanding() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company_name: ''
  });
  
  const { submitWebinar, isSubmitting, showSuccess } = useWebinarSubmit();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track conversion event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/WEBINAR_LABEL',
        value: 2.0,
        currency: 'BRL'
      });
    }
    
    await submitWebinar(formData);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary-glow to-accent flex items-center justify-center p-4">
        <SEOHead 
          title="Inscrição Confirmada - Webinar StrateUp"
          description="Sua vaga no webinar está garantida! Prepare-se para descobrir como escalar sua empresa."
        />
        <Card className="max-w-lg w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">🎉 Vaga Confirmada!</h1>
            <p className="text-muted-foreground mb-6">
              Você está inscrito no webinar "Como Escalar de R$ 100k para R$ 1M em 12 Meses"
            </p>
            <div className="bg-gradient-to-r from-secondary/10 to-accent/10 p-4 rounded-lg mb-6">
              <h3 className="font-bold mb-2">📅 Detalhes do Webinar:</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Data:</strong> Próxima quinta-feira às 20h</p>
                <p><strong>Duração:</strong> 90 minutos + Q&A</p>
                <p><strong>Plataforma:</strong> Zoom (link será enviado)</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✅ Confirmação enviada por email</p>
              <p>✅ Lembretes automáticos ativados</p>
              <p>✅ Bônus exclusivos incluídos</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-glow to-accent">
      <SEOHead 
        title="Webinar Gratuito: Como Escalar de R$ 100k para R$ 1M em 12 Meses - StrateUp"
        description="Participe do webinar exclusivo e descubra o método usado por +500 empresas para crescer rapidamente."
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-red-500 text-white hover:bg-red-600 animate-pulse">
              🔴 AO VIVO - Próxima quinta às 20h
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Como Escalar sua Empresa de 
              <span className="text-secondary"> R$ 100k para R$ 1M</span> em 12 Meses
            </h1>
            <p className="text-xl text-white/90 mb-6">
              O método EXATO usado por +500 empresas que cresceram <strong>300%+ rapidamente</strong>
            </p>
            <div className="flex justify-center items-center space-x-6 text-white/80 text-sm">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>90 min + Q&A</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>Limitado a 200 vagas</span>
              </div>
              <div className="flex items-center">
                <Video className="w-4 h-4 mr-2" />
                <span>100% Online</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulário */}
            <div className="lg:col-span-1">
              <Card className="shadow-2xl sticky top-8">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold mb-2">🎯 Garanta Sua Vaga GRÁTIS</h2>
                    <p className="text-sm text-muted-foreground">Restam apenas 47 vagas</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="h-11"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Seu melhor email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="h-11"
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Nome da sua empresa (opcional)"
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                        className="h-11"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-12 text-lg font-bold bg-red-500 hover:bg-red-600"
                    >
                      {isSubmitting ? (
                        "Confirmando..."
                      ) : (
                        <>
                          <Video className="w-5 h-5 mr-2" />
                          QUERO MINHA VAGA GRÁTIS
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 space-y-2 text-xs text-muted-foreground">
                    <p className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                      Confirmação instantânea por email
                    </p>
                    <p className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                      Link do Zoom enviado 1h antes
                    </p>
                    <p className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                      Bônus exclusivos incluídos
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Conteúdo */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">🚀 O que você vai aprender:</h3>
                  <div className="space-y-4 text-white/90">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-bold">O Mindset dos R$ 1M</h4>
                        <p className="text-sm">Como CEOs milionários pensam diferente e tomam decisões que geram resultados exponenciais</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Framework dos 4 Pilares</h4>
                        <p className="text-sm">O sistema exato usado por empresas que saíram de R$ 100k para R$ 1M+ em menos de 12 meses</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Case Prático AO VIVO</h4>
                        <p className="text-sm">Vou mostrar tela a tela como uma empresa real implementou e cresceu R$ 50k → R$ 800k/mês</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-white font-bold text-sm">4</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Plano de Implementação</h4>
                        <p className="text-sm">O roadmap completo para aplicar na SUA empresa nas próximas 90 dias</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Gift className="w-6 h-6 text-yellow-400 mr-2" />
                    <h3 className="text-xl font-bold text-white">Bônus Exclusivos (Valor R$ 1.497)</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-white/90">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="font-semibold">Planilha de Projeção de Crescimento (R$ 297)</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="font-semibold">Template de Funil de Vendas (R$ 497)</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="font-semibold">Checklist dos 50 KPIs (R$ 197)</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="font-semibold">Q&A Exclusivo pós-webinar (R$ 506)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-secondary">500+</div>
                    <div className="text-sm text-white/80">Empresas transformadas</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-secondary">R$ 50M+</div>
                    <div className="text-sm text-white/80">Em faturamento gerado</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-secondary">92%</div>
                    <div className="text-sm text-white/80">Taxa de satisfação</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Urgência */}
          <div className="mt-8 text-center">
            <Card className="bg-red-500/20 border-red-500/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">⚠️ ATENÇÃO: Vagas Limitadas</h3>
                <p className="text-white/90">
                  Por questões de qualidade, limitamos a apenas 200 participantes. 
                  <strong> Restam apenas 47 vagas!</strong>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}