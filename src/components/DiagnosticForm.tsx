import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useLeadSubmit } from '@/hooks/useLeadSubmit';
import { CheckCircle, BarChart3, Users, Target, TrendingUp } from 'lucide-react';

interface DiagnosticData {
  name: string;
  email: string;
  company_name: string;
  whatsapp?: string;
  industry: string;
  company_size: string;
  digital_presence_score: number;
  marketing_strategy_score: number;
  customer_acquisition_score: number;
  data_analytics_score: number;
  challenges_goals?: string;
}

export const DiagnosticForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DiagnosticData>({
    name: '',
    email: '',
    company_name: '',
    whatsapp: '',
    industry: '',
    company_size: '',
    digital_presence_score: 5,
    marketing_strategy_score: 5,
    customer_acquisition_score: 5,
    data_analytics_score: 5,
    challenges_goals: ''
  });
  const [showResults, setShowResults] = useState(false);
  const { submitLead, isSubmitting } = useLeadSubmit();

  const handleInputChange = (field: keyof DiagnosticData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateScore = () => {
    const { digital_presence_score, marketing_strategy_score, customer_acquisition_score, data_analytics_score } = formData;
    return Math.round((digital_presence_score + marketing_strategy_score + customer_acquisition_score + data_analytics_score) / 4);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Excelente';
    if (score >= 6) return 'Bom';
    if (score >= 4) return 'Regular';
    return 'Precisa Melhorar';
  };

  const handleSubmit = async () => {
    const averageScore = calculateScore();
    
    const result = await submitLead({
      name: formData.name,
      email: formData.email,
      company_name: formData.company_name,
      whatsapp: formData.whatsapp,
      lead_source: 'diagnostic',
      metadata: {
        industry: formData.industry,
        company_size: formData.company_size,
        digital_presence_score: formData.digital_presence_score,
        marketing_strategy_score: formData.marketing_strategy_score,
        customer_acquisition_score: formData.customer_acquisition_score,
        data_analytics_score: formData.data_analytics_score,
        challenges_goals: formData.challenges_goals,
        average_score: averageScore
      }
    });

    if (result.success) {
      setShowResults(true);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.company_name;
      case 2:
        return formData.industry && formData.company_size;
      case 3:
      case 4:
        return true;
      default:
        return false;
    }
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              🎯 Seu Diagnóstico Empresarial
            </h1>
            <p className="text-xl text-blue-700">
              {formData.name}, aqui está sua análise completa!
            </p>
          </motion.div>

          <div className="grid gap-6">
            <Card className="border-2 border-blue-200">
              <CardHeader className="text-center bg-blue-50">
                <CardTitle className="text-2xl">Score Geral da Empresa</CardTitle>
                <div className={`text-6xl font-bold ${getScoreColor(score)} rounded-lg p-4 inline-block`}>
                  {score}/10
                </div>
                <CardDescription className="text-lg">
                  {getScoreLabel(score)}
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Presença Digital
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    {formData.digital_presence_score}/10
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Como sua empresa se apresenta online
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Estratégia de Marketing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {formData.marketing_strategy_score}/10
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Planejamento e execução de marketing
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Aquisição de Clientes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">
                    {formData.customer_acquisition_score}/10
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Processo de captação de novos clientes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-orange-600" />
                    Análise de Dados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">
                    {formData.data_analytics_score}/10
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Uso de dados para tomar decisões
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  🚀 Próximos Passos Recomendados
                </h3>
                <p className="text-lg text-blue-700 mb-6">
                  Baseado no seu diagnóstico, preparamos um plano personalizado para acelerar o crescimento da {formData.company_name}.
                </p>
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <p className="text-gray-700">
                    ✅ Relatório completo enviado para <strong>{formData.email}</strong><br/>
                    ✅ Plano de ação personalizado incluído<br/>
                    ✅ Templates e ferramentas em anexo
                  </p>
                </div>
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                  onClick={() => window.open(`https://wa.me/5511999999999?text=Olá! Acabei de fazer o diagnóstico empresarial e gostaria de uma consultoria personalizada para a ${encodeURIComponent(formData.company_name)}!`, '_blank')}
                >
                  💬 Agendar Consultoria Gratuita
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            🔍 Diagnóstico Empresarial Gratuito
          </h1>
          <p className="text-xl text-blue-700">
            Descubra o potencial de crescimento da sua empresa em 4 passos
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progresso</span>
            <span className="text-sm text-gray-600">{currentStep}/4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "📋 Informações Básicas"}
              {currentStep === 2 && "🏢 Sobre sua Empresa"}
              {currentStep === 3 && "📊 Avaliação - Parte 1"}
              {currentStep === 4 && "🎯 Avaliação - Parte 2"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Vamos começar com seus dados de contato"}
              {currentStep === 2 && "Conte-nos sobre seu negócio"}
              {currentStep === 3 && "Avalie sua presença digital e estratégia"}
              {currentStep === 4 && "Avalie sua aquisição de clientes e uso de dados"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentStep === 1 && (
              <>
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Nome da Empresa *</Label>
                  <Input
                    id="company"
                    value={formData.company_name}
                    onChange={(e) => handleInputChange('company_name', e.target.value)}
                    placeholder="Nome da sua empresa"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp (Opcional)</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div>
                  <Label htmlFor="industry">Segmento da Empresa *</Label>
                  <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o segmento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="saude">Saúde</SelectItem>
                      <SelectItem value="educacao">Educação</SelectItem>
                      <SelectItem value="varejo">Varejo</SelectItem>
                      <SelectItem value="servicos">Serviços</SelectItem>
                      <SelectItem value="industria">Indústria</SelectItem>
                      <SelectItem value="financeiro">Financeiro</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="size">Tamanho da Empresa *</Label>
                  <Select value={formData.company_size} onValueChange={(value) => handleInputChange('company_size', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tamanho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mei">MEI (1 pessoa)</SelectItem>
                      <SelectItem value="micro">Microempresa (2-9 funcionários)</SelectItem>
                      <SelectItem value="pequena">Pequena (10-49 funcionários)</SelectItem>
                      <SelectItem value="media">Média (50-249 funcionários)</SelectItem>
                      <SelectItem value="grande">Grande (250+ funcionários)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="challenges">Principais Desafios e Objetivos (Opcional)</Label>
                  <Textarea
                    id="challenges"
                    value={formData.challenges_goals}
                    onChange={(e) => handleInputChange('challenges_goals', e.target.value)}
                    placeholder="Conte-nos sobre os principais desafios que enfrenta e objetivos para o próximo ano..."
                    rows={4}
                  />
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div>
                  <Label>Presença Digital (Site, Redes Sociais, SEO)</Label>
                  <p className="text-sm text-gray-600 mb-3">Como você avalia a presença online da sua empresa?</p>
                  <Slider
                    value={[formData.digital_presence_score]}
                    onValueChange={(value) => handleInputChange('digital_presence_score', value[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 - Muito fraca</span>
                    <span className="font-medium">{formData.digital_presence_score}/10</span>
                    <span>10 - Excelente</span>
                  </div>
                </div>

                <div>
                  <Label>Estratégia de Marketing</Label>
                  <p className="text-sm text-gray-600 mb-3">Qual o nível da sua estratégia e execução de marketing?</p>
                  <Slider
                    value={[formData.marketing_strategy_score]}
                    onValueChange={(value) => handleInputChange('marketing_strategy_score', value[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 - Sem estratégia</span>
                    <span className="font-medium">{formData.marketing_strategy_score}/10</span>
                    <span>10 - Muito estruturada</span>
                  </div>
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <div>
                  <Label>Aquisição de Clientes</Label>
                  <p className="text-sm text-gray-600 mb-3">Como funciona seu processo de captação de novos clientes?</p>
                  <Slider
                    value={[formData.customer_acquisition_score]}
                    onValueChange={(value) => handleInputChange('customer_acquisition_score', value[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 - Muito difícil</span>
                    <span className="font-medium">{formData.customer_acquisition_score}/10</span>
                    <span>10 - Muito eficiente</span>
                  </div>
                </div>

                <div>
                  <Label>Análise de Dados e Métricas</Label>
                  <p className="text-sm text-gray-600 mb-3">Qual o nível de uso de dados para tomar decisões?</p>
                  <Slider
                    value={[formData.data_analytics_score]}
                    onValueChange={(value) => handleInputChange('data_analytics_score', value[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 - Não uso dados</span>
                    <span className="font-medium">{formData.data_analytics_score}/10</span>
                    <span>10 - Data-driven</span>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  Voltar
                </Button>
              )}
              <Button 
                onClick={nextStep}
                disabled={!isStepValid() || isSubmitting}
                className="ml-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    {currentStep === 4 ? 'Gerar Diagnóstico' : 'Próximo'}
                    {currentStep === 4 && <CheckCircle className="ml-2 h-4 w-4" />}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};