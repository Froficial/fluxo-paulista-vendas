import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FunnelPro</h3>
            <p className="text-muted-foreground">
              Transformando negócios através de funis de venda inteligentes e automatizados.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Produtos</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/webinar" className="hover:text-foreground transition-colors">Webinar Gratuito</a></li>
              <li><a href="/ebook" className="hover:text-foreground transition-colors">E-book Gratuito</a></li>
              <li><a href="/diagnostico" className="hover:text-foreground transition-colors">Diagnóstico</a></li>
              <li><a href="/crm" className="hover:text-foreground transition-colors">CRM</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a></li>
              <li><a href="/unsubscribe" className="hover:text-foreground transition-colors">Descadastro</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contato@funnelpro.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="text-center text-muted-foreground">
          <p>&copy; 2024 FunnelPro. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};