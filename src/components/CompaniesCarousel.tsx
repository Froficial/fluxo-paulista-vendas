
import React from 'react';
import { motion } from 'framer-motion';

const companies = [
  'Advocacia Martins',
  'Clínica BellaForma', 
  'Consultoria TechSP',
  'Contabilidade Silva',
  'Odontologia Premium',
  'Engenharia Construtiva',
  'Marketing Digital Pro',
  'Fisioterapia Vida',
  'Arquitetura Moderna',
  'Advocacia Criminal',
  'Clínica Estética Bella',
  'Consultoria Empresarial'
];

export const CompaniesCarousel: React.FC = () => {
  return (
    <div className="overflow-hidden py-8">
      <motion.div
        className="flex space-x-8"
        animate={{
          x: [0, -100 * companies.length]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
        style={{ width: `${companies.length * 200}px` }}
      >
        {[...companies, ...companies].map((company, index) => (
          <motion.div
            key={`${company}-${index}`}
            className="flex-shrink-0 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-white font-medium whitespace-nowrap text-sm">
              {company}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
