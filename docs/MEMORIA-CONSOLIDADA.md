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
- Resumos e casos também usam progresso local-first. O registro consolidado por usuário/item preserva acesso, etapa, conclusão, favorito e anotação; a versão com `atualizado_em` mais recente vence na reconciliação entre dispositivos.
- Em 2026-07-21, a extração disponível foi encerrada com 125/125 tópicos do lote Estratégia MED cobertos, 159 resumos, 528 questões e 21 casos. Os 89 subtemas sem resumo são scaffolds da expansão futura, não fontes locais esquecidas.
- Dois acervos históricos recuperados foram incorporados: Cirurgia (10 temas/100 questões) e MFC (10 temas/100 questões). Os PDFs exatos dos bancos 160/80 não estão mais disponíveis; não reconstruir as questões ausentes por suposição.
- Manter as áreas e subtemas ligados à taxonomia existente.
- Preventiva integra MFC/Atenção Primária; não criar disciplina redundante.
- Processamento de IA ocorre nas sessões, não como API paga embutida no produto.
- Obsidian é o segundo cérebro pessoal para dúvidas, conexões e decisões de estudo. O vault local não substitui os arquivos de handoff do repositório e não exige login. Obsidian Sync, caso desejado, é um serviço separado.
- Backup lógico semanal do Supabase e keep-alive diário estão ativos no GitHub Actions. O primeiro artefato real foi validado em 2026-07-21 com retenção de 90 dias. Em CI, usar Supavisor session mode/IPv4 e cliente PostgreSQL 17; o endpoint direto do plano atual é IPv6 e não é alcançável pelos runners do GitHub.

## Fontes prioritárias

1. Mapas mentais e flashcards do Estratégia MED já extraídos localmente.
2. Materiais e históricos fornecidos pelo usuário.
3. Google Drive autorizado para o projeto.
4. Acervo médico local.
5. Diretrizes e literatura médica atual para complementação.

## Nota de segurança

Credenciais e permissões históricas não fazem parte desta memória. O `.env.local` é a única localização operacional local e deve permanecer fora do Git.

## Atualização de continuidade — 2026-07-28

