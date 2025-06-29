
import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Clock, CheckCircle, PartyPopper, ArrowRight, Timer, TrendingUp, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const Index = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [availableSpots, setAvailableSpots] = useState(47);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 32
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate decreasing spots
  useEffect(() => {
    const spotTimer = setInterval(() => {
      setAvailableSpots(prev => prev > 15 ? prev - Math.floor(Math.random() * 2) : prev);
    }, 45000);

    return () => clearInterval(spotTimer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setShowSuccess(true);
    setAvailableSpots(prev => prev - 1);
    toast.success('Inscrição confirmada! Verifique seu email.');
    setIsSubmitting(false);
  };

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
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>Transforme Seu Negócio em SP - Sistema de 3 Passos para Crescimento Previsível</title>
        <meta name="description" content="Descubra como sair do caos operacional e criar um fluxo previsível de clientes de alto valor em São Paulo. Webinar gratuito com sistema comprovado." />
        <meta name="keywords" content="marketing digital são paulo, crescimento empresarial, sistema de vendas, fluxo de clientes, webinar gratuito" />
        <meta property="og:title" content="Sistema de 3 Passos para Crescimento Previsível em SP" />
        <meta property="og:description" content="Transforme o caos operacional em um fluxo previsível de clientes de alto valor. Webinar exclusivo para empresários de São Paulo." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fluxo-paulista-vendas.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sistema de 3 Passos para Crescimento Previsível" />
        <meta name="twitter:description" content="Webinar gratuito: Como criar um fluxo previsível de vendas em São Paulo" />
      </head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="container mx-auto px-6 py-20 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              {/* Urgency Banner */}
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

              {/* Social Proof */}
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

        {/* Problem Agitation */}
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
              {[
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
              ].map((item, index) => (
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

        {/* Authority & Credibility */}
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

            {/* Testimonials */}
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

            {/* Trust Indicators */}
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

        {/* The Plan */}
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
                {[
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
                ].map((step, index) => (
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

        {/* Webinar Offer */}
        <section id="webinar" className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          
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
                  {[
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
                  ].map((secret, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-white mb-1">{secret.title}</p>
                        <p className="text-blue-200">{secret.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Urgency Elements */}
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

              {/* Form */}
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

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-6 text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Agência Fluxo de Vendas</h3>
              <p className="text-gray-400">Construindo sistemas de crescimento para empresas B2B em São Paulo</p>
            </div>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} Agência Fluxo de Vendas. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
