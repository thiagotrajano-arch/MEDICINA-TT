# Pendências mestras — Codex Medicus

Atualizado em 2026-08-14. Este é o **único documento operacional de pendências**.
Ele reconcilia `PROXIMOS-PASSOS.md`, `docs/PLANO-100-PASSOS.md`,
`docs/AUDITORIA-20-LENTES-2026-08-11.md`, o handoff e evidências recentes.
Os arquivos anteriores permanecem como histórico e evidência; não devem gerar
filas paralelas.

## Decisão curricular vigente — 2026-08-14

HCPM VI não é uma fila ou bloqueio separado. Para fins de estudo e integração,
ele será tratado junto ao eixo BBPM VI; lacunas serão registradas por
disciplina/subtema quando houver evidência concreta, sem aguardar um plano
nominal separado.

## Leitura de estado

- **Concluído:** existe evidência verificável; não repetir sem motivo.
- **Parcial:** parte entregue, mas falta uma condição de aceite explícita.
- **Pendente:** ainda não iniciado ou sem evidência suficiente.
- **Bloqueado:** depende de disco, acesso, ambiente ou decisão do usuário.
- Material comercial, dados do SISCAD e mídia sensível permanecem fora do Git e
  do site público. Conteúdo público novo só nasce de síntese autoral revisada.

## Reconciliação executada — 2026-08-14

- [x] Backup e restauração validados no CI pelo run 31839733798: dump gerado,
  artefato guardado e conteúdo restaurado em PostgreSQL 17 temporário. O teste
  stock omite apenas extensões/objetos gerenciados do Supabase, índices
  dependentes e políticas/ACLs ausentes fora do Supabase; o dump original não é
  alterado.

- [x] Rodar o gate local reproduzível do export (`npm.cmd run
  audit:rotas:local`): oito rotas principais responderam HTTP 200, sem erro de
  aplicação, imagem sem `alt`, botão sem nome ou ID duplicado.
- [x] Confirmar novamente typecheck, lint, build estático (413/413 páginas),
  auditoria de questões, privacidade, figuras e integridade do diff.
- [x] Reconciliar a mídia privada: 347 itens `util` e 21 `contextual` possuem
  `subtema_id` válido; os dois `nao_util` sem correspondência permanecem fora
  da trilha.
- [x] Recalcular a matriz de cobertura por `subtemaId`: 304 subtemas, 234
  resumos, 1.332 questões e 55 casos vinculados. Há 70 subtemas sem resumo,
  149 sem questão e 266 sem caso; as lacunas OMED prioritárias estão separadas
  antes de qualquer novo lote. Evidência:
  `docs/MATRIZ-COBERTURA-CLINICA-2026-08-14.md` e
  `npm.cmd run audit:cobertura`.
- [~] P0.1 ficou reduzido à auditoria do host publicado e ao perfil específico
  das três páginas que antes ultrapassaram 60 s; o build atual conclui, mas não
  há evidência suficiente para declarar otimização por rota.
- [~] Aceite operacional de autenticação e progresso: em 2026-08-14 o usuário
  confirmou uso cotidiano estável do site. Os testes técnicos entre contas e
  do ciclo de mídia foram concluídos; recuperação visual, persistência após
  reinício e auditorias Lighthouse/axe permanecem como melhoria de qualidade,
  não como bloqueio de uso.
- [x] Lote validado foi versionado nos commits `425fd66`/`a49c975`, merged no
  commit `b1ca7e7` de `main` pelo PR #26, e publicado pelo Pages no run
  `31808280211`. A home e `Minha mídia` foram verificadas no endereço público
  sem erro de aplicação; QA autenticada completa, Lighthouse/axe e isolamento
  entre contas continuam como acompanhamento.

## Evidências já consolidadas

- Login por e-mail/senha, progresso local-first e RLS existem; a validação real
  ponta a ponta na conta do usuário ainda falta.
- Há 1.332 questões auditadas, sem duplicatas estruturais, comentários curtos,
  vazios, contraditórios ou fontes ausentes.
