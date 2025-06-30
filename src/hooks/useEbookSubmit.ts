
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EbookFormData {
  name: string;
  email: string;
  whatsapp: string;
}

export const useEbookSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitEbook = async (formData: EbookFormData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting ebook form:', formData);
      
      const { data, error } = await supabase.functions.invoke('send-ebook', {
        body: {
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp || undefined,
        },
      });

      if (error) {
        console.error('Error calling send-ebook function:', error);
        throw new Error(error.message || 'Erro ao processar solicitação');
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Erro ao processar solicitação');
      }

      console.log('Ebook submission successful:', data);
      toast.success('E-book enviado com sucesso! Verifique seu email.');
      
      return { success: true, data };
      
    } catch (error: any) {
      console.error('Error submitting ebook:', error);
      toast.error(error.message || 'Erro ao enviar e-book. Tente novamente.');
      return { success: false, error: error.message };
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitEbook,
    isSubmitting,
  };
};