- SISCAD concluído no cofre privado: 37 componentes, 36 planos disponíveis analisados e um indisponível; dados individuais continuam fora do repositório e do site.
- Estratégia reconciliado: 863 entradas ZIP, 824 nomes iniciais, cinco duplicatas exatas e 34 variantes distintas recuperadas; 858 PDFs distintos preservados. Ainda falta manifesto unificado e seleção por lacuna clínica.
- LANN, UE, Farmacologia e os 30 arquivos de `RESUMOS` foram triados privadamente. O Drive tem inventário prioritário por metadados, mas exige deduplicação antes de qualquer novo download/lote.
- Próxima fila: manifesto de fontes, matriz plano–tema–subtema, revisão editorial de Infectologia/GO, mapas mentais individuais e camada privada autenticada de atualização do curso.
- O roteiro de encerramento foi consolidado em `docs/PLANO-100-PASSOS.md`. A próxima retomada começa pelos passos 1–5 (manifesto, classificação, auditoria de mídia e ligação curricular), sem repetir as triagens já fechadas.
- Visão longitudinal confirmada: todo material já acessado deve ser relacionável às matérias e períodos já cursados, para revisão futura no site. Ciências Básicas do primeiro semestre e imagens clínicas são recursos centrais; os dois arquivos de referência recebidos são apenas parte dessa matriz e permanecem privados até integração autoral, validada e licenciada quando aplicável.
- Em 2026-07-29, o primeiro bloco de proveniência foi fechado em área privada: 1.161 arquivos de `Desktop/MEDICINA` receberam inventário e SHA-256, sem erros de leitura; cinco grupos de cópias idênticas foram apenas registrados e 253 fontes tiveram ligação direta com cache Markdown. Próxima fila: divergências do inventário e matriz `fonte → período/componente → disciplina → tema/subtema → destino permitido`.
- Em 2026-07-29, a camada autenticada privada do curso foi implementada em `/meu-curso`: disciplina, período, status, datas, dificuldade e observação; rascunho local; importação Markdown/CSV com pré-visualização; e histórico mínimo sem texto pessoal. As duas tabelas Supabase receberam RLS por proprietário, com permissões verificadas e sem leitura de dados individuais. Os passos 21 e 23–26 do plano estão concluídos; 27–28 dependem da matriz curricular privada completa.
- Em 2026-07-29, o primeiro recorte longitudinal chegou ao painel privado: para cada disciplina registrada, o site calcula a partir do acervo público a cobertura de resumos, questões, casos e figuras ancoradas, sinaliza lacunas editoriais e recomenda um próximo tópico por status/dificuldade. O cálculo não usa nem transmite SISCAD, Drive, PDFs, observações ou documentos pessoais. Não marcar os passos 27–28 como concluídos: ainda faltam a matriz curricular privada real e suas rotinas por período.
- Ainda em 2026-07-29, divergências, matriz longitudinal de famílias de fonte e auditoria de mídia foram fechadas. O registro atual contém 73 figuras (61 imagens reais com crédito/licença e 12 diagramas), sem IDs, arquivos ou referências quebrados; 57 referências estão ancoradas e 16 figuras aguardam contexto. A normalização explícita das onze lacunas visuais históricas segue pendente.
- A normalização das lacunas visuais históricas foi concluída em 2026-07-29: seis dos 11 alvos antigos foram atendidos posteriormente; permanecem cinco lacunas reais (placenta prévia por US, artrite por chikungunya, hérnia inguinal por TC, diverticulite por TC e fratura de quadril por RX), registradas em `docs/LACUNAS-VISUAIS.md` para busca dirigida futura.
- O lote de proveniência, checklist, lacunas visuais e teste seguro de restore foi publicado no commit `6a126af`; GitHub Pages concluiu com sucesso no run `30452513229`. A restauração do backup permanece pendente de execução do próximo workflow semanal.
- Em 2026-07-29, a linha de base da qualidade das questões foi fechada sem reproduzir conteúdo: 1.072 questões, 686 com comentários repetidos após normalização, 118 comentários curtos em 81 questões, 48 sem fonte e zero vazios. O auditor reutilizável é `npm run audit:questoes`; a prioridade editorial seguinte é Infectologia, com validação de diretriz atual antes de alterar gabaritos ou condutas.
- Ainda em 2026-07-29, foi iniciado o primeiro micro-lote clínico de Infectologia: quatro itens STORCH receberam rastreabilidade do Ministério da Saúde; uma orientação de HBV neonatal foi corrigida para priorizar as primeiras 12 horas, com limite de 24 horas para a vacina quando necessário. O registro público sanitizado é `docs/REVISAO-INFECTOLOGIA-LOTE-1.md`; a revisão integral dos passos 44–46 permanece pendente.
- O micro-lote foi publicado no commit `a89fc83` com GitHub Pages `30456204375` bem-sucedido; a raiz e `/questoes/` foram conferidas com HTTP 200. Auditoria filtrada, typecheck e lint passaram. O seed Supabase não respondeu dentro do limite seguro local e deve ser repetido/confirmado em retomada, sem assumir sincronização concluída.
- Ainda em 2026-07-29, os segundo e terceiro micro-lotes de Infectologia revisaram duas questões de imunizações com fontes PNI atuais e uma questão de sífilis com o PCDT IST. Eles eliminaram a única repetição normalizada e reduziram a fila para 33 comentários curtos em 21 questões; meningite e sepse continuam condicionadas a fonte primária atual e específica.
- Os lotes 2 e 3 foram publicados em `6dcc44f`; GitHub Pages `30457470874` foi bem-sucedido, e a raiz e `/questoes/` responderam HTTP 200. Seed Supabase segue pendente de confirmação, sem impacto na publicação estática.
- Ainda em 2026-07-29, a fronteira pública/privada do curso foi reforçada: `/semestres` passou a mostrar apenas ciclos genéricos de revisão e ganhou auditoria estática contra marcadores curriculares protegidos. A ingestão do Drive foi deixada inativa até haver inventário de metadados, allowlist, baseline e opt-in; logs passaram a usar somente contagens e códigos seguros. O backup ficou estrito quanto a configuração e o restore continua pendente de um run real. A migração `0007_restringe_monitoramento_autenticado.sql` foi aplicada, restringindo telemetria sanitizada ao usuário autenticado. O quarto micro-lote de Infectologia reduziu a fila para 23 comentários curtos em 16 questões, sem repetição nem fonte vazia.
- O bloco foi publicado em `31b3a36`; a produção respondeu HTTP 200 na raiz, em `/semestres/` e em `/questoes/`. A checagem de conteúdo confirmou a nova trilha genérica e a ausência do marcador individual legado. Nenhuma sincronização de Drive ou restauração nova de backup foi presumida por causa desse deploy.
- Em 2026-07-29, o `Site URL` e a allowlist de redirecionamento do Supabase foram confirmados para o domínio GitHub Pages. O teste de login/recuperação/sessão segue pendente e não deve registrar senha. A matriz operacional privada dos 12 semestres foi atualizada por metadados; os vínculos detalhados de plano → tema → subtema continuam em curadoria.
- Os commits `cc08b86` e `cac0eae` foram publicados em `main`; o deploy GitHub Pages `30482759219` terminou com sucesso, e `/` e `/meu-curso/` responderam HTTP 200. A próxima retomada deve priorizar testes pessoais de autenticação/sincronização, restore seguro do backup quando houver run e revisão editorial de Infectologia.