- O mapa curricular privado contém 26 componentes, 55 módulos, 374 subtemas e
  122 recursos; 64 resumos e 58 filas públicas estão ligados, com 276 lacunas
  honestas. HCPM VI não foi inferido.
- O Anki preserva 2.830 cartões, 16 decks canônicos e backup anterior às
  mudanças. A organização estrutural está feita; a melhoria editorial não.
- O lote neuropsiquiátrico de sete PDFs foi convertido a Markdown privado. A
  prévia de Psiquiatria Clínica p. 91--93 foi renderizada; nenhuma captura foi
  publicada.
- Typecheck, lint, auditoria de questões, privacidade e build mais recente
  passaram. A auditoria remota de rotas e a otimização das páginas lentas
  continuam pendentes separadamente.

## P0 — bloqueadores de segurança e liberação

**Atualização de 2026-08-14:** o restore do backup foi validado no run
31839733798; menções abaixo ao restore como pendente são históricas e não
reabrem essa tarefa.

### P0.1 Espaço e execução local — parcial

- [x] Liberar espaço no disco C:. Estado confirmado: 106,8 GB livres em
  2026-08-13.
- [ ] Confirmar que os pacotes redundantes do Estratégia MED existem no Drive
  antes de remover cópias locais; não apagar fontes únicas nem PDFs em triagem.
- [x] Reexecutar typecheck, lint, build e auditorias depois de liberar espaço.
  Em 2026-08-13: typecheck, lint, 1.332 questões e privacidade passaram; o
  build mais recente concluiu em 341,1 s, gerou 413 páginas e confirmou
  exportação estática.
- [~] Investigar as três páginas que ultrapassaram 60 s na primeira tentativa de
  SSG (`pericardite`, `derrame pleural` e `TEP`) e reduzir seu custo de geração.
- [ ] Repetir auditoria remota de rotas em uma sessão com acesso ao host. A
  tentativa local retornou `fetch failed` para todas as URLs, portanto não é
  evidência de queda nem validação de produção.
- [x] Verificação visual de produção em 2026-08-14: as rotas `/`,
  `/questoes/`, `/biblioteca/`, `/mapas-mentais/`, `/meu-curso/`, `/agenda/`,
  `/minha-midia/` e `/semestres/` abriram com um H1 cada, sem tela de erro e
  sem mensagens no console do navegador. A sessão autenticada já existente
  permaneceu ativa. Na Minha Mídia, 399 imagens possuem texto alternativo e o
  carregamento progressivo trouxe imagens visíveis sem arquivo quebrado. Isto
  não substitui os testes de fluxos que alteram dados descritos em P0.2.

### P0.2 Autenticação, privacidade e recuperação — acompanhamento

- [x] Aceite de uso cotidiano registrado: o usuário confirma login, progresso
  e uso normal do site em produção. Não repetir testes destrutivos sem uma
  regressão concreta.

- [~] Login e logout foram exercitados por sessão temporária da conta de teste,
  sem registrar credenciais e com encerramento confirmado. Ainda faltam os
  cenários visuais de recuperação, persistência após reabrir o navegador e
  expiração prolongada da sessão.
- [ ] Testar resposta de questão, simulado, resumo, caso, agenda e sincronização
  em duas sessões/dispositivos; conferir conflito e recuperação local.
- [~] Fluxo técnico de mídia privada validado com arquivo inofensivo e removido
  na mesma execução: upload aceito, URL assinada legível antes do vencimento,
  acesso negado após expiração, remoção de storage e metadados sem resíduo,
  logout e bloqueio entre usuários confirmados. Falta apenas validar os mesmos
  estados pela interface visual autenticada.
- [~] Revisar RLS e avisos de segurança do Supabase sem expor chave privilegiada
  ao cliente. As extensões `pg_trgm`, `unaccent` e `vector` foram movidas para
  `extensions` pela migration isolada `20260814171017`; o advisor de segurança
  passou de quatro para um aviso. Resta habilitar no Auth a proteção contra
  senhas vazadas, configuração administrativa fora das migrations SQL.
- [ ] Revalidar restauração de backup em ambiente compatível com
  `supabase_vault`; o dump existe, mas o restore em PostgreSQL comum falhou.
