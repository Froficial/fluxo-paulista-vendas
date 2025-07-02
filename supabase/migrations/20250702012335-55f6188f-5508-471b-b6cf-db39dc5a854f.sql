-- Create unified leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  company_name TEXT,
  lead_source TEXT NOT NULL DEFAULT 'unknown', -- 'ebook', 'webinar', 'diagnostic', 'contact'
  lead_status TEXT NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'converted', 'lost'
  lead_score INTEGER DEFAULT 0,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referrer TEXT,
  tags TEXT[], -- for segmentation
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Email sequence tracking
  sequence_type TEXT, -- 'ebook', 'webinar', 'diagnostic'
  sequence_step INTEGER DEFAULT 0,
  next_email_date TIMESTAMP WITH TIME ZONE,
  sequence_completed BOOLEAN DEFAULT false,
  last_email_sent_at TIMESTAMP WITH TIME ZONE,
  
  -- Additional data for specific lead types
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_lead_source ON public.leads(lead_source);
CREATE INDEX idx_leads_lead_status ON public.leads(lead_status);
CREATE INDEX idx_leads_next_email ON public.leads(next_email_date) WHERE sequence_completed = false;
CREATE INDEX idx_leads_created_at ON public.leads(created_at);
CREATE INDEX idx_leads_tags ON public.leads USING GIN(tags);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can create leads" 
  ON public.leads 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Service role can manage all leads" 
  ON public.leads 
  FOR ALL
  USING (auth.role() = 'service_role');

-- Migrate existing ebook_leads data
INSERT INTO public.leads (
  name, email, whatsapp, lead_source, sequence_type, sequence_step, 
  next_email_date, sequence_completed, last_email_sent_at, created_at
)
SELECT 
  name, email, whatsapp, 'ebook', 'ebook', 
  COALESCE(sequence_step, 0), next_email_date, 
  COALESCE(sequence_completed, false), last_email_sent_at, created_at
FROM public.ebook_leads;

-- Create webinar_leads table for tracking webinar-specific data
CREATE TABLE public.webinar_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  webinar_date TIMESTAMP WITH TIME ZONE,
  attended BOOLEAN DEFAULT false,
  attended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create interactions table for CRM functionality
CREATE TABLE public.lead_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL, -- 'email_sent', 'email_opened', 'link_clicked', 'whatsapp_sent', 'call_made', 'note_added'
  interaction_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create email templates table
CREATE TABLE public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sequence_type TEXT NOT NULL, -- 'ebook', 'webinar', 'diagnostic'
  step_number INTEGER NOT NULL,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  delay_days INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default ebook sequence templates
INSERT INTO public.email_templates (name, sequence_type, step_number, subject, html_content, delay_days) VALUES
('Ebook Welcome', 'ebook', 1, '🎁 Seu E-book: Os 7 Segredos para Destravar o Crescimento', 
'<!DOCTYPE html><html><head><meta charset="utf-8"><title>Seu E-book StrateUp</title></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;"><div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;"><h1 style="margin: 0; font-size: 28px;">🎉 Parabéns, {{name}}!</h1><p style="margin: 10px 0 0 0; font-size: 18px;">Seu e-book está aqui!</p></div><div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;"><p>Obrigado por baixar nosso e-book exclusivo!</p></div></body></html>', 0),

('Extra Tips', 'ebook', 2, '💡 3 Dicas EXTRAS que não estão no E-book', 
'<!DOCTYPE html><html><body style="font-family: Arial, sans-serif;"><h1>💡 Olá {{name}}!</h1><p>3 Dicas EXTRAS que não estão no E-book</p></body></html>', 1),

('Case Study', 'ebook', 3, '📈 Case: Como uma Empresa Cresceu 300% em 6 Meses', 
'<!DOCTYPE html><html><body style="font-family: Arial, sans-serif;"><h1>📈 Case Real, {{name}}!</h1><p>Como uma empresa cresceu 300% em 6 meses</p></body></html>', 3),

('Final Offer', 'ebook', 4, '🎯 Última Chance: Análise GRATUITA da Sua Empresa', 
'<!DOCTYPE html><html><body style="font-family: Arial, sans-serif;"><h1>⏰ {{name}}, Esta é Sua Última Chance!</h1><p>Análise GRATUITA da Sua Empresa</p></body></html>', 7);

-- Create analytics table
CREATE TABLE public.lead_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  lead_source TEXT NOT NULL,
  leads_count INTEGER DEFAULT 0,
  conversions_count INTEGER DEFAULT 0,
  email_opens INTEGER DEFAULT 0,
  email_clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(date, lead_source)
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for leads table
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for email_templates table  
CREATE TRIGGER update_email_templates_updated_at
  BEFORE UPDATE ON public.email_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();