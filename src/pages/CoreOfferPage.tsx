import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/SEOHead';
import { CheckCircle, CreditCard, Star, Clock, Users, ArrowRight, Gift, Shield, Play, BookOpen, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CoreOfferPage() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [isOrdering, setIsOrdering] = useState(false);

  const handleOrder = (plan: string) => {
    setIsOrdering(true);
    // Aqui você integraria com o gateway de pagamento
    setTimeout(() => {
      alert(`Redirecionando para pagamento do plano ${plan}...`);
      setIsOrdering(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <SEOHead 
        title="Método Scale-Up: De R$ 100k para R$ 1M - Sistema Completo"
        description="O método completo para escalar sua empresa de R$ 100k para R$ 1M em 12 meses. Sistema testado e aprovado."
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-accent text-white text-lg px-6 py-2">
              🚀 MÉTODO SCALE-UP
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              De R$ 100k para
              <span className="text-secondary"> R$ 1 Milhão</span> em 12 Meses
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              O sistema completo usado por <strong>+500 empresas</strong> para crescer de forma previsível e escalável, 
              sem trabalhar 16h por dia ou perder a sanidade mental.
            </p>
            
            <div className="flex justify-center items-center space-x-8 text-white/80">
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-accent" />
                <span>Sistema testado</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-accent" />
                <span>+500 casos de sucesso</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-accent" />
                <span>Garantia 60 dias</span>
              </div>
            </div>
          </motion.div>

          {/* Planos */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Plano Essential */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className={`relative ${selectedPlan === 'essential' ? 'border-2 border-primary' : 'border border-white/20'} bg-white/5`}>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">Essential</h3>
                    <div className="text-white/70 line-through text-lg">R$ 497</div>
                    <div className="text-3xl font-bold text-white">R$ 297</div>
                    <p className="text-white/80 text-sm">ou 12x de R$ 29,70</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <span className="text-white/90 text-sm">Framework completo dos 4 Pilares</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <span className="text-white/90 text-sm">12 módulos em vídeo (8h de conteúdo)</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <span className="text-white/90 text-sm">Templates e planilhas prontas</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <span className="text-white/90 text-sm">Acesso por 12 meses</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleOrder('essential')}
                    disabled={isOrdering}
                    variant={selectedPlan === 'essential' ? 'default' : 'outline'}
                    className="w-full"
                  >
                    Escolher Essential
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Plano Premium (Mais Popular) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="relative border-2 border-accent bg-white/10 shadow-glow">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-accent text-white px-4 py-1">MAIS POPULAR</Badge>
                </div>
                <CardContent className="p-6 pt-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">Premium</h3>
                    <div className="text-white/70 line-through text-lg">R$ 997</div>
                    <div className="text-4xl font-bold text-accent">R$ 497</div>
                    <p className="text-white/80 text-sm">ou 12x de R$ 49,70</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <span className="text-white text-sm"><strong>Tudo do Essential +</strong></span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <span className="text-white/90 text-sm">6 meses de mentoria em grupo</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <span className="text-white/90 text-sm">Hot Seats quinzenais ao vivo</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <span className="text-white/90 text-sm">Comunidade privada exclusiva</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <span className="text-white/90 text-sm">Suporte direto por 6 meses</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <span className="text-white/90 text-sm">Bônus: Kit de Automação (R$ 297)</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleOrder('premium')}
                    disabled={isOrdering}
                    className="w-full h-12 text-lg font-bold bg-accent hover:bg-accent/90"
                  >
                    {isOrdering ? (
                      "Processando..."
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        QUERO O PREMIUM
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Plano VIP */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className={`relative ${selectedPlan === 'vip' ? 'border-2 border-primary' : 'border border-white/20'} bg-white/5`}>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">VIP</h3>
                    <div className="text-white/70 line-through text-lg">R$ 1.997</div>
                    <div className="text-3xl font-bold text-white">R$ 997</div>
                    <p className="text-white/80 text-sm">ou 12x de R$ 99,70</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <span className="text-white text-sm"><strong>Tudo do Premium +</strong></span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <span className="text-white/90 text-sm">2 consultorias 1:1 comigo</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <span className="text-white/90 text-sm">Análise completa da sua empresa</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <span className="text-white/90 text-sm">Plano personalizado de crescimento</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <span className="text-white/90 text-sm">Acesso vitalício ao conteúdo</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleOrder('vip')}
                    disabled={isOrdering}
                    variant={selectedPlan === 'vip' ? 'default' : 'outline'}
                    className="w-full"
                  >
                    Escolher VIP
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* O que você vai receber */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white text-center mb-8">O que você vai receber</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Módulo 1: Diagnóstico Profundo</h3>
                        <p className="text-white/80 text-sm">Identifique exatamente onde sua empresa está travando e quais são os gargalos que impedem o crescimento exponencial.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Módulo 2: Pilar da Atração</h3>
                        <p className="text-white/80 text-sm">Como criar um sistema magnético que atrai seus clientes ideais de forma automática, sem precisar "caçar" clientes.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Star className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Módulo 3: Pilar da Conversão</h3>
                        <p className="text-white/80 text-sm">O processo exato para transformar leads em clientes pagantes com taxas de conversão de 20%+.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Módulo 4: Pilar da Retenção</h3>
                        <p className="text-white/80 text-sm">Como fidelizar clientes e aumentar o ticket médio, criando receita recorrente e previsível.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Gift className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Módulo 5: Pilar da Escala</h3>
                        <p className="text-white/80 text-sm">Como estruturar processos e equipe para crescer sem trabalhar mais horas ou perder qualidade.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Bônus: Cases Reais</h3>
                        <p className="text-white/80 text-sm">Análise detalhada de 5 empresas que aplicaram o método e seus resultados extraordinários.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Garantia */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Card className="bg-green-500/20 border-green-500/50 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Garantia Incondicional de 60 Dias</h3>
                <p className="text-white/90 mb-4">
                  Se por qualquer motivo você não estiver 100% satisfeito, devolvemos seu dinheiro. 
                  Sem perguntas, sem burocracia.
                </p>
                <p className="text-green-400 font-semibold">
                  Você não tem nada a perder e um negócio milionário para ganhar.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}