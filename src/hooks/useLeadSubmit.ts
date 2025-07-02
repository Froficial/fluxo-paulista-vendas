import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface LeadFormData {
  name: string;
  email: string;
  whatsapp?: string;
  company_name?: string;
  lead_source: 'ebook' | 'webinar' | 'diagnostic' | 'contact';
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  metadata?: Record<string, any>;
}

export const useLeadSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLead = async (formData: LeadFormData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting lead:', formData);

      // Check for existing lead
      const { data: existingLead } = await supabase
        .from('leads')
        .select('id, email')
        .eq('email', formData.email)
        .single();

      if (existingLead) {
        toast.error('Este email já está cadastrado em nosso sistema.');
        return { success: false, error: 'Email já cadastrado' };
      }

      // Capture UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const leadData = {
        ...formData,
        utm_source: formData.utm_source || urlParams.get('utm_source'),
        utm_medium: formData.utm_medium || urlParams.get('utm_medium'),
        utm_campaign: formData.utm_campaign || urlParams.get('utm_campaign'),
        referrer: document.referrer || undefined,
        sequence_type: formData.lead_source,
        sequence_step: 0, // Will be updated when first email is sent
      };

      // Determine edge function based on lead source
      let functionName = '';
      switch (formData.lead_source) {
        case 'ebook':
          functionName = 'send-ebook';
          break;
        case 'webinar':
          functionName = 'webinar-registration';
          break;
        case 'diagnostic':
          functionName = 'diagnostic-submit';
          break;
        default:
          functionName = 'create-lead';
      }

      const { data, error } = await supabase.functions.invoke(functionName, {
        body: leadData,
      });

      if (error) {
        console.error(`Error calling ${functionName} function:`, error);
        throw new Error(error.message || 'Erro ao processar solicitação');
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Erro ao processar solicitação');
      }

      console.log('Lead submission successful:', data);
      
      // Show success message based on lead source
      const successMessages = {
        ebook: 'E-book enviado com sucesso! Verifique seu email.',
        webinar: 'Inscrição confirmada! Verifique seu email para os detalhes.',
        diagnostic: 'Diagnóstico enviado com sucesso! Verifique seu email.',
        contact: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
      };
      
      toast.success(successMessages[formData.lead_source]);
      
      return { success: true, data };
      
    } catch (error: any) {
      console.error('Error submitting lead:', error);
      toast.error(error.message || 'Erro ao processar solicitação. Tente novamente.');
      return { success: false, error: error.message };
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitLead,
    isSubmitting,
  };
};