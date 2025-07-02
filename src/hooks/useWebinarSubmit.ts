import { useState } from 'react';
import { useLeadSubmit } from './useLeadSubmit';

interface WebinarFormData {
  name: string;
  email: string;
  company_name?: string;
}

export const useWebinarSubmit = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { submitLead, isSubmitting } = useLeadSubmit();

  const submitWebinar = async (formData: WebinarFormData) => {
    const result = await submitLead({
      ...formData,
      lead_source: 'webinar',
      metadata: {
        webinar_date: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString(), // 7 days from now
      }
    });

    if (result.success) {
      setShowSuccess(true);
    }

    return result;
  };

  return {
    submitWebinar,
    isSubmitting,
    showSuccess,
    setShowSuccess
  };
};