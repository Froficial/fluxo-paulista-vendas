import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Award, TrendingUp, Users } from 'lucide-react';

export const AuthoritySection: React.FC = () => {
  const achievements = [
    {
      icon: TrendingUp,
      number: "R$ 2.5M+",
      label: "Em vendas geradas"
    },
    {
      icon: Users,
      number: "15.000+",
      label: "Empresários ajudados"
    },
    {
      icon: Award,
      number: "98%",
      label: "Taxa de satisfação"
    },
    {
      icon: Star,
      number: "4.9/5",
      label: "Avaliação média"
    }
  ];

  return (
    <section className="py-20 px-4 bg-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6">
            🏆 Resultados Comprovados
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Por Que Confiar em <span className="text-primary">Nossa Metodologia</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Não é teoria. São resultados reais de empresários que transformaram seus negócios
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <achievement.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">
                  {achievement.number}
                </div>
                <p className="text-muted-foreground">{achievement.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">João Silva - Fundador</h3>
              <p className="text-muted-foreground">Especialista em Funis de Vendas</p>
            </div>
          </div>
          <p className="text-muted-foreground italic">
            "Após 10 anos ajudando empresários a escalar seus negócios, desenvolvemos um sistema que funciona para qualquer nicho. O segredo está na combinação de psicologia, tecnologia e processo."
          </p>
        </div>
      </div>
    </section>
  );
};