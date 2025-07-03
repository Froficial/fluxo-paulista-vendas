import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Target, Zap, BarChart3, MessageSquare } from 'lucide-react';

export const SolutionSection: React.FC = () => {
  const features = [
    {
      icon: Target,
      title: "Funil Inteligente",
      description: "Sistema que identifica e qualifica leads automaticamente"
    },
    {
      icon: MessageSquare,
      title: "Automação de Email",
      description: "Sequências que educam e convertem seus prospects"
    },
    {
      icon: BarChart3,
      title: "Analytics Avançado",
      description: "Métricas que mostram exatamente onde otimizar"
    },
    {
      icon: Zap,
      title: "Integração WhatsApp",
      description: "Atendimento direto no canal preferido dos clientes"
    }
  ];

  const benefits = [
    "Aumento de 300% na taxa de conversão",
    "Redução de 80% no tempo de vendas",
    "ROI comprovado de 15:1 em 90 dias",
    "Sistema funcionando 24/7 automaticamente"
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="default" className="mb-6">
            ✨ A Solução Definitiva
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            O Sistema que <span className="text-primary">Multiplica</span> Suas Vendas
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforme visitantes em clientes pagantes com nosso sistema completo de funil de vendas
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Resultados Garantidos em 30 Dias
              </h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                R$ 4.997
              </div>
              <p className="text-muted-foreground mb-6">
                Valor total do sistema completo
              </p>
              <Button size="lg" className="w-full">
                Quero Começar Agora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};