- [~] Revisão estática de privacidade concluída para a biblioteca privada:
  o bucket `midia-privada` é privado, os caminhos são segregados por `auth.uid`,
  RLS restringe tabela e storage ao proprietário, e a aplicação gera URLs
  assinadas de 300 s. A confirmação dinâmica entre contas está registrada
  abaixo; permanecem os fluxos de upload, expiração e exclusão.
- [~] Isolamento remoto entre contas validado em 2026-08-14, sem expor
  credenciais: uma sessão de teste autenticada não visualizou linhas de outro
  proprietário em `progresso_conteudo`, `agenda_estudo_usuario`,
  `semana_estudo_usuario` ou `tarefa_estudo_usuario`; também não conseguiu
  gerar URL assinada para uma imagem privada de outro proprietário. A sessão
  técnica temporária foi encerrada. Ainda faltam os fluxos visuais de upload,
  expiração, exclusão, recuperação e persistência após reabertura.

## P1 — tornar o site uma rotina de estudo útil

### P1.1 Painel canônico de estudo — parcial

- [ ] Unificar Semana, Agenda, OMED, semestre atual, revisão de semestres e
  Anki em um painel de prioridade única, sem criar agenda paralela.
- [~] Tornar o progresso atual visível no mapa curricular: os subtemas dominados
  passam a aparecer por padrão, há métrica própria e o filtro “Só pendentes”
  permanece opcional. Falta unificar isso com Semana, Agenda, OMED e Anki.
- [ ] Criar estado único para planejado, em andamento, revisão devida, concluído
  e bloqueado, com data, contador, filtro e opção clara de desfazer.
- [ ] Ao abrir uma pendência, mostrar objetivo, escopo, estimativa, resumo,
  questões, caso/mídia disponível e próxima revisão; não só uma página ampla.
- [x] Substituir a ligação frágil Agenda–Semana por chave estável, preservando
  eventos manuais. A migration `20260814165421_vincula_tarefa_semana_agenda.sql`
  foi aplicada: 84/138 tarefas do plano receberam vínculo direto; nenhuma tarefa
  manual foi alterada. A conclusão agora usa o ID do evento, não título/data.
- [ ] Aplicar o ciclo de 12 semanas somente após confirmar aulas, plantões,
  horários indisponíveis, disciplina atual e primeiro foco OMED.
- [ ] Para cada PDF novo: Markdown privado, metadados, vínculo ao foco vigente e
  revisões D0/D1/D7/D21, com redução automática de carga se houver atraso.

### P1.2 Currículo e semestres — parcial

- [ ] Validar manualmente vínculos candidatos entre os 26 componentes privados,
  seus módulos/subtemas e os recursos públicos/privados.
- [ ] Completar a visão privada por disciplina: materiais, lacunas, revisões,
  próximos estudos e progresso das matérias concluídas.
- [x] Encerrar a fila separada de HCPM VI. O eixo passa a ser acompanhado junto
  com BBPM VI; nenhuma ementa nova foi inventada e lacunas concretas continuam
  na matriz curricular.
- [ ] Validar em ambiente estável o importador curricular em modo seco e só então
  aplicar mudanças remotas com backup e QA autenticada. A tentativa em
  2026-08-13 não gravou dados, mas excedeu o limite de execução; medir e
  otimizar o validador antes de usar `--apply`.
- [ ] Criar rotinas reutilizáveis de abertura, acompanhamento, encerramento e
  revisão longitudinal por período.

### Validação SISCAD e mapa granular — estado atual

- [x] Validar o estado dos vínculos SISCAD em modo leitura: 37 componentes
  reconhecidos, 36 planos analisados e HCPM VI tratado como alias de BBPM VI
  por decisão curricular do usuário. Relatório:
  VALIDACAO-VINCULOS-SISCAD-2026-08-14.md.
- [ ] Completar o mapa granular dos 11 componentes ainda ausentes no manifesto:
  BBPM V/VI, Bases Complementares I-VI, Tópicos Especiais em Saúde I/IV e
  Tópicos em Saúde da Mulher. Nenhum vínculo será inferido por nome.

### P1.3 Conteúdo, resumos e mapas — parcial

