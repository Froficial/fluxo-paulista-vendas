
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const SolutionSection: React.FC = () => {
  const steps = [
    {
      number: "1",
      title: "Diagnóstico Estratégico PROFUNDO",
      description: "Mapeamos todo o seu fluxo de vendas atual para encontrar os gargalos EXATOS que impedem seu crescimento. Não é 'consultoria genérica' - é cirurgia de precisão.",
      color: "bg-blue-600"
    },
    {
      number: "2", 
      title: "Implementação do Sistema COMPLETO",
      description: "Construímos e ativamos seu motor de aquisição de clientes, desde os anúncios até a qualificação dos leads. Tudo integrado, tudo funcionando em harmonia.",
      color: "bg-orange-500"
    },
    {
      number: "3",
      title: "Aceleração Contínua GARANTIDA",
      description: "Otimizamos o sistema mês a mês com base em dados REAIS, garantindo um fluxo de vendas cada vez mais lucrativo e previsível. Sem surpresas, só crescimento.",
      color: "bg-green-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="bg-green-100 text-green-800 mb-4">A SOLUÇÃO</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            O Caminho para a <span className="text-green-600">PREVISIBILIDADE</span> em 3 Passos
          </h2>
          <p className="text-xl text-gray-600">
            A complexidade é o inimigo do crescimento. Nosso processo foi desenhado para ser 
            <strong className="text-gray-900"> simples de entender e poderoso na execução</strong>.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-orange-500 to-green-500 -translate-y-1/2 rounded-full"></div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <Card key={index} className="relative bg-white border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className={`${step.color} text-white text-3xl font-bold rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-xl border-4 border-white`}>
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
