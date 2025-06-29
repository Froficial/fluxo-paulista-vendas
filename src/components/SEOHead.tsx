
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Transforme Seu Negócio em SP - Sistema de 3 Passos para Crescimento Previsível",
  description = "Descubra como sair do caos operacional e criar um fluxo previsível de clientes de alto valor em São Paulo. Webinar gratuito com sistema comprovado.",
  keywords = "marketing digital são paulo, crescimento empresarial, sistema de vendas, fluxo de clientes, webinar gratuito",
  canonicalUrl = "https://fluxo-paulista-vendas.com",
  ogImage = "/og-image.jpg"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Agência Fluxo de Vendas" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="pt-BR" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Agência Fluxo de Vendas" />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": title,
          "description": description,
          "url": canonicalUrl,
          "publisher": {
            "@type": "Organization",
            "name": "Agência Fluxo de Vendas"
          }
        })}
      </script>
    </Helmet>
  );
};