- [~] Integridade questão–taxonomia concluída: 1.332 questões apontam para 304
  subtemas, sem vínculos órfãos. Foram corrigidos 13 vínculos e criados cinco
  subtemas comprovadamente necessários; os novos que têm somente questão seguem
  marcados como resumo pendente. Evidência:
  `docs/AUDITORIA-QUESTOES-TAXONOMIA-2026-08-13.md`.
- [~] Construir a matriz de cobertura por disciplina, subtema, semestre,
  prioridade OMED, resumo, questões, caso, mapa, imagem e fonte; ela vem antes
  de ampliar volume. A camada estática de resumo/questão/caso foi concluída;
  ainda faltam semestre, mapas, imagens, fontes e validação privada no mesmo
  nível de detalhe. Evidência atual:
  `docs/MATRIZ-COBERTURA-CLINICA-2026-08-14.md`.
- [ ] Criar template de resumo: objetivo, pré-requisitos, decisão clínica,
  sinais, diagnóstico/conduta, armadilhas, integração curricular, fontes/data,
  mídia e questões.
- [ ] Implementar leitura progressiva, índice, estimativa, síntese OMED, tabelas
  responsivas e conclusão por seção.
- [ ] Criar módulos reutilizáveis de Anatomia, Fisiologia, Bioquímica,
  Histologia, Patologia, Farmacologia, Microbiologia, Imunologia e Epidemiologia.
- [ ] Transformar mapas em grafos reais: nós curtos, setas nomeadas e ligações a
  resumo, questão, caso, mídia e referência; começar pelos temas OMED/semestre.
- [ ] Revisar conteúdo clínico por diretriz, na ordem: Infectologia; GO;
  Pediatria; Cirurgia/MFC; Cardio/Neuro/Pneumo; Nefro; Gastro/Endócrino/Hemato;
  Onco/ORL/Reumato/Derma e demais áreas.
- [ ] Criar ou ampliar resumos, questões, casos e cartões apenas para lacunas
  demonstradas, em lotes pequenos e com fonte primária vigente.

## Pendências adicionais prioritárias — 2026-08-14

As demandas do anexo foram incorporadas sem abrir filas paralelas. O plano
detalhado e os critérios de aceite estão no documento
PLANO-EXECUCAO-PENDENCIAS-ADICIONAIS-2026-08-14.md.

- [ ] Ampliar e substituir imagens pouco didáticas, priorizando anatomia,
  exames, sinais, histologia, patologia e procedimentos com proveniência,
  licença, legenda, alt text e subtema.
- [ ] Fechar as lacunas dos semestres anteriores sem reconstruir o que funciona;
  a auditoria inicial encontrou 11 componentes sem mapa granular e as lacunas
  clínicas da matriz continuam separadas.
- [ ] Revisar design, navegação, hierarquia, responsividade, claro/escuro,
  teclado, zoom, estados de estudo e consistência entre módulos.
- [ ] Criar cards Anki curtos, atomicos e por eixo clínico, somente depois da
  autorização que mantém o Anki pausado.
- [ ] Criar modo de jogo diagnóstico com cinco tentativas, dicas progressivas,
  explicação final e desempenho por usuário, após validar casos e RLS.
- [ ] Completar ciências básicas integradas à clínica, sem criar páginas
  isoladas ou duplicar conteúdo já validado.

### P1.4 Anki — parcial

> Pausado por decisão do usuário em 2026-08-14. Não executar mutações no Anki
> até nova autorização explícita; o fechamento atual trata somente do site.

- [x] Fechamento operacional para estudo: cartões foram alinhados à rotina do
  site, o limite de novos foi fixado em 30/dia, FSRS 0,90 e a cadência
  5 min/5 h/3 d/7 d foram confirmados. As 22 cópias de AVC e 90 notas sem fonte
  estão suspensas, preservadas e fora da fila. Evidência:
  `docs/FECHAMENTO-ANKI-2026-08-13.md` e
  `docs/PLANO-ALINHAMENTO-ANKI-SITE-QUESTOES-2026-08-13.md`.
