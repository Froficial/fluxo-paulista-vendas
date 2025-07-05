import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEbookSubmit } from '@/hooks/useEbookSubmit';
import { SEOHead } from '@/components/SEOHead';
import { CheckCircle, Download, TrendingUp, Users, Clock, ArrowRight } from 'lucide-react';

export default function EbookLanding() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });
  
  const { submitEbook, isSubmitting } = useEbookSubmit();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track conversion event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
        value: 1.0,
        currency: 'BRL'
      });
    }
    
    const result = await submitEbook(formData);
    if (result.success) {
      setShowSuccess(true);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary-glow to-accent flex items-center justify-center p-4">
        <SEOHead 
          title="E-book Enviado - StrateUp"
          description="Obrigado! Seu e-book foi enviado com sucesso."
        />
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">🎉 E-book Enviado!</h1>
            <p className="text-muted-foreground mb-6">
              Verifique seu email. O e-book com os 7 segredos chegou!
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✅ E-book enviado por email</p>
              <p>✅ Sequência de dicas exclusivas ativada</p>
              <p>✅ Convite para análise gratuita incluído</p>
            </div>
            
            <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h3 className="font-bold text-accent mb-2">🎁 Oferta Especial para Você!</h3>
              <p className="text-sm mb-3">Como você baixou nosso e-book, tem direito a uma oferta exclusiva...</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-accent text-accent hover:bg-accent hover:text-white"
                onClick={() => window.open('/tripwire', '_blank')}
              >
                Ver Oferta Especial (67% OFF)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-glow to-accent">
      <SEOHead 
        title="E-book Gratuito: 7 Segredos para Destravar o Crescimento - StrateUp"
        description="Baixe gratuitamente o e-book com os 7 segredos para transformar sua empresa em uma máquina de crescimento previsível."
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header com Social Proof */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              📈 +500 empresas já baixaram
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Os 7 Segredos para 
              <span className="text-secondary"> Destravar</span> o 
              Crescimento da Sua Empresa
            </h1>
            <p className="text-xl text-white/90 mb-6">
              O framework EXATO usado por empresas que crescem <strong>300%+</strong> em 12 meses
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Formulário */}
            <Card className="shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">📚 Baixe GRÁTIS Agora</h2>
                  <p className="text-muted-foreground">Sem pegadinhas. 100% gratuito.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Seu melhor email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="WhatsApp (opcional)"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-12 text-lg font-bold bg-secondary hover:bg-secondary/90"
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        BAIXAR E-BOOK GRÁTIS
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    E-book enviado instantaneamente
                  </p>
                  <p className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Dicas exclusivas por email
                  </p>
                  <p className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Sem spam, cancele quando quiser
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Benefícios */}
            <div className="space-y-6">
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">📈 O que você vai descobrir:</h3>
                  <div className="space-y-3 text-white/90">
                    <div className="flex items-start">
                      <ArrowRight className="w-5 h-5 mr-3 mt-0.5 text-secondary" />
                      <span><strong>Erro Fatal #1:</strong> Por que 90% das empresas travam no mesmo lugar</span>
                    </div>
                    <div className="flex items-start">
                      <ArrowRight className="w-5 h-5 mr-3 mt-0.5 text-secondary" />
                      <span><strong>Framework dos 4 Pilares:</strong> O sistema usado por empresas de sucesso</span>
                    </div>
                    <div className="flex items-start">
                      <ArrowRight className="w-5 h-5 mr-3 mt-0.5 text-secondary" />
                      <span><strong>Funil Magnético:</strong> Como atrair clientes no piloto automático</span>
                    </div>
                    <div className="flex items-start">
                      <ArrowRight className="w-5 h-5 mr-3 mt-0.5 text-secondary" />
                      <span><strong>Escala Inteligente:</strong> Crescer sem perder qualidade ou sanidade</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">⭐ Resultados Reais:</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-secondary">+347%</div>
                      <div className="text-sm text-white/80">Crescimento médio</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary">500+</div>
                      <div className="text-sm text-white/80">Empresas transformadas</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary">90%</div>
                      <div className="text-sm text-white/80">Taxa de sucesso</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center text-white/80 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>Leitura rápida: apenas 15 minutos</span>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <div className="flex justify-center items-center space-x-8 text-white/60">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>+1.200 downloads</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                <span>Nota 4.9/5</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>100% Gratuito</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}