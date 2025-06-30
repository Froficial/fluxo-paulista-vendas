
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const handleWhatsAppClick = () => {
    const message = "Olá! Vim através do site da StrateUp e gostaria de saber mais sobre como vocês podem ajudar minha empresa a crescer!";
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        y: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        },
      }}
    >
      <MessageCircle className="h-8 w-8" />
      <motion.div
        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        1
      </motion.div>
    </motion.button>
  );
};