- [x] Testar Anki antes de encerrar: conexão, árvore, estilo, FSRS, exportação,
  backup e restauração de pacote temporário passaram. Após a depuração editorial
  e a primeira liberação clínica, a fila estudável contém 934 cartões, todos
  dentro do padrão curto e com referência; o teste não deixou dado técnico ativo.

- [x] Reorganizar os decks existentes sem remover cartões: 2.829 cartões foram
  migrados para `MEDICINA → Ciclo Básico/Clínico → área → disciplina`; os decks
  antigos foram excluídos somente depois de ficarem vazios e o backup `.apkg`
  com agendamentos foi verificado. Subtemas permanecem como tags para evitar
  árvore excessiva. Evidência: `docs/ARQUITETURA-ANKI-MEDICINA-2026-08-13.md`.
- [~] Auditoria editorial segura repetida com AnkiConnect aberto: 1.721 notas
  examinadas, 14 grupos de duplicata exata, 4 grupos de frente ambígua, 885
  versos extensos e nenhuma nota sem referência. O relatório e o snapshot de
  progresso foram salvos localmente; nenhum cartão, histórico ou deck foi
  alterado nesta rodada.
- [x] Processar integralmente as 967 notas suspensas por excederem o padrão
  curto: 133 perguntas reais foram reescritas no próprio ID e mantidas
  suspensas; 834 itens artificiais/genéricos foram aposentados, sem exclusão.
  Oito longos remanescentes fora da fila também foram aposentados. A fila ativa
  ficou com 913 cartões, zero violações 88/170 e zero duplicatas exatas.
  Evidência: `docs/FILA-REESCRITA-ANKI-2026-08-13.md`.
- [~] Revalidar clinicamente os 133 candidatos curtos por diretriz vigente:
  21 foram corrigidos e ativados com fontes oficiais 2025/2026; 112 continuam
  suspensos e explicitamente bloqueados por fonte genérica. Nenhum foi liberado
  apenas porque passou no limite de caracteres. Evidência:
  `exports/anki/liberacao-validada-2026.json`.
- [ ] Refinar cartões pelo princípio de informação mínima; usar Cloze apenas para
  fatos atômicos e Image Occlusion somente em imagem licenciada/anonimizada.
- [ ] Transformar gradualmente as notas suspensas em cartões atômicos por
  disciplina e subtema, começando pelos temas de maior prioridade OMED e pelas
  lacunas sem deck ativo. Não aplicar reescrita clínica massiva: cada lote
  exige diretriz vigente, deduplicação e QA de tamanho antes de reativar.
- [ ] Implantar cartões por eixo clínico (epidemiologia, fisiopatologia,
  sinais/sintomas, diagnóstico, tratamento e complicações) e cartões de imagem
  somente após o manifesto de direitos/anonimização. A arquitetura e o fluxo
  de OpenEvidence estão registrados em
  `docs/ARQUITETURA-ANKI-MEDICINA-2026-08-13.md`.
- [ ] Validar visualmente Onigiri e as extensões já instaladas após reiniciar o
  Anki; não instalar extensão beta sem backup e compatibilidade confirmada.
  Estado em 2026-08-13: Anki Desktop/AnkiConnect respondeu; falta apenas a
  inspeção visual do tema e das extensões.
- [ ] Criar fluxo de cartões a partir de erros de questões, com deduplicação,
  fonte, exportação `.apkg` e CSV de contingência.

## P1 — mídia e acervo privado

### Atualização operacional — 2026-08-14

- [x] Reprocessar os manifestos canônicos e os dois lotes semanais em modo
  idempotente: 379 registros/objetos privados confirmados; amostras de URL
  assinada responderam HTTP 200.
- [x] Converter os 30 JPEG 2000 canônicos incompatíveis com o navegador para
  JPEG privado, preservando o arquivo original, o hash de origem e o hash da
  conversão.
- [x] Inspeção visual do lote completo: 379/379 objetos vistos nas 19 folhas de
  contato e classificados sem inventar diagnóstico.
- [x] Curadoria aplicada no catálogo autenticado: 347 `util`, 21 `contextual`,
  31 `nao_util`, 0 `revisao_pendente`.
  Evidência: `docs/FECHAMENTO-ACERVO-VISUAL-2026-08-14.md` e o backup/decisões
  privados em `Desktop/MEDICINA/_media-review/20260814-visual-validation/`.

