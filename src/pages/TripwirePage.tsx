import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/SEOHead';
import { CheckCircle, CreditCard, Star, Clock, Users, ArrowRight, Gift, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TripwirePage() {
  const [isOrdering, setIsOrdering] = useState(false);

  const handleOrder = () => {
    setIsOrdering(true);
    // Aqui você integraria com o gateway de pagamento
    setTimeout(() => {
      alert('Redirecionando para pagamento...');
      setIsOrdering(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <SEOHead 
        title="Kit Diagnóstico Empresarial - Oferta Especial R$ 47"
        description="Kit completo para diagnosticar e acelerar o crescimento da sua empresa. Oferta limitada!"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-red-500 text-white hover:bg-red-600 animate-pulse">
              ⚡ OFERTA RELÂMPAGO - 67% OFF
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Última Chance: Kit Diagnóstico
              <span className="text-secondary"> Empresarial Completo</span>
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Tudo que você precisa para <strong>diagnosticar e acelerar</strong> o crescimento da sua empresa
            </p>
            
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="text-white/70 line-through text-2xl">De R$ 147</div>
              <div className="text-4xl font-bold text-accent">Por apenas R$ 47</div>
            </div>
            
            <div className="flex justify-center items-center space-x-6 text-white/80 text-sm">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Acesso imediato</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>+847 empresas usaram</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <span>Garantia 30 dias</span>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Oferta Principal */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-2xl border-2 border-accent/50">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">🎯 Kit Diagnóstico Completo</h2>
                    <p className="text-muted-foreground">Tudo em um só lugar para acelerar seu crescimento</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <h3 className="font-semibold">Diagnóstico 360° da Sua Empresa</h3>
                        <p className="text-sm text-muted-foreground">Planilha interativa que identifica exatamente onde sua empresa está travando (Valor: R$ 47)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <h3 className="font-semibold">Template de Plano de Ação 90 Dias</h3>
                        <p className="text-sm text-muted-foreground">Roadmap passo-a-passo para implementar melhorias imediatamente (Valor: R$ 67)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <h3 className="font-semibold">Calculadora de ROI Marketing</h3>
                        <p className="text-sm text-muted-foreground">Descubra quanto investir em marketing para atingir suas metas (Valor: R$ 33)</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleOrder}
                    disabled={isOrdering}
                    className="w-full h-14 text-lg font-bold bg-gradient-success hover:shadow-glow"
                  >
                    {isOrdering ? (
                      "Processando..."
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        QUERO O KIT POR R$ 47
                      </>
                    )}
                  </Button>

                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    <p>💳 Parcelamos em até 3x sem juros</p>
                    <p>🔒 Compra segura | Garantia de 30 dias</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Benefícios e Social Proof */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">⚡ Por que essa oferta especial?</h3>
                  <div className="space-y-3 text-white/90 text-sm">
                    <p>Esta é uma oferta especial para quem baixou nosso e-book e está <strong>realmente comprometido</strong> em crescer.</p>
                    <p>Normalmente cobramos R$ 147 por este kit em consultorias, mas queremos que você tenha sucesso!</p>
                    <p className="text-accent font-semibold">Esta página sai do ar em 24 horas.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">📈 Resultados Reais:</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                        <span className="text-secondary font-bold">MC</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Mariana Costa</p>
                        <p className="text-white/80 text-sm">"Identifiquei 5 problemas que não via. Faturamento cresceu 40% em 2 meses!"</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                        <span className="text-secondary font-bold">RP</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Roberto Pereira</p>
                        <p className="text-white/80 text-sm">"O plano de 90 dias foi um divisor de águas. Melhor investimento que fiz!"</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-warning/20 border-yellow-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Gift className="w-5 h-5 text-yellow-400 mr-2" />
                    <h3 className="text-lg font-bold text-white">Bônus Exclusivo</h3>
                  </div>
                  <p className="text-white/90 text-sm">
                    <strong>GRÁTIS:</strong> Acesso ao grupo privado no Telegram com +500 empresários 
                    para troca de experiências e networking (Valor: R$ 97)
                  </p>
                </CardContent>
              </Card>

              <div className="text-center">
                <div className="grid grid-cols-3 gap-4 text-white/80">
                  <div>
                    <div className="text-2xl font-bold text-secondary">847</div>
                    <div className="text-xs">Empresas atendidas</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">4.9/5</div>
                    <div className="text-xs">Avaliação média</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">30d</div>
                    <div className="text-xs">Garantia</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Urgência */}
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-red-500/20 border-red-500/50">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">⏰ ATENÇÃO: Oferta por Tempo Limitado</h3>
                <p className="text-white/90">
                  Esta página especial estará disponível apenas por <strong>24 horas</strong>. 
                  Depois, o kit volta ao preço normal de R$ 147.
                </p>
                <p className="text-accent font-bold mt-2">Não perca esta oportunidade única!</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}