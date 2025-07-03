import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users } from 'lucide-react';

interface HeroSectionProps {
  availableSpots: number;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  availableSpots,
  timeLeft
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Badge variant="secondary" className="mb-6">
          🚀 Sistema Completo de Funil
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Transforme Seus <span className="text-primary">Visitantes</span> em{' '}
          <span className="text-secondary">Clientes</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Descubra o sistema completo que está gerando milhares em vendas todos os meses
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Card className="p-4">
            <CardContent className="p-0 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold">{availableSpots} vagas restantes</span>
            </CardContent>
          </Card>
          
          <Card className="p-4">
            <CardContent className="p-0 flex items-center gap-2">
              <Clock className="h-5 w-5 text-secondary" />
              <span className="font-semibold">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
              </span>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="px-8 py-3 text-lg">
            Quero Participar do Webinar Gratuito
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
            Baixar E-book Gratuito
          </Button>
        </div>
      </div>
    </section>
  );
};