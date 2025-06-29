
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">Agência Fluxo de Vendas</h3>
          <p className="text-gray-400">Construindo sistemas de crescimento para empresas B2B em São Paulo</p>
        </div>
        <div className="border-t border-gray-800 pt-6">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Agência Fluxo de Vendas. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
