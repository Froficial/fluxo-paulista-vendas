-- Habilitar extensões necessárias para cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Adicionar templates de email baseados em DotCom/Expert Secrets
INSERT INTO email_templates (name, sequence_type, step_number, delay_days, subject, html_content) VALUES
-- Ebook sequence (Expert Secrets inspired)
('Ebook Welcome', 'ebook', 1, 0, '🎁 Seu E-book: Os 7 Segredos para Destravar o Crescimento', 
'<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Seu E-book StrateUp</title></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0; font-size: 28px;">🎉 Parabéns, {{name}}!</h1>
    <p style="margin: 10px 0 0 0; font-size: 18px;">Seu e-book chegou!</p>
  </div>
  <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #1e3a8a;">Os 7 Segredos para Destravar o Crescimento</h2>
    <p>Olá <strong>{{name}}</strong>,</p>
    <p>Você acabou de dar o primeiro passo para transformar sua empresa em uma máquina de crescimento previsível.</p>
    <div style="background: #dcfdf7; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0;">
      <h3 style="color: #065f46;">📚 O que você vai descobrir:</h3>
      <ul style="color: #047857;">
        <li>Os 3 erros FATAIS que travam 90% das empresas</li>
        <li>O framework EXATO para crescer 300%+ em 12 meses</li>
        <li>Como criar um funil de vendas que converte no piloto automático</li>
        <li>A fórmula secreta para escalar sem perder qualidade</li>
      </ul>
    </div>
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://wa.me/5511999999999?text=Olá! Sou {{name}} e acabei de baixar o e-book. Quero uma análise gratuita!" 
         style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
        💬 QUERO ANÁLISE GRATUITA
      </a>
    </div>
  </div>
</body>
</html>'),

('Ebook Day 2 - Mistakes', 'ebook', 2, 1, '💡 Os 3 Erros que Custam MILHÕES às Empresas', 
'<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Os 3 Erros Fatais - StrateUp</title></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0; font-size: 28px;">⚠️ ATENÇÃO {{name}}!</h1>
    <p style="margin: 10px 0 0 0; font-size: 18px;">Estes 3 erros podem estar custando MILHÕES para sua empresa</p>
  </div>
  <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Depois de analisar mais de 500 empresas, descobri que 90% cometem os mesmos 3 erros fatais...</p>
    
    <div style="background: #fee2e2; border-left: 4px solid #dc2626; padding: 20px; margin: 20px 0;">
      <h3 style="color: #991b1b;">❌ ERRO #1: Não têm um funil estruturado</h3>
      <p style="color: #dc2626;">Resultado: Perdem 80% dos leads qualificados que chegam até eles.</p>
    </div>

    <div style="background: #fef3cd; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0;">
      <h3 style="color: #92400e;">❌ ERRO #2: Dependem só de indicações</h3>
      <p style="color: #b45309;">Resultado: Crescimento imprevisível e sazonal.</p>
    </div>

    <div style="background: #e0e7ff; border-left: 4px solid #6366f1; padding: 20px; margin: 20px 0;">
      <h3 style="color: #312e81;">❌ ERRO #3: Não acompanham métricas certas</h3>
      <p style="color: #3730a3;">Resultado: Tomam decisões no "achismo" e queimam dinheiro.</p>
    </div>

    <div style="text-align: center; margin: 30px 0; background: #f0fdf4; padding: 25px; border-radius: 5px;">
      <h3 style="color: #166534;">🎯 Quer descobrir como corrigir estes erros?</h3>
      <p style="color: #15803d;">Amanhã vou te mostrar o case REAL de uma empresa que corrigiu estes 3 erros e cresceu 347% em 8 meses.</p>
    </div>
  </div>
</body>
</html>'),

('Ebook Day 3 - Case Study', 'ebook', 3, 3, '📈 CASE: Como Crescer 347% em 8 Meses (PROVA REAL)', 
'<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Case 347% - StrateUp</title></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0; font-size: 28px;">🚀 CASE REAL, {{name}}!</h1>
    <p style="margin: 10px 0 0 0; font-size: 18px;">347% de crescimento em 8 meses</p>
  </div>
  <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #065f46;">🏢 A Situação Inicial</h2>
    <p>TechServices, empresa de 12 funcionários:</p>
    <ul>
      <li>Faturamento: R$ 95k/mês</li>
      <li>100% dependente de indicações</li>
      <li>Sem previsibilidade</li>
      <li>Margem apertada (18%)</li>
    </ul>

    <h2 style="color: #065f46;">🎯 A Estratégia (Framework dos 4 Pilares)</h2>
    
    <div style="background: #dcfdf7; border-left: 4px solid #10b981; padding: 20px; margin: 15px 0;">
      <h3 style="color: #065f46;">PILAR 1: Funil de Aquisição</h3>
      <p style="color: #047857;">Criamos um sistema que gera 50+ leads qualificados/mês através de conteúdo magnético.</p>
    </div>

    <div style="background: #fef3cd; border-left: 4px solid #f59e0b; padding: 20px; margin: 15px 0;">
      <h3 style="color: #92400e;">PILAR 2: Sistema de Conversão</h3>
      <p style="color: #b45309;">Implementamos uma sequência de nurturing que converte 35% dos leads em clientes.</p>
    </div>

    <div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 20px; margin: 15px 0;">
      <h3 style="color: #0c4a6e;">PILAR 3: Otimização de Processos</h3>
      <p style="color: #0369a1;">Automatizamos 80% das tarefas repetitivas, liberando tempo para crescimento.</p>
    </div>

    <div style="background: #f3e8ff; border-left: 4px solid #9333ea; padding: 20px; margin: 15px 0;">
      <h3 style="color: #6b21a8;">PILAR 4: Precificação Estratégica</h3>
      <p style="color: #7c2d12;">Reestruturamos a proposta de valor e aumentamos os preços em 65%.</p>
    </div>

    <h2 style="color: #065f46;">📊 Os Resultados em 8 Meses</h2>
    <div style="background: #f0fdf4; padding: 25px; border-radius: 5px; margin: 20px 0;">
      <ul style="color: #15803d; font-weight: bold; font-size: 16px;">
        <li>Faturamento: R$ 95k → R$ 425k/mês (+347%)</li>
        <li>Leads qualificados: 0 → 50+/mês</li>
        <li>Taxa de conversão: 8% → 35%</li>
        <li>Margem de lucro: 18% → 42%</li>
        <li>Previsibilidade: 0% → 95%</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 30px 0; background: #fef2f2; padding: 25px; border-radius: 5px; border: 2px solid #ef4444;">
      <h3 style="color: #991b1b;">⏰ E se fosse a SUA empresa?</h3>
      <p style="color: #dc2626;">Quantos R$ sua empresa está perdendo por não ter este sistema?</p>
      <a href="https://wa.me/5511999999999?text=Vi o case de 347% e quero implementar o Framework dos 4 Pilares na minha empresa!" 
         style="background: #dc2626; color: white; padding: 20px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin-top: 15px;">
        💬 QUERO IMPLEMENTAR AGORA
      </a>
    </div>
  </div>
</body>
</html>'),

('Ebook Day 7 - Last Chance', 'ebook', 4, 7, '🚨 ÚLTIMA CHANCE: Análise Estratégica GRATUITA', 
'<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Última Chance - StrateUp</title></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0; font-size: 28px;">⏰ {{name}}, Esta é Sua ÚLTIMA CHANCE!</h1>
    <p style="margin: 10px 0 0 0; font-size: 18px;">Análise Estratégica GRATUITA (Valor: R$ 500)</p>
  </div>
  <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Nos últimos 7 dias, você recebeu:</p>
    <ul>
      <li>✅ E-book com os 7 segredos de crescimento</li>
      <li>✅ Os 3 erros que custam milhões</li>
      <li>✅ Case real de crescimento de 347%</li>
      <li>✅ Framework dos 4 Pilares</li>
    </ul>

    <div style="background: #fef2f2; border: 3px solid #ef4444; padding: 25px; margin: 25px 0; border-radius: 5px; text-align: center;">
      <h2 style="color: #dc2626; margin: 0;">🚨 ÚLTIMA CHANCE</h2>
      <p style="color: #991b1b; font-size: 20px; font-weight: bold; margin: 10px 0;">Análise Estratégica GRATUITA</p>
      <p style="color: #dc2626; margin: 0;">Apenas HOJE!</p>
    </div>

    <h3 style="color: #1e3a8a;">🔍 Na análise de 60 minutos, você descobrirá:</h3>
    <ul style="color: #374151;">
      <li><strong>Os 3 maiores gargalos</strong> que estão travando seu crescimento</li>
      <li><strong>Quanto dinheiro você está perdendo</strong> mensalmente (pode ser chocante!)</li>
      <li><strong>O plano exato</strong> para dobrar seu faturamento em 90 dias</li>
      <li><strong>As oportunidades escondidas</strong> que você não está enxergando</li>
      <li><strong>Como implementar</strong> o Framework dos 4 Pilares na sua empresa</li>
    </ul>

    <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 20px 0;">
      <h3 style="color: #15803d;">💰 Investimento Normal: R$ 500</h3>
      <h2 style="color: #16a34a; margin: 10px 0;">Para Você Hoje: GRATUITO</h2>
      <p style="color: #166534;"><strong>Mas apenas nas próximas 12 horas!</strong></p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://wa.me/5511999999999?text=ÚLTIMA CHANCE! Quero aproveitar a análise estratégica GRATUITA da StrateUp hoje mesmo!" 
         style="background: #dc2626; color: white; padding: 25px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 18px; animation: pulse 2s infinite;">
        💬 SIM, QUERO MINHA ANÁLISE GRATUITA
      </a>
    </div>

    <div style="text-align: center; background: #fef2f2; padding: 20px; border-radius: 5px; margin-top: 30px; border: 1px solid #fecaca;">
      <p style="color: #991b1b; margin: 0; font-weight: bold;">⚠️ ATENÇÃO: Só conseguimos atender 3 empresas por semana.</p>
      <p style="color: #dc2626; margin: 5px 0 0 0;">Se não responder hoje, sua vaga será liberada.</p>
    </div>

    <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px;">
      <p><strong>StrateUp - Consultoria em Crescimento Empresarial</strong></p>
      <p>Esta é sua última chance de acelerar seu crescimento</p>
    </div>
  </div>
</body>
</html>'),

-- Webinar sequence templates
('Webinar Confirmation', 'webinar', 1, 0, '✅ Confirmado! Sua Vaga no Webinar Exclusivo', 
'<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Webinar Confirmado - StrateUp</title></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0; font-size: 28px;">🎉 CONFIRMADO, {{name}}!</h1>
    <p style="margin: 10px 0 0 0; font-size: 18px;">Sua vaga está garantida!</p>
  </div>
  <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #1e3a8a;">🚀 "Como Escalar sua Empresa de R$ 100k para R$ 1M em 12 Meses"</h2>
    
    <div style="background: #dcfdf7; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0;">
      <h3 style="color: #065f46;">📅 DETALHES DO WEBINAR:</h3>
      <ul style="color: #047857;">
        <li><strong>Data:</strong> {{webinar_date}}</li>
        <li><strong>Horário:</strong> 20h às 22h (Brasília)</li>
        <li><strong>Plataforma:</strong> Zoom (link será enviado 1h antes)</li>
        <li><strong>Duração:</strong> 90 minutos + Q&A</li>
      </ul>
    </div>

    <h3 style="color: #1e3a8a;">💎 O que você vai aprender:</h3>
    <ul style="color: #374151;">
      <li>O método EXATO usado por 500+ empresas para escalar rapidamente</li>
      <li>Os 3 pilares fundamentais para crescimento previsível</li>
      <li>Como criar um funil que gera R$ 100k+ mensais no automático</li>
      <li>A fórmula para aumentar o ticket médio em 200%</li>
      <li>Case ao vivo: empresa que saiu de R$ 50k para R$ 800k/mês</li>
    </ul>

    <div style="background: #fef3cd; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0;">
      <h3 style="color: #92400e;">🎁 BÔNUS EXCLUSIVOS:</h3>
      <ul style="color: #b45309;">
        <li>Planilha de Projeção de Crescimento (R$ 297)</li>
        <li>Template de Funil de Vendas (R$ 197)</li>
        <li>Checklist dos 50 KPIs Essenciais (R$ 147)</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://wa.me/5511999999999?text=Estou confirmado no webinar! Tenho algumas dúvidas sobre minha empresa." 
         style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
        💬 FALAR NO WHATSAPP
      </a>
    </div>

    <div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 20px; margin: 20px 0;">
      <h3 style="color: #0c4a6e;">📧 FIQUE ATENTO:</h3>
      <p style="color: #0369a1;">Você receberá lembretes por email e WhatsApp. O link do Zoom será enviado 1 hora antes do início.</p>
    </div>
  </div>
</body>
</html>'),

('Webinar Reminder 24h', 'webinar', 2, 1, '⏰ AMANHÃ: Webinar que Pode Mudar sua Empresa', 
'<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Lembrete Webinar - StrateUp</title></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0; font-size: 28px;">⏰ AMANHÃ, {{name}}!</h1>
    <p style="margin: 10px 0 0 0; font-size: 18px;">Seu webinar exclusivo</p>
  </div>
  <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #92400e;">🚀 "Como Escalar de R$ 100k para R$ 1M em 12 Meses"</h2>
    
    <div style="background: #fef3cd; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0;">
      <h3 style="color: #92400e;">📅 AMANHÃ:</h3>
      <p style="color: #b45309; font-size: 18px;"><strong>{{webinar_date}} às 20h (Brasília)</strong></p>
    </div>

    <p>Preparei algo MUITO especial para você...</p>

    <h3 style="color: #1e3a8a;">🎯 Amanhã você vai descobrir:</h3>
    <ul style="color: #374151;">
      <li><strong>O Segredo dos R$ 1M:</strong> O que empresas milionárias fazem diferente</li>
      <li><strong>Framework Exclusivo:</strong> O sistema usado por +500 empresas</li>
      <li><strong>Case Bombástico:</strong> R$ 50k → R$ 800k/mês em 14 meses</li>
      <li><strong>Estratégia Revelada:</strong> Como aumentar ticket médio em 200%</li>
    </ul>

    <div style="background: #fee2e2; border-left: 4px solid #dc2626; padding: 20px; margin: 20px 0;">
      <h3 style="color: #991b1b;">🚨 ATENÇÃO:</h3>
      <p style="color: #dc2626;">Este conteúdo NUNCA foi revelado publicamente. É exclusivo para os participantes do webinar.</p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <p style="font-size: 16px; margin-bottom: 20px;">Adicionei você no meu WhatsApp para enviar o link:</p>
      <a href="https://wa.me/5511999999999?text=Oi! Estou confirmado no webinar de amanhã. Pode me enviar o link?" 
         style="background: #25d366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
        💬 GARANTIR MEU LINK
      </a>
    </div>

    <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 20px 0;">
      <h3 style="color: #15803d;">💎 BÔNUS DE ÚLTIMA HORA:</h3>
      <p style="color: #166534;">Para quem participar até o final, vou revelar minha planilha SECRETA de projeção de crescimento (nunca compartilhada antes)!</p>
    </div>
  </div>
</body>
</html>'),

('Webinar Reminder 1h', 'webinar', 3, 2, '🔴 AO VIVO em 1 HORA: Link do Webinar Dentro', 
'<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>LINK DO WEBINAR - StrateUp</title></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0; font-size: 28px;">🔴 AO VIVO EM 1 HORA!</h1>
    <p style="margin: 10px 0 0 0; font-size: 18px;">{{name}}, seu link está aqui</p>
  </div>
  <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
    <div style="background: #dcfdf7; border: 3px solid #10b981; padding: 25px; margin: 20px 0; border-radius: 5px; text-align: center;">
      <h3 style="color: #065f46; margin: 0;">🔗 SEU LINK EXCLUSIVO:</h3>
      <p style="color: #047857; font-size: 16px; margin: 10px 0;">
        <a href="https://zoom.us/j/webinar-link" style="color: #10b981; font-weight: bold;">
          👆 CLIQUE AQUI PARA ENTRAR NO WEBINAR
        </a>
      </p>
      <p style="color: #065f46; margin: 0; font-size: 14px;">ID: 123 456 789 | Senha: CRESCER</p>
    </div>

    <div style="background: #fef3cd; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0;">
      <h3 style="color: #92400e;">⏰ HORÁRIO:</h3>
      <p style="color: #b45309; font-size: 18px; margin: 0;"><strong>Hoje às 20h (Brasília) - INÍCIO EM 1 HORA</strong></p>
    </div>

    <h3 style="color: #1e3a8a;">🎯 AGENDA DE HOJE:</h3>
    <ul style="color: #374151;">
      <li><strong>20h00-20h15:</strong> O Mindset dos R$ 1M</li>
      <li><strong>20h15-20h45:</strong> Framework dos 4 Pilares</li>
      <li><strong>20h45-21h15:</strong> Case Prático: R$ 50k → R$ 800k</li>
      <li><strong>21h15-21h45:</strong> Implementação Prática</li>
      <li><strong>21h45-22h00:</strong> Q&A + Bônus Secreto</li>
    </ul>

    <div style="background: #fee2e2; border-left: 4px solid #dc2626; padding: 20px; margin: 20px 0;">
      <h3 style="color: #991b1b;">🚨 IMPORTANTE:</h3>
      <ul style="color: #dc2626;">
        <li>Entre na sala 5 minutos antes</li>
        <li>Tenha papel e caneta em mãos</li>
        <li>Fique até o final para receber o bônus secreto</li>
        <li>Participe do chat - vou responder pessoalmente</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://zoom.us/j/webinar-link" 
         style="background: #dc2626; color: white; padding: 20px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 18px;">
        🔴 ENTRAR NO WEBINAR AGORA
      </a>
    </div>

    <p style="text-align: center; color: #6b7280; margin-top: 30px;">
      Problemas com o link? Me chame no 
      <a href="https://wa.me/5511999999999?text=Preciso de ajuda com o link do webinar" style="color: #25d366; font-weight: bold;">WhatsApp</a>
    </p>
  </div>
</body>
</html>');

-- Criar cron job para processar sequência de emails automaticamente
SELECT cron.schedule(
  'process-email-sequence',
  '*/30 * * * *', -- Executa a cada 30 minutos
  $$
  SELECT
    net.http_post(
        url:='https://eftwdaeihoxcwjvkqjdc.supabase.co/functions/v1/email-sequence',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdHdkYWVpaG94Y3dqdmtxamRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzgzMTU4NiwiZXhwIjoyMDYzNDA3NTg2fQ.SiDGi5mqo6JO8Y-s6gqOB0YbYrJ5dDa8e_iZyT1k3cY"}'::jsonb,
        body:='{"trigger": "cron"}'::jsonb
    ) as request_id;
  $$
);