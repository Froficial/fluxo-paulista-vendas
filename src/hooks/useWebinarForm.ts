
import { useState } from 'react';
import { useWebinarSubmit } from './useWebinarSubmit';

interface FormData {
  name: string;
  email: string;
}

export const useWebinarForm = (onSuccess?: () => void) => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const { submitWebinar, isSubmitting, showSuccess } = useWebinarSubmit();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await submitWebinar(formData);
    
    if (result.success && onSuccess) {
      onSuccess();
    }
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    showSuccess,
    handleSubmit
  };
};
