
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

    // Buscar templates de email do banco
    const { data: emailTemplates, error: templateError } = await supabase
      .from('email_templates')
      .select('*')
      .eq('is_active', true)
      .order('sequence_type, step_number');

    if (templateError) {
      console.error('Error fetching email templates:', templateError);
      throw new Error('Erro ao buscar templates: ' + templateError.message);
    }

    // Buscar leads que precisam receber próximo email
    const { data: leadsToProcess, error: queryError } = await supabase
      .from('leads')
      .select('*')
      .lte('next_email_date', new Date().toISOString())
      .eq('sequence_completed', false)
      .gte('sequence_step', 1)
      .in('sequence_type', ['ebook', 'webinar']);

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
        
        // Buscar template específico para esta sequência e step
        const template = emailTemplates.find(t => 
          t.sequence_type === lead.sequence_type && 
          t.step_number === nextStep
        );

        if (!template) {
          // Completar sequência se não há próximo template
          await supabase
            .from('leads')
            .update({
              sequence_completed: true,
              next_email_date: null,
            })
            .eq('id', lead.id);
          
          console.log(`Sequence completed for lead ${lead.email} - no more templates`);
          continue;
        }

        // Personalizar HTML com dados do lead
        let personalizedHtml = template.html_content
          .replace(/\{\{name\}\}/g, lead.name)
          .replace(/\{\{email\}\}/g, lead.email);

        // Se for webinar, adicionar data do webinar se disponível
        if (lead.sequence_type === 'webinar' && lead.metadata?.webinar_date) {
          const webinarDate = new Date(lead.metadata.webinar_date).toLocaleDateString('pt-BR');
          personalizedHtml = personalizedHtml.replace(/\{\{webinar_date\}\}/g, webinarDate);
        }

        // Enviar email
        const emailResponse = await resend.emails.send({
          from: 'StrateUp <contato@resend.dev>',
          to: [lead.email],
          subject: template.subject,
          html: personalizedHtml,
        });

        if (emailResponse.error) {
          console.error(`Error sending email to ${lead.email}:`, emailResponse.error);
          errorCount++;
          continue;
        }

        // Buscar próximo template para calcular data
        const nextTemplate = emailTemplates.find(t => 
          t.sequence_type === lead.sequence_type && 
          t.step_number === nextStep + 1
        );
        
        const nextEmailDate = nextTemplate 
          ? new Date(Date.now() + (nextTemplate.delay_days * 24 * 60 * 60 * 1000))
          : null;

        // Atualizar lead
        await supabase
          .from('leads')
          .update({
            sequence_step: nextStep,
            last_email_sent_at: new Date().toISOString(),
            next_email_date: nextEmailDate?.toISOString() || null,
            sequence_completed: !nextEmailDate,
          })
          .eq('id', lead.id);

        // Log interaction
        await supabase
          .from('lead_interactions')
          .insert({
            lead_id: lead.id,
            interaction_type: 'email_sent',
            interaction_data: {
              email_type: 'sequence_email',
              sequence_step: nextStep,
              subject: template.subject,
              template_id: template.id
            }
          });

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
