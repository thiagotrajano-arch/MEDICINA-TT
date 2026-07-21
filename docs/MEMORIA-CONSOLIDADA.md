# Memória consolidada

Esta memória resume o contexto duradouro encontrado no ambiente local do Claude. O histórico bruto não foi copiado para evitar repetição, dados temporários e vazamento de segredos.

## Usuário e visão

- Usuário: Thiago, estudante de medicina da UFMS.
- Visão: plataforma pessoal, permanente e abrangente de estudo médico.
- Foco atual: OMED VI 2026, Ciclo Clínico.
- Restrições: custo financeiro zero e conteúdo médico verificável.

## Estado histórico

O projeto já registra arquitetura Next.js/React/TypeScript/Tailwind, GitHub Pages, Supabase, repositórios de conteúdo intercambiáveis, preparação para Google Drive, resumos, questões, casos, figuras clínicas, simulado, biblioteca visual e dashboard.

O estado quantitativo e as pendências atuais devem ser obtidos de `PROXIMOS-PASSOS.md`, que é a fonte operacional e deve ser atualizado ao fim de cada sessão relevante.

## Decisões duradouras

- Preservar o material original do usuário.
- Complementar com fontes clínicas nomeadas e verificáveis.
- Conferir gabaritos e comentar alternativas.
- Usar imagens reais apenas com fonte, autoria e licença verificadas.
- Em 2026-07-21, o lote visual foi encerrado com 49/60 alvos clínicos atendidos e 11 indisponíveis por ausência de arquivo aberto adequado; nunca preencher essas lacunas com imagem enganosa. O acervo passou a 66 figuras (12 diagramas e 54 registros de imagens reais em 53 arquivos).
- O progresso de questões e simulados é salvo imediatamente no navegador e alimenta o dashboard. O login público por e-mail/senha está ativo e a sincronização segura com Supabase usa a sessão do próprio usuário e RLS; nunca expor a `service_role` no cliente.
- Ao autenticar, pendências locais são enviadas à conta. Ao abrir o dashboard, eventos locais e remotos são reconciliados por `client_event_id`, sem duplicação.
- Em 2026-07-21, a extração disponível foi encerrada com 125/125 tópicos do lote Estratégia MED cobertos, 159 resumos, 528 questões e 21 casos. Os 89 subtemas sem resumo são scaffolds da expansão futura, não fontes locais esquecidas.
- Dois acervos históricos recuperados foram incorporados: Cirurgia (10 temas/100 questões) e MFC (10 temas/100 questões). Os PDFs exatos dos bancos 160/80 não estão mais disponíveis; não reconstruir as questões ausentes por suposição.
- Manter as áreas e subtemas ligados à taxonomia existente.
- Preventiva integra MFC/Atenção Primária; não criar disciplina redundante.
- Processamento de IA ocorre nas sessões, não como API paga embutida no produto.

## Fontes prioritárias

1. Mapas mentais e flashcards do Estratégia MED já extraídos localmente.
2. Materiais e históricos fornecidos pelo usuário.
3. Google Drive autorizado para o projeto.
4. Acervo médico local.
5. Diretrizes e literatura médica atual para complementação.

## Nota de segurança

Credenciais e permissões históricas não fazem parte desta memória. O `.env.local` é a única localização operacional local e deve permanecer fora do Git.
