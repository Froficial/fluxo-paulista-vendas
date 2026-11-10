# Assistente de leads com IA

Este repositório contém uma aplicação de captação e gestão de leads, CRM e automações de e-mail construída com React, TypeScript, Vite e Supabase. O recurso **Assistente de leads com IA** acrescenta análise comercial assistida ao CRM.

## O que faz

- Carrega até 50 leads recentes do CRM e permite escolher um para análise.
- Classifica prioridade, intenção e urgência como alta, média ou baixa.
- Resume os sinais disponíveis, recomenda um próximo passo e redige uma mensagem para revisão humana.
- Não envia mensagens automaticamente e não envia nome nem e-mail do contato ao provedor de IA.
- A análise não altera o status ou os dados do lead.

A análise é uma sugestão probabilística, não uma decisão automática. Se não houver dados suficientes, o modelo é instruído a indicar incerteza e sugerir uma pergunta de descoberta.

## Executar localmente

Requisitos: Node.js e npm.

```sh
npm install
npm run dev
```

Abra `/ai-assistant` na aplicação. O navegador também precisa ter uma sessão autenticada válida no Supabase e acesso de leitura à tabela `leads`.

## Configurar a função de IA

A chave do provedor é usada apenas na função server-side; nunca coloque `OPENAI_API_KEY` no frontend ou em variáveis `VITE_*`.

1. Configure a chave no projeto Supabase:

   ```sh
   supabase secrets set OPENAI_API_KEY=...
   ```

2. Opcionalmente, escolha outro modelo compatível com a API de Chat Completions:

   ```sh
   supabase secrets set OPENAI_MODEL=gpt-4o-mini
   ```

3. Publique a função e a configuração:

   ```sh
   supabase functions deploy ai-lead-analysis
   ```

A função valida a sessão do usuário e exige JWT. Para restringir chamadas do navegador em produção, defina `APP_ORIGIN` como a origem exata do site antes de publicar; CORS aberto não substitui autenticação.

## Teste e validação

```sh
npm run lint
npm run build
```

Teste manualmente com um usuário autenticado e um lead de demonstração sem informações pessoais reais. Verifique o cenário de função não publicada, segredo ausente, sessão expirada e dados incompletos. Não registre dados sensíveis nos logs e não apresente métricas de economia ou conversão sem medi-las.
