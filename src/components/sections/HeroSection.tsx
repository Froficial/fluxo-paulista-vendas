
import React from 'react';
import { Timer, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroSectionProps {
  availableSpots: number;
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ availableSpots, timeLeft }) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full mb-6 animate-pulse">
            <Timer className="h-4 w-4" />
            <span className="font-semibold text-sm">
              Últimas {availableSpots} vagas • Encerra em {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Sua empresa em São Paulo está
            <span className="block text-orange-400">ESTAGNADA?</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            Descubra o sistema de <strong className="text-orange-300">3 passos</strong> para transformar o caos operacional em um fluxo <strong className="text-green-300">previsível de clientes de alto valor</strong> e retome o controle do seu crescimento.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('webinar')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              Quero Participar GRATUITAMENTE
            </Button>
            <div className="flex items-center gap-2 text-blue-200">
              <Shield className="h-5 w-5" />
              <span className="text-sm">100% Gratuito • Sem Compromisso</span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-8 text-blue-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm">Empresas Atendidas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">R$ 50M+</div>
              <div className="text-sm">Em Vendas Geradas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-sm">Taxa de Sucesso</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
