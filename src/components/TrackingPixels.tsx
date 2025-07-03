import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: any) => void;
    fbq?: (command: string, eventName: string, parameters?: any) => void;
    clarity?: (command: string, ...args: any[]) => void;
  }
}

interface TrackingPixelsProps {
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  clarityId?: string;
}

export const TrackingPixels = ({ 
  googleAnalyticsId = 'G-XXXXXXXXXX', 
  facebookPixelId = '1234567890123456',
  clarityId = 'abcdefghij'
}: TrackingPixelsProps) => {
  const location = useLocation();

  useEffect(() => {
    // Track page views when route changes
    if (window.gtag) {
      window.gtag('config', googleAnalyticsId, {
        page_path: location.pathname + location.search,
      });
    }

    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location, googleAnalyticsId]);

  useEffect(() => {
    // Load Google Analytics
    if (googleAnalyticsId && !document.querySelector(`script[src*="${googleAnalyticsId}"]`)) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(script);

      script.onload = () => {
        window.gtag = window.gtag || function() {
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push(arguments);
        };
        window.gtag('js', new Date() as any);
        window.gtag('config', googleAnalyticsId, {
          send_page_view: false // We'll send manually
        });
      };
    }

    // Load Facebook Pixel
    if (facebookPixelId && !document.querySelector(`script[src*="connect.facebook.net"]`)) {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${facebookPixelId}');
      `;
      document.head.appendChild(script);
    }

    // Load Microsoft Clarity
    if (clarityId && !document.querySelector(`script[src*="clarity.ms"]`)) {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarityId}");
      `;
      document.head.appendChild(script);
    }
  }, [googleAnalyticsId, facebookPixelId, clarityId]);

  return null;
};

// Hook para facilitar tracking de eventos
export const useTracking = () => {
  const trackEvent = (eventName: string, parameters?: any) => {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', eventName, parameters);
    }

    // Console log para debug
    console.log('Event tracked:', eventName, parameters);
  };

  const trackConversion = (value: number, currency: string = 'BRL') => {
    trackEvent('purchase', {
      value,
      currency,
      event_category: 'conversion'
    });
  };

  const trackLead = (leadSource: string) => {
    trackEvent('generate_lead', {
      event_category: 'lead_generation',
      lead_source: leadSource
    });
  };

  const trackFormSubmit = (formName: string) => {
    trackEvent('form_submit', {
      event_category: 'engagement',
      form_name: formName
    });
  };

  return {
    trackEvent,
    trackConversion,
    trackLead,
    trackFormSubmit
  };
};