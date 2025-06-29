
import React from 'react';
import { CheckCircle, PartyPopper, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface WebinarSectionProps {
  availableSpots: number;
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  formData: {
    name: string;
    email: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{name: string; email: string}>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
  showSuccess: boolean;
}

export const WebinarSection: React.FC<WebinarSectionProps> = ({
  availableSpots,
  timeLeft,
  formData,
  setFormData,
  handleSubmit,
  isSubmitting,
  showSuccess
}) => {
  const secrets = [
    {
      title: "SEGREDO #1: O Veículo Certo",
      description: "Por que 'mais marketing' não funciona e como um 'sistema' integrado é a ÚNICA solução para a previsibilidade."
    },
    {
      title: "SEGREDO #2: O Processo Interno",
      description: "Como a falta de um processo claro (e não sua habilidade) é o que impede suas vendas de DECOLAREM."
    },
    {
      title: "SEGREDO #3: O Inimigo Real",
      description: "Por que seu maior obstáculo não é a concorrência, mas a COMPLEXIDADE, e como um plano simples pode mudar o jogo."
    }
  ];

  return (
    <section id="webinar" className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-orange-500 text-white mb-4">WEBINAR EXCLUSIVO</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Os 3 Erros <span className="text-red-400">FATAIS</span> que Travam o Fluxo de Vendas
            </h2>
            <p className="text-blue-200 text-xl font-semibold mb-6">
              (e como corrigi-los usando nosso sistema EXATO)
            </p>
            <p className="text-blue-100 mb-8 text-lg leading-relaxed">
              Nesta sessão ao vivo, você não terá dicas genéricas. Você terá acesso ao 
              <strong className="text-white"> framework EXATO</strong> que usamos para construir sistemas de vendas que geram 
              <strong className="text-green-300"> resultados consistentes</strong>.
            </p>

            <div className="space-y-6 mb-8">
              {secrets.map((secret, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white mb-1">{secret.title}</p>
                    <p className="text-blue-200">{secret.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-orange-500 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold">⚡ VAGAS LIMITADAS</p>
                  <p className="text-sm">Restam apenas {availableSpots} vagas</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">⏰ TERMINA EM</p>
                  <p className="text-sm">{timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl">
            {!showSuccess ? (
              <div>
                <div className="text-center mb-6">
                  <Badge className="bg-green-100 text-green-800 mb-2">100% GRATUITO</Badge>
                  <h3 className="text-2xl font-bold mb-2">Garanta Sua Vaga AGORA!</h3>
                  <p className="text-gray-600">As vagas são limitadas para mantermos a qualidade da interação.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="font-semibold text-gray-900">Nome Completo</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="mt-2 h-12 text-lg"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="font-semibold text-gray-900">Melhor E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@melhor-email.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="mt-2 h-12 text-lg"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-4 h-14 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processando...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="mr-2 h-5 w-5" />
                        QUERO PARTICIPAR GRATUITAMENTE
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                    <Shield className="h-4 w-4" />
                    <span>Seus dados estão 100% seguros</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <PartyPopper className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-green-600">INSCRIÇÃO CONFIRMADA!</h3>
                <p className="text-gray-600 mb-4">
                  Parabéns! Você deu o primeiro passo para retomar o controle do seu crescimento.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 font-semibold">
                    ✅ Os detalhes de acesso ao webinar foram enviados para o seu e-mail
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
