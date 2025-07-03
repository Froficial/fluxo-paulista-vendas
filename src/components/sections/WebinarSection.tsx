import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Gift } from 'lucide-react';

interface WebinarSectionProps {
  availableSpots: number;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  formData: {
    name: string;
    email: string;
    whatsapp: string;
  };
  handleInputChange: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export const WebinarSection: React.FC<WebinarSectionProps> = ({
  availableSpots,
  timeLeft,
  formData,
  handleInputChange,
  handleSubmit,
  isSubmitting
}) => {
  const topics = [
    "Os 3 erros que matam 95% dos funis de venda",
    "Como criar um funil que vende enquanto você dorme",
    "A estratégia secreta dos R$ 2.5M em vendas",
    "Framework completo para escalar de 0 a 6 dígitos"
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="destructive" className="mb-6">
            🔥 WEBINAR GRATUITO
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-primary">Masterclass Exclusiva:</span><br />
            Como Construir um Funil de R$ 100k/mês
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra o sistema exato que usamos para gerar milhões em vendas
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                <Calendar className="h-6 w-6 text-primary" />
                <div>
                  <div className="font-semibold">Data</div>
                  <div className="text-muted-foreground">Próxima quinta-feira, 20h</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                <Clock className="h-6 w-6 text-secondary" />
                <div>
                  <div className="font-semibold">Duração</div>
                  <div className="text-muted-foreground">90 minutos + Q&A</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <div className="font-semibold">Vagas Limitadas</div>
                  <div className="text-destructive font-medium">{availableSpots} vagas restantes</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                O que você vai aprender:
              </h3>
              <div className="space-y-3">
                {topics.map((topic, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm mt-0.5">
                      {index + 1}
                    </div>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <Card className="shadow-lg">
            <CardHeader className="text-center bg-primary text-primary-foreground">
              <CardTitle className="text-2xl">
                Garanta Sua Vaga Gratuita
              </CardTitle>
              <div className="text-lg">
                Restam apenas {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Confirmando...' : 'Quero Minha Vaga Gratuita!'}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Ao se inscrever, você concorda em receber emails com conteúdo exclusivo.
                  Pode cancelar a qualquer momento.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};