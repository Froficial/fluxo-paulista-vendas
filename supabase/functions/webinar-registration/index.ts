import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WebinarLeadRequest {
  name: string;
  email: string;
  company_name?: string;
  whatsapp?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  metadata?: Record<string, any>;
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

    const leadData: WebinarLeadRequest = await req.json();

    console.log('Processing webinar registration:', leadData);

    // Calculate next email date (1 day before webinar)
    const webinarDate = leadData.metadata?.webinar_date 
      ? new Date(leadData.metadata.webinar_date)
      : new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)); // 7 days from now

    const nextEmailDate = new Date(webinarDate.getTime() - (1 * 24 * 60 * 60 * 1000)); // 1 day before

    // Save lead to database
    const { data: savedLead, error: leadError } = await supabase
      .from('leads')
      .insert({
        name: leadData.name,
        email: leadData.email,
        whatsapp: leadData.whatsapp || null,
        company_name: leadData.company_name || null,
        lead_source: 'webinar',
        sequence_type: 'webinar',
        sequence_step: 1,
        next_email_date: nextEmailDate.toISOString(),
        sequence_completed: false,
        utm_source: leadData.utm_source,
        utm_medium: leadData.utm_medium,
        utm_campaign: leadData.utm_campaign,
        referrer: leadData.referrer,
        metadata: leadData.metadata || {}
      })
      .select()
      .single();

    if (leadError) {
      console.error('Error saving lead:', leadError);
      throw new Error('Erro ao salvar lead: ' + leadError.message);
    }

    console.log('Lead saved successfully:', savedLead);

    // Create webinar registration record
    const { error: webinarError } = await supabase
      .from('webinar_registrations')
      .insert({
        lead_id: savedLead.id,
        webinar_date: webinarDate.toISOString()
      });

    if (webinarError) {
      console.error('Error creating webinar registration:', webinarError);
      // Don't throw here as lead was already saved
    }

    // Send confirmation email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Confirmação - Webinar StrateUp</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🎉 Inscrição Confirmada!</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">${leadData.name}, você está confirmado!</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1e3a8a; margin-top: 0;">📅 Detalhes do Webinar</h2>
            
            <div style="background: #dcfdf7; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0;">
              <h3 style="color: #065f46; margin-top: 0;">🎯 Os 3 Erros FATAIS que Travam o Fluxo de Vendas</h3>
              <p style="color: #047857; margin: 10px 0;"><strong>Data:</strong> ${webinarDate.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p style="color: #047857; margin: 10px 0;"><strong>Horário:</strong> 20:00 (Brasília)</p>
              <p style="color: #047857; margin: 10px 0;"><strong>Duração:</strong> 90 minutos</p>
            </div>

            <div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 20px; margin: 20px 0;">
              <h3 style="color: #0c4a6e; margin-top: 0;">📧 Fique atento ao seu email!</h3>
              <p style="color: #0369a1;">Enviaremos o link de acesso 1 hora antes do webinar começar.</p>
            </div>

            <div style="background: #fef3cd; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">🎁 Bônus Especiais</h3>
              <p style="color: #b45309;">Todos os participantes receberão:</p>
              <ul style="color: #b45309;">
                <li>Template de Diagnóstico Empresarial</li>
                <li>Checklist dos 7 Pilares do Crescimento</li>
                <li>1 hora de consultoria gratuita (para os 10 primeiros)</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/5511999999999?text=Olá! Me inscrevi no webinar e gostaria de saber mais detalhes!" 
                 style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                💬 TIRE SUAS DÚVIDAS NO WHATSAPP
              </a>
            </div>

            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px;">
              <p><strong>StrateUp - Consultoria em Crescimento Empresarial</strong></p>
              <p>Nos vemos no webinar!</p>
              <p>Este email foi enviado para ${leadData.email}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: 'StrateUp <contato@resend.dev>',
      to: [leadData.email],
      subject: '🎯 Confirmação: Webinar "Os 3 Erros que Travam o Fluxo de Vendas"',
      html: emailHtml,
    });

    if (emailResponse.error) {
      console.error('Error sending email:', emailResponse.error);
      throw new Error('Erro ao enviar email: ' + emailResponse.error.message);
    }

    console.log('Email sent successfully:', emailResponse);

    // Update lead as email sent
    const { error: updateError } = await supabase
      .from('leads')
      .update({
        last_email_sent_at: new Date().toISOString(),
      })
      .eq('id', savedLead.id);

    if (updateError) {
      console.error('Error updating lead:', updateError);
      // Don't throw here as email was already sent
    }

    // Log interaction
    await supabase
      .from('lead_interactions')
      .insert({
        lead_id: savedLead.id,
        interaction_type: 'email_sent',
        interaction_data: {
          email_type: 'webinar_confirmation',
          subject: '🎯 Confirmação: Webinar "Os 3 Erros que Travam o Fluxo de Vendas"'
        }
      });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Inscrição confirmada! Email de confirmação enviado.',
        leadId: savedLead.id 
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
    console.error('Error in webinar-registration function:', error);
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