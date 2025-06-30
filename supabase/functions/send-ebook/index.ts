
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EbookLeadRequest {
  name: string;
  email: string;
  whatsapp?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Initialize Resend
    const resend = new Resend(Deno.env.get('RESEND_API_KEY')!);

    const { name, email, whatsapp }: EbookLeadRequest = await req.json();

    console.log('Processing ebook lead:', { name, email, whatsapp });

    // Save lead to database
    const { data: leadData, error: leadError } = await supabase
      .from('ebook_leads')
      .insert({
        name,
        email,
        whatsapp: whatsapp || null,
      })
      .select()
      .single();

    if (leadError) {
      console.error('Error saving lead:', leadError);
      throw new Error('Erro ao salvar lead: ' + leadError.message);
    }

    console.log('Lead saved successfully:', leadData);

    // Send email with ebook
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Seu E-book StrateUp</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🎉 Parabéns, ${name}!</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Seu e-book está aqui!</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1e3a8a; margin-top: 0;">Os 7 Segredos para Destravar o Crescimento da Sua Empresa</h2>
            
            <p>Olá <strong>${name}</strong>,</p>
            
            <p>Obrigado por baixar nosso e-book exclusivo! Você acabou de dar o primeiro passo para transformar sua empresa e destravar seu crescimento.</p>
            
            <div style="background: #dcfdf7; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0;">
              <h3 style="color: #065f46; margin-top: 0;">📚 O que você vai descobrir:</h3>
              <ul style="color: #047857;">
                <li>Os 3 erros FATAIS que travam o fluxo de vendas</li>
                <li>Como criar um sistema previsível de geração de clientes</li>
                <li>O framework EXATO usado por empresas que crescem 300%+</li>
                <li>Estratégias práticas para escalar sem perder qualidade</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 16px; margin-bottom: 20px;"><strong>👆 Seu e-book está em anexo neste email!</strong></p>
            </div>

            <div style="background: #fef3cd; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">🚀 Quer resultados ainda MAIS rápidos?</h3>
              <p style="color: #b45309;">Que tal uma conversa estratégica GRATUITA para analisar seu negócio e identificar as maiores oportunidades de crescimento?</p>
              <div style="text-align: center; margin-top: 20px;">
                <a href="https://wa.me/5511999999999?text=Olá! Sou ${encodeURIComponent(name)} e acabei de baixar o e-book. Gostaria de uma análise gratuita do meu negócio!" 
                   style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                  💬 FALAR NO WHATSAPP AGORA
                </a>
              </div>
            </div>

            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px;">
              <p><strong>StrateUp - Consultoria em Crescimento Empresarial</strong></p>
              <p>Transformando empresas em máquinas de crescimento previsível</p>
              <p>Este email foi enviado para ${email}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // For now, we'll send the email without attachment since we need to create the PDF
    // In a real scenario, you would generate or store the PDF and attach it
    const emailResponse = await resend.emails.send({
      from: 'StrateUp <contato@resend.dev>',
      to: [email],
      subject: '🎁 Seu E-book: Os 7 Segredos para Destravar o Crescimento',
      html: emailHtml,
      // TODO: Add PDF attachment here
      // attachments: [
      //   {
      //     filename: 'ebook-7-segredos-crescimento.pdf',
      //     content: pdfBuffer,
      //   },
      // ],
    });

    if (emailResponse.error) {
      console.error('Error sending email:', emailResponse.error);
      throw new Error('Erro ao enviar email: ' + emailResponse.error.message);
    }

    console.log('Email sent successfully:', emailResponse);

    // Update lead as email sent
    const { error: updateError } = await supabase
      .from('ebook_leads')
      .update({
        email_sent: true,
        email_sent_at: new Date().toISOString(),
      })
      .eq('id', leadData.id);

    if (updateError) {
      console.error('Error updating lead:', updateError);
      // Don't throw here as email was already sent
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Lead salvo e email enviado com sucesso!',
        leadId: leadData.id 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in send-ebook function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Erro interno do servidor',
        success: false 
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
