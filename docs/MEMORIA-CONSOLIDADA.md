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
- O progresso de questões e simulados é salvo imediatamente no navegador e alimenta o dashboard. A sincronização segura com Supabase está preparada, mas depende de habilitar um método público de autenticação; nunca expor a `service_role` no cliente para contornar essa restrição.
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
