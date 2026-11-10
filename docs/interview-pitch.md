# Pitch de entrevista — Assistente comercial com IA

## Apresentação em 60 segundos

“Eu gosto de usar IA para resolver etapas concretas do trabalho, não só para criar um chatbot. Neste projeto, parti de um CRM que já recebia leads e pensei numa situação comum de vendas: a equipe precisa entender rapidamente quem entrou, o que essa empresa informou e qual seria um próximo contato útil.

Construí um assistente dentro do próprio fluxo do CRM. A pessoa escolhe um lead, recebe um resumo, sinais de intenção e urgência, uma prioridade sugerida e um rascunho de mensagem para WhatsApp. A recomendação pode ser aprovada pela pessoa responsável, e a análise e essa aprovação ficam no histórico do lead.

Usei IA como apoio: ela não envia mensagens nem muda o status do lead sozinha. Também mantive a chave do modelo no servidor e evitei enviar os dados de contato ao provedor. Eu ainda não afirmo que isso economizou horas ou aumentou conversão; essa é uma hipótese que eu validaria num piloto medindo tempo de triagem, edição das sugestões e resultados por origem.”

## Versão curta (20 segundos)

“Criei um assistente de IA integrado ao CRM para ajudar vendas a priorizar leads e preparar um primeiro contato. Ele resume o contexto, sugere um próximo passo e cria um rascunho de WhatsApp, com histórico e aprovação humana — sem enviar nada automaticamente.”

## Demonstração guiada (até 3 minutos)

1. Abra o CRM e mostre a lista de oportunidades e as diferentes origens.
2. Escolha um lead fictício com dados de diagnóstico e clique em **Gerar resumo IA**.
3. Mostre o resumo e a prioridade sugerida; explique que o sistema usa somente o contexto cadastrado disponível.
4. Abra a mensagem sugerida para WhatsApp, faça uma edição demonstrativa e copie ou abra o WhatsApp. Não envie durante a demo.
5. Clique em **Aprovar recomendação** e mostre o selo de aprovação e o histórico salvo no lead.
6. Recarregue o CRM ou selecione o lead novamente para demonstrar que o histórico continua disponível.
7. Encerre falando dos limites e de como mediria o impacto num piloto real.

Use somente dados sintéticos ou autorizados. Antes da demonstração, configure e publique a Edge Function, valide login e permissões, e teste o link do WhatsApp sem enviar mensagem.

## Perguntas e respostas

**Como você define sucesso?**

Eu começaria com um piloto pequeno e autorizado. Compararia tempo de triagem por lead antes/depois, percentual de sugestões aprovadas sem edição ou aprovadas após edição, tempo até o primeiro contato e taxa de resposta. Separaria os resultados por origem e observaria volume e período suficientes antes de tirar conclusões.

**Por que exigir aprovação humana?**

Dados podem estar incompletos e uma sugestão errada pode prejudicar a relação com o cliente. A pessoa comercial conhece o contexto e deve decidir se a recomendação faz sentido. Aprovar não envia a mensagem: apenas registra que a recomendação foi revisada.

**Como você protege os dados?**

A chave do provedor fica em secret do lado servidor. O modelo recebe apenas os campos comerciais necessários, sem nome, e-mail ou telefone. O CRM usa dados de contato localmente para apresentar o rascunho no WhatsApp. Em produção, eu ainda validaria permissões, retenção, consentimento e requisitos de privacidade da operação.

**O projeto já provou economia ou aumento de conversão?**

Não. A feature demonstra um fluxo funcional, mas não tenho resultados de produção validados. Eu apresentaria os indicadores como objetivos de avaliação, não como resultados obtidos.

**O que faria em seguida?**

Testaria as recomendações com pessoas de vendas, avaliaria qualidade e casos de erro, acompanharia custo e latência, refinaria o prompt e só então consideraria automatizar outras etapas — mantendo controles e aprovação apropriados.

## Frase final

“Esse projeto mostra como eu traduzo um problema operacional em uma solução utilizável: começo pelo fluxo de trabalho, escolho uma aplicação prática de IA, integro aos sistemas existentes, coloco limites claros e penso em como medir o valor real.”
