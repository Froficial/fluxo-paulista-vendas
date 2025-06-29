
import React from 'react';
import { Users, DollarSign, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: Users,
      title: "Dependência FATAL de Indicações",
      description: "Seu fluxo de novos negócios é inconstante e fora do seu controle. Você fica esperando que clientes antigos se lembrem de você enquanto a concorrência conquista SEU mercado.",
      pain: "RESULTADO: Meses ruins que quase quebram sua empresa"
    },
    {
      icon: DollarSign,
      title: "Marketing que QUEIMA Dinheiro",
      description: "Você investe em ações pontuais, posts e anúncios, mas não consegue provar o retorno financeiro. Parece mais um buraco negro do que um investimento.",
      pain: "RESULTADO: Milhares gastos sem saber se funciona"
    },
    {
      icon: Clock,
      title: "Prisioneiro do Próprio Negócio",
      description: "Você passa o dia 'apagando incêndios' e resolvendo problemas operacionais, sem tempo para pensar no futuro e na expansão estratégica.",
      pain: "RESULTADO: Trabalha DENTRO do negócio, não no negócio"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="bg-red-100 text-red-800 mb-4">PARE DE SOFRER</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Você se identifica com algum destes <span className="text-red-600">PESADELOS?</span>
          </h2>
          <p className="text-xl text-gray-600">
            Se o crescimento da sua empresa parece uma montanha-russa, você não está sozinho. 
            <strong className="text-gray-900"> 87% dos empresários paulistanos</strong> enfrentam os mesmos vilões.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((item, index) => (
            <Card key={index} className="border-2 hover:border-red-200 transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="bg-red-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <item.icon className="h-10 w-10 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-red-700 font-semibold text-sm">{item.pain}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
