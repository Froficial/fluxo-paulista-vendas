import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
            🚀 Sistema Completo de Funil
          </Badge>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Transforme Seus <span className="text-accent drop-shadow-lg">Visitantes</span> em{' '}
          <span className="text-secondary drop-shadow-lg">Clientes</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Descubra o sistema completo que está gerando milhares em vendas todos os meses
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="p-4 bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-0 flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              <span className="font-semibold text-white">{availableSpots} vagas restantes</span>
            </CardContent>
          </Card>
          
          <Card className="p-4 bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-0 flex items-center gap-2">
              <Clock className="h-5 w-5 text-secondary" />
              <span className="font-semibold text-white">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
              </span>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button 
            variant="premium" 
            size="lg" 
            className="px-8 py-3 text-lg font-bold"
            onClick={() => navigate('/webinar')}
          >
            Quero Participar do Webinar Gratuito
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-3 text-lg bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50"
            onClick={() => navigate('/ebook')}
          >
            Baixar E-book Gratuito
          </Button>
        </motion.div>
      </div>
    </section>
  );
};