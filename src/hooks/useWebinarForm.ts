
import { useState } from 'react';
import { useWebinarSubmit } from './useWebinarSubmit';

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
}

export const useWebinarForm = (onSuccess?: () => void) => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', whatsapp: '' });
  const { submitWebinar, isSubmitting, showSuccess } = useWebinarSubmit();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await submitWebinar(formData);
    
    if (result.success && onSuccess) {
      onSuccess();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    handleInputChange,
    isSubmitting,
    showSuccess,
    handleSubmit
  };
};