- [x] Confirmar metadados editoriais do lote neuropsiquiátrico: 60/60 itens têm
  disciplina, tema, subtema, `subtema_id`, modalidade, página e motivo de
  privacidade; a biblioteca mantém tela cheia, legenda, alt text, carregamento
  progressivo e retorno ao resumo.
- [x] Completar o lote neuropsiquiátrico: 20 páginas novas foram renderizadas,
  visualmente revisadas, hasheadas e importadas; somadas às 40 anteriores,
  nenhuma das 60 linhas permanece em “Acervo privado/Triagem pendente”.
- [x] Converter as fontes privadas selecionadas em síntese autoral já existente
  nos conteúdos de Psiquiatria e Neurologia, revisada contra referências de
  diretriz; nenhum recorte comercial ou texto protegido foi para o repositório
  público.
- [x] Validar o destino de direitos do lote: os 60 itens neuropsiquiátricos são
  `pdf_comercial` e ficam exclusivamente no bucket autenticado; equivalentes
  abertos só serão buscados se surgir uma lacuna pública real.
- [x] Reorganizar Minha Mídia por disciplina, tema, subtema, modalidade,
  patologia/achado, fonte, origem/privacidade, período, caso e estado de
  triagem; a migração privada mantém período/caso nulos até validação manual.
- [x] Reconciliar os vínculos técnicos: todos os 347 itens `util` e 21
  `contextual` agora têm `subtema_id`; apenas dois itens `nao_util` sem
  vínculo foram preservados como rejeitados.
- [x] Ancorar e auditar as figuras públicas: 77/77 IDs possuem vínculo
  navegável com um subtema em `Minha mídia`, com crédito/licença preservados.
- [x] Substituir o mosaico público por índice hierárquico disciplina -> tema ->
  subtema; as imagens agora só aparecem ao abrir o subtema e recebem bloco
  “Como interpretar”. A biblioteca autenticada também exige a seleção do
  subtema antes de revelar suas imagens.
- [x] Registrar a estratégia de expansão, metadados obrigatórios, fontes
  institucionais e portões de direitos/privacidade em
  `docs/PLANO-EXPANSAO-ACERVO-VISUAL-2026-08-14.md`.
- [ ] Executar a fila de expansão em lotes de até 20 candidatos, começando pelas
  lacunas OMED e do semestre atual; validar licença e interpretação item a item
  antes de importar.
- [ ] QA autenticado no navegador para login, logout, expiração de URL, sessão
  de outro usuário e exclusão; os testes de storage/admin confirmam presença e
  HTTP 200, mas não substituem a validação interativa.

## P2 — experiência, design e acessibilidade

- [ ] Executar QA por roteiro nas rotas de início, resumos, questões, Agenda,
  Semana, Meu Curso, Mídia, autenticação e estados vazio/erro/carregando.
- [~] Rodar Lighthouse móvel/desktop, axe/WCAG 2.2, teclado, zoom 200% e teste
  em celular; priorizar achados confirmados.
- [x] Lighthouse de produção executado em 2026-08-14 na home e em `/midia`:
  baseline home 87/84/100/100 e mídia 79/90/100/100 em
  performance/acessibilidade/boas práticas/SEO. Foram corrigidos os quatro
  achados objetivos de acessibilidade (nome de botão, nome da busca, rótulo de
  campo e contraste) e a busca global passou a carregar somente sob demanda.
  No commit publicado, acessibilidade/boas práticas/SEO chegaram a 100/100/100
  nas duas rotas e axe-core 4.12.1 encontrou zero violações automáticas. A
  performance variou entre execuções (home 70–87; mídia 59–79) e continua como
  trabalho separado; ainda faltam teclado, zoom e teste manual, pois auditoria
  automática não encerra WCAG.
- [ ] Consolidar tokens para claro/escuro e redesenhar o claro para leitura longa:
  fundo neutro, contraste auditado, foco visível, menos sombras/gradientes e
  tipografia/espaçamentos consistentes.
