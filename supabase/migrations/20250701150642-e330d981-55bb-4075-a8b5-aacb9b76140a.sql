
-- Adicionar campos para tracking da sequência de emails
ALTER TABLE public.ebook_leads 
ADD COLUMN sequence_step INTEGER DEFAULT 0,
ADD COLUMN next_email_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN sequence_completed BOOLEAN DEFAULT false,
ADD COLUMN last_email_sent_at TIMESTAMP WITH TIME ZONE;

-- Atualizar registros existentes
UPDATE public.ebook_leads 
SET sequence_step = 1, 
    next_email_date = created_at + INTERVAL '1 day',
    last_email_sent_at = email_sent_at
WHERE email_sent = true;

-- Criar índice para performance
CREATE INDEX idx_ebook_leads_next_email ON public.ebook_leads(next_email_date) 
WHERE sequence_completed = false;

-- Habilitar extensões necessárias para cron
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;
