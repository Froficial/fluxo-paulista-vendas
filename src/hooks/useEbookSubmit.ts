
import { useState } from 'react';
import { useLeadSubmit } from './useLeadSubmit';

interface EbookFormData {
  name: string;
  email: string;
  whatsapp: string;
}

export const useEbookSubmit = () => {
  const { submitLead, isSubmitting } = useLeadSubmit();

  const submitEbook = async (formData: EbookFormData) => {
    return await submitLead({
      ...formData,
      lead_source: 'ebook'
    });
  };

  return {
    submitEbook,
    isSubmitting,
  };
};
