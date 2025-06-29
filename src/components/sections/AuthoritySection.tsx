
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const AuthoritySection: React.FC = () => {
  const testimonials = [
    {
      name: "Carlos Mendes",
      company: "Advocacia Mendes & Silva",
      result: "300% mais clientes em 90 dias",
      image: "👨‍💼"
    },
    {
      name: "Ana Paula Santos",
      company: "Clínica BellaForma",
      result: "R$ 180k em novos contratos",
      image: "👩‍⚕️"
    },
    {
      name: "Roberto Lima",
      company: "Consultoria TechSP",
      result: "Fluxo previsível de R$ 50k/mês",
      image: "👨‍💻"
    }
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="bg-blue-100 text-blue-800 mb-4">QUEM SOMOS</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Nós somos o <span className="text-blue-600">GUIA</span>. Você é o <span className="text-green-600">HERÓI</span>.
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Entendemos a pressão de gerir um negócio em São Paulo. Por isso, não vendemos "marketing". 
            <strong className="text-gray-900"> Nós implementamos um sistema comprovado</strong> que entrega clareza, controle e, 
            o mais importante, <strong className="text-green-600">resultados previsíveis</strong>.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">{testimonial.image}</div>
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 inline fill-current" />
                  ))}
                </div>
                <div className="bg-green-100 text-green-800 font-bold py-2 px-4 rounded-lg mb-4">
                  {testimonial.result}
                </div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-600 text-sm">{testimonial.company}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="font-semibold text-gray-500 uppercase tracking-wider mb-6">EMPRESAS QUE CONFIAM EM NOSSO SISTEMA</p>
          <div className="flex justify-center items-center space-x-12 grayscale opacity-60">
            <div className="text-xl font-bold">Advocacia Martins</div>
            <div className="text-xl font-bold">Clínica BellaForma</div>
            <div className="text-xl font-bold">Consultoria TechSP</div>
          </div>
        </div>
      </div>
    </section>
  );
};
