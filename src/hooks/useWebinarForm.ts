
import { useState } from 'react';
import { toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
}

export const useWebinarForm = (onSuccess?: () => void) => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setShowSuccess(true);
    if (onSuccess) onSuccess();
    toast.success('Inscrição confirmada! Verifique seu email.');
    setIsSubmitting(false);
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    showSuccess,
    handleSubmit
  };
};
