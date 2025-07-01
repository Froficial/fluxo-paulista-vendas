
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailSequenceStep {
  step: number;
  subject: string;
  template: (name: string) => string;
  daysDelay: number;
}

const emailSequence: EmailSequenceStep[] = [
  {
    step: 1,
    subject: '🎁 Seu E-book: Os 7 Segredos para Destravar o Crescimento',
    template: (name: string) => `<!-- Email inicial já enviado -->`,
    daysDelay: 0
  },
  {
    step: 2,
    subject: '💡 3 Dicas EXTRAS que não estão no E-book',
    template: (name: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Dicas Extras - StrateUp</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">💡 Olá ${name}!</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">3 Dicas EXTRAS que não estão no E-book</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
            <p>Espero que você tenha gostado do e-book! Aqui estão 3 dicas extras que podem turbinar ainda mais seus resultados:</p>
            
            <div style="background: #dcfdf7; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0;">
              <h3 style="color: #065f46; margin-top: 0;">🚀 Dica #1: O Poder do Follow-up</h3>
              <p style="color: #047857;">80% das vendas acontecem entre o 5º e 12º contato. A maioria das empresas desiste no 2º. Implemente um sistema de follow-up estruturado.</p>
            </div>

            <div style="background: #fef3cd; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">📊 Dica #2: Métricas que Importam</h3>
              <p style="color: #b45309;">Pare de olhar apenas para vendas. Acompanhe: Taxa de conversão por etapa, Custo de Aquisição de Cliente (CAC), Lifetime Value (LTV).</p>
            </div>

            <div style="background: #e0e7ff; border-left: 4px solid #6366f1; padding: 20px; margin: 20px 0;">
              <h3 style="color: #312e81; margin-top: 0;">⚡ Dica #3: Automação Inteligente</h3>
              <p style="color: #3730a3;">Automatize tarefas repetitivas, mas mantenha o toque humano nos momentos decisivos. 70% processo + 30% relacionamento = fórmula perfeita.</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/5511999999999?text=Olá! Recebi as dicas extras por email e gostaria de saber mais sobre a consultoria da StrateUp!" 
                 style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                💬 QUERO FALAR COM ESPECIALISTA
              </a>
            </div>

            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px;">
              <p><strong>StrateUp - Consultoria em Crescimento Empresarial</strong></p>
              <p>Transformando empresas em máquinas de crescimento previsível</p>
            </div>
          </div>
        </body>
      </html>
    `,
    daysDelay: 1
  },
  {
    step: 3,
    subject: '📈 Case: Como uma Empresa Cresceu 300% em 6 Meses',
    template: (name: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Case de Sucesso - StrateUp</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">📈 Case Real, ${name}!</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Como uma empresa cresceu 300% em 6 meses</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1e3a8a; margin-top: 0;">🏢 O Desafio</h2>
            <p>Uma empresa de serviços com 15 funcionários estava estagnada há 2 anos:</p>
            <ul>
              <li>Faturamento de R$ 80k/mês</li>
              <li>Sem previsibilidade de vendas</li>
              <li>Dependia 100% de indicações</li>
              <li>Margem apertada</li>
            </ul>

            <h2 style="color: #1e3a8a;">🎯 A Estratégia</h2>
            <div style="background: #dcfdf7; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0;">
              <h3 style="color: #065f46; margin-top: 0;">1. Estruturação do Funil de Vendas</h3>
              <p style="color: #047857;">Criamos um sistema previsível de geração de leads qualificados através de conteúdo e automação.</p>
            </div>

            <div style="background: #fef3cd; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">2. Otimização de Processos</h3>
              <p style="color: #b45309;">Identificamos e eliminamos gargalos que limitavam o crescimento e aumentamos a eficiência operacional.</p>
            </div>

            <div style="background: #e0e7ff; border-left: 4px solid #6366f1; padding: 20px; margin: 20px 0;">
              <h3 style="color: #312e81; margin-top: 0;">3. Precificação Estratégica</h3>
              <p style="color: #3730a3;">Reestruturamos a proposta de valor e ajustamos preços baseado no valor entregue.</p>
            </div>

            <h2 style="color: #1e3a8a;">🚀 Os Resultados</h2>
            <div style="background: #f0fdf4; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #166534; margin-top: 0;">Em 6 meses:</h3>
              <ul style="color: #15803d;">
                <li><strong>Faturamento:</strong> R$ 80k → R$ 240k/mês</li>
                <li><strong>Leads qualificados:</strong> 0 → 120/mês</li>
                <li><strong>Taxa de conversão:</strong> 15% → 35%</li>
                <li><strong>Margem de lucro:</strong> +85%</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 30px 0; background: #fee2e2; padding: 20px; border-radius: 5px;">
              <h3 style="color: #991b1b; margin-top: 0;">⚠️ E se fosse a SUA empresa?</h3>
              <p style="color: #dc2626;">Quantos clientes você está perdendo por não ter um sistema estruturado?</p>
              <a href="https://wa.me/5511999999999?text=Vi o case de 300% de crescimento e quero uma análise gratuita da minha empresa!" 
                 style="background: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin-top: 15px;">
                💬 QUERO MINHA ANÁLISE GRATUITA
              </a>
            </div>

            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px;">
              <p><strong>StrateUp - Consultoria em Crescimento Empresarial</strong></p>
            </div>
          </div>
        </body>
      </html>
    `,
    daysDelay: 3
  },
  {
    step: 4,
    subject: '🎯 Última Chance: Análise GRATUITA da Sua Empresa',
    template: (name: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Última Chance - StrateUp</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">⏰ ${name}, Esta é Sua Última Chance!</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Análise GRATUITA da Sua Empresa</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
            <p>Nos últimos dias, você recebeu:</p>
            <ul>
              <li>✅ E-book com os 7 segredos de crescimento</li>
              <li>✅ 3 dicas extras exclusivas</li>
              <li>✅ Case real de crescimento de 300%</li>
            </ul>

            <div style="background: #fef2f2; border: 2px solid #ef4444; padding: 25px; margin: 25px 0; border-radius: 5px;">
              <h2 style="color: #dc2626; margin-top: 0; text-align: center;">🚨 ÚLTIMO DIA</h2>
              <p style="color: #991b1b; text-align: center; font-size: 18px; margin: 0;"><strong>Análise Estratégica GRATUITA de 60 minutos</strong></p>
            </div>

            <h3 style="color: #1e3a8a;">🔍 Na análise, você vai descobrir:</h3>
            <ul style="color: #374151;">
              <li>Os 3 maiores gargalos que travam seu crescimento</li>
              <li>Quanto dinheiro você está perdendo mensalmente</li>
              <li>O plano exato para dobrar seu faturamento em 90 dias</li>
              <li>As oportunidades que você não está enxergando</li>
            </ul>

            <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 20px 0;">
              <h3 style="color: #15803d; margin-top: 0;">💰 Valor Normal: R$ 500</h3>
              <h2 style="color: #16a34a; margin: 10px 0;">Para Você: GRATUITO</h2>
              <p style="color: #166534; margin-bottom: 0;"><strong>Mas apenas hoje!</strong></p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/5511999999999?text=Quero aproveitar a análise GRATUITA da StrateUp hoje mesmo!" 
                 style="background: #dc2626; color: white; padding: 20px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 18px;">
                💬 SIM, QUERO MINHA ANÁLISE GRATUITA
              </a>
            </div>

            <div style="text-align: center; background: #f3f4f6; padding: 15px; border-radius: 5px; margin-top: 30px;">
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                <strong>Atenção:</strong> Só conseguimos atender 5 empresas por semana.<br>
                Se não responder hoje, sua vaga será liberada para outra empresa.
              </p>
            </div>

            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px;">
              <p><strong>StrateUp - Consultoria em Crescimento Empresarial</strong></p>
              <p>Esta é a sua última chance de acelerar seu crescimento</p>
            </div>
          </div>
        </body>
      </html>
    `,
    daysDelay: 7
  }
];

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Initialize Resend
    const resend = new Resend(Deno.env.get('RESEND_API_KEY')!);

    console.log('Starting email sequence processing...');

    // Buscar leads que precisam receber próximo email
    const { data: leadsToProcess, error: queryError } = await supabase
      .from('ebook_leads')
      .select('*')
      .lte('next_email_date', new Date().toISOString())
      .eq('sequence_completed', false)
      .gte('sequence_step', 1)
      .lt('sequence_step', emailSequence.length);

    if (queryError) {
      console.error('Error querying leads:', queryError);
      throw new Error('Erro ao buscar leads: ' + queryError.message);
    }

    console.log(`Found ${leadsToProcess?.length || 0} leads to process`);

    if (!leadsToProcess || leadsToProcess.length === 0) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Nenhum lead para processar no momento',
        processed: 0
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    let processedCount = 0;
    let errorCount = 0;

    // Processar cada lead
    for (const lead of leadsToProcess) {
      try {
        const nextStep = lead.sequence_step + 1;
        const sequenceConfig = emailSequence.find(s => s.step === nextStep);

        if (!sequenceConfig) {
          // Completar sequência se não há próximo step
          await supabase
            .from('ebook_leads')
            .update({
              sequence_completed: true,
              next_email_date: null,
            })
            .eq('id', lead.id);
          
          console.log(`Sequence completed for lead ${lead.email}`);
          continue;
        }

        // Enviar email
        const emailResponse = await resend.emails.send({
          from: 'StrateUp <contato@resend.dev>',
          to: [lead.email],
          subject: sequenceConfig.subject,
          html: sequenceConfig.template(lead.name),
        });

        if (emailResponse.error) {
          console.error(`Error sending email to ${lead.email}:`, emailResponse.error);
          errorCount++;
          continue;
        }

        // Calcular próxima data de email
        const nextEmailStep = emailSequence.find(s => s.step === nextStep + 1);
        const nextEmailDate = nextEmailStep 
          ? new Date(Date.now() + (nextEmailStep.daysDelay * 24 * 60 * 60 * 1000))
          : null;

        // Atualizar lead
        await supabase
          .from('ebook_leads')
          .update({
            sequence_step: nextStep,
            last_email_sent_at: new Date().toISOString(),
            next_email_date: nextEmailDate?.toISOString() || null,
            sequence_completed: !nextEmailDate,
          })
          .eq('id', lead.id);

        console.log(`Email sent successfully to ${lead.email} - Step ${nextStep}`);
        processedCount++;

      } catch (leadError: any) {
        console.error(`Error processing lead ${lead.email}:`, leadError);
        errorCount++;
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Sequência processada com sucesso`,
      processed: processedCount,
      errors: errorCount,
      total: leadsToProcess.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error in email-sequence function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Erro interno do servidor',
      success: false 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

serve(handler);