- [x] Produzir referências desktop/celular e aprovar protótipo antes de um
  redesenho amplo; preservar os dados e fluxos atuais.
- [x] Reorganizar navegação em Hoje, Aprender, Praticar e Revisar; manter Meu
  Curso como currículo e Minha Mídia como biblioteca.
- [ ] Criar busca e filtros persistentes por disciplina, semestre, tema, subtema,
  prioridade OMED, recurso e estado de estudo.
- [ ] Medir bundle, otimizar imagens (WebP/AVIF quando apropriado), lazy loading,
  alt text e formatos antes de instalar dependências novas.
- [x] Remover do bundle inicial o código integral da paleta de busca e dos
  diagramas no índice de Mídia: ambos agora carregam somente quando necessários;
  os 77 recursos e suas âncoras foram preservados. O build voltou a gerar 413/413
  páginas sem repetir `/questoes`.
- [x] Retirar as 1.332 questões do HTML inicial: `/questoes` agora carrega o
  banco sob demanda, com estados acessíveis de carregamento e erro recuperável.
  O HTML estático caiu de aproximadamente 2,52 MB para 153.085 bytes; a fila
  preservou o progresso existente e abriu sem erros no navegador local.

### Publicação do fechamento técnico — 2026-08-14

- [x] Commit `2dbbb28` publicado; GitHub Pages run `31822386904` concluiu build
  e deploy com sucesso.
- [x] `/questoes/` abriu em produção com sessão autenticada, 983 questões novas,
  349 já respondidas preservadas e zero erro de console.
- [x] `/agenda/` abriu autenticada com as pendências guiadas, links profundos
  para resumo/questões e zero erro de console. Nenhum progresso foi alterado
  durante o QA de leitura.

## P3 — ingestão contínua e manutenção

- [ ] Triar os mapas mentais e resumos do Estratégia MED que ainda não foram
  analisados ou incorporados: inventário metadata-first, comparação por
  SHA-256, deduplicação, PDF -> Markdown antes da leitura, OCR/renderização
  seletiva, classificação por disciplina/semestre/subtema/prioridade OMED e
  vínculo aos resumos, questões, casos e mapas já existentes. Material
  comercial permanece apenas no acervo privado autenticado; nenhuma cópia
  bruta será publicada.
- [ ] Para cada lote aprovado do Drive/local: comparar metadados e SHA-256,
  deduplicar, materializar somente o necessário, converter a Markdown, fazer OCR
  seletivo, renderizar páginas clínicas e classificar por currículo/OMED.
- [ ] Tratar PDFs com trailer malformado por rota segura e registrar rejeições;
  não insistir em parser que falhou.
- [ ] Atualizar manifesto privado e Obsidian ao fechar cada fonte, inclusive
  rejeitada, sem registrar conteúdo comercial bruto no Git.
- [ ] Produzir relatório de proveniência/deduplicação antes de importar questões
  externas, provas ou bancos antigos.
- [ ] Confirmar gabarito em fonte vigente antes de adaptar questão; registrar
  banco/prova/instituição/ano somente quando comprovados.
- [ ] Montar simulados por prioridade OMED, dificuldade e erros reais sem repetir
  itens já respondidos; validar fila e dashboard no navegador.
- [ ] A cada lote público aprovado: rodar gates, revisão de direitos/fontes/
  acessibilidade, publicar, checar produção e atualizar handoff/Obsidian.

## Ordem recomendada de execução

1. Liberar espaço e estabilizar build/auditorias.
2. QA autenticada, RLS e recuperação de backup.
3. Painel canônico, vínculo Agenda–Semana e validação curricular.
4. Matriz de cobertura; revisão editorial e Anki por lacuna real.
5. Triagem de mídia e integração privada/pública com rastreabilidade.
6. Design system, acessibilidade, navegação e performance.
7. Ingestão contínua, simulados e publicação de lotes aprovados.

## Critério de encerramento de um item

Um item só muda para concluído quando houver: alteração registrada, teste
proporcional, estado visual quando aplicável, revisão de privacidade/direitos e
link para a evidência. HTTP 200 isolado não é confirmação de qualidade.
