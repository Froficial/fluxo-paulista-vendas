
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface LeadMagnetPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadMagnetPopup: React.FC<LeadMagnetPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStep(2);
    setIsSubmitting(false);
  };

  const handleWhatsAppRedirect = () => {
    const message = `Olá! Sou ${formData.name} e acabei de baixar o e-book da StrateUp. Gostaria de saber mais sobre como vocês podem ajudar minha empresa a crescer!`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-blue-900">
            {step === 1 ? '🎁 E-book GRATUITO' : '✅ Sucesso!'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {step === 1 
              ? 'Os 7 Segredos para Destravar o Crescimento da Sua Empresa'
              : 'Seu e-book foi enviado para o e-mail!'
            }
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="popup-name">Nome Completo</Label>
              <Input
                id="popup-name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="popup-email">E-mail</Label>
              <Input
                id="popup-email"
                type="email"
                placeholder="seu@melhor-email.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="popup-whatsapp">WhatsApp (opcional)</Label>
              <Input
                id="popup-whatsapp"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.whatsapp}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                className="mt-1"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processando...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  BAIXAR E-BOOK GRÁTIS
                </>
              )}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-6xl">📧</div>
            <p className="text-gray-600">
              Confira sua caixa de entrada! O e-book foi enviado para <strong>{formData.email}</strong>
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 font-semibold mb-2">
                🚀 Quer resultados ainda MAIS rápidos?
              </p>
              <p className="text-green-700 text-sm mb-3">
                Fale conosco agora no WhatsApp e receba uma análise GRATUITA do seu negócio!
              </p>
              <Button 
                onClick={handleWhatsAppRedirect}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                FALAR NO WHATSAPP AGORA
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
