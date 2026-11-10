# Assistente de leads com IA

Este repositório contém uma aplicação de captação e gestão de leads, CRM e automações de e-mail construída com React, TypeScript, Vite e Supabase. O **Assistente de leads com IA** ajuda a equipe comercial a interpretar sinais cadastrados, priorizar o atendimento e preparar um próximo contato — com uma pessoa revisando a recomendação.

## Demonstração

- CRM: `/crm` — veja a lista de leads e clique em **Gerar resumo IA** em um cartão.
- Assistente completo: `/ai-assistant` — selecione um lead e visualize a análise detalhada.
- O botão funciona por lead. A análise mostra resumo, prioridade, intenção, urgência, sinais considerados, próxima ação e rascunho copiável.

## O que faz

- Carrega leads existentes do CRM e permite analisar um lead sob demanda.
- Classifica prioridade, intenção e urgência como alta, média ou baixa.
- Resume apenas informações comerciais disponíveis, explica os sinais e sugere uma próxima ação.
- Gera um rascunho de mensagem para o vendedor revisar e copiar.
- Não envia mensagens automaticamente e não altera status ou score do lead.
- Nome, e-mail e telefone não são enviados ao provedor de IA; são enviados apenas os campos de contexto comercial necessários à análise.

A análise é uma sugestão probabilística, não uma decisão automática. Dados incompletos devem resultar em incerteza e pergunta de descoberta, não em fatos inventados. Use dados fictícios ou autorizados para demonstrações.

## Arquitetura

1. A interface React/TypeScript obtém contexto comercial do cadastro de lead no Supabase.
2. A chamada à Supabase Edge Function `ai-lead-analysis` requer sessão autenticada.
3. A função filtra e valida os campos, mantém a chave do provedor no servidor, chama um modelo compatível com a API de Chat Completions e valida o JSON de saída.
4. A análise é apresentada no CRM para revisão humana. Nesta versão, o resumo é mantido na sessão do navegador e não é persistido no banco.

## Executar localmente

Requisitos: Node.js e npm.

```sh
npm install
npm run dev
```

A aplicação requer configuração Supabase, sessão autenticada e acesso às tabelas usadas pelo CRM. A página e o botão podem ser vistos em `/ai-assistant` e `/crm`.

## Configurar a função de IA

Nunca coloque `OPENAI_API_KEY` no frontend ou em variáveis `VITE_*`.

1. Configure a chave no projeto Supabase:

   ```sh
   supabase secrets set OPENAI_API_KEY=...
   ```

2. Opcionalmente, escolha um modelo compatível com Chat Completions:

   ```sh
   supabase secrets set OPENAI_MODEL=gpt-4o-mini
   ```

3. Configure `APP_ORIGIN` com a origem exata da aplicação em produção e publique a função:

   ```sh
   supabase secrets set APP_ORIGIN=https://seu-dominio.example
   supabase functions deploy ai-lead-analysis
   ```

A função valida a sessão do usuário e exige JWT. CORS não substitui autenticação. Verifique também as políticas de acesso do Supabase às tabelas do CRM. Não envie dados pessoais reais sem autorização e sem avaliar os requisitos de privacidade aplicáveis.

## Validar

```sh
npm run lint
npm run build
```

Teste com lead fictício e usuário autenticado. Valide função indisponível, segredo ausente, sessão expirada, dados insuficientes e saída inválida do modelo. Não alegue economia de horas nem aumento de conversão sem medir esses resultados.

## Resumo para portfólio

**Problema:** equipes comerciais recebem leads por diferentes canais, mas precisam interpretar rapidamente o contexto e decidir qual deve ser o próximo passo.

**Solução:** implementei um assistente de IA integrado ao CRM existente. Sob demanda, ele organiza sinais do cadastro, sugere prioridade, resume contexto e redige um primeiro rascunho para revisão do vendedor.

**Minha abordagem:** reaproveitei a interface React/TypeScript e os dados do Supabase; coloquei a chamada ao provedor numa Edge Function autenticada para manter a chave fora do navegador; filtrei dados pessoais desnecessários; validei o formato de saída e mantive a decisão e o envio nas mãos da pessoa usuária.

**Tecnologias:** React, TypeScript, Supabase, Edge Functions, API de modelo de linguagem e Tailwind CSS.

**Estado e próximos passos:** funcionalidade implementada, requer credenciais e implantação para execução real. A análise não é persistida. Próximas melhorias: persistir histórico com controles de acesso, adicionar avaliação humana das recomendações e medir tempo de triagem e qualidade da priorização em um piloto autorizado.

**Não apresentar como resultado comprovado:** horas economizadas, aumento de conversão, precisão do score ou validação com usuários — esses indicadores ainda precisam ser medidos.
