import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, TrendingDown, Users, DollarSign } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: TrendingDown,
      title: "Baixa Conversão",
      description: "Muitos visitantes no site, mas poucos se tornam clientes reais"
    },
    {
      icon: Users,
      title: "Leads Desqualificados",
      description: "Captam leads, mas a maioria não está pronta para comprar"
    },
    {
      icon: DollarSign,
      title: "Vendas Inconsistentes",
      description: "Faturamento varia muito, sem previsibilidade de receita"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Você Está Perdendo <span className="text-destructive">Dinheiro</span> Todos os Dias
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            95% dos empreendedores cometem os mesmos erros que impedem suas vendas de decolar
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card key={index} className="border-destructive/20 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <problem.icon className="h-12 w-12 text-destructive mx-auto mb-4" />
                <CardTitle className="text-xl">{problem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground">
            <strong>Resultado:</strong> Você trabalha mais, mas ganha menos do que deveria
          </p>
        </div>
      </div>
    </section>
  );
};