
-- Criar tabela para armazenar os leads do ebook
CREATE TABLE public.ebook_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email_sent BOOLEAN DEFAULT false,
  email_sent_at TIMESTAMP WITH TIME ZONE
);

-- Criar índice para melhor performance
CREATE INDEX idx_ebook_leads_email ON public.ebook_leads(email);
CREATE INDEX idx_ebook_leads_created_at ON public.ebook_leads(created_at);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.ebook_leads ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção pública (qualquer pessoa pode se inscrever)
CREATE POLICY "Anyone can create ebook leads" 
  ON public.ebook_leads 
  FOR INSERT 
  WITH CHECK (true);

-- Política para admin visualizar todos os leads (opcional, para futuro painel admin)
CREATE POLICY "Service role can view all ebook leads" 
  ON public.ebook_leads 
  FOR SELECT 
  USING (auth.role() = 'service_role');
