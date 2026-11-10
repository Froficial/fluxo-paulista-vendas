# Case de portfólio: assistente de priorização de leads com IA

## Pitch de 30 segundos

“Eu peguei um CRM de captação de leads e criei um assistente comercial com IA integrado ao fluxo de trabalho. O vendedor escolhe quando analisar um lead; o sistema resume o contexto disponível, sugere prioridade e próximo passo, e prepara um rascunho de mensagem. A IA não envia nada nem decide pelo time. Coloquei a chamada do modelo numa função autenticada do Supabase e evitei enviar nome, e-mail e telefone ao provedor.”

## Demonstração ao vivo (2–3 minutos)

1. Abra `/crm` e explique que a tela reúne leads por origem e status.
2. Escolha um lead fictício com dados de diagnóstico suficientes.
3. Clique em **Gerar resumo IA** no próprio cartão.
4. Mostre prioridade, intenção, urgência, sinais considerados e próximo passo.
5. Expanda o rascunho, copie-o e explique que a pessoa deve revisar antes de usar.
6. Abra `/ai-assistant` para mostrar o fluxo completo de seleção e a saída detalhada.
7. Explique os limites: sem envio automático, sem mudança automática de score/status e sem persistência de análise nesta versão.

Use somente leads fictícios ou dados cujo uso esteja autorizado. Configure a Edge Function, uma sessão Supabase e a chave do modelo antes da demo; não mostre segredos ou informações pessoais na gravação.

## História de produto

- **Problema de negócio:** priorizar e preparar o primeiro contato exige ler e interpretar informações espalhadas nos dados do lead.
- **Usuário:** pessoa de vendas ou operações comerciais.
- **Intervenção:** análise sob demanda, ligada ao registro de lead e disponível diretamente no cartão do CRM.
- **Resultado esperado:** reduzir esforço de triagem e dar consistência ao próximo passo — hipótese a validar, não métrica já comprovada.
- **Guardrails:** campos comerciais limitados, chave guardada no servidor, autenticação exigida, saída validada e revisão humana obrigatória.

## Perguntas que podem surgir na entrevista

**Por que não automatizar o envio?**

A recomendação pode estar errada ou incompleta. Mantive a decisão final e o contato com uma pessoa; automação de envio só faria sentido depois de validação, consentimento e controles adicionais.

**Como você mediria o impacto?**

Em um piloto autorizado, registraria tempo de triagem antes/depois, proporção de recomendações aceitas ou editadas, taxa de resposta e conversão por origem, com período de comparação e volume suficientes. Não afirmaria causalidade sem desenho de avaliação adequado.

**O que melhoraria depois?**

Persistência auditável das análises com RLS, feedback do vendedor, testes com casos avaliados por humanos, métricas de qualidade e custo/latência, controles de retenção e limites de taxa.

## Checklist antes de apresentar

- [ ] Configurar `OPENAI_API_KEY` como secret no Supabase (não no frontend).
- [ ] Definir `APP_ORIGIN` e publicar `ai-lead-analysis`.
- [ ] Confirmar login e permissões de leitura do CRM.
- [ ] Usar dados sintéticos e confirmar que a demo funciona no ambiente publicado.
- [ ] Executar `npm run lint` e `npm run build` no ambiente local.
- [ ] Gravar uma demo curta sem dados pessoais nem secrets.
- [ ] Incluir somente resultados e métricas realmente medidos.
