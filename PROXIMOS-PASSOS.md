# Próximos passos — Codex Medicus

> **Fonte operacional canônica:** [[docs/PENDENCIAS-MESTRAS.md](docs/PENDENCIAS-MESTRAS.md)].
> Este arquivo foi preservado como histórico de sessões, evidências e decisões;
> não usar suas caixas antigas como uma segunda fila de execução.

> Atualizado em 2026-08-10. O roteiro completo está em `docs/PLANO-100-PASSOS.md`; os documentos `docs/ROADMAP-50-PASSOS.md` e `docs/PLANO-MESTRE-EXTRACAO-E-CURSO.md` preservam o histórico e a fonte operacional. Para o estado atual, usar também as seções finais deste arquivo e `docs/FECHAMENTO-2026-08-10.md`.

> Fechamento do acervo de 1º de agosto: `docs/FECHAMENTO-ACERVO-PRIVADO-2026-08-01.md`.
> Fechamento operacional mais recente: `docs/FECHAMENTO-2026-08-10.md` e as
> seções finais deste arquivo.

## Fechamento e retomada — 2026-07-29

- Publicação confirmada: `cc08b86` e `cac0eae` estão em `main`; GitHub Pages `30482759219` concluiu com sucesso. A raiz e `/meu-curso/` responderam HTTP 200.
- Supabase: Site URL e allowlist de redirecionamento confirmados para o domínio GitHub Pages. Ainda falta testar login, recuperação, sessão persistente e sincronização com a conta real, sem registrar senha.
- Curso privado: a matriz operacional dos 12 semestres e das fontes acessadas foi atualizada no Obsidian. Faltam curadoria plano → tema → subtema, diferenças curriculares relevantes e materiais privados vinculados; nada de SISCAD, Drive, PDF comercial ou dado pessoal entra no site público.
- Próximo bloco recomendado: (1) testes privados 93–96; (2) aguardar/testar restore de backup, passo 13; (3) retomar Infectologia 44–46 com fontes primárias; depois GO e Pediatria. HCPM VI só volta à fila quando o plano existir.

## Ordem mestra adicionada — 2026-07-29

- A varredura futura deve cobrir todo o Drive autorizado por metadados e localizar assuntos médicos úteis; a extração profunda será feita em lotes priorizados, com deduplicação e cache Markdown.
- Imagens úteis dentro de PDFs devem ser detectadas, renderizadas e recortadas com origem/página/contexto. Captura de material comercial vai para biblioteca autenticada em armazenamento privado, fora do Git e do GitHub Pages; publicação exige imagem própria ou licença aberta verificável.
- Imagens de pacientes ficam privadas e só entram após anonimização e autorização apropriada. O login existente será reutilizado, com RLS por proprietário e URLs assinadas; não haverá segunda senha nem arquivo privado em `public/`.
- Todo material analisado será correlacionado aos semestres e matérias já cursados e aparecerá para revisão na área autenticada, nunca na camada curricular pública individualizada.
- A biblioteca de mídia será reorganizada por disciplina, tema, subtema, modalidade, caso, licença e vínculo curricular. Os mapas serão refeitos como mapas conceituais com nós, setas nomeadas e conceitos-chave, não listas de links.
- Anki fica para depois de acervo, correlação curricular, mídia e mapas. O redesign geral do site será a última fase e terá escopo apenas visual/UX.
- Fonte de verdade dessa ordem: `docs/ORDEM-MESTRA-ACERVO-MIDIA-MAPAS-DESIGN.md`.
- Biblioteca privada implementada em `/minha-midia`: reutiliza o login atual, grava imagens no bucket privado `midia-privada`, limita tabela e objetos ao proprietário via RLS e usa URLs assinadas de cinco minutos. A migration `20260729194500_cria_biblioteca_midia_privada.sql` foi aplicada e verificada: bucket não público, RLS ativo, cinco políticas e nenhum privilégio de tabela para `anon`. Nenhuma imagem privada foi enviada nesta implantação.
- Publicação confirmada no commit `8b37d84`: o GitHub Pages run `30501713751` concluiu com sucesso, e `/` e `/minha-midia/` responderam HTTP 200. A rotina automática das 9h foi removida e não foi recriada.

## Plano mestre de extração e curso — 2026-07-28

- A matriz dos 12 períodos e o desempenho acadêmico foram analisados; os dados pessoais permanecem apenas no Obsidian privado.
- Todos os planos disponíveis foram capturados: 37 componentes, 36 planos analisados e um plano indisponível, sem dados individuais no repositório.
- `Desktop\\MEDICINA` está inventariada (1.401 arquivos; 1.094 PDFs; 14,24 GB) e as nove fontes principais têm cache Markdown, mas a análise clínica não está completa.
- O lote local do Estratégia foi reconciliado: 863 entradas, 824 nomes, cinco duplicatas exatas e 34 variantes distintas recuperadas; o total preservado é 858 PDFs distintos.
- HCPM, BBPM III/IV/VII/VIII, LANN, UE, Farmacologia e os 30 arquivos de `RESUMOS` foram triados privadamente. A integração continua dependente de validação clínica, licença e deduplicação.
- O Drive `Resumos e cursos` foi apenas reconhecido. Falta conexão, inventário por metadados, deduplicação e extração seletiva.
- Imagens clínicas embutidas em PDFs ainda precisam de extração dirigida. Material comercial fica no bucket privado autenticado; o site público recebe apenas imagens próprias ou com licença aberta verificável. Imagem de paciente exige anonimização e autorização apropriada.
- Bloco de proveniência concluído em 2026-07-29: manifesto, hashes, divergências, matriz inicial, classificação de visibilidade, auditoria de figuras, checklist, lacunas visuais e registro de artefatos. O workflow de backup foi instrumentado para testar restauração em PostgreSQL temporário; aguardar o primeiro run antes de considerá-lo validado. O relatório-base de qualidade das questões também foi fechado com auditoria reproduzível. O primeiro micro-lote STORCH de Infectologia foi revisado contra fontes atuais do Ministério da Saúde e registrado em `docs/REVISAO-INFECTOLOGIA-LOTE-1.md`; os passos 44–46 continuam abertos. Próxima sequência clínica: concluir o portão editorial de Infectologia, depois GO e Pediatria. Atualizar o Obsidian ao fechar cada lote.
- A publicação do micro-lote (`a89fc83`) foi confirmada no GitHub Pages run `30456204375`; raiz e `/questoes/` responderam HTTP 200. Typecheck, lint e auditoria filtrada passaram. O seed Supabase não respondeu no limite seguro local: manter como pendente e não usar isso como evidência de sincronização remota.
- Em 2026-07-29, a camada privada de atualização do curso foi criada em `/meu-curso`: requer sessão, mantém dados individuais fora da rota pública, aceita edição manual e importação Markdown/CSV revisável, e registra histórico mínimo. A migração `20260729170921_cria_camada_privada_do_curso.sql` foi aplicada, seguida de `20260729172234_restringe_permissoes_curso_privado.sql`; RLS e permissões mínimas foram verificadas estruturalmente sem consultar dados de usuários. Antes do próximo lote, validar a rota autenticada em produção; depois seguir para a matriz privada e o painel longitudinal dos passos 27–28.
- O primeiro recorte do painel longitudinal foi implementado em 2026-07-29: `/meu-curso` mostra, para disciplinas já registradas, recursos públicos relacionados, lacunas de conteúdo publicado e próximos tópicos por status/dificuldade. A derivação é feita no servidor e envia somente dados públicos serializáveis ao navegador. Não considerar isso como matriz curricular privada completa: os vínculos SISCAD/Drive/PDF e documentos pessoais continuam pendentes e fora do repositório.
- Segundo e terceiro micro-lotes clínicos de Infectologia em andamento: duas questões de imunizações foram atualizadas com fontes PNI 2026 e uma questão de sífilis com PCDT IST; eles removeram a única repetição normalizada e reduziram a fila a 33 comentários curtos em 21 questões. Iniciar a próxima revisão por fonte primária atual e específica, sem alterar meningite ou sepse por inferência.
- Os lotes 2 e 3 foram publicados no commit `6dcc44f`; GitHub Pages `30457470874` concluiu com sucesso e a raiz e `/questoes/` responderam HTTP 200. O seed Supabase permanece pendente de confirmação e não é evidência de sincronização remota.
- Bloco técnico publicado no commit `31b3a36` em 2026-07-29: a rota pública de curso foi neutralizada, com progresso e vínculos individuais restritos ao cofre privado; `npm run audit:privacidade` vigia essa fronteira. Drive exige inventário de metadados, allowlist, baseline e opt-in antes da sincronização; seus logs são sanitizados. Backup e keep-alive passam a falhar explicitamente quando não executados. A migration `0007_restringe_monitoramento_autenticado.sql` foi aplicada e restringe a telemetria a inserções do usuário autenticado, com payload reduzido e limite local.
- Quarto micro-lote de Infectologia publicado: `inf-hiv-024`, `inf-zc-01`, `inf-cong-13`, `inf-cong-src-18` e `inf-cong-src-36` receberam fontes oficiais específicas e comentários distintos. A fila filtrada caiu de 33 para 23 comentários curtos em 16 questões, sem repetição normalizada nem fonte vazia; meningite, sepse, malária e procedimentos fetais invasivos continuam congelados até revisão com fonte específica. As rotas `/`, `/semestres/` e `/questoes/` responderam HTTP 200; a rota de semestres exibiu a nova trilha e não retornou o marcador individual legado.

## Estado atual

| | |
|---|---|
| **Site** | https://thiagotrajano-arch.github.io/MEDICINA-TT/ |
| **Disciplinas com conteúdo real** | **17 de 37**: GO, Pediatria, Infectologia, Cirurgia, MFC, Cardiologia, Pneumologia, Neurologia, Gastroenterologia, Oncologia, Otorrinolaringologia, Endocrinologia, Hematologia, Nefrologia, Reumatologia, Dermatologia e Psiquiatria |
| **Resumos** | **234** de 299 subtemas |
| **Questões** | **1.332** |
| **Casos clínicos** | **56** |
| **Figuras públicas** | **77** (16 diagramas SVG + 61 imagens reais licenciadas) · **61 figuras únicas ancoradas a resumos** |
| **Conta e progresso** | Login por e-mail/senha ativo; respostas e simulados são locais primeiro e sincronizados com Supabase por usuário — **sincronização de resposta_usuario/simulado_resultado corrigida em 2026-07-24 (estava 100% quebrada desde a migration 0003, ver relatório abaixo); progresso_conteudo (resumos/casos) nunca foi afetado** |
| **Fonte do conteúdo publicado** | Arquivos TS (`src/content/**`), sempre — build não depende mais do Supabase estar sincronizado (corrigido 2026-07-24, ver relatório abaixo) |
| **Ferramentas** | Dashboard, Simulado, Casos, Mídia, Questões, Biblioteca — todas funcionais, nenhum placeholder |

> Publicação de referência confirmada: PR #7 em `e502f5a`; registro final em
> `140e68f`; GitHub Pages runs `31348422663` e `31348600688` aprovados. O site
> estático renderiza a partir dos arquivos TS e não depende do seed para publicar.

## O que foi feito nesta sessão (2026-07-27 — Codex, passos 8 a 25)

Usuário liberou execução e publicação dos passos 8 a 25. O lote foi fechado em uma versão publicável e focada em alto rendimento:

- Revisão/registro dos passos 8–12: Mieloma/NMP, Síndromes Glomerulares, IRA/DRC, Cirrose e Pancreatite Aguda permanecem integrados e revisados contra fontes vigentes.
- Oncologia criada como disciplina própria em Clínica Médica.
- Novos subtemas: Emergências Oncológicas; Câncer de Pulmão; Princípios de Oncologia; Farmacologia Oncológica e Imunoterapia.
- Otorrinolaringologia deixou de ser scaffold: Rinite/Rinossinusite, Otites, Vertigem/HINTS, Tumores de Glândulas Salivares/Orofaringe.
- Dermatologia deixou de ser scaffold: Piodermites e Neoplasias Cutâneas.
- Backlog de Reumatologia expandido: Sjögren/Behçet, Crioglobulinemia/IgA e Miopatias Inflamatórias.
- Gastroenterologia expandida: Doença de Wilson e Doença Hepática Alcoólica.
- 15 resumos novos e 15 questões inéditas comentadas foram adicionados, com IDs validados.

Validação local: `tsc --noEmit`, `npm run lint`, verificação estrutural de IDs/vínculos/gabaritos e `npm run build` aprovados. Build: 363 páginas estáticas.

## O que foi feito nesta sessão (2026-07-24, parte 4 — Claude, tarefas autorizadas 2-5 do Dashboard)

Usuário autorizou os itens 2–5 da lista priorizada do Obsidian Dashboard e saiu por um tempo,
pedindo para eu seguir sozinho. Documentando aqui para revisão quando ele voltar.

### Item 2 — Mídia clínica: concluído (redirecionado)
A meta numérica do Dashboard ("localizar pelo menos 30 imagens") já estava 2× superada (61 imagens
reais de 73 figuras). O gap real, descoberto ao investigar, era **correlação**: 46 das 73 figuras
(63%) não apareciam em nenhum resumo, só na galeria solta de `/midia` — contrariando o próprio
princípio de design do projeto ("nunca numa galeria separada"). Mapeei cada figura órfã para o
bloco/seção mais específico do resumo correspondente, sempre com correspondência textual direta (não
forcei nenhuma correlação fraca). Resultado: **57/73 ancoradas (78%)**. As 16 restantes genuinamente
não têm resumo ainda (Reumatologia/Dermatologia/Endocrinologia seguem scaffold vazio) ou não tinham
correspondência específica o suficiente para não confundir o estudante — ficam documentadas, não
forçadas. Verificado: validação de integridade (0 problemas), typecheck, lint, build (339 páginas).
Commit `72f0f1c`, push feito para `main` (autorização já concedida pelo usuário antes de sair).

### Item 3 — Mais casos clínicos: 3 novos, fonte 100% verificável
Construídos a partir das questões **dissertativas** 1, 4 e 5 da prova oficial **V OMED — Ciclo
Clínico, 2ª fase (2025)** (`provas-oficiais-omed/omed5-2025-2fase-clinico.pdf`), usando o **gabarito
oficial publicado** (`omed5-2025-gabarito-2fase-clinico.pdf`) como fonte de cada resposta — nenhum
fato clínico inventado, cada `resposta` de etapa é uma transcrição fiel do gabarito real (só
reorganizada em formato de revelação por etapas, estilo Einstein).

- `caso-neuro-disc-01` — AVC isquêmico intra-hospitalar (TC sem contraste → território vascular pelo
  padrão do déficit → limiar de PA para trombólise → definição terapêutica pela janela de tempo).
- `caso-inf-disc-46` — Angiomatose bacilar em paciente HIV/CD4 crítico (espécie de Bartonella →
  espectro da doença em imunocompetente → prevenção → diferencial com sarcoma de Kaposi).
- `caso-ped-disc-06` — Otite média com efusão evoluindo para OMA supurativa e mastoidite (sem
  `subtemaId` — Otorrinolaringologia ainda é taxonomia vazia, sem resumo para linkar).

Evitei a Questão 2 (restrição de crescimento fetal) da mesma prova por sobrepor tema com
`caso-go-disc-01` já existente. **Restam ainda não utilizadas**: Questão 2 e 3 (OMED V) e as 5
dissertativas de cada uma das outras 3 edições (OMED II/III/IV, 2ª fase) — fonte real abundante para
continuar esta tarefa em sessão futura. Verificado: script de integridade (0 problemas, 24 casos),
typecheck, lint, build (342 páginas). Commit `af20bd6`, push feito para `main`.

### Item 4 — Mais questões inéditas: 12 novas, mesma prova oficial
As 25 questões de **múltipla escolha** da mesma prova (V OMED, 2ª fase 2025) tinham gabarito oficial
(só a letra certa, sem justificativa por alternativa) — escrevi os comentários de cada distrator a
partir de diretrizes nomeadas (SBH para HAS resistente, PNI para calendário vacinal, Tanaka et al.
para hérnia incisional, etc.), sem inventar nenhum mecanismo ou fato clínico novo.

Das 25, **12 entraram** (Cardio 3, GO 2, Ped 3, Inf 1, Cir 2, Neuro 1) — as outras 13 foram
descartadas por não terem subtema correspondente na taxonomia atual, por a questão ter sido
**oficialmente anulada** (nº 10 — sinal `Ø` no gabarito, não é erro meu) ou por exigirem uma diretriz
específica demais para eu comentar com segurança (ex.: protocolo do MS 2025 sobre teste de DNA-HPV).

⚠️ **Nota importante de processo:** na primeira leitura da tabela de gabarito eu interpretei a
ordem errada (a tabela é organizada em 5 colunas de pares questão-resposta lado a lado, não
sequencial 1→25 linha a linha) — isso teria gerado várias questões com a resposta "correta" marcada
errada. Percebi ao notar uma resposta clinicamente estranha (meia elástica como tratamento
prioritário de DAOP arterial) e refiz a leitura da tabela inteira, conferindo cada uma das 12
respostas antes de escrever qualquer conteúdo. Nenhuma questão com resposta errada foi publicada,
mas registro aqui para reforçar: **sempre reconferir tabelas de gabarito por posição, não por
leitura corrida.**

Verificado: script de integridade (0 problemas, 1020 questões), typecheck, lint, build (342 páginas).
Commit `fa5503d`, push feito para `main`.

## O que foi feito nesta sessão (2026-07-24, parte 3 — Claude, revisão de arquitetura completa)

Pedido do usuário: "reveja toda a arquitetura e arrume tudo que não está funcionando direito". Revisão
sistemática — não só leitura de código, mas build real, banco real, navegador real.

### 🔴 Achado crítico — build lia do Supabase ao vivo e podia publicar página quebrada, silenciosamente
`getContentRepository()` (`src/infra/content/index.ts`) preferia `SupabaseContentRepository` (rede) a
`StaticContentRepository` (bundle TS, zero rede) sempre que as credenciais públicas estavam presentes —
e estão, sempre, inclusive no CI (`deploy-pages.yml` as define via `vars.*` antes de `next build`).

Como o site é 100% export estático (`output: export`, GitHub Pages), cada uma das ~340 páginas é gerada
UMA VEZ, no build, por 7 workers em paralelo. Cada `/estudar/[subtemaId]` fazia um round-trip de rede ao
Supabase (`getSubtemaById` → select aninhado disciplina→tema→subtema) para saber se a própria página
existe. Sob a carga concorrente de gerar ~340 páginas ao mesmo tempo, uma fração dessas consultas volta
tarde ou incompleta — sem lançar erro, só devolvendo dado faltante — e a página, não achando seu próprio
subtema, chama `notFound()`. **O build termina com sucesso (exit 0), mas publica um "não encontrado" no
lugar de conteúdo real que existe.** Sem log, sem aviso — só se alguém abrisse exatamente aquela página.

**Reproduzido e medido:** rodando `npm run build` localmente, **113 das 289 páginas `/estudar` (39%)**
vieram com título genérico + corpo "não encontrado" — confirmado por título de aba real no navegador (não
só grep em HTML minificado, que dá falso positivo pois o boilerplate do error boundary aparece em toda
página). Testado no site já publicado (commit anterior): uma amostra de 3 páginas do lote "quebrado local"
estava OK ao vivo — ou seja, o problema é aleatório por build, não fixo por página; já aconteceu uma vez
nesta sessão, vai acontecer de novo em algum deploy futuro se não for corrigido agora.

**Bônus descoberto no processo:** o build antigo gerava **292 páginas `/estudar`, não 273** — 19 a mais
do que existem de verdade nos arquivos TS (fonte da verdade, validada sem órfãos). São subtemas antigos
que já foram renomeados/removidos do código mas cujas linhas nunca foram apagadas do Supabase (`npm run
seed` só faz upsert, nunca delete) — o build publicava página fantasma para eles, com conteúdo desatualizado.

**Correção:** `getContentRepository()` agora usa `StaticContentRepository` por padrão — o mesmo bundle TS
que já é a fonte de verdade do projeto, sem rede, sem flakiness, sempre em sincronia (mesmo commit = mesmo
conteúdo). `StaticContentRepository` já implementava 100% da interface (inclusive busca, sem depender do
RPC do Supabase) — troca sem perda de funcionalidade. Supabase-como-fonte-de-conteúdo continua disponível
via `CONTENT_SOURCE=supabase` para quem quiser inspecionar o espelho do banco. **Efeito colateral bom:**
isso também fecha um risco separado que eu ia propor corrigir via CI (rodar `seed`/migração automaticamente
antes do build) — não precisa mais, porque o build não depende do Supabase estar atualizado.
`npm run seed` continua necessário só para o RPC de busca (`search_conteudo`) e diagnósticos ficarem
atuais — não afeta mais o que é publicado.

**Verificado:** rebuild local após o fix → **273/273 páginas corretas, 0 quebradas** (script de checagem
por título real, mesma amostra). `tsc --noEmit`, `npm run lint`, `npm run build` (339 páginas, sucesso).
Commit `58d3fd3`, push feito para `main` (autorizado pelo usuário).

### Outros achados e correções desta revisão
- **`src/lib/progresso-conteudo.ts`**: `enviarProgresso()`/`conciliarAcesso()` faziam upsert em
  `progresso_conteudo` sem checar `{error}` — mesma classe do bug de sincronização já corrigido em
  `progresso.ts` na parte 2 desta sessão (essa tabela não tinha o problema de índice parcial, já
  sincronizava corretamente — mas ficava igualmente sem rede de segurança para falha futura). Agora loga
  no console em caso de erro, mesmo padrão.
- **Títulos de página ausentes**: `/estudar/[subtemaId]`, `/biblioteca/[disciplina]` e `/casos/[casoId]`
  (~330 páginas) não definiam `<title>` próprio — a aba do navegador sempre mostrava "Codex Medicus"
  genérico, para qualquer resumo/disciplina/caso. Adicionado `generateMetadata` nas 3 rotas, com
  `React.cache()` para não duplicar a busca de dados entre o título e o corpo da página.
- **Auditoria de RLS** (migrations 0001–0005): todas as tabelas sensíveis corretamente protegidas —
  conteúdo com leitura pública, atividade do usuário escopada por `owner_id`. Único ponto teoricamente
  "público demais" é `etiqueta_alvo`/`simulado_questao` (tabelas de junção com leitura liberada a
  qualquer chave anon) — risco baixo (não expõe dono, só padrão de uso) e a primeira nem é usada pelo
  app hoje. Nenhuma correção necessária.
- **Integridade de conteúdo**: script de validação (subtemas/conteúdos/questões/casos/figuras) — 0
  órfãos, 0 IDs duplicados, 0 gabaritos ambíguos, 0 figuras quebradas, 0 etapas de caso sem resposta.
  195 conteúdos · 1008 questões · 21 casos · 273 subtemas · 73 figuras.
- **Varredura de código**: nenhum TODO/FIXME/HACK esquecido, nenhum `@ts-ignore`, único
  `dangerouslySetInnerHTML` do projeto é o script estático de tema (sem entrada de usuário, seguro).
- **Testado ao vivo no navegador**: dashboard, biblioteca (incl. Cardiologia), questões (responder +
  gabarito comentado), simulado, mídia, modal de login/cadastro/recuperação — tudo funcional, zero erro
  de console, zero request falhando, em todas as páginas testadas.
- **GitHub Actions**: nenhum workflow com falha real (deploy, backup+keep-alive, sync do Drive — todos
  "success" nos runs recentes).
- **Confirmado, não corrigível por mim**: recuperação de senha ainda cai em localhost — é configuração
  do painel do Supabase (Site URL / Redirect URLs), não bug de código; o app já calcula o redirect
  correto dinamicamente. Requer 1 min de ação manual do usuário no painel (link e valores exatos
  entregues a ele diretamente).

## O que foi feito nesta sessão (2026-07-24, parte 2 — Claude, correção crítica: respostas e simulados não sincronizavam)

**Relato do usuário:** "MINHAS QUESTOES E PROGRESSO AINDA CONTINUAM N SALVANDO... É PRA
EU FAZER A QUESTAO E SALVAR PARA SEMPRE Q EU FIZ ELA." Usuário confirmou que o problema
ocorre mesmo logado.

### Diagnóstico (sem tocar em senha do usuário)
O usuário ofereceu login/senha para eu testar — **recusado**, por regra permanente do
projeto (nunca usar/pedir senha, mesmo com autorização explícita do usuário no chat).
Diagnóstico feito 100% via `SUPABASE_SERVICE_ROLE_KEY` (já disponível no `.env.local`,
service role, bypassa RLS, nunca precisa de senha de usuário):
- `db.auth.admin.listUsers()` achou o usuário por e-mail e confirmou login recente
  (hoje, 2026-07-24).
- Contagem direta nas tabelas: `resposta_usuario` = **0 linhas**, `simulado_resultado` =
  **0 linhas**, apesar de uso ativo real. `progresso_conteudo` (resumos/casos) = 5
  linhas, sincronizando normalmente — então o bug era específico de
  questões/simulados, não geral.
- Causa raiz lida em `supabase/migrations/0003_progresso_sincronizado.sql`: os índices
  únicos de `resposta_usuario`/`simulado_resultado` são **parciais**
  (`where client_event_id is not null`). Postgres só aceita um índice parcial como
  árbitro de `ON CONFLICT` quando o mesmo predicado `WHERE` é repetido na cláusula
  `ON CONFLICT` — e o `supabase-js` (`.upsert(dados, { onConflict: "owner_id,client_event_id" })`,
  usado em `src/lib/progresso.ts`) nunca envia esse predicado. Resultado: **todo**
  upsert falhava com o erro Postgres `42P10` ("no unique or exclusion constraint
  matching the ON CONFLICT specification"), para qualquer usuário, desde que a
  migration 0003 foi aplicada (2026-07-21).
- `src/lib/progresso.ts` nunca checava o `{error}` retornado pelo upsert do
  supabase-js (que **não lança exceção**, só retorna `{data, error}`) — por isso a
  falha era 100% silenciosa: sem erro no console, sem aviso na tela, nada.
- Confirmado empiricamente (não só por leitura de código): reproduzi a chamada exata
  do app via cliente admin e recebi o mesmo `42P10` na hora.

### Correção aplicada
1. **Migration `0005_fix_resposta_conflict_target.sql`**: troca os dois índices
   parciais por índices únicos comuns nas mesmas colunas. Em Postgres, `NULL` nunca
   colide com `NULL` num índice único comum — então linhas antigas sem
   `client_event_id` continuam livres de colisão entre si, igual antes; só corrige o
   caso (`client_event_id` preenchido) que estava quebrado. Aplicada no banco de
   produção via `npx tsx scripts/apply-migration.mts` (runner idempotente já existente
   no repo, tracking em `schema_migrations`).
2. **Verificação direta**: reproduzi de novo a chamada exata do app após a migration —
   agora retorna `201 Created`, sem erro.
3. **`src/lib/progresso.ts`**: `enviarResposta`, `enviarSimulado` e os dois upserts
   dentro de `sincronizarProgresso` agora checam `{error}` e fazem `console.error` se
   falhar — para uma falha futura (de qualquer causa) nunca mais ser 100% silenciosa.
   Não foi adicionado retry nem UI de erro — fora do escopo do bug relatado; o
   `console.error` já muda o comportamento de "impossível de detectar" para
   "detectável no DevTools".

### Verificação
`tsc --noEmit` (0 erros), `npm run lint` (0 erros), `npm run build` (358 páginas, ok).
Commit `c44e861`, push feito para `main` (autorizado pelo usuário).

### Impacto para o usuário
Nenhum dado foi perdido — respostas e simulados sempre foram salvos no navegador
(`localStorage`, `local-first`), só nunca tinham saído do dispositivo. Com o fix, a
sincronização volta a funcionar a partir de agora; o histórico já salvo localmente
sobe para a conta automaticamente na próxima vez que o dashboard carregar
(`sincronizarProgresso()` roda no load). Não é preciso refazer nenhuma questão.

## O que foi feito nesta sessão (2026-07-24 — Claude, Cardiologia + Pneumologia + Neurologia)

O usuário forneceu 6 arquivos MD próprios (Resumo Absoluto + Banco de Questões de
Cardiologia, Pneumologia e Neurologia, ~700KB), pedindo para colocar no site. Essas 3
disciplinas já existiam na taxonomia como `scaffold()` vazio dentro de "Clínica
Médica" desde o commit inicial (MVP) — nunca tinham sido populadas.

### Metodologia da fonte: catalogação questão-por-questão das provas reais
O material do usuário foi construído com a MESMA abordagem que a releitura do raio-X
desta sessão recomendou como próximo passo: 36 temas (12 Cardio + 10 Pneumo + 14
Neuro) derivados de catalogar questão a questão as provas oficiais OMED II–V, cada
tema com 16 seções (Definição → Fisiopatologia → ... → Resumo de 5 min) e um banco de
160 questões por disciplina (80 fixação + 80 casos clínicos) com gabarito comentado.

### Conversão via script, não digitação manual
Dado o volume (~9.000 linhas de código gerado), escrito um script de conversão
(`scripts/_import-clm-tmp.mts`, apagado após uso) que fez parsing dos 6 MDs e gerou
diretamente os arquivos TypeScript do site — elimina risco de erro de transcrição
manual em conteúdo desse tamanho. Achados durante a construção do parser:
- Os títulos "# Tema NN — Título" de Cardiologia e Pneumologia vêm sem acentuação
  (bug de alguma etapa de geração do MD de origem; o corpo do texto tem acentos
  normais) — corrigidos à mão via tabela de 22 títulos, conferidos contra o próprio
  sumário do documento.
- O banco de questões de Neurologia usa formato diferente dos outros dois (agrupa por
  cabeçalho `## Rótulo`, sem tag `` `Tema NN` `` por questão) e a ORDEM dos rótulos
  diverge da numeração do resumo a partir do tema 9 (ex.: "Vertigem" no banco é o
  Tema 11 no resumo) — resolvido com tabela de mapeamento rótulo→número, conferida
  questão a questão.
- O gabarito comentado original explica só a alternativa correta (não há
  justificativa distinta por distrator) — o mesmo comentário real foi replicado nas
  4 alternativas de cada questão, em vez de inventar comentário por alternativa.

### Verificação feita
`tsc --noEmit` (0 erros), `npm run lint` (0 erros), script de validação próprio (0
subtemas duplicados, 0 conteúdos órfãos, 0 questões órfãs, 0 IDs duplicados, 0
questões com gabarito ambíguo — 273 subtemas, 195 conteúdos, 1008 questões no total).
`npm run seed` confirmou os números batendo no Supabase. Testado no navegador:
`/biblioteca/cardiologia` mostra os 12 temas novos como "pronto" ao lado dos 4
scaffolds antigos ainda "a importar"; resumo de SCA/IAM renderiza as 17 seções, 3
tabelas como HTML real, sem asterisco solto; o remapeamento de Neurologia conferido
ao vivo (tema "Amnésias e Síndromes Demenciais" mostra as 12 questões certas); tela
de Questões com os 3 filtros novos funcionando. `npm run build` — 358 páginas,
sucesso. Commit `3b4bb98`, push feito para `main` (autorizado pelo usuário).

### Por que isso importa (conecta com a releitura do raio-X)
A releitura do raio-X desta sessão (provas reais OMED II–V) já tinha identificado que
Clínica Médica é bloco pesado na prova, não "transversal" como se supunha — mas o
site não tinha nenhuma disciplina de Clínica Médica com conteúdo real. Esta sessão
resolve exatamente essa lacuna para 3 das maiores áreas (Cardio/Pneumo/Neuro).
Restam ainda como scaffold vazio: Gastroenterologia, Otorrinolaringologia,
Endocrinologia, Hematologia, Nefrologia, Reumatologia, Dermatologia e Emergências
Clínicas — sem material do usuário disponível ainda para essas.

## O que foi feito nesta sessão (2026-07-23 — Claude, organização da biblioteca de mídia)

Continuação da sessão de hoje, seguindo a lista priorizada do `Codex Medicus
Dashboard.md` no Obsidian: item "Organização da mídia — separar a biblioteca por
temas e subtemas, preservando os vínculos dos resumos e casos".

### `/midia` agora agrupa por tema, não só por disciplina
Antes, a galeria era uma grade única filtrada só por disciplina (chip "Cirurgia",
"Infectologia" etc.), sem hierarquia — 73 figuras soltas numa lista. Agora
`MidiaClient.tsx` monta um mapa `subtemaId -> {disciplina, tema}` direto da
taxonomia real (`DISCIPLINAS` de `taxonomy.ts`, não texto duplicado à mão) e agrupa
as figuras já ancoradas (`ONDE_APARECE`) por tema, com a disciplina como subtítulo e
a contagem por grupo. As figuras ainda sem resumo correspondente (48 de 73 hoje)
ficam num grupo honesto "Ainda sem tema associado" no fim da lista filtrada, em vez
de se misturarem soltas entre as organizadas.

O filtro por disciplina (chips) continua funcionando normalmente em conjunto com o
agrupamento — selecionar "Cirurgia" mostra só os grupos/figuras de Cirurgia. Todos
os links "Estudar X" para resumo (e, no futuro, para caso clínico — o campo já
existe no tipo `EtapaCaso.figura`, mas nenhum caso usa ainda) continuam exatamente
como estavam; nada foi removido ou reescrito, só reagrupado.

### Verificação feita
`tsc --noEmit` (0 erros), `npm run lint` (0 erros), conferido no navegador: "73
figuras · 17 temas" (16 temas reais + o grupo "sem tema"), filtro "Cirurgia" isolado
corretamente (8 figuras em 2 grupos), links "Estudar X" abrindo o resumo certo.
`npm run build` — 322 páginas, sucesso (2 timeouts transitórios de SSG,
sem relação com esta mudança, resolvidos no retry automático). Commit `83e6412`,
push feito para `main`.

## O que foi feito nesta sessão (2026-07-23 — Claude, mídia clínica: 7 imagens novas)

Continuação da sessão de hoje (após correção de questões repetidas e releitura do
raio-X), seguindo a lista priorizada do `Codex Medicus Dashboard.md` no Obsidian:
item "Mídia clínica — localizar pelo menos 30 imagens de casos clínicos".

### 7 imagens reais adicionadas, licença verificada via API antes do download
`Meningococcemia — púrpura fulminante`, `Erisipela`, `Isquemia mesentérica (TC)`,
`Bócio`, `Icterícia escleral`, `AVC isquêmico (TC)`, `Fibrilação atrial (ECG)` — todas
do Wikimedia Commons, com `extmetadata.LicenseShortName`/`Artist` conferidos via API
antes de baixar (mesmo processo já estabelecido em sessões anteriores). Uma delas
(meningococcemia) tem permissão confirmada por VRT (equipe de licenciamento da
Wikimedia). Adicionadas ao `registry.tsx`; a maioria ainda não tem resumo
correspondente para ancorar (Clínica Médica e Endocrinologia são só scaffolds no
site hoje), então ficam disponíveis na Biblioteca (`/midia`) aguardando esse
conteúdo — mesmo padrão já usado para ~44 das 54 imagens anteriores.

### 4 buscas sem resultado adequado, documentadas como indisponíveis
Placenta prévia (US), hérnia inguinal (TC), diverticulite (TC) e fratura de quadril
(RX) — o Wikimedia Commons só tinha ilustrações/diagramas ou tratados médicos
antigos digitalizados para esses temas, nenhuma foto/exame real com licença aberta.
Não usados substitutos de qualidade duvidosa.

### Verificação feita
`tsc --noEmit` (0 erros), `npm run lint` (0 erros), as 7 imagens conferidas com
`fetch()` direto no navegador (HTTP 200, content-type e tamanho corretos — evita o
problema conhecido de `<img loading="lazy">` não disparar `load`/`error` em
navegador automatizado), `npm run build` (322 páginas, sucesso). Commit `57a4207`,
push feito para `main`.

### Descoberta relevante para a próxima leva de mídia
Não existe discipline "Clínica Médica" nem "Endocrinologia" povoada no site hoje —
são só `scaffold()` na taxonomia, sem nenhum resumo. Isso bate com o achado da
releitura do raio-X real (ver seção abaixo): Clínica Médica é um bloco pesado nas
provas da OMED, não "transversal" como se pensava. Das 61 imagens reais já
licenciadas, a maioria com prefixo `clm-` (insuficiência cardíaca, HSA, AVC
hemorrágico, TEP, retinopatias, acantose, cardiomegalia, e agora icterícia escleral/
AVC isquêmico/fibrilação atrial) está represada esperando essa disciplina ser
escrita — quando isso acontecer, é só ancorar via `figura:` nos resumos novos, as
imagens já estão prontas.

### Restante da meta (≥30 imagens) para sessão futura
7 de ~26 ainda faltam para a meta de "pelo menos 30" desta leva. Próximos alvos
sugeridos: buscar por radiologia (Radiopaedia — linkar, não embutir, conforme
`docs/PROMPTS-MASTER.md`) para hérnia inguinal, diverticulite e fratura de quadril;
tentar mais imagens de Cirurgia/Ortopedia/Ginecologia que ainda só têm diagrama.

## O que foi feito nesta sessão (2026-07-23 — Claude, banco de questões sem repetição)

Sessão curta pedida pelo usuário via Obsidian: "acesse os próximos passos e faça". O
item concreto e não bloqueado por autorização prévia na lista "Tarefas de amanhã" do
`Codex Medicus Dashboard.md` era: parar de mostrar questões já respondidas ao voltar
para a tela de Questões.

### Correção: fila de questões deixa de ciclar e de repetir já respondidas
`src/components/questoes/QuizClient.tsx` usava um índice com incremento módulo
(`(i + 1) % lista.length`), então ao chegar na última questão da seleção ele voltava
para a primeira — inclusive dentro da mesma sessão. Reescrito para um modelo de fila:
a questão respondida sai da fila ao clicar "Próxima", e ao carregar a página o
componente lê o histórico de respostas (`lerRespostas()` local e depois
`sincronizarProgresso()` da conta) e monta a fila já excluindo o que foi respondido
antes — em qualquer dispositivo, não só neste navegador.

Quando a seleção acaba (tudo já respondido), a tela mostra quantas questões foram
concluídas e oferece "Revisar questões já respondidas" para refazer tudo de propósito.
Enquanto ainda sobram questões novas, um link discreto no cabeçalho ("N já respondidas
(ocultas) — revisar") deixa isso acessível a qualquer momento, sem exigir que o aluno
esgote a lista primeiro.

### Verificação feita
- `NODE_OPTIONS=--max-old-space-size=6144 npx tsc --noEmit` — 0 erros.
- `npm run lint` — 0 erros.
- `npx tsx scripts/seed-supabase.mts` — ok (36 disciplinas, 159 resumos, 528 questões).
- Navegador (dev server em `:3001`, pós-seed): respondida 1 questão de GO, "Próxima"
  avançou sem repetir; recarregando a página (`/questoes`) a questão respondida não
  reapareceu (528 → 527, com aviso "1 já respondidas (ocultas) — revisar"); clicar em
  "revisar" trouxe a seleção completa de volta, incluindo a questão já respondida;
  trocar de disciplina voltou a ocultar automaticamente. Sem erros no console.
- `npm run build` — build estático de produção, 322 páginas, sucesso.
- Commit `b1ac57a` em `main` (repositório local, **ainda não enviado ao GitHub** —
  aguardando confirmação do usuário antes do push, já que isso dispara o deploy do
  GitHub Pages).

### Achado à parte: clone duplicado e desatualizado do repositório
`C:\Users\Adm\Desktop\med\codex-medicus\` é um checkout separado do mesmo repositório
(`MEDICINA-TT`), **19 commits atrás** do `codex-medicus-live` (parado em `8fee480`,
antes de todo o trabalho de login/sincronização) e com duas alterações locais nunca
commitadas: `src/content/conteudos/go.ts` e `src/content/taxonomy.ts`. Não foi tocado
nesta sessão — não dá para saber, sem perguntar ao usuário, se esse diff pendente é
trabalho intencional (do Codex ou de uma sessão anterior) ainda não commitado, ou
apenas um workspace abandonado. **Não descartar essas alterações sem confirmar com o
usuário primeiro.** Recomendação: o usuário decidir se apaga essa pasta antiga ou
resgata o diff, para não haver dois lugares divergentes editando o mesmo site.

## O que foi feito nesta sessão (2026-07-21 — login, progresso e extração final)

- Habilitado login seguro por **e-mail e senha** com sessão persistente, criação de conta, confirmação por e-mail e saída.
- Validado o fluxo real com usuário temporário confirmado: autenticação, RLS, gravação, leitura e exclusão de progresso; o usuário temporário foi removido ao final.
- Respostas e simulados continuam sendo gravados imediatamente no navegador. Ao entrar, o histórico local é enviado à conta; o dashboard reconcilia as cópias local e remota e permite continuar em outro dispositivo.
- Inventariados **871 PDFs** do Estratégia MED. Mapas mentais e flashcards resultaram em **125 nomes de tópicos**, todos cobertos por resumo existente ou complemento novo (**125/125**).
- Recuperados do histórico local autorizado dois acervos que haviam perdido o arquivo de origem operacional: **10 temas + 100 questões de Cirurgia** e **10 temas + 100 questões de MFC**. Os dados brutos recuperados foram preservados em `src/content/raw/` e adaptados à taxonomia atual sem apagar os resumos existentes.
- Fechados os bancos menores: Pediatria **68/68 objetivas recuperadas**, Infectologia perinatal **40/40 objetivas** e GO **80/80 objetivas** do banco identificado.
- As **15 questões discursivas** restantes (5 Pediatria, 5 Infectologia e 5 GO) foram transformadas em casos clínicos interativos, com raciocínio revelável por etapas.
- Adicionados 6 subtemas necessários à taxonomia para acomodar Cirurgia e abordagem familiar em MFC.
- Auditoria estrutural final: 36 disciplinas, 248 subtemas, 159 resumos, 528 questões e 21 casos; zero IDs duplicados, zero questões/casos órfãos e exatamente um gabarito por questão.
- Seed oficial concluído de forma transacional pelo canal PostgreSQL porque o endpoint REST estava temporariamente inacessível: 528 questões publicadas e 2.431 alternativas confirmadas no banco. Linhas históricas de taxonomia/resumo foram preservadas, sem exclusão destrutiva.
- Corrigida a lentidão percebida após a primeira publicação: a busca global deixou de carregar antecipadamente o banco completo de questões, e o cliente de autenticação passou a ser carregado sob demanda com prazos máximos para login e sincronização. O carregamento inicial caiu de cerca de 2,09 MB para 0,78 MB (−62,8%); a versão compilada foi aberta em Chrome isolado sem erros críticos.
- Corrigida a configuração do GitHub Pages para injetar no build as variáveis públicas do Supabase. O workflow agora falha explicitamente se elas estiverem ausentes, evitando publicar novamente uma tela de login sem conexão. A chave administrativa continua fora do artefato público.
- Corrigida também a leitura dessas variáveis no cliente: o acesso dinâmico `process.env[nome]` não é substituído pelo Next.js no navegador; o cliente anônimo agora usa referências estáticas `NEXT_PUBLIC_*`, permitindo que o login publicado inicialize de fato.

### Limite de fonte documentado

Os PDFs exatos `Cirurgia_Banco_160_Questoes_Gabarito.pdf` e `MFC_Banco_80_Questoes_Gabarito.pdf` não existem mais no disco e o histórico antigo contém apenas páginas parciais. Para não inventar transcrições, foram incorporados os acervos completos recuperados dos respectivos **Resumos Absolutos OMED VI**, incluindo 100 questões estruturadas por disciplina. Se os dois PDFs originais reaparecerem, fazer apenas uma auditoria de fidelidade/diferença; não há outra extração local segura pendente.

As seções antigas de pendências abaixo são histórico e ficam supersedidas por este estado.

## O que foi feito nesta sessão (2026-07-21 — migração e IRAS)

- Ambiente local do Claude inventariado; credenciais, variáveis de sessão e snapshots foram excluídos da documentação.
- Criados `docs/MEMORIA-CONSOLIDADA.md` e `docs/AI-HANDOFF.md`, permitindo que outra IA retome o trabalho sem ler todo o histórico bruto.
- Projeto oficial clonado em novo workspace, com `.env.local` mantido fora do Git.
- Extraído o mapa mental **Infecções Relacionadas à Assistência à Saúde** do Estratégia MED (6 páginas).
- Criado novo subtema de alto rendimento em Infectologia, resumo estruturado e **4 questões** sobre higiene das mãos, precaução para aerossóis, profilaxia cirúrgica e diagnóstico de *C. difficile*.
- Conteúdo clínico atualizado com Anvisa 2026, OMS e SHEA/IDSA; a recomendação antiga de metronidazol como opção preferencial para episódio inicial de *C. difficile* não foi reproduzida.

## O que foi feito nesta sessão (2026-07-18, rotina automática)

### Descoberta: gap real na Infectologia apesar do "15/15 temas completos"
O subtema `inf--infeccoes-congenitas--storch-visao-infectologica` (Infecções
congênitas — STORCH) **não tinha resumo nem questões**, apesar do handoff
anterior registrar Infectologia como 15/15 temas completos. Só o lado GO
(`go--infeccoes-congenitas-storch--...`) tinha conteúdo. Corrigido nesta
sessão — ver abaixo.

### Infectologia — resumo STORCH (visão infectológica) + 27 questões
Escrito o resumo faltante pelo eixo **infectológico** (agente/microbiologia/
mecanismo de transmissão), complementar ao resumo já existente em GO (eixo
obstétrico) — evita duplicação, aborda o mesmo grupo de doenças por ângulo
diferente. Cobre patógenos além do TORCH clássico que a OMED cobra: Chagas
congênito, hepatites B/C verticais, TB congênita, GBS, malária gestacional,
listeriose, arboviroses periparto (dengue/chikungunya), HIV vertical.

27 questões extraídas do banco "Exame Nacional de Infectologia Perinatal e
Medicina Fetal" (Google Doc do usuário, sem gabarito anexado — respostas
determinadas e comentadas por alternativa com base em diretrizes MS/CDC/
FEBRASGO/PCDT, já que o material não trouxe gabarito pronto). Cobre toxo,
sífilis, CMV, rubéola, herpes, varicela, parvovírus B19, Zika, Chagas,
HBV/HCV, TB congênita, GBS, malária, listeriose, HIV neonatal.

### GO — 63 questões completando os 4 blocos do Banco OMED GO
O "Banco de Questões OMED: Ginecologia e Obstetrícia" (Google Doc do
usuário) já estava parcialmente extraído em sessões anteriores (17
questões, uma amostra de cada bloco). Nesta sessão foram extraídas **todas
as questões restantes** dos 4 blocos:
- Bloco 1 (Pré-Natal): +13 (Q4,6,7,8,9,10,11,12,14,15,18,19,20)
- Bloco 2 (Pré-eclâmpsia): +14 (Q3,4,5,8-15,18-20)
- Bloco 3 (Sangramentos na gestação): +18 (Q1-5,8-20)
- Bloco 4 (Gravidez ectópica): +17 (Q1,2,4,6-14,16-20)

GO passa de 17 para **79 questões** — banco de GO agora completo para esse
material-fonte (Bloco 5, discursivas, não extraído — formato diferente,
não mapeia diretamente para `Questao` de múltipla escolha; considerar para
`CasoClinico` numa sessão futura).

### Fontes usadas (Google Drive, não estavam mapeadas no PROMPTS-MASTER.md ainda)
- `infec congenita` (Doc, id `13qqz-DGY0bfKaTfJmW5dULQBMNMswLSLet0IzCI-tzs`) — 45 questões (40 MC + 5 discursivas) de infectologia perinatal, usadas parcialmente (27/40 MC extraídas — restam 13).
- `Banco de Questões OMED: Ginecologia e Obstetrícia` (id `1843iScXNAjOR8pj_LraTF-gzSEcX0xOR7Y2Silvc4Hk`) — **100% das 80 questões MC extraídas** nesta e em sessões anteriores; resta só o Bloco 5 (5 discursivas).
- `Simulado de Pediatria 1` (id `1LbjYvrqeF3N6u3ieuDAjlhxo7YrgGKblfVkhAy2vI_I`) — **NÃO tocado nesta sessão**: 60 questões MC (desidratação/reidratação, bronquiolite/crupe, e mais não lidas) — próxima prioridade de Pediatria.
- `simulado indectologia` (id `1ICb-YzIKgIpgLMvEQZfxxBkSw-8fng7WNU8namooguE`) — **vazio** (0 bytes de conteúdo útil), não usar.

### Bugs / erros corrigidos durante a sessão
Um erro de digitação próprio (`nem seguraem` → `nem segura em`) corrigido
antes do commit. Nenhum bug de plataforma encontrado.

## O que foi feito nesta sessão (2026-07-18, interativa — imagens clínicas reais)

Sessão separada da rotina automática acima (mesma data, execução interativa).
Foco: a "PRIORIDADE 2" abaixo, cobrada repetidamente pelo usuário ("imagens
reais de casos clínicos... raio-x, ressonância, tomografia, sintomas") e
ainda não executada até esta sessão.

### Sistema de figuras estendido para imagens reais (não só SVG)
`src/components/figuras/registry.tsx`: o tipo `Figura` ganhou um segundo modo,
`imagem?: ImagemReal` (src/alt/fonte/licenca/autor/url), mutuamente exclusivo
com o `render?: () => ReactNode` (diagrama SVG) que já existia. `Figura.tsx`
renderiza `<img>` com crédito visível obrigatório (fonte, autor, licença,
link) quando é imagem real, e mantém o SVG quando é diagrama.

`BlocoConteudo.figura` passou de `string` para `string | string[]` — uma
seção agora pode ancorar diagrama **e** foto real juntos (novo componente
`Figuras`, plural, ao lado do `Figura` original, usado em
`estudar/[subtemaId]/page.tsx`). Seed e leitura do Supabase
(`seed-supabase.mts`, `supabase-repository.ts`) atualizados para gravar/ler
múltiplas figuras concatenadas por vírgula na coluna `text` já existente —
sem migração de schema nova.

### 5 imagens reais com licença verificada, ancoradas em Infectologia
Todas verificadas via API do Wikimedia Commons (`extmetadata.LicenseShortName`
/ `Artist`) **antes** de baixar, salvas em `public/img/clinicas/` (nunca
hotlink):

| Imagem | Achado | Licença | Ancorada em |
|---|---|---|---|
| `tb-miliar-rx.jpg` | RX tórax, padrão miliar | CC BY 4.0 | Tuberculose (+ diagrama já existente) |
| `sifilis-cancro-duro.jpg` | Cancro duro (sífilis 1ª) | Domínio público (CDC PHIL) | Sífilis (+ diagrama já existente) |
| `sifilis-secundaria-exantema.jpg` | Exantema palmoplantar (sífilis 2ª) | Domínio público (CDC PHIL) | Sífilis |
| `sarampo-exantema.jpg` | Exantema morbiliforme | Domínio público (CDC PHIL) | Doenças exantemáticas (+ diagrama já existente) |
| `pneumonia-consolidacao.jpg` | Consolidação lobar + broncograma | Domínio público (CDC/EID) | PAC — **1ª figura desse resumo, antes não tinha nenhuma** |

### Bug real encontrado e corrigido: basePath do GitHub Pages não chegava em `<img>`
`next/image` e `next/link` recebem o prefixo `/MEDICINA-TT` automaticamente
no build de export; uma tag `<img src="...">` crua, não. Sem correção, as 5
imagens (e qualquer imagem real futura) dariam 404 no site publicado, mesmo
funcionando perfeitamente em `next dev`. Corrigido com um helper novo,
`src/lib/asset.ts`, e a env var `NEXT_PUBLIC_BASE_PATH` adicionada em
`next.config.ts` — usado em todo `<img src>` de imagem real (`Figura.tsx`,
`MidiaClient.tsx`).

### Verificação feita
- `tsc --noEmit` — 0 erros.
- Navegador (dev server, pós-seed): páginas de Sífilis, Tuberculose e PAC —
  as 3 mostram os diagramas antigos **e** as fotos reais juntos, com selo
  "imagem real" e linha de crédito (fonte/autor/licença) correta.
- Página `/midia` (Biblioteca visual): 17 figuras listadas (12 + 5), os 5
  cards de imagem real com crédito e link "Estudar X" de volta ao resumo.
- As 5 imagens conferidas por `fetch()` direto no navegador: HTTP 200,
  `image/jpeg`, tamanho em bytes batendo com o arquivo local — nenhuma
  corrompida.
- Commit `0b99873`, push feito para `main`. Deploy do GitHub Actions/Pages
  confirmado com sucesso; site publicado testado ao vivo (não só dev
  local) — as 5 imagens e a galeria `/midia` carregam corretamente sob o
  basePath `/MEDICINA-TT/`.

### Bug de plataforma encontrado (não relacionado a imagens): `backup.yml` falhava 100% desde a criação
Ao checar o deploy, notei o workflow "Backup e keep-alive" com status de
falha em **todos** os pushes desde que foi criado (2026-07-16) — nunca
tinha sido notado porque não bloqueia o site. Causa: `if:` de step
referenciando `secrets.*` diretamente não é permitido pelo GitHub Actions
("Unrecognized named-value: 'secrets'") — o arquivo inteiro ficava
inválido (0 jobs, falha instantânea a cada push). Corrigido movendo os
secrets para `env:` no nível do job e trocando os `if:` para `env.*`
(mesmo padrão já correto em `sync-drive.yml`). Commit `864bfd5`.
Confirmado: o workflow agora aparece com o nome próprio ("Backup e
keep-alive") em vez do path do arquivo — sinal de que o parse passou a
funcionar. O `pg_dump` semanal (segunda 05h UTC) e o ping anti-hibernação
do Supabase estavam ambos mortos até agora; a partir desta correção
devem rodar de verdade.

## O que foi feito nesta sessão (2026-07-18, interativa — curso Estratégia MED)

Terceira sessão do dia (mesma data). O usuário enviou **33 ZIPs** (Google
Drive export completo de um curso — Estratégia MED, aulas "Extensivo") em
5 disciplinas: GINECOLOGIA (7 partes), OBSTETRÍCIA (6), PEDIATRIA (9),
PREVENTIVA (6), INFECTOLOGIA (5) — mais 3 ZIPs antigos que ainda não
tinham sido processados (`00. Materiais`, `BAGAGEM DO JOTA`, `BAGAGEM
GABS`). Pedido: "mais conteudo para vc, siga os prompts, e atualize a
rotina."

### Extração — só os PDFs, nunca os vídeos
Cada ZIP contém, por tópico: `Videoaulas/*.mp4` (enorme — é isso que
fazia cada ZIP ter ~2 GB — sem transcrição disponível, **não extraído**)
e `Slide/Mapa Mental/Flashcard/*.pdf` (pequeno, denso). Com só 64 GB
livres em disco, extrair tudo teria estourado o espaço — a solução foi
extrair cada ZIP inteiro para uma pasta temporária, copiar só os `*.pdf`
para fora, apagar a pasta temporária, e repetir ZIP a ZIP (nunca mais de
~2 GB de pico). **871 PDFs** copiados no total para
`C:\Users\Adm\Desktop\MEDICINA\_pdfs-estrategia\<DISCIPLINA>\` (pasta
plana, nome do tópico já vem no nome do arquivo). Os ZIPs originais
continuam intactos em Downloads (backup do usuário, não apagar).

**Qualidade por tipo de PDF** (testado com `scripts/extract-pdf.mts`):
**Mapa Mental é a melhor fonte** — texto rico, denso, já estruturado
(definição/epidemiologia/fisiopatologia/diagnóstico/tratamento/tabelas
comparativas), pronto para virar resumo quase direto. **Flashcard** é
bom para questões de fixação rápida (formato pergunta/resposta, uma por
página). **Slide ("Material-da-aula")** é majoritariamente **imagem**,
não texto — a camada de texto do PDF captura só cabeçalho/rodapé,
o conteúdo real não vem. **Não usar Slide como fonte de texto.**

Inventário por disciplina (arquivos totais / Mapas Mentais ≈ tópicos únicos):
- GINECOLOGIA: 162 arquivos / 24 tópicos
- OBSTETRÍCIA: 136 arquivos / 25 tópicos
- PEDIATRIA: 236 arquivos / 25 tópicos
- INFECTOLOGIA: 107 arquivos / 20 tópicos
- PREVENTIVA: 30 arquivos / 4 tópicos (zips com bem menos PDF por vídeo — ver nota abaixo)

### Mapeamento de disciplina (já registrado no PROMPTS-MASTER.md)
GINECOLOGIA + OBSTETRÍCIA → disciplina existente "Ginecologia &
Obstetrícia"; PEDIATRIA → "Pediatria"; INFECTOLOGIA → "Infectologia";
**PREVENTIVA → mesclar em "MFC & Atenção Primária"** (não criar
disciplina nova — o conteúdo de Preventiva é essencialmente Saúde
Coletiva/Epidemiologia/SUS, que já é o escopo do MFC na taxonomia; a
disciplina "Saúde Pública" isolada existente é só um scaffold vazio, não
usar).

### Conteúdo escrito nesta sessão — 11 resumos
**GO (8 resumos, todos em temas/subtemas NOVOS)** — a taxonomia de GO
era quase só obstétrica; ginecologia geral estava praticamente vazia.
Criados os temas "Distúrbios endócrino-menstruais", "Infecções
ginecológicas", "Oncologia ginecológica", "Mastologia", "Miomatose e
adenomiose", "Uroginecologia", "Climatério": síndrome dos ovários
policísticos, vulvovaginites, DIP, câncer de colo uterino, câncer de
mama, incontinência urinária, climatério/terapia hormonal, miomatose
uterina.

**Infectologia (3 resumos, preenchendo subtemas que já existiam vazios
na taxonomia)**: malária (tema inteiro estava sem conteúdo), zika e
chikungunya, COVID-19 e influenza (manejo).

Todos com fonte real citada (FEBRASGO, SOBRAC 2024, MS, CDC, FIGO) —
nenhum fato inventado; onde o PDF do curso não trazia detalhe suficiente
(ex. chikungunya, mais fraco no material extraído), complementado com
diretriz nomeada (MS), nunca "chutado".

### Bug de plataforma encontrado e corrigido: MiniMarkdown não processava `***negrito+itálico***`
Ao escrever os resumos de malária com nomes de espécie em itálico dentro
de frases em negrito (convenção médica padrão — *Plasmodium*, *P.
falciparum* etc.), percebi asteriscos literais sobrando na tela.
Causa: o parser (`src/components/content/MiniMarkdown.tsx`) usa uma
regex que **não aceita nenhum asterisco dentro de um span** — então
`***texto***` (negrito+itálico aninhado) quebra a contagem e vaza
asterisco cru. **Não é bug só do conteúdo novo** — já afetava conteúdo
publicado de sessões anteriores (Infectologia: PAC, endocardite,
parasitoses; Pediatria: crupe×epiglotite; GO: gravidez ectópica) com
`***S. aureus***`, `***Leptospira***`, `***H. influenzae***` etc.

Corrigido o parser para o caso limpo — `***span único sem asterisco no
meio***` agora vira `<strong><em>`. Casos mais complexos (negrito
envolvendo *parte* itálica no meio de uma frase, tipo `**texto *itálico*
mais texto**`) são ambíguos até para esse parser melhorado — precisariam
de um parser recursivo de verdade, desproporcional para um componente
"deliberadamente mínimo" (comentário já existente no arquivo). Esses
poucos casos (contados: 1 em go.ts, 1 em pediatria.ts, 4 em
infectologia.ts, 3 nos resumos novos de malária) foram simplificados à
mão (removido o itálico aninhado, mantido só o negrito).
**Recomendação para sessões futuras: não aninhar `*itálico*` dentro de
`**negrito**` — use só um nível de ênfase por trecho, ou o `***ambos***`
quando o span inteiro (sem texto extra antes/depois) for itálico+negrito.**

### Verificação feita
- `tsc --noEmit` — 0 erros.
- Script de validação (`scripts/_validate-tmp.mts`, apagado depois): 0
  órfãos, 0 duplicados, 170 subtemas / 43 conteúdos / 43 com conteúdo.
- Navegador (dev server, pós-seed): resumo de miomatose e câncer de mama
  (com tabelas) renderizando corretamente; resumo de malária confirmado
  SEM asterisco solto após o fix do parser; resumo de PAC (conteúdo
  antigo, tinha `***S. aureus***`) também confirmado corrigido
  retroativamente pelo mesmo fix.
- Commit `654218e`, push feito para `main`.
- `docs/PROMPTS-MASTER.md` e o SKILL.md da rotina diária
  (`C:\Users\Adm\.claude\scheduled-tasks\codex-medicus-daily-dev\SKILL.md`)
  atualizados com a nova fonte, sua estrutura e o mapeamento de
  disciplinas — a rotina de amanhã já vai saber usar isso.

### O que ficou pronto para a próxima sessão usar direto
- **OBSTETRÍCIA** (136 PDFs/25 tópicos): nada escrito ainda nesta sessão
  além do que já mapeava para temas existentes. Tópicos vistos no
  inventário: TPP/prematuridade, partograma e distocias, infecções
  congênitas na gestação (já existe resumo do lado GO — checar
  duplicação), alteração do volume de líquido amniótico, abortamento de
  repetição — e mais ~20 não inspecionados ainda.
- **PEDIATRIA** (236 PDFs/25 tópicos): maior volume de todos, nada
  escrito nesta sessão. Vistos no inventário: cuidados neonatais,
  deficiências vitamínicas e profilaxias, anafilaxia e urticária, DNPM,
  cefaleias na infância, púrpura de Henoch-Schönlein — e mais ~19 não
  inspecionados.
- **PREVENTIVA** (30 PDFs/4 tópicos — bem menor): testes diagnósticos
  (já existe subtema em MFC — enriquecer, não duplicar), marcos legais
  do SUS (idem), processos epidêmicos/epidemiologia das doenças
  infecciosas, saúde do trabalhador (novo).
- **GINECOLOGIA**: ainda restam ~16 tópicos não escritos desta leva
  (Adenomiose, Endometriose, Cervicites, Doenças de vulva e vagina,
  Úlceras genitais, Doenças benignas da mama, Câncer do corpo do útero,
  Tumores anexiais/câncer de ovário, Prolapso de órgãos pélvicos,
  Infertilidade conjugal, Sexualidade, SPM, Abdome agudo em ginecologia,
  Assistência a vítima de violência sexual, Rastreamento — já existe
  tema, conferir se falta subtema — Anatomia/embriologia do trato
  genital). Extração de conteúdo já feita para Miomatose via Flashcard
  (Mapa Mental deu erro de parse "Illegal character: 41" — tentar de
  novo ou usar só o Flashcard, que funcionou).
- **INFECTOLOGIA**: temas novos vistos no inventário sem equivalente na
  taxonomia ainda — Animais Peçonhentos, IRAS, Micoses Invasivas,
  Neutropenia Febril/FOI, Hepatoesplenomegalias Infecciosas, Síndrome
  Febril Íctero-hemorrágica — precisam de tema/subtema novo antes de
  virar resumo. TB latente e HIV/infecções oportunistas (subtemas já
  existentes, vazios) podem estar cobertos dentro dos Mapas Mentais de
  Tuberculose/HIV já extraídos — não verificado ainda.

## O que foi feito nesta sessão (2026-07-19, madrugada — skills, Obsidian, tentativa de workflow em massa)

Quarta sessão (após a de imagens reais e a do curso Estratégia MED). Pedido do
usuário: extrair "tudo" (o usuário perguntou, corretamente, se eu tinha
extraído todos os resumos/questões da sessão anterior — a resposta foi não,
só 11 de ~98 tópicos disponíveis viraram resumo), adicionar mais questões e
casos clínicos "de todos os conteúdo", instalar skills úteis, conectar a um
vault do Obsidian, e buscar 60 imagens clínicas reais. O usuário tinha
"ultracode" ativado nesse momento, o que autorizou usar o Workflow tool
(orquestração multi-agente) em vez de fazer tudo manualmente.

### Skills instaladas
- `obsidian-vault` (mattpocock/skills, 143.9K installs) e `obsidian-markdown`
  (kepano/obsidian-skills — kepano é o desenvolvedor-líder do Obsidian, 59.8K
  installs) — via `npx skills add ... -g -y`.
- `token-efficiency` (delphine-l/claude_global, 1.8K installs).
- Pesquisado e **descartado** por falta de qualidade (poucos installs, < 150):
  skills de PDF processing, git-commit-workflow, e "medical/clinical" — nenhum
  bateu a barra de qualidade (1K+ installs preferencial) nem agregava algo que
  já não fazemos manualmente (extract-pdf.mts, convenção de commit já
  estabelecida).

### Vault do Obsidian criado
Não existia nenhum vault no computador (verificado em Desktop/Documents/
OneDrive — nada). Criado do zero em `C:\Users\Adm\Desktop\Obsidian Vault\`,
seguindo as convenções do skill instalado (flat, sem pastas, wikilinks, notas
`Index`): `Index.md`, `OMED Index.md`, `OMED Raio-X.md` (trazido de
`RAIO-X-OMED.md`), `Codex Medicus.md` (explica a relação site×vault — o site
é a base estruturada, o vault é espaço pessoal solto), `Estudo Diário.md`
(modelo de log de estudo). O SKILL.md do `obsidian-vault` foi editado para
apontar pro caminho real (o arquivo original tinha um path de exemplo do
autor original, `/mnt/d/Obsidian Vault/AI Research/`, que não existe aqui).

### Tentativa de gerar questões/casos/imagens via Workflow em massa — FALHOU por limite de sessão
Duas Workflows grandes foram lançadas (43 tópicos × 4 questões + 8 casos
clínicos; busca+verificação de 60 imagens reais), cada uma com uma etapa de
verificação cética separada por item. **Ambas foram atingidas por um limite
de sessão/uso** ("session limit", reset aliás **23h America/Sao_Paulo**) logo
no início — a maioria dos agentes falhou com a mesma mensagem de limite, não
por um bug de conteúdo. Isso derrubou quase todo o proveito das duas
Workflows:
- Questões: só 5 de 43 tópicos tiveram a etapa de escrita concluída, **zero**
  sobreviveu à etapa de verificação (que também foi atingida pelo limite) —
  resultado final vazio.
- Imagens: só 3 de 60 tiveram busca+download concluídos.

**Bug real encontrado nos dois scripts** (corrigido, arquivos ainda existem
no disco para reuso): quando o agente da etapa de **verificação** falhava
(retornava `null`, incluindo por causa do limite de sessão), o `.then(...)`
seguinte não tratava esse `null` e quebrava o pipeline inteiro com erro tipo
`"null is not an object (evaluating 'veredito.aprovado')"` — mascarando o
resultado real (que já tinha itens aprovados de verdade, perdidos pelo
crash). Corrigido nos dois arquivos de script (`if (!v) return null` antes de
desreferenciar). Os scripts corrigidos ficam em:
- `C:\Users\Adm\.claude\projects\C--Users-Adm-Desktop-med-codex-medicus\179bffe7-7924-4554-87af-89d84f9b519f\workflows\scripts\gerar-questoes-casos-omed-wf_d6d32d8a-1e2.js`
- `C:\Users\Adm\.claude\projects\C--Users-Adm-Desktop-med-codex-medicus\179bffe7-7924-4554-87af-89d84f9b519f\workflows\scripts\buscar-60-imagens-clinicas-wf_eaaf18c5-f98.js`

**Recuperado do que sobreviveu:**
- As 3 imagens que tinham completado busca+download foram **verificadas de
  novo manualmente** (re-consulta independente da licença via API do
  Wikimedia) antes de aceitar: `mola-hidatiforme-us.jpg` (CC0), `colo-uterino-
  colposcopia.gif` (CC BY 4.0), `cancer-mama-mamografia.jpg` (domínio público,
  NCI/NIH) — todas confirmadas, registradas em `registry.tsx`, ancoradas nos
  resumos de hemorragias da 1ª metade (mola), câncer de colo e câncer de
  mama, e no mapa de navegação do `/midia`. Commit `89b46d6`.
- As 5 questões que tinham só a etapa de escrita (sem verificação) **não
  foram usadas** — ficam no journal da Workflow
  (`...\subagents\workflows\wf_d6d32d8a-1e2\journal.jsonl`) caso alguém queira
  revisá-las manualmente depois, mas não devem ser tratadas como prontas
  (nunca passaram pela checagem cética).

### Decisão para o resto da sessão
Dado que gerar subagentes está bloqueado até o reset (23h), e que o modo
"ultracode" também foi desativado no meio da sessão (voltou a regra padrão de
só usar Workflow quando pedido explicitamente), **não relancei as duas
Workflows**. O trabalho de escrever questões/casos/buscar imagens **continua
pendente** — praticamente do zero (só 3 imagens novas, 0 questões novas desta
leva).

## O que foi feito nesta sessão (2026-07-19 — extração direta de questões/casos/imagens)

Continuação direta da sessão anterior, depois que o usuário confirmou "faça
tudo q pedi". A tentativa de usar Workflow (multi-agente) foi retentada
**duas vezes mais** e falhou as duas vezes pelo mesmo motivo — ver lição
abaixo. Diante disso, todo o conteúdo desta seção foi **escrito
diretamente**, sem subagentes.

### Descoberta importante: o limite de sessão é rolante, não um horário fixo
Cada nova tentativa de Workflow grande (dezenas de agentes de uma vez)
bateu o limite quase instantaneamente, e a mensagem de "reset" **mudou de
horário a cada tentativa** (23h → 13:40 → ainda em vigor às 15h50 do mesmo
dia). Conclusão: o limite é proporcional ao volume de agentes disparados
em rajada recente, não um reset num horário fixo do dia. **Um teste rápido
com 1 agente isolado sempre funcionou** — o problema é especificamente
lançar dezenas de agentes de uma vez via Workflow. Lição para sessões
futuras: se o objetivo é gerar muito conteúdo, ou usar Workflow com poucos
agentes por vez (ex.: lotes de 5-10, não 40-60), ou simplesmente escrever
diretamente (mais lento, mas 100% confiável e é o que efetivamente
funcionou aqui).

### Questões — 74 novas (todos os 43 tópicos agora com ≥ 2 questões)
Auditoria real (contagem programática por `subtemaId`, não estimativa)
revelou que **GO e Pediatria já estavam bem cobertos** (2 a 28 questões por
tópico), mas **11 dos 21 tópicos de Infectologia tinham ZERO questões**:
PAC, ITU, endocardite, hepatites virais, doenças exantemáticas, raiva,
leptospirose, mpox, parasitoses intestinais, antibioticoterapia,
imunizações no adulto. Escritas 30 questões para esses 11 (commit
`e160a78`), mais as 44 já commitadas antes (`6c0b656`): 8 tópicos novos de
GO (32) + 3 tópicos novos de Infectologia — malária, zika/chikungunya,
COVID-19/influenza (12).

### Casos clínicos — 2 novos (Cirurgia e MFC, únicas disciplinas sem
cobertura variada)
- `caso-cir-02`: mesmo subtema (colecistite/colangite, único disponível em
  Cirurgia), ângulo diferente do caso já existente — o espectro cólica
  biliar → colecistite → coledocolitíase, não a progressão para choque
  séptico já coberta.
- `caso-mfc-01`: **primeiro caso clínico da história do MFC** — raciocínio
  aplicado de sensibilidade/especificidade/VPP com uma vinheta de
  rastreamento populacional.

### Imagens reais — 16 novas nesta sessão (13 + 4, commit `6c0b656`)
Todas buscadas e com licença verificada manualmente (API do Wikimedia,
mesma checagem de sempre) uma a uma, sem Workflow: manchas de Koplik
(sarampo), TB cavitária, crupe e epiglotite (RX cervical — sinal da torre
e sinal do polegar), pneumotórax, apendicite (TC), obstrução intestinal
(RX), pé diabético, baqueteamento digital, cianose central, gota (tofos),
escabiose, doença mão-pé-boca. Ancoradas onde já havia resumo compatível
(TB, exantemáticas, crupe×epiglotite); as demais ficam disponíveis na
Biblioteca (`/midia`) aguardando resumo correspondente.

Uma imagem (`ictericia-kramer-rn.jpg`, ~71 KB, JPEG válido) foi
**descartada** por não ter registro de fonte/licença recuperável —
provavelmente baixada por um agente da Workflow anterior que morreu antes
de retornar seus metadados. Nunca use uma imagem sem conseguir confirmar a
licença, mesmo que o arquivo pareça legítimo.

### Rate limit do Wikimedia (diferente do limite de sessão)
Depois de ~15-20 requisições de download em poucos minutos, o CDN do
Wikimedia (`upload.wikimedia.org`) passou a retornar **HTTP 429** com a
mensagem "Too many requests — contact noc@wikimedia.org...". É um limite
da própria Wikimedia, não relacionado ao limite de sessão do Claude.
Mitigação: espaçar downloads por pelo menos 3-5 segundos, e se começar a
tomar 429, parar por vários minutos antes de tentar de novo — insistir
imediatamente só resulta em mais arquivos de erro HTML disfarçados de
imagem (sempre confirme o tamanho/conteúdo do arquivo baixado).

## PRIORIDADE 0 (mais urgente) — o que ainda falta desta leva

1. **11 imagens clínicas do lote original sem arquivo aberto adequado** (das 60 originalmente
   planejadas, 16 já feitas nesta sessão + 3 da sessão anterior = 19 no
   total). A lista completa dos alvos ainda não buscados (query em inglês,
   legenda em português, disciplina) está nos arquivos de script linkados
   na entrada da sessão anterior, ou pode ser refeita a partir do padrão já
   estabelecido. Continuar buscando **com pausas de 3-5s entre downloads**
   para não levar 429 do Wikimedia.
2. **Continuar a extração de resumos do curso Estratégia MED** — ver seção
   "CURSO ESTRATÉGIA MED" no PROMPTS-MASTER.md. Ainda faltam: Obstetrícia (25
   tópicos), Pediatria (25), Preventiva (quase tudo), ~16 de Ginecologia —
   esta é a maior pendência em volume absoluto de todo o projeto.
3. **Mais um caso clínico por disciplina** seria valioso (GO e Pediatria só
   têm 1 cada; Infectologia e Cirurgia têm 1-2) — considerar ao extrair
   novos resumos do Estratégia MED, aproveitando o material fresco.

## PRIORIDADE 1 — Continuar a extração (nesta ordem)

### Estratégia MED — a fonte mais densa agora disponível
Ver seção acima + `docs/PROMPTS-MASTER.md` ("CURSO ESTRATÉGIA MED") para
localização exata, estrutura e o que já foi/falta escrever por
disciplina. Ordem sugerida: Infectologia (poucos tópicos novos, resto é
enriquecimento) → Pediatria (maior volume) → Obstetrícia → resto de
Ginecologia → Preventiva (mesclar em MFC).

### Infectologia — 13 questões restantes do doc "infec congenita"
Questões não extraídas ainda (números do doc original): 5, 15, 18, 23, 25,
28, 30, 31, 33, 35, 36, 37, 39 — cobrem HIV pós-natal (proscrições),
avidez alta de toxo, pênfigo sifilítico, herpes com eletrodo de escalpo
(já usei uma versão similar), calcificação "em pipoca", varicela
congênita (janela de risco), dengue perinatal, chikungunya periparto,
via de parto na hepatite B, sífilis (sinal de Higouménakis), seguimento
de VDRL neonatal. Mais as 5 questões discursivas (Q41-45) — considerar
adaptar para `CasoClinico` em vez de `Questao`.

### Pediatria — Simulado de Pediatria 1 (Drive, 60 questões MC não tocadas)
Doc já lido nesta sessão (fileId `1LbjYvrqeF3N6u3ieuDAjlhxo7YrgGKblfVkhAy2vI_I`),
conteúdo confirmado: **Parte 1** tem pelo menos duas seções — "I. Desidratação
e Diarreia Aguda" (Q1-12) e "II. Bronquiolite Viral Aguda e Crupe" (Q13-24) —
60 questões no total, seção completa não lida além de Q13-14. Mapeia bem
para subtemas já existentes: `ped--emergencias-pediatricas--desidratacao-e-reidratacao`,
`ped--infeccoes-respiratorias-na-infancia--bronquiolite`,
`ped--infeccoes-respiratorias-na-infancia--crupe-laringotraqueobronquite`.
**Sem gabarito no doc** — responder com base em diretrizes SBP/MS/AAP,
como feito para Infectologia/GO nesta sessão.

### GO — Bloco 5 discursivo (5 questões) do Banco OMED GO
Não mapeia para `Questao` (múltipla escolha) — avaliar se vira `CasoClinico`
(etapas reveláveis) ou uma seção nova de "questões dissertativas" no
resumo. Temas: pré-natal (RCF vs. feto constitucional), pré-eclâmpsia grave,
PP vs. DPP, gestação de localização desconhecida, caso integrado (HAS
crônica + pré-eclâmpsia sobreposta).

### Outras disciplinas (ainda não abordadas nesta leva de sessões)
- **Cirurgia**: só 8 questões, nenhum resumo novo. `Cirurgia_Resumo_Absoluto_OMED_VI`
  e o banco de 160 questões — fontes locais (Downloads) foram removidas;
  buscar no Drive (ainda não pesquisado nesta sessão) ou no histórico de
  conversas do Claude.
- **MFC**: só 12 questões. Mesma situação — buscar no Drive.
- Considerar pesquisar Drive por `title contains 'Cirurgia'` e
  `title contains 'MFC'` na próxima sessão (não feito ainda).

## PRIORIDADE 2 — Imagens clínicas reais

**Começado nesta sessão** (ver seção acima) — 5 imagens reais ancoradas em
Infectologia (TB, sífilis ×2, sarampo, PAC). O sistema (`registry.tsx` com
`imagem?: ImagemReal`, `asset()`/basePath, figuras múltiplas por seção) está
pronto para reuso — falta aplicar às outras disciplinas:

1. **GO**: DPP × placenta prévia, pré-eclâmpsia, gravidez ectópica (US) —
   hoje só têm diagrama SVG, nenhuma foto/exame real ainda.
2. **Pediatria**: crupe/epiglotite (RX cervical em "sinal do polegar"),
   icterícia neonatal (foto clínica), desidratação (sinais ao exame).
3. **Cirurgia**: vias biliares/Mirizzi (colangio-RM ou US) — só diagrama.
4. **MFC**: tabela 2×2 é conceitual, não pede imagem real.
5. Explorar o Google Drive do usuário (pastas "Resumos e cursos"/
   "MEDICINA") com esse fim específico — ainda não feito. O usuário
   mencionou que vai enviar imagens próprias; essas têm prioridade sobre
   qualquer imagem de terceiros e devem substituir/complementar as atuais
   quando chegarem.

Fontes por ordem de preferência (ver `docs/PROMPTS-MASTER.md`): imagens do
próprio usuário > Radiopaedia (linkar, não embutir) > Wikimedia Commons
(baixar e verificar licença antes, como feito agora) > Open-i (NIH)/PMC
open access. Nunca Google Images, AMBOSS, UpToDate ou fotos de livro
escaneado — risco de direito autoral.

## Armadilhas do ambiente (confirmadas/reforçadas nesta sessão)

- **Sem gabarito nos docs do Drive é a norma, não exceção** — nenhum dos
  3 bancos de questões usados nesta sessão (GO, infec congenita) trouxe
  gabarito. A conduta adotada: responder como médico-especialista, citando
  a diretriz (MS/FEBRASGO/ACOG/CDC) no comentário de cada alternativa, sem
  jamais inventar o mecanismo/fato clínico. Continuar assim.
- **Bash tool no Windows**: escrever scripts temporários de validação em
  `scripts/_nome-tmp.mts` dentro do repo (não em `/tmp`, que resolve para
  um path Windows inválido no ambiente) e apagar depois de usar.
- **`npm run seed` demorou > 2 min** nesta sessão (rodar em background e
  aguardar notificação, não bloquear o turno).
- **O dev server lê do Supabase** — sempre `npm run seed` antes de
  verificar no navegador.
- `temConteudo` é **derivado** de CONTEUDOS — nunca marcar à mão.
- **PDFs grandes**: Read não pagina → `npx tsx scripts/extract-pdf.mts`.
  Mas nesta sessão os PDFs do Downloads continuam ausentes — Drive foi a
  fonte primária, com sucesso.
- **Verificar `<img loading="lazy">` no navegador automatizado**: os eventos
  `load`/`error` não disparam de forma confiável (a imagem nunca entra no
  viewport da aba headless, então o IntersectionObserver não ativa) —
  `naturalWidth`/`complete` ficam presos em 0/false mesmo com o arquivo
  correto. Não é bug de verdade. Confirmar servindo certo com `fetch(url)`
  direto no console (status 200, `content-type`, `content-length`) em vez
  de esperar o evento de load da tag `<img>`.
- **`MiniMarkdown` não aceita asterisco aninhado** — nunca escrever
  `**negrito com *itálico* no meio**`; use só um nível de ênfase, ou
  `***span inteiro***` quando o trecho inteiro (sem texto extra antes/
  depois dentro do mesmo span) for negrito+itálico junto. Ver "bug de
  plataforma" nesta sessão para o porquê.
- **`unzip` neste ambiente não casa wildcard (`*.pdf`) com `/`** — não
  adianta `unzip arquivo.zip "*.pdf" -d dest` nem `-x "*.mp4"`; extrai
  tudo pra uma pasta temporária e filtra depois com
  `find tmp -iname "*.pdf" -exec cp {} dest \;`, apagando a temporária no
  fim. Testado e confirmado nesta sessão.
- **Dev server pode morrer sozinho sob I/O de disco pesado** (ex.: unzip
  grande rodando em paralelo) — se `preview_start`/`navigate` falhar sem
  motivo aparente, rodar `preview_list` para conferir se o processo
  ainda existe; se não, só chamar `preview_start` de novo (não precisa
  investigar mais que isso).
- **`npx tsx ...` frequentemente cai sozinho em background** neste
  ambiente (mesmo sem pedir `run_in_background`) — normal, só aguardar a
  notificação em vez de re-tentar em primeiro plano.
- **Workflows grandes (muitos agentes em pouco tempo) podem bater um "session
  limit"** com reset em horário fixo (visto: 23h America/Sao_Paulo). Quando
  isso acontece, TODOS os agentes daquele momento em diante falham com a
  mesma mensagem — não é bug de conteúdo. Sinais: `agents_error` alto no
  resumo da Workflow, mensagem literal "You've hit your session limit".
  **Antes de relançar uma Workflow grande, considerar se o horário está perto
  de um limite recente.** E sempre que uma etapa de pipeline chama `agent()`
  de novo depois da primeira (ex.: escrever → verificar), tratar o `null` de
  QUALQUER chamada, não só da primeira — `agent()` pode retornar `null` em
  qualquer etapa, e não tratar isso quebra o pipeline inteiro e mascara
  resultados parciais bons que já existiam.

## Checklist antes de commitar (reforçado, seguido nesta sessão)

1. `NODE_OPTIONS=--max-old-space-size=6144 npx tsc --noEmit` — ok, 0 erros.
2. Validar vínculos órfãos (script `scripts/_validate-tmp.mts`, apagado
   depois): 0 órfãos, 0 IDs duplicados, 170 subtemas / 43 conteúdos.
3. `npx tsx scripts/seed-supabase.mts` — ok (36 disciplinas, 43 resumos,
   224 questões).
4. Verificado visualmente no navegador (pós-seed, dev server): resumos de
   miomatose e câncer de mama (tabelas), resumo de malária (confirmando o
   fix de markdown), resumo de PAC (confirmando o fix retroativo em
   conteúdo antigo) — todos renderizando corretamente, sem asterisco
   solto, sem erros de console.
5. Push feito e confirmado (`654218e` em `origin/main`, nada pendente).

## Regra de ouro

**Nunca inventar fato clínico.** Toda afirmação vem do material do usuário
ou de diretriz (MS, FEBRASGO, SBP, ACOG, IDSA, CDC, Surviving Sepsis, TG18,
WSES). Quando o material não trouxer gabarito, a resposta é determinada e
justificada com base em diretriz nomeada — nunca "chutada". Uma questão
errada é pior que uma questão a menos.

## Sessão 2026-07-21 — conclusão do lote de imagens

- 32 novos arquivos reais foram aprovados visualmente, baixados localmente e registrados com fonte, autoria e licença; o acervo agora tem 66 figuras (54 registros de imagens reais em 53 arquivos).
- As figuras mais diretamente relacionadas foram vinculadas aos resumos de gravidez ectópica, sífilis e doenças exantemáticas; a biblioteca visual exibe todo o restante.
- O lote original de 60 alvos ficou em **49/60 atendidos**. Os 11 sem imagem aberta e clinicamente adequada são: placenta prévia por US, meningococcemia, artrite por chikungunya, erisipela, hérnia inguinal por TC, diverticulite por TC, isquemia mesentérica por TC, bócio clínico, icterícia escleral, AVC isquêmico por TC e fratura de quadril por RX.
- Não usar substitutos genéricos ou imagens com licença duvidosa para completar número. Esses 11 ficam explicitamente documentados como indisponíveis até surgir fonte aberta adequada ou material próprio do usuário.

## Sessão 2026-07-21 — publicação e persistência de progresso

- Lote visual validado: 66 IDs únicos, 54 referências reais em 53 arquivos, nenhum arquivo ausente ou inválido.
- Progresso de questões e simulados permanece `local-first`: cada interação é salva imediatamente no navegador e alimenta o dashboard.
- Preparada sincronização idempotente com `resposta_usuario` e `simulado_resultado`; a migration `0003_progresso_sincronizado.sql` adiciona IDs de evento para impedir duplicações e foi aplicada no Supabase.
- O projeto Supabase está com login anônimo e Google desativados. Por segurança, nenhuma chave privilegiada foi exposta no site: até um método de login ser habilitado, o dashboard informa que os dados estão salvos no dispositivo e tentará sincronizar novamente em uma sessão futura.
- Validações concluídas: typecheck, seed (36 disciplinas, 44 resumos, 302 questões) e build estático de 230 páginas.

## Sessão 2026-07-21 — progresso completo, dashboard e segundo cérebro

- Implementado progresso `local-first` também para resumos e casos: primeiro/último acesso, etapa do caso, conclusão, favorito e anotação pessoal.
- A migration `0004_progresso_conteudo.sql` foi aplicada no Supabase. A tabela usa chave por usuário/item e RLS; teste com conta temporária confirmou escrita do próprio registro e bloqueio de `owner_id` divergente. A conta temporária foi apagada.
- Resumos e casos agora exibem controles reais de favorito, conclusão e anotação com salvamento automático. Casos retomam na etapa salva e a discussão final conclui o caso.
- O dashboard agora mostra resumos concluídos, casos concluídos, favoritos e anotações, além de questões e simulados. Zerar progresso remove também esses registros localmente e na nuvem.
- Workflows de backup/keep-alive e Drive foram corrigidos para usar GitHub Variables nas chaves públicas. O keep-alive roda diariamente e o backup permanece semanal. Com autorização explícita do usuário, `SUPABASE_DB_URL` e `SUPABASE_SERVICE_ROLE_KEY` foram cadastrados como GitHub Actions Secrets, sem exposição dos valores.
- Primeiro backup real validado no run `29885112038`: `pg_dump` PostgreSQL 17 via imagem oficial, upload do artefato `db-backup` (537.219 bytes) e retenção de 90 dias, até 2026-10-20. GitHub Actions não alcança o endpoint direto IPv6 do Supabase; o secret do CI usa o Supavisor em session mode/IPv4. Manter o `.env.local` com a conexão direta local.
- A sincronização do Google Drive permanece preparada, mas não pode operar sem autorização Google e `DRIVE_FOLDER_IDS`. Não há credencial Google disponível no ambiente.
- A recuperação de senha ainda cai em `localhost` porque o `Site URL`/allowlist do projeto Supabase exige autoridade do painel ou Personal Access Token do Management API. A service role do banco não tem permissão de control plane.
- Revisão de conteúdo: não surgiram novas fontes. Os 125 tópicos identificados continuam cobertos; os 89 scaffolds e os bancos exatos Cirurgia 160/MFC 80 aguardam PDFs do usuário. Não inventar extração para preencher contagem.
- Obsidian 1.12.7 instalado e o vault local atualizado com `Index`, `Codex Medicus Dashboard` e `Fontes Pendentes`. Uso local não exige conta; Obsidian Sync é opcional e separado.
- Validações: lint 0 erros, TypeScript 0 erros, build de produção com 322 páginas e RLS confirmado.

## Sessão 2026-07-27 — Anki Desktop

- A integração com Anki é local, pelo aplicativo desktop e AnkiConnect em `127.0.0.1:8765`; não há envio de cartões ao site, Supabase ou serviço externo.
- O script `npm run anki:status` confirma se o Anki aberto responde; `npm run anki:resumo -- --subtema <id>` cria cartões Basic rastreáveis no deck `Codex Medicus::<disciplina>::<subtema>` e `npm run anki:erros -- --questoes <id-1,id-2>` cria cartões de revisão no deck de erros.
- O script não duplica cartões do mesmo resumo e inclui as referências do resumo no verso. A criação ocorre apenas quando solicitada pelo usuário.
- Ambiente auditado: AnkiConnect está instalado e restrito ao loopback; o Anki não estava aberto durante o diagnóstico. Typecheck e lint aprovados.
- Ainda pendente: exportação offline CSV/APKG e geração dirigida a partir de erros, que devem ser desenhadas sem duplicar cartões nem alterar a programação existente do Anki.

## Sessão 2026-07-27 — Produto, Anki e segundo cérebro (41–50)

- Login: o endpoint público de Auth respondeu e o provedor de e-mail está habilitado. O fluxo usa o domínio atual + `/MEDICINA-TT/`; validar a senha e o e-mail de recuperação depende somente da conta do usuário, sem registrar credenciais.
- Questões: corrigida a corrida em que uma sincronização lenta podia reconstruir a fila antes de incorporar a resposta recém-salva localmente. Respondidas permanecem ocultas até revisão intencional.
- Dashboard: a reconciliação foi revisada — respostas/simulados usam `client_event_id`; resumos/casos usam a versão de `atualizado_em` mais recente.
- Anki Desktop: além da ponte local, `npm run anki:csv -- --subtema <id>` gera CSV para importação manual. O próprio Anki pode exportar o deck criado como `.apkg`.
- Site: criada a aba `/mapas-mentais/`, derivada somente da taxonomia e dos resumos já publicados.
- Obsidian: hubs de Anki e mapas foram adicionados; o dashboard e o roadmap foram atualizados.
- Publicação: commit `399fb49` enviado a `main`; GitHub Pages concluiu com sucesso no run `30300207535`. As rotas `/mapas-mentais/` e `/questoes/` responderam HTTP 200.

## Auditoria e retomada — 2026-07-27

- Auditoria estrutural aprovada: 37 disciplinas, 293 subtemas, 225 resumos, 1.072 questões, zero IDs duplicados e zero vínculos órfãos; typecheck e lint aprovados.
- Qualidade pedagógica: 0 questões sem/múltiplas corretas e 0 resumos sem referência. Há dívida editorial legada: 685 questões com comentários repetidos, 81 comentários curtos, 48 sem fonte e 151 resumos com menos de 12 blocos. Não apresentar o banco inteiro como revisão final sem tratar esses lotes.
- Próximos passos 26–40 foram pré-arquitetados em `docs/PLANO-PROXIMOS-BLOCOS.md`: primeiro revisar lote de maior peso, depois HCPM e demais triagens, então cursos grandes/provas/mídia.

## Atualizacao OpenCode/Nemotron - 2026-07-31

- O OpenCode com Nemotron publicou tres commits de qualidade editorial no topo de `main`: `72c5fbd`, `2084268` e `de7c7a2`.
- A auditoria atual de questoes (`npm run audit:questoes`) confirma 1.072 questoes, 1 repeticao normalizada restante, 18 comentarios curtos, 0 comentarios vazios e 48 questoes sem fonte.
- Nao refazer a limpeza massiva de repeticoes ja concluida. A proxima fila editorial e: resolver a repeticao restante em Pediatria, expandir os 18 comentarios curtos e revisar as 48 questoes sem fonte com fontes verificaveis.
- `git status --short` estava limpo apos a conferencia. Nenhuma credencial, dado do SISCAD ou conteudo bruto privado foi registrado nesta atualizacao.

## Atualizacao editorial - 2026-08-01

- Revisao de Pediatria concluida: corrigida a unica repeticao normalizada restante (`ped-des-07`) e expandidos os 14 comentarios curtos identificados na disciplina.
- Auditoria apos o bloco: 1.072 questoes; 0 repeticoes exatas/normalizadas; 4 comentarios curtos; 0 comentarios vazios; 48 questoes sem fonte explicita.
- Tipagem do projeto passou com `npm.cmd run typecheck`.
- Proxima fila: expandir os 4 comentarios curtos remanescentes (Otorrino, Derma, Cardio e MFC), revisar as 48 questoes sem fonte e somente depois retomar a triagem de novas extracoes e mapas.
- Nenhum commit ou publicacao foi feito neste bloco.

## Atualizacao bloco ampliado - 2026-08-01

- Bloco ampliado concluido: os quatro comentarios curtos remanescentes foram revisados em MFC, Cardiologia, Otorrino e Dermatologia; a questao `cardio-037` tambem teve a justificativa corrigida para alinhar o gabarito de cardiomiopatia hipertrofica em atletas jovens.
- Auditoria final do bloco: 1.072 questoes; 0 repeticoes exatas/normalizadas; 0 comentarios vazios; 0 comentarios abaixo de 40 caracteres; 48 questoes continuam sem fonte explicita.
- As 48 sem fonte foram mantidas sem atribuicao inventada e permanecem concentradas em Hemato (15), Gastro (11), Nefro (6), Otorrino (4), Onco (4), Endocrino (3), Reumato (3) e Derma (2).
- O proximo bloco grande deve mapear cada grupo a diretrizes ou revisoes primarias verificaveis; enquanto a fonte nao for validada, nao marcar a questao como editorialmente fechada.
- `npm.cmd run typecheck` passou. Nenhum commit ou publicacao foi feito.

## Bloco de 20 passos - 2026-08-01

## Extração privada do Drive — lote OMED (2026-08-01)

- Foi concluída a leitura textual privada de um lote prioritário de 12 materiais do Drive: Pneumologia, Cardiologia, Pediatria, Infectologia, Cirurgia, MFC, Neurologia, GO, Nefrologia/Hemato-Oncologia, Psiquiatria/Reumatologia/Endocrinologia, Gastroenterologia e Hematologia.
- A leitura serviu para identificar subtemas, sobreposições e material que precisa de validação. PDFs comerciais continuam restritos à biblioteca privada; nenhum texto integral foi publicado.
- Temas novos confirmados para correlação: histopatologia glomerular, litíase e hipertensão renovascular; tireoide/eixo adrenal; doenças intestinais; anemias e plaquetopenias.
- Ainda faltam a materialização local dos binários, hashes, deduplicação completa, OCR seletivo, extração visual e correlação sistemática com todos os semestres do SISCAD.
- Próximo portão: validar as 48 questões sem fonte antes de gerar conteúdo derivado desses materiais.

## Inventário paginado do Drive — 2026-08-01

- A busca paginada percorreu 18 páginas de resultados, totalizando 1.705 PDFs não excluídos.
- O inventário confirmou que o Drive é muito maior que o lote OMED; portanto, download e conversão integral exigem processamento incremental para não baixar material irrelevante nem misturar documentos pessoais, vestibular e cursos comerciais.
- A próxima filtragem deve separar Medicina/OMED/SISCAD por nome e pasta, calcular hash apenas dos candidatos médicos e materializar os binários em acervo privado.
- Não publicar IDs, PDFs, texto comercial, dados pessoais ou imagens de pacientes.

## Triagem médica ampliada — 30 arquivos (2026-08-01)

- Foram processados 30 candidatos médicos adicionais, totalizando aproximadamente 7,2 milhões de caracteres de texto extraível.
- O lote inclui as provas OMED 2022–2025, materiais OMED de GO/Psiq/Reumato/Endócrino, materiais de Cardiologia/Pneumo/Cirurgia/Neuro/Hemato e arquivos acadêmicos da UFMS.
- Foram identificados 9 materiais comerciais que devem permanecer exclusivamente privados, sem cópia integral para o site.
- Pelo menos 1 arquivo grande retornou sem texto extraível; ele foi marcado para OCR/renderização seletiva, não descartado.
- Os temas foram classificados para a próxima matriz: OMED, clínica médica, cirurgia, nefrologia, hematologia, gastroenterologia, SISCAD/UFMS e materiais não médicos.

## Lote acadêmico UFMS/SISCAD — 2026-08-01

- Foram lidos 25 PDFs encontrados na busca de planos de ensino e documentos acadêmicos.
- O lote contém planos de ensino, cadernos HCPM, materiais de metodologia ativa, radiografia torácica, ECG e documentos institucionais.
- Foram identificados históricos escolares e documentos com dados pessoais; eles ficam estritamente privados e não entram no repositório, Obsidian compartilhável ou site.
- O plano de ensino de Bases Complementares da Medicina VI e o caderno HCPM IV foram confirmados como fontes para a matriz curricular; ainda é necessário percorrer os demais períodos e disciplinas.
- Duplicatas aparentes foram marcadas por título e tamanho para a etapa de hash; nenhuma foi apagada do Drive.

## Deduplicação por metadados — 2026-08-01

- As 1.705 entradas de PDF foram reprocessadas em 18 páginas.
- Foram encontrados 117 grupos com nomes normalizados coincidentes (361 arquivos) e 76 grupos com tamanhos coincidentes (164 arquivos).
- Esses números são apenas candidatos: nomes/tamanhos não substituem SHA-256. Nenhum arquivo foi excluído ou movido.
- Exemplos de duplicatas prováveis incluem cópias numeradas de provas OMED/vestibular e cadernos repetidos.
- O próximo passo seguro é materializar apenas os candidatos médicos, calcular SHA-256 localmente e conservar uma cópia canônica por conteúdo.

## Tentativa de materialização local — 2026-08-01

- As referências raw autenticadas do Drive foram obtidas para os candidatos médicos, mas o conector retornou apenas URIs `sediment://` internas, sem caminho de arquivo local acessível ao ambiente.
- A tentativa de abrir essa URI pelo sistema operacional falhou por esquema não reconhecido; portanto, nenhum SHA-256 foi inventado e nenhum PDF foi gravado no repositório.
- O texto legível continua disponível para triagem via Drive. Hash, OCR e extração visual exigem materialização real do binário por uma rota de download do conector ou arquivo fornecido localmente.

## Fechamento de lacunas médicas — triagem adicional (2026-08-01)

- Foram lidos mais 35 candidatos de Gastro, Hemato/Onco, Infecto, Pediatria e clínica médica.
- Foram identificados tópicos úteis para a fila autoral: pólipos/neoplasias intestinais, hemorragia digestiva alta/baixa, anatomia e fisiologia do cólon, gastroparesia/dispepsia, medicina transfusional, nefrotoxicidade, bases do diagnóstico sindrômico e epilepsia.
- Livros integrais protegidos (Semiologia, Tratado de Pediatria, Rotinas em Obstetrícia e equivalentes) foram classificados como referência privada e não serão convertidos/publicados integralmente.
- Arquivos com texto vazio foram marcados para OCR somente se forem fontes médicas elegíveis; não será aplicado OCR em documentos pessoais ou livros protegidos sem necessidade clínica específica.

## Validação de fontes Gastro — 2026-08-01

- Foram verificadas fontes primárias para o lote Gastro: AASLD para hepatites/cirrose, ascite, PBE e encefalopatia; ACG para pancreatite aguda.
- As 11 questões Gastro ainda não foram marcadas como fechadas automaticamente: cada uma precisa receber a referência específica e passar por conferência do enunciado, gabarito e dose/limiar quando aplicável.
- O próximo bloco editorial deve usar essas fontes para retirar as 11 questões da fila sem atribuir referências genéricas de forma indiscriminada.

## Execução do bloco 29–42 — 2026-08-01

- 29: a conexão própria do conector foi usada para consultas autenticadas; o script local `drive:inventory` continua sem configuração de credenciais/pastas e falha sem expor detalhes.
- 30: inventário paginado concluído para 1.705 PDFs e 157 DOCX, sem baixar conteúdo irrelevante.
- 31: comparação por nome/tamanho concluída como triagem; SHA-256 local está implementado em `scripts/ingest-drive-local.mts`, aguardando binários materializados.
- 32: candidatos foram priorizados por OMED, lacunas médicas e SISCAD; materiais pessoais e livros protegidos foram excluídos do destino público.
- 33–35: Estratégia, MEDCOF, Medcurso, Bagagem e BBPM foram catalogados por busca e triagem textual; a leitura integral só deve ocorrer após materialização privada.
- 36: rota local de cópia canônica/hash está pronta, mas nenhum PDF do Drive foi materializado pelo conector nesta sessão.
- 36: criada também a rota `npm run drive:download-local -- --out <pasta>`; ela baixa apenas PDF/DOCX dentro de `DRIVE_FOLDER_IDS`, calcula SHA-256 durante o download e grava manifesto privado. O teste seguro abortou porque nenhum ID de pasta foi configurado.
- 37: conversor PDF/DOCX→Markdown existente foi validado no código e permanece pronto para a pasta privada.
- 38–39: OCR e recuperação de PDFs corrompidos permanecem condicionados à existência do binário local; não foram simulados.
- 40: 157 DOCX foram inventariados; deduplicação por SHA-256 contra o banco aguarda materialização.
- 41–42: matriz de classificação médica e registro de fechamento foram atualizados; fontes comerciais e pessoais permanecem privadas.

## Dez blocos clínicos de fontes — 2026-08-01

- Blocos concluídos: Hematologia (anemias; leucemias/linfomas; mieloma/MDS; transfusão), Oncologia, Otorrinolaringologia, Endocrinologia, Reumatologia, Dermatologia e Gastroenterologia.
- Foram registradas fontes oficiais rastreáveis por questão, sem utilizar PDFs comerciais como fonte pública.
- Auditoria final: 1.072 questões, zero duplicações, zero comentários curtos/vazios e zero questões sem fonte explícita.
- Validações técnicas: TypeScript e auditoria de privacidade aprovados.

1. Executar auditoria geral do banco.
2. Filtrar Pediatria e listar IDs problematicos.
3. Localizar a duplicacao em `ped-des-07`.
4. Corrigir a justificativa duplicada da alternativa D.
5. Medir todos os comentarios curtos de Pediatria.
6. Expandir os 14 comentarios curtos de Pediatria.
7. Reexecutar a auditoria de Pediatria.
8. Isolar os quatro comentarios curtos remanescentes.
9. Revisar o gabarito e a justificativa de `cardio-037`.
10. Expandir o comentario curto de Cardiologia.
11. Expandir o comentario curto de MFC.
12. Expandir o comentario curto de Otorrino.
13. Expandir o comentario curto de Dermatologia.
14. Reexecutar a auditoria geral.
15. Confirmar zero repeticoes normalizadas.
16. Confirmar zero comentarios abaixo de 40 caracteres.
17. Confirmar zero comentarios vazios.
18. Agrupar as 48 questoes sem fonte por disciplina.
19. Criar `docs/QUESTOES-FONTES-PENDENTES.md` com IDs e portao de validacao.
20. Registrar o estado no handoff e no Obsidian, sem inventar fontes ou publicar.

Resultado: 1.072 questoes auditadas, 0 repeticoes, 0 comentarios curtos, 0 vazios e 48 fontes pendentes.

## Consolidacao operacional - 2026-08-01

- O `main` reune os lotes ja aprovados de auditoria editorial, fontes por questao e triagem privada do Drive. O estado verificavel do banco e: 1.072 questoes, zero repeticoes exatas ou normalizadas, zero comentarios curtos/vazios e zero campos de fonte ausentes.
- O inventario autenticado do Drive percorreu 1.705 PDFs e 157 DOCX. Isso **nao** significa que todo o Drive foi baixado, convertido, lido ou integrado: a materializacao local ainda depende da configuracao propria do conector e da allowlist de pastas. Sem binarios locais nao ha SHA-256 real, deduplicacao final, OCR seletivo ou extracao de imagens.
- As rotas privadas `drive:download-local` e `drive:local` estao prontas para baixar somente PDF/DOCX autorizados, calcular hashes, conservar uma copia canonica e escrever manifesto privado. Elas devem ser executadas somente com credenciais Google proprias e escopo de pastas configurado, nunca com segredos em Git.
- A proxima retomada nao deve reabrir os lotes de questoes ja fechados. A ordem e: materializacao privada seletiva do Drive -> PDF/DOCX para Markdown -> OCR/renderizacao apenas quando necessario -> matriz fonte/plano/semestre/tema/subtema/destino -> revisao clinica autoral baseada em diretrizes vigentes -> midia licenciada e mapas conceituais reais. Anki e redesign geral ficam depois desses blocos.
- Permanecem pendentes os testes reais de login, recuperacao, sessao persistente, sincronizacao em duas sessoes/dispositivos, RLS e experiencia de falha de rede. Nenhuma senha deve ser usada em script, commit ou documento.
## Estado atual - 2026-08-01

- Publicacao mais recente: documentacao sanitizada do lote privado do Drive; PDFs, OCR, imagens e identificadores ficaram fora do Git.
- Auditoria atual: 1.072 questoes, zero repeticoes, comentarios curtos, comentarios vazios ou fontes ausentes.
- Drive: inventario amplo concluido e lotes seletivos ja processados; falta continuar somente com fontes medicas unicas e ligacao final a planos/subtemas.
- Prioridades seguintes: validar login/progresso em producao, concluir matriz privada curso-material, revisar conteudo clinico por diretrizes vigentes, organizar midia licenciada, mapas mentais reais e Anki Desktop.

## Auditoria de produto, design e erros - 2026-08-02

Esta rodada foi somente de auditoria e planejamento. Nenhuma nova alteracao visual foi iniciada.

### Evidencias positivas

- As rotas publicadas testadas (`/`, `/biblioteca`, `/questoes`, `/simulado`, `/casos`, `/midia`, `/minha-midia`, `/mapas-mentais`, `/semestres` e `/meu-curso`) responderam HTTP 200.
- O ultimo deploy remoto do GitHub Pages concluiu com sucesso.
- Auditoria de questoes: 1.072 questoes, zero repeticoes exatas/normalizadas, zero comentarios curtos/vazios e zero fontes ausentes.
- Auditoria de privacidade: 188 arquivos publicos e 3 arquivos curriculares aprovados.
- Logs recentes de autenticacao mostram logins e renovacoes de sessao bem-sucedidos; nao foram observados erros recentes no Storage.
- A verificacao nao alterou dados, progresso, imagens, catalogos ou configuracoes privadas.

### Pendencias P0 - proteger antes de novo redesign

1. Testar login, logout, recuperacao, expiracao/renovacao e sincronizacao em duas sessoes reais, sem registrar credenciais.
2. Importar e validar o primeiro lote de imagens privadas: hoje o catalogo possui metadados, mas o bucket ainda nao possui objetos de imagem.
3. Revisar os avisos de seguranca do Supabase: protecao contra senhas vazadas desativada; tabelas `arquivo_importado`, `extracao`, `schema_migrations` e `sync_drive` com RLS sem politica; extensoes `pg_trgm`, `unaccent` e `vector` no schema `public`.
4. Confirmar politicas de acesso de todas as tabelas privadas com testes de proprietario, anonimo e conta diferente.
5. Criar uma matriz de erros de rede, sessao expirada, upload interrompido, link assinado expirado e resposta vazia.

### Pendencias P1 - aprender e especificar o design profissional

6. Estudar e documentar Material Design 3, USWDS/CMS Design System, Radix/WAI-ARIA e os padroes de producao do Next.js antes de escolher novas dependencias.
7. Fazer benchmarking estruturado de AMBOSS, Osmosis e plataformas de revisao: arquitetura de navegacao, busca, filtros, progresso, leitura, questoes e feedback.
8. Criar um design brief unico: personalidade, densidade, tipografia, escala de espacamento, raios, sombras, estados, contrastes e regras para nao poluir a interface.
9. Criar um mapa de arquitetura de informacao com cinco areas: Hoje, Biblioteca, Treino, Revisao visual e Meu curso.
10. Definir tokens semanticos de cor e componentes antes de alterar paginas novamente.
11. Avaliar instalacao futura de Product Design/Figma/Build Web Apps, Sentry, PostHog e Vercel apenas depois de comparar necessidade, privacidade e custo. Antigravity nao esta disponivel nesta sessao.
12. Preparar um kit visual em Storybook ou equivalente, sem substituir dados atuais: Button, Input, Select, Card, Tabs, Modal, Toast, EmptyState, Skeleton, Progress, QuestionCard e MindMap.

### Pendencias P2 - arquitetura de interface

13. Refazer o shell global com hierarquia definitiva, menu contextual por area, busca global real, breadcrumbs consistentes e estados de pagina.
14. Criar layouts de leitura sem distracao para resumos e casos, com indice lateral, progresso, fonte e retorno ao ponto anterior.
15. Transformar Biblioteca em explorador de conhecimento com filtros persistentes por disciplina, semestre, tema, subtema, prioridade OMED e estado.
16. Transformar Questoes em fluxo de treino: fila nao respondida, fila de erros, revisao espaçada, filtros persistentes e retomada exata.
17. Criar um painel Hoje com proxima revisao, lacunas prioritarias, questoes pendentes e acesso rapido a mapas.
18. Separar claramente conteudo publico, biblioteca privada, curso/SISCAD e material comercial em todas as telas, textos e estados vazios.
19. Refazer Mídia com colecoes por modalidade, patologia e subtema; preservar fonte, autor, licenca, privacidade e vinculo de estudo.
20. Refazer os mapas como grafos clinicos reais: no central, ramos nomeados, setas com relacao, hierarquia e modo leitura mobile.
21. Criar componentes de carregamento progressivo, skeleton, erro recuperavel, vazio orientado e confirmacao para operacoes destrutivas.

### Pendencias P3 - qualidade tecnica e acessibilidade

22. Rodar Lighthouse/PageSpeed em desktop e celular e registrar Core Web Vitals por rota.
23. Rodar axe/WCAG 2.2 AA: foco, contraste, teclado, leitor de tela, rotulos, ordem semantica e anuncios de mudanca de rota.
24. Corrigir todos os `eslint-disable` justificados ou substituir imagens nativas por componente otimizado quando possivel.
25. Auditar imagens ausentes, dimensoes, alt text, lazy loading, formatos WebP/AVIF e peso por rota.
26. Auditar links internos automaticamente, incluindo rotas dinamicas de disciplina, subtema, caso e imagem.
27. Adicionar `global-error`, `not-found`, `loading` e boundaries por area, conforme o checklist de producao do Next.js.
28. Criar testes de componentes e fluxos criticos: responder questao, sair e voltar, login, upload privado, busca, filtros e mapa.
29. Medir bundle e dependencias; instalar pacote novo somente se houver ganho comprovado e lockfile revisado.

### Pendencias P4 - dados e conteudo

30. Materializar seletivamente Drive, calcular SHA-256, converter PDF/DOCX para Markdown, OCR seletivo e extrair imagens sem publicar material protegido.
31. Fechar a matriz fonte -> semestre -> disciplina -> tema -> subtema -> prioridade OMED -> destino permitido.
32. Percorrer os demais periodos e planos do SISCAD na camada privada, sem expor dados academicos pessoais.
33. Revisar clinicamente as questoes e resumos com diretrizes atuais, mantendo fonte especifica e data de revisao.
34. Fechar as lacunas de conteudo por disciplina, com prioridade OMED e cobertura de ciencias basicas.
35. Criar mapas mensais de revisao e recomendações baseadas em progresso real, nao em dados inventados.
36. Importar imagens privadas curadas e testar URLs assinadas, renovacao, logout e exclusao.
37. Integrar Anki Desktop somente ao fim da estabilizacao do conteudo, com exportacao revisavel e sem envio automatico destrutivo.

### Ordem recomendada de retomada

P0 seguranca/autenticacao -> P1 especificacao e benchmarking -> P2 arquitetura visual -> P3 qualidade e acessibilidade -> P4 acervo/SISCAD/conteudo -> Anki -> nova publicacao.

## Materializacao privada do Drive - 2026-08-02

- [x] Reutilizar a conexao autenticada do Google Drive e buscar candidatos medicos por metadados.
- [x] Materializar seletivamente tres PDFs de resumos OMED (Pneumologia, GO e Pediatria) em `Desktop\\MEDICINA\\_private-corpus\\drive-lote-20260802`.
- [x] Calcular SHA-256 real e criar copia canonica por hash; o lote atual tem 3 arquivos unicos e 0 duplicatas.
- [x] Converter os tres PDFs para Markdown cacheado; 230 paginas e 521.699 caracteres extraiveis, 0 paginas exclusivamente-imagem e 0 erros.
- [ ] Renderizar paginas clinicas selecionadas e extrair/revisar imagens quando o runtime Poppler estiver disponivel; nao publicar capturas comerciais.
- [ ] Comparar os hashes do lote com o manifesto amplo, fechar a matriz fonte -> semestre -> disciplina -> subtema -> destino e revisar clinicamente antes de qualquer integracao.
- [ ] Continuar com Cirurgia, Cardiologia, Neurologia, Hematologia e Gastroenterologia somente apos deduplicacao contra os caches existentes.

Os binarios, hashes, caches e qualquer imagem deste lote permanecem fora do GitHub e da documentacao publica.

### Lote ampliado concluido na mesma sessao

- [x] Materializados mais 27 PDFs medicos candidatos, totalizando 30 PDFs processados nesta sessao.
- [x] O lote novo tem 27 unicos, 0 duplicatas internas e 0 coincidencias de SHA-256 com o lote inicial.
- [x] Conversao do lote novo: 1.194 paginas e 2.133.689 caracteres; 23 completas, 3 parciais e 1 erro estrutural preservado.
- [x] Poppler corrigido com chamada direta ao `pdftoppm.exe`; 217 PNGs foram renderizados para triagem privada (27 primeiras paginas + 190 paginas de candidatos visuais/parciais).
- [ ] Revisar visualmente os PNGs, aplicar OCR apenas nas paginas medicas sem camada textual e reparar o PDF estruturalmente invalido.

## Analise de lacunas por OMED e por disciplinas cursadas - 2026-08-02

- OMED: Cardiologia, Neurologia e Pneumologia estao completas em subtemas; o ganho agora e imagens/casos, nao mais PDFs em massa.
- Lacunas OMED prioritarias: Endocrinologia (33%, faltam Diabetes e Adrenais), Nefrologia (67%, falta Hidroeletrolitico), Gastroenterologia (71%, faltam DRGE e Doenca Ulcerosa) e Hematologia (83%, falta Hemostasia).
- Cirurgia (48%) e MFC (52%) precisam de expansao seletiva, mas ficam depois das quatro lacunas clinicas acima por frequencia e retorno OMED.
- Disciplinas cursadas com scaffold publico vazio: Radiologia, Farmacologia, Imunologia e Urgencia/Emergencia. Ja existem fontes/questoes privadas suficientes para comecar sem baixar o Drive inteiro.
- Patologia e Fisiologia devem ser camadas de apoio ligadas a clinica; Anatomia, Histologia, Embriologia, Bioquimica, Microbiologia, Parasitologia, Genetica e Saude Publica ficam para integracao sob demanda.
- A busca metadata-only do Drive confirmou candidatos para Endocrino (31 PDFs), Gastro (27), Nefro (30), Radio (25), Farmaco (14), Psiquiatria (28) e UE (25), mas esses numeros incluem duplicatas e livros protegidos; nao sao autorizacao para baixar tudo.
- Fila recomendada: Endocrino -> Gastro -> Nefro -> Hemato; em paralelo, imagens/casos de Radio -> UE -> Cardio/Neuro/Pneumo.

### Lote prioritario executado - Endocrino/Gastro/Nefro/Hemato

- [x] Selecionados e materializados 30 PDFs direcionados às quatro lacunas OMED.
- [x] SHA-256: 30 unicos, 0 duplicatas internas e 0 coincidencias com manifestos privados anteriores.
- [x] Conversao Markdown: 1.479 paginas, 2.010.026 caracteres; 21 completos, 9 parciais e 0 erros fatais.
- [x] Renderizacao privada: 30 primeiras paginas e 544 paginas dos candidatos parciais.
- [ ] Revisar as 9 conversoes parciais, aplicar OCR seletivo e separar duplicatas conceituais antes da escrita autoral.
- [ ] Fechar Endocrino (diabetes/adrenais), Gastro (DRGE/ulcera), Nefro (hidroeletrolitico) e Hemato (hemostasia) contra a taxonomia.
- [x] Triagem visual das 9 conversoes parciais: slides comerciais predominantemente graficos, mantidos somente na biblioteca privada.
- [ ] Habilitar OCR local em sessao futura; Tesseract/OCRmyPDF e Kimi/OpenRouter nao estao disponiveis neste runtime.

## Auditoria publicada e nova fila metadata-only - 2026-08-02

- Rotas publicadas verificadas: `/`, `/biblioteca/`, `/questoes/`, `/simulado/`, `/casos/`, `/midia/`, `/minha-midia/`, `/mapas-mentais/`, `/semestres/` e `/meu-curso/` responderam HTTP 200 sem marcadores de erro de aplicação.
- Auditorias determinísticas continuam aprovadas: TypeScript, privacidade pública e banco de questões; o lint terminou sem erros e deixou apenas cinco avisos de variáveis não usadas em scripts auxiliares.
- `sitemap.xml` e `robots.txt` não estão publicados; registrar como melhoria técnica de descoberta/indexação, sem bloquear o uso do site.
- A build local excedeu o limite de execução nesta rodada, mas a build oficial do GitHub Actions e o deploy remoto passaram; repetir a otimização local quando houver janela maior.
- Busca metadata-only do Drive gerou 67 candidatos médicos distintos para pendência privada, agrupados em Endocrinologia, Gastroenterologia, Nefrologia, Hematologia, Cirurgia/Trauma, Urgência/Emergência, Radiologia, Farmacologia, Imunologia e integração clínica. A lista nominal está somente no cofre Obsidian em `Pendência Drive - 70 PDFs Médicos para Triagem 2026-08-02`.
- Os 67 candidatos não foram baixados, convertidos ou publicados. Muitos são duplicatas aparentes, livros ou cursos comerciais; aplicar hash, deduplicação e portão de direitos autorais antes de qualquer materialização.
- Pendências de produto e qualidade confirmadas: Lighthouse/PageSpeed, axe/WCAG, teste de fluxos autenticados, matriz de falhas de rede, sitemap/robots, filtros persistentes, estados loading/erro/vazio, mapas com relações nomeadas e matriz privada fonte → semestre → subtema.

## Consolidação operacional — 2026-08-03

- O checkout estava limpo em `main` antes desta consolidação; esta atualização documental deixou três arquivos modificados. Os commits de código mais recentes são `f319ede` (importação segura do progresso do Anki no dashboard), `00c1bb3` (lotes OMED prioritários no AnkiConnect) e `4df8856` (casos e questões de lacunas clínicas).
- Anki Desktop/AnkiConnect foi configurado localmente. Os decks de Cardiologia, Pneumologia, Nefrologia, Endocrinologia, Hematologia, Oncologia, Dermatologia e os 14 subtemas de Neurologia foram preenchidos sem duplicação deliberada; a conferência remota pelo site ainda não existe.
- O dashboard já aceita o JSON local exportado pelo Anki (`npm run anki:progresso`) e armazena o último snapshot apenas no navegador. Isso não é sincronização Anki↔Supabase nem sincronização entre dispositivos.
- Notion foi instalado e recebeu uma central privada com as bases `Rotina de Estudos` e `Fila de Revisão`; ainda falta alimentá-las de forma contínua e ligar os registros ao progresso real do site/Anki.
- Correção do plano dos 100 passos: os passos 88 e 89 estão efetivamente concluídos por evidência local, embora a caixa de seleção histórica ainda precise ser reconciliada; os passos 90–91 continuam pendentes.
- A build local do commit de integração do Anki não foi confirmada nesta rodada por exceder o limite de execução; lint/typecheck/auditorias anteriores passaram, mas a publicação desse commit ainda não foi feita.
- Pendências novas: validar o componente de importação no navegador, testar o fluxo Anki sem AnkiConnect exposto ao site, decidir se haverá sincronização autenticada opcional e documentar backup `.apkg`/CSV.
- O contexto sanitizado desta conversa foi consolidado em `docs/CHAT-CONSOLIDADO-SITE-2026-08-04.md`; ler esse arquivo junto do handoff antes de iniciar a próxima tarefa.

## Retomada de planejamento — 2026-08-04

- SISCAD foi conferido novamente em sessão autenticada: 37 componentes entre 2024/1 e 2026/2; 36 planos aprovados e Habilidades Clínicas da Prática Médica VI acessível, mas ainda “Submetido para aprovação”.
- O plano privado de 12 semanas foi criado fora do repositório para organizar a consolidação de todas as matérias e subáreas; ele não é conteúdo público nem substitui a ementa oficial.
- Ordem imediata do site: (1) reconciliar plano → disciplina → tema/subtema → recurso; (2) concluir o painel privado de matérias já cursadas, lacunas e próximos estudos; (3) criar rotinas reutilizáveis de acompanhamento por período; (4) auditar o commit local do Anki; (5) só depois publicar o lote aprovado.
- O redesign visual, mapas conceituais completos, ingestão profunda do Drive e novas expansões de conteúdo continuam subordinados aos portões de privacidade, qualidade e proveniência.

## Ajuste de fluxo diário e Anki — 2026-08-09

- [x] Preparada a nova organização do Anki: novos lotes passam a usar um deck curto por disciplina (`Codex Medicus::...`) e mantêm o subtema em tags/campos.
- [x] Títulos de novos cartões foram compactados e o estilo do modelo `OMED Bonito` recebeu CSS para reduzir tamanho, melhorar hierarquia e limitar largura.
- [x] Criado `npm run anki:organizar`: primeiro gera um plano; com `--aplicar`, move cartões de decks legados sem apagar os decks antigos. A execução real aguarda Anki Desktop + AnkiConnect abertos.
- [x] `Minha mídia` agora concentra a biblioteca autenticada, com busca, filtro por origem, referência visível e classificação clínica. A separação pública continua protegida por licença/RLS.
- [x] Agenda recebeu foco de hoje, rotinas rápidas (estudo, erros, caso, mapa), busca, filtro por tipo e lista de pendências.
- [x] Dashboard ganhou atalhos diretos para agenda do dia e Minha mídia.
- [x] Anki Desktop respondeu e a organização foi aplicada: 209 decks legados foram consolidados em decks curtos por disciplina, sem apagar os antigos; o relatório local passou a listar 226 decks.
- [x] Backup automático do Anki de 09/08/2026 estava disponível antes da migração; estilo do modelo `OMED Bonito` foi atualizado com CSS para títulos compactos.
- [ ] Revisar decks `Probe/Piloto` separadamente e validar extensões já instaladas (AnkiConnect, Image Occlusion Enhanced, FSRS Helper e Deckhand).
- [ ] Com o perfil do Anki aberto, executar `npm run anki:organizar -- --aplicar --limpar-vazios`: mover cartões para `Codex Medicus::disciplina`, remover somente decks legados comprovadamente vazios e preservar cartões.
- [ ] Instalar e testar uma extensão visual compatível (candidato atual: Modernki, código AnkiWeb `739968151`) somente após confirmar a versão do Anki e fazer backup; evitar Onigiri por ser beta e mais invasivo no Windows.
- [ ] Testar autenticado no navegador: upload, renovação do link temporário, busca/filtros, exclusão de mídia e agenda do dia.
- [x] Extrair imagens dos PDFs privados, inclusive comerciais, após conversão PDF → Markdown e renderização seletiva; registrar fonte, página, modalidade, achado, disciplina e subtema. O lote canônico de 215 imagens foi processado; a triagem conservadora separou capas/branding e manteve revisão visual pendente onde não havia evidência suficiente.
- [x] Importar essas imagens na biblioteca autenticada `Minha mídia`, independentemente da licença, mantendo-as fora do repositório e da área pública. A conta agora possui 312 registros privados e 297 imagens exibíveis.
- [ ] Validar o lote de imagens privadas: visualização, renovação da URL assinada, logout, exclusão e bloqueio para usuário anônimo/diferente.

## Triagem visual, vínculos e auditoria do site — 2026-08-09

- [x] Adicionada visualização ampliada em tela/modal para cada imagem privada, com metadados, fonte/página, status de triagem e botão direto para o resumo relacionado.
- [x] Adicionado filtro por origem e por status (`contextual`, `não usar`, `revisão pendente`), sem esconder material do acervo.
- [x] Criada a migração `20260809120000_triagem_vinculos_midia_privada.sql` com `subtema_id`, status e motivo de triagem, protegida pelas mesmas políticas RLS.
- [x] Vínculos automáticos seguros aplicados a Hematologia/Anemias, Neurologia/Doenças neuromusculares, Pediatria/Neonatologia e Pneumologia/TEP; 177 registros já têm resumo relacionado.
- [x] Triagem remota verificada: 2 itens contextuais, 6 marcados para não usar e 295 aguardando revisão visual; nenhum item foi promovido artificialmente a "útil" sem revisão.
- [x] As rotas publicadas raiz, Biblioteca, Mídia, Mapas, Semestres e Minha mídia responderam sem `Application error`, `Unhandled Runtime Error`, `404` ou `Not Found`; console sem erros na amostra.
- [x] Typecheck, ESLint direcionado e `git diff --check` aprovados; a build completa ainda excede o limite local de execução e permanece pendência de otimização/CI.
- [ ] Converter os 30 JPEG 2000 restantes com um decodificador compatível e repetir a revisão visual; o runtime atual não suporta JP2 e nenhum arquivo foi falsamente convertido.
- [ ] Revisar visualmente os 295 itens pendentes, promovendo somente os realmente úteis e ancorando-os nos blocos dos resumos, questões e casos.
- [ ] Resolver os avisos de segurança do Supabase sem quebrar o banco: proteção contra senhas vazadas está desativada e `pg_trgm`, `unaccent` e `vector` permanecem no schema `public`; qualquer mudança exige migração/teste separado.

## Retomada Opera/Kimi e Anki — 2026-08-09

- [x] Confirmar que a janela do Opera com o chat `Prompt Med - Kimi - Opera` está aberta; a leitura do conteúdo ficou bloqueada pela ponte visual atual e não houve uso de credenciais.
- [x] Fazer inventário somente leitura do perfil Anki: 318 decks, 2.830 cartões, 209 decks legados vazios e 164 nomes longos (>70 caracteres); nenhuma alteração no banco vivo.
- [ ] Reabrir a coleção `Usuário 1` até o AnkiConnect responder `deckNames`; então executar o plano curto com `--aplicar --limpar-vazios` e conferir contagem antes/depois.
- [ ] Confirmar a versão do Anki, criar backup manual e instalar/testar Modernki (`739968151`) pelo próprio Anki; não instalar extensões beta ou por cópia manual.
- [ ] Com a sessão do Opera autenticada e o chat aberto, importar apenas instruções e conteúdo autorizado do chat Kimi para o handoff, sem copiar credenciais ou material protegido.
- [x] Decodificar localmente os 30 JP2 canônicos com Pillow/OpenJPEG, mantendo os originais privados e promovendo cópias JPG somente na biblioteca autenticada.
- [x] Atualizar a triagem privada após a conversão: 333 registros no catálogo, 314 JPG exibíveis e 30 URLs assinadas testadas com sucesso.
- [x] Corrigir o erro de lint no importador de progresso do Anki e remover os avisos de scripts auxiliares; lint, typecheck, auditorias de privacidade/questões e diff-check estão limpos.

## Pendências reconciliadas — snapshot operacional 2026-08-09

As caixas abaixo continuam abertas no plano mestre. Algumas são tarefas recorrentes ou globais: os lotes já processados não encerram a etapa inteira.

- **Dados, recuperação e currículo:** 13 (teste de restore Supabase); 19–20 (ligar planos/ementas aos temas e registrar diferenças); 27–28 (painel privado completo e rotinas longitudinais).
- **Drive e fontes privadas:** 31 (comparar hashes do inventário amplo); 36 (baixar apenas lotes aprovados); 37 (converter toda fonte selecionada para Markdown); 38 (OCR seletivo); 39 (reparar PDFs truncados); 41 (classificar todas as fontes por semestre/disciplina/subtema/OMED); 42 (fechar manifesto e Obsidian para cada fonte, inclusive rejeitadas).
- **Revisão clínica e lacunas:** 44–46 (Infectologia); 47–48 (GO); 49 (Pediatria); 50 (Cirurgia/MFC); 51 (Cardio/Neuro/Pneumo); 52 (Nefro/KDIGO); 53 (Gastro/Endócrino/Hemato); 54 (Onco/ORL/Reumato/Derma); 55–59 (resumos, sínteses autorais, referências, lacunas e Obsidian); 60–61 (atualizar e repriorizar o Raio-X OMED).
- **Questões e casos:** 62 (relatório de duplicidade Drive/local/banco); 64–65 (validar gabaritos e proveniência); 66–69 (novas questões/casos somente após lacuna comprovada); 70–71 (discursivas de GO e provas OMED contextualizadas); 72–73 (simulados, fila de revisão e sincronização real no navegador).
- **Mídia:** 74–75 (localizar e renderizar páginas candidatas); 77–79 (equivalentes abertos, licença e prioridade clínica); 80 (anclar figuras públicas); 81–82 (organização/filtros completos); 83 (auditoria de IDs, créditos e licenças). Os 30 JP2 já foram convertidos; permanecem a revisão visual dos itens e os testes autenticados de exclusão/logout.
- **Mapas e Anki:** 84–87 (mapas reais com setas, relações, ligações e filtro curricular); 90–91 (flashcards por erros e backup/restore `.apkg`/CSV). A organização dos decks continua bloqueada enquanto o AnkiConnect retorna `collection is not available`; Modernki ainda não foi instalado.
- **Produto, autenticação e qualidade:** 93–96 (login, recuperação, sessão, RLS, rede e sincronização); 97 (build final, pois o build local excedeu o limite); 98 (privacidade, direitos, links e acessibilidade); 99 (fechamento documental recorrente); 100 (publicar somente lote validado e confirmar deploy).
- **Integração Kimi/Opera, fora dos 100:** ler o chat `Prompt Med` pela sessão autenticada do Opera quando a ponte visual permitir, importar apenas instruções autorizadas e nunca registrar credenciais.

**Contagem atual:** 64 caixas permanecem abertas no `docs/PLANO-100-PASSOS.md`. Nenhuma pendência foi apagada; o snapshot acima apenas separa o que é parcial, recorrente ou bloqueado por infraestrutura.

## Fechamento operacional — 2026-08-09

- Build, TypeScript, lint, privacidade e auditoria editorial passaram. A auditoria agora bloqueia comentários que neguem uma alternativa marcada como correta; 342 ocorrências antigas foram normalizadas sem alterar gabaritos.
- O build gerou 402 rotas estáticas. As rotas lentas do Next foram reprocessadas e concluíram; o tempo alto fica registrado como item de otimização, não como falha.
- Supabase remoto confirmou 10 migrations aplicadas. Permanecem os avisos de extensões no schema público, leaked-password protection desativada e índices sem uso; não alterar às cegas.
- O conector do Drive encontrou as pastas autorizáveis, mas o workflow remoto falhou por configuração ausente (`DRIVE_FOLDER_IDS`/credencial). Nenhum PDF foi publicado ou baixado pelo job.
- Snapshot atual do Anki: 226 decks, 1.703 cartões e 210 decks vazios legados. A API responde v6, porém a coleção não está disponível; nenhuma escrita foi feita.
- Registro detalhado: `docs/FECHAMENTO-2026-08-09.md` e nota privada `Auditoria e Proximos Passos 2026-08-09` no Obsidian.

## Redesign e rotina contínua autorizados — 2026-08-09

- O usuário autorizou iniciar a fase de design pelo planejamento. O plano
  detalhado está em `docs/PLANO-REDESIGN-E-SEMANA-ATUAL-2026-08-09.md`.
- A nova arquitetura terá cinco áreas principais: Hoje, Conhecimento, Treino,
  Acervo e Meu curso. A árvore completa de disciplinas sairá da navegação global
  e passará a ser contextual.
- O site deverá manter uma “semana atual” privada, formada por foco confirmado,
  disciplinas em curso, agenda, PDFs da semana e atividade recente. Prioridade
  OMED será desempate, não substituto da rotina real.
- Todo PDF enviado diariamente seguirá `PDF -> Markdown privado -> leitura
  seletiva -> vínculo com semana/curso/subtema -> próxima ação`. Conteúdo
  comercial, dados pessoais e imagens protegidas não serão publicados.
- O primeiro lote de implementação será Bloco 0 + Bloco 1: linha de base,
  correção da divergência de mídia privada, sistema visual e novo shell atrás de
  feature flag. Nenhum dado ou conteúdo clínico será removido.

## Execução do redesign — lote 1 — 2026-08-09

- [x] Criar nova paleta acessível nos temas claro e escuro, sem o ciano como
  identidade dominante.
- [x] Reduzir a navegação global para Hoje, Conhecimento, Treino, Acervo e Meu
  curso, preservando todas as rotas anteriores como contexto.
- [x] Criar sidebar desktop recolhível e persistir apenas a preferência visual.
- [x] Corrigir a arquitetura móvel: cinco alvos de 52 px, sem overflow e sem
  sobreposição entre barra e conteúdo.
- [x] Reorganizar Hoje em próxima ação, ponto de partida, progresso, atividade
  e conhecimento pessoal sem remover ou fabricar dados.
- [x] Validar claro/escuro em 1440 x 1000 e 390 x 844, menu, sidebar, rotas,
  console, nomes acessíveis, `alt`, IDs e foco visível.
- [x] Passar TypeScript, lint completo, privacidade, auditoria das 1.296
  questões e build de 402 páginas.
- [ ] Rodar Lighthouse/PageSpeed e axe completos nas rotas públicas principais.
- [ ] Testar autenticado login, sessão, agenda e Minha mídia; resolver a
  divergência de mídia visível por conta antes de publicar.
- [ ] Obter aprovação visual explícita e somente então publicar o lote.
- [ ] Implementar o Bloco 2: modelo privado de semana atual e primeiro fluxo
  diário `PDF -> hash -> Markdown privado -> disciplina/subtema -> confirmação
  -> semana -> próxima ação`.

O lote permanece isolado na branch de agente. Não foi adicionada flag em
produção porque a própria branch não publicada é a fronteira reversível desta
fase.

## Acabamento adicional do redesign — 2026-08-09

- [x] Compactar os filtros de disciplina da fila de questões em painel
  expansível, sem remover filtros ou alterar a fila/progresso.
- [x] Impedir que o drawer móvel fechado receba foco de teclado (`inert`).
- [x] Melhorar a hierarquia tipográfica de h2/h3 nas leituras e respeitar
  movimento reduzido.
- [x] Revalidar questões em 390 x 844, incluindo alternativas, barra móvel e
  ausência de overflow.
- [ ] Rodar novamente Lighthouse/axe e QA autenticada após o acabamento.

## Publicação do redesign — 2026-08-09

- [x] PR #2 mesclado na `main` em `c260ef8`.
- [x] GitHub Pages `31338545947` concluído com build e deploy aprovados.
- [x] Rotas públicas `/`, `/questoes/`, `/biblioteca/`, `/mapas-mentais/` e
  `/meu-curso/` verificadas com HTTP 200 e sem marcadores de erro.
- [x] Auditoria de privacidade: 220 arquivos públicos e 3 curriculares;
  nenhum PDF comercial, imagem privada, dado do SISCAD ou credencial foi
  incluído no bundle público.
- [ ] Lighthouse/PageSpeed e axe/WCAG completos.
- [ ] QA autenticada real de login, sessão, agenda, upload, URL assinada,
  logout, exclusão e isolamento da `Minha mídia`.
- [ ] Bloco 2 da semana atual: `PDF -> hash -> Markdown privado ->
  disciplina/subtema -> semana -> próxima ação`.

## Bloco 2 — semana atual privada — 10 passos executados localmente — 2026-08-09

- [x] Modelo privado aditivo de semana, foco, tarefa e vínculo de recurso.
- [x] RLS e grants por proprietário; sem acesso anônimo.
- [x] Chave composta impede foco/tarefa de apontar para semana de outra conta.
- [x] Tipos de domínio e validação de datas, período, prioridade e duração.
- [x] Carregamento remoto opcional com fallback local-first.
- [x] Confirmação manual do período e do foco, sem inferência automática.
- [x] Próximos passos com atividade, data, duração e estado concluído/pendente.
- [x] Painel integrado à página Hoje, preservando o shell publicado.
- [x] TypeScript, lint, auditoria de 1.296 questões e privacidade aprovados;
  build de 402 rotas concluída após reprocessar páginas lentas.
- [x] Teste local da rota raiz: HTTP 200, painel de semana presente e nenhum
  marcador de erro de aplicação.

**Não publicado neste bloco:** a migration
`20260809140000_cria_semana_atual_privada.sql` ainda precisa ser aplicada no
Supabase remoto e validada com a conta real. O fallback local evita perda de
rascunho até essa aplicação. A próxima sequência é a entrada diária de PDF
metadata-first e o vínculo confirmado com a semana.

## Bloco 2 — materiais privados ligados à semana — 10 passos executados localmente — 2026-08-09

- [x] Reusar o catálogo privado somente como metadados.
- [x] Criar serviço de leitura de vínculos por semana.
- [x] Tornar o vínculo material/semana idempotente.
- [x] Permitir desvinculação sem excluir a fonte.
- [x] Manter fallback local-first sem prometer nuvem.
- [x] Exibir materiais privados dentro da Semana atual.
- [x] Adicionar busca por título, disciplina, tema e subtema.
- [x] Exibir a classificação antes da confirmação.
- [x] Ligar à rota autenticada Minha mídia.
- [x] Corrigir defaults inválidos da migration e validar tipos/lint.

Pendente externo: aplicar `20260809140000_cria_semana_atual_privada.sql` no
Supabase remoto e testar com a conta do usuário. PDFs comerciais, imagens
privadas e texto protegido continuam fora do GitHub Pages.

## Bloco 3 — acessibilidade, estados e QA de rotas — 10 passos executados localmente — 2026-08-09

- [x] Criar auditoria repetível das rotas principais.
- [x] Confirmar HTTP 200 em oito rotas.
- [x] Procurar erros de aplicação no HTML.
- [x] Procurar credenciais e tabelas privadas no HTML público.
- [x] Procurar imagens sem `alt`.
- [x] Procurar botões sem nome acessível.
- [x] Procurar IDs duplicados.
- [x] Aceitar SSR vazio apenas nas rotas protegidas client-gated.
- [x] Verificar build estático exportado sem conteúdo privado.
- [x] Registrar a limitação: axe/Lighthouse e QA autenticada continuam pendentes.

Comando criado: `npm run audit:rotas`. O último lote passou em `/`, `/questoes/`,
`/biblioteca/`, `/mapas-mentais/`, `/meu-curso/`, `/agenda/`, `/minha-midia/` e
`/semestres/`.

## Bloco 4 — editorial, privacidade e performance — 10 passos executados localmente — 2026-08-09

- [x] Auditoria editorial das 1.296 questões reexecutada.
- [x] Zero duplicatas, comentários vazios/curtos, fontes ausentes e contradições.
- [x] Auditoria de privacidade reexecutada: 227 arquivos públicos e 3 curriculares.
- [x] Busca de senha/credenciais nos arquivos rastreados sem valores expostos.
- [x] Referências a secrets limitadas a nomes de configuração/workflow.
- [x] RLS, grants e checks da migration privada revisados.
- [x] `robots.txt` e `sitemap.xml` confirmados; rotas privadas fora do sitemap.
- [x] Bundle exportado medido antes de dependências novas.
- [x] Build lento registrado como alerta de otimização, não como falso sucesso.
- [x] Pendências externas mantidas: Drive, SISCAD, PDFs, Anki, restore, Lighthouse e axe.

Medição do export: 41 arquivos, 4.567.424 bytes; JavaScript 4.271.371 bytes;
CSS 51.234 bytes.

## Bloco 5 — fechamento e publicação — 10 passos executados localmente — 2026-08-09

- [x] Diff revisado e escopo separado.
- [x] Privacidade e segredos verificados.
- [x] Typecheck, lint, auditorias editorial/privacidade executados.
- [x] Auditoria estrutural das rotas executada.
- [x] Build completo de 402 rotas concluído.
- [x] Bundle medido e alerta de performance registrado.
- [x] Handoff, memória, plano e Obsidian atualizados.
- [x] Relatório `docs/RELEASE-AUDIT-2026-08-09.md` criado.
- [x] Push/PR/merge autorizados preparados.
- [x] Verificação Pages será registrada após o workflow remoto.

O último item depende do retorno do GitHub Pages; não declarar deploy concluído
até o workflow terminar.

## Confirmacao final do Bloco 5 — publicado — 2026-08-09

- [x] PR #5 mesclado na `main` pelo commit `bd98d584906792da9e70e02d9334a010eedd551d`.
- [x] Workflow Pages `31341518573` concluido com sucesso.
- [x] Oito rotas principais mais robots/sitemap responderam HTTP 200.
- [x] Site publicado: https://thiagotrajano-arch.github.io/MEDICINA-TT/

O lote foi publicado sem PDFs comerciais, imagens privadas, dados curriculares
individuais ou credenciais. As pendencias externas permanecem registradas.

## Ajuste do Anki — 2026-08-09

- [x] AnkiConnect local confirmado na versão 6 com a coleção aberta.
- [x] Backup `.apkg` criado antes da alteração: `exports/anki/backup-pre-repair-20260809.apkg`.
- [x] Snapshot de progresso antes/depois exportado localmente.
- [x] Organização segura aplicada com `npm run anki:organizar -- --aplicar`.
- [x] Estilo do modelo `OMED Bonito` atualizado para títulos menores e leitura
  responsiva; CSS não expõe AnkiConnect ao site.
- [x] Conferência pós-ajuste: 226 decks monitorados e 1.703 cartões antes e
  depois; nenhuma contagem mudou e nenhuma duplicata foi criada.
- [x] Decks curtos por disciplina preservados (`Codex Medicus::...`).
- [x] Após autorização explícita, os 210 decks legados vazios (209 nomes
  longos e 1 deck aninhado) foram removidos sem apagar cartões.
- [ ] Validar visualmente o modelo no Anki e instalar extensões somente se a
  versão/backup forem confirmados.

## Fechamento da limpeza de títulos do Anki — 2026-08-09

- [x] Autorização explícita registrada para excluir somente decks vazios.
- [x] Backup imediatamente anterior preservado em
  `exports/anki/backup-before-deck-cleanup-20260809.apkg`.
- [x] A API do Anki exigiu `cardsToo=true`; a rotina só o utilizou depois de
  confirmar `findCards = 0` em cada alvo.
- [x] Removidos 210 decks legados; nenhum cartão foi excluído ou movido.
- [x] Verificação pós-operação: 108 decks totais, 16 decks Codex monitorados e
  1.703 cartões (delta de cartões = 0); nenhum nome legado restante.
- [x] Snapshot pós-limpeza: `exports/anki/progresso-after-cleanup.json`.
- [ ] Validar visualmente o Anki e avaliar extensão visual somente depois de
  confirmar a versão local; a limpeza de nomes está concluída.

## Lote neuropsiquiatria, currículo e mídia privada — 2026-08-09

- [x] Quatro PDFs da semana foram materializados somente no corpus privado,
  convertidos para Markdown antes da leitura e classificados: Hipnosedativos,
  Psiquiatria Clínica, Síndromes Demenciais e Neuroanatomia Clínica (378
  páginas; nenhum OCR necessário neste lote).
- [x] Foram selecionadas e revisadas visualmente 46 imagens desses PDFs. Todas
  foram importadas para o bucket privado e para o catálogo autenticado, com
  arquivo-fonte, página, disciplina, tema, subtema, modalidade e SHA-256. Nada
  desse material comercial entrou no Git ou no bundle público.
- [x] A matriz privada recebeu 37 componentes curriculares: 30 concluídos e 7
  atuais. A sincronização é idempotente e não publica dados do SISCAD.
- [x] A semana neuropsiquiátrica ganhou 8 resumos de alto rendimento, 36
  questões comentadas, 4 diagramas autorais e vínculos entre biblioteca,
  questões e mídia privada. O acervo público agora registra 234 resumos, 56
  casos e 1.332 questões.
- [x] Atalhos das questões validados: `1–4`/`A–D` respondem, `Enter`/seta direita
  avançam, `?` abre ajuda e `Esc` fecha. O contador foi corrigido para avançar
  somente quando a questão muda.
- [x] QA móvel em 390 × 844 passou na página inicial, biblioteca de Psiquiatria
  e questões, sem rolagem horizontal ou erros no console. Typecheck, lint,
  auditorias de questões/privacidade e build de 408 páginas passaram.
- [ ] Aplicar/testar a migration da semana no Supabase remoto e executar QA com
  a conta real: login, persistência, catálogo privado, renovação/expiração da
  URL assinada, logout e exclusão.
- [ ] Executar Lighthouse e axe completos; corrigir os achados confirmados.
- [ ] Corrigir o teste de restauração do backup: o dump foi gerado, mas o restore
  em PostgreSQL stock falhou pela ausência da extensão `supabase_vault`.
- [ ] Continuar a revisão clínica aprofundada por diretrizes atuais e a curadoria
  visual privada por lacuna real, sem transformar quantidade em objetivo isolado.

## Plano privado de 12 semanas e revisão OMED — 2026-08-10

- [x] A migration da semana atual foi aplicada no Supabase remoto, com RLS por
  proprietário; dois índices de cobertura foram acrescentados para as relações
  de tarefas e materiais.
- [x] A Agenda privada recebeu um ciclo de 12 semanas, de 10/08 a 01/11/2026,
  com 84 compromissos e 114 tarefas marcáveis. A importação é aditiva,
  idempotente e preserva eventos criados manualmente.
- [x] As 30 disciplinas concluídas foram distribuídas como revisão longitudinal,
  com seus tópicos curriculares; os 7 componentes atuais orientam o foco do 6º
  período. HCPM VI continua explicitamente sem conteúdo inferido até o plano do
  SISCAD ser aprovado/disponibilizado.
- [x] Os quatro PDFs neuropsiquiátricos já convertidos para Markdown foram
  catalogados como materiais privados e ligados às semanas 1–4. Binários,
  Markdown comercial, caminhos locais e hashes permanecem fora do Git.
- [x] OMED ganhou três blocos por semana: revisão dirigida na quarta, caderno de
  erros/repetição espaçada na sexta e questões/casos/imagens no sábado. São 36
  blocos OMED no ciclo, com rotação de Infectologia, Cardio, Neuro/Psiq, Pneumo,
  GO, Pediatria, Cirurgia, MFC, Nefro/Gastro, Endócrino/Hemato e especialidades.
- [x] Verificação remota: 12 semanas, 84 eventos, 114 tarefas, 28 focos, 4
  materiais e 4 vínculos; zero eventos ou tarefas duplicados.
- [ ] Fazer QA visual autenticada da Agenda e da Semana atual na conta real;
  ajustar horários conforme aulas/provas, sem apagar a estrutura longitudinal.
- [ ] Os avisos preexistentes do Supabase permanecem separados: extensões no
  schema `public`, proteção de senhas vazadas desativada e teste de restore
  incompatível com PostgreSQL stock por `supabase_vault`.

## Fila guiada por tema e agenda revisional — 2026-08-10

- [x] A fila da Semana atual agora recalcula a próxima pendência, percentual e
  barra de progresso após cada conclusão; o item exibe disciplina, tema e link
  direto para o melhor resumo público disponível.
- [x] A Agenda privada ganhou uma fila de "Pendências guiadas" com links para
  resumos. Concluir na Agenda sincroniza a tarefa correspondente da Semana, e
  concluir na Semana sincroniza o evento espelho do plano privado.
- [x] O importador passou a decompor as observações curriculares em temas
  separados. A conta ficou com 138 tarefas privadas, incluindo 54 revisões
  granulares identificadas por disciplina e tema; nenhum dado foi para o
  repositório público.
- [x] O SISCAD está catalogado em nível de 37 componentes (30 concluídos e 7
  atuais), com os blocos temáticos registrados nas observações privadas. Isso
  permite a revisão longitudinal por tema, mas ainda não substitui a validação
  manual de cada subtema contra o plano de ensino; HCPM VI continua explícito
  como plano indisponível.
- [ ] Fazer QA visual autenticada da nova fila, confirmar links de resumo para
  cada disciplina e ajustar a granularidade caso uma revisão esteja ampla
  demais. Depois disso, publicar o código sem incluir corpus, SISCAD ou dados
  pessoais.

### Publicação da fila guiada — confirmação 2026-08-10

- [x] PR #13 mesclado na `main` pelo commit `3a0783d`.
- [x] GitHub Pages run `31446358148` concluiu build e deploy com sucesso; o
  aviso restante é apenas a depreciação futura do Node.js 20 nas actions.
- [x] `/`, `/agenda/` e `/meu-curso/` responderam HTTP 200 sem erro de
  aplicação após o deploy.
- [ ] A validação visual autenticada continua necessária para confirmar os
  links de cada tema com a conta real; a auditoria automática de rotas local
  ficou indisponível por falha de rede nesta sessão.

### Publicação confirmada

- [x] PR #10 mesclado na `main` pelo commit
  `f68d4b37cc60808683fcc90517ea6e5239581c25`.
- [x] GitHub Pages run `31354606003` concluiu build e deploy com sucesso.
- [x] Raiz, Agenda e Meu Curso responderam HTTP 200 sem marcador de erro de
  aplicação após o deploy.
- [x] O artefato público contém apenas UI, importador genérico, migration e
  documentação sanitizada; o plano nominal e o corpus permanecem privados.
- [x] Reteste idempotente detectou e corrigiu normalização de fuso na chave da
  Agenda. As 84 cópias excedentes do teste foram removidas sem tocar eventos
  manuais; execução final inseriu 0 eventos/0 tarefas e confirmou 84 eventos,
  zero duplicados.

### Publicação confirmada

- [x] PR #7 mesclado na `main` pelo commit
  `e502f5a0eba682c2689ed83d8934f07e4a0e438c`.
- [x] GitHub Pages run `31348422663` concluiu build e deploy com sucesso.
- [x] Raiz, biblioteca de Psiquiatria, resumo de hipnosedativos, Questões,
  `robots.txt` e `sitemap.xml` responderam HTTP 200 e sem erro de aplicação.
- [x] As 46 imagens comerciais continuam apenas no bucket privado; o deploy não
  incluiu PDFs, capturas comerciais, manifestos privados ou credenciais.

## Mapa curricular granular, Anki e mídia — 2026-08-10

- [x] Criada e aplicada a camada privada granular dos 26 componentes solicitados:
  55 módulos, 374 temas/subtemas e RLS por proprietário.
- [x] Importação remota validada: 26 componentes, 55 módulos, 374 subtemas e 122
  recursos reais — 64 resumos e 58 filas de questões. Os 276 itens sem recurso
  suficiente continuam explicitamente como lacuna.
- [x] O painel diferencia os 26 componentes aprofundados dos 37 componentes da
  visão acadêmica resumida; um conjunto não apaga o outro.
- [x] Resumo e questões só aparecem quando o recurso existe e não foi rejeitado.
  Links profundos preservam disciplina/subtema; uma fila vazia não se amplia para
  outra matéria.
- [x] Agenda, Semana e Mídia recebem contexto de disciplina/subtema. O banco de
  imagens exige uma figura real, e o modelo de questão já aceita banco, prova,
  instituição e ano estruturados.
- [x] Mídia privada testada de ponta a ponta: 379 registros, 379 objetos, zero
  objetos ausentes, catálogo autenticado e URL assinada funcionais. Snapshot
  histórico de 2026-08-10; estado atual está no fechamento de 2026-08-14
  (327 úteis, 21 contextuais, 31 não úteis, 0 pendentes).
- [x] Anki preservado em backup e reorganizado sem apagar cartões: 2.830 cartões,
  2.829 em 16 decks canônicos por área e 1 piloto. FSRS 0,90, passos 1m/10m,
  reaprendizagem 10m e 25 novos/dia; Onigiri configurado localmente.
- [ ] Revisar no Anki, por disciplina, 885 versos extensos, 90 notas sem
  referência, 14 grupos duplicados exatos e 4 grupos de frente ambígua. Não
  apagar nem converter em massa sem revisão clínica.
- [ ] Migrar as 1.332 questões para metadados estruturados de banco/prova/ano e
  ampliar o banco por imagens somente com figuras realmente triadas.
- [ ] Reconsultar HCPM VI; nenhuma ementa foi inferida enquanto o plano segue
  indisponível/não aprovado.
- [ ] Substituir a ligação Agenda–Semana por uma chave estável e acrescentar
  reconciliação controlada de registros curriculares obsoletos.
- [ ] Corrigir o restore do Supabase: o dump foi criado, mas o PostgreSQL stock
  falhou por não conter `supabase_vault`.

Fonte de verdade detalhada: `docs/FECHAMENTO-2026-08-10.md`.

## Plano integrado de estudo — pendência aguardando aprovação — 2026-08-10

Objetivo: fazer caber, na mesma rotina, o semestre atual, a preparação para a
OMED, a revisão longitudinal dos semestres anteriores e o Anki, sem transformar
os 374 subtemas do mapa em uma agenda impossível.

### Leitura da agenda atual

- O plano privado tem 12 semanas, 84 eventos e 138 tarefas. A média registrada
  é de aproximadamente 10,4 horas semanais; os sete blocos fixos somam cerca de
  9h15, deixando uma margem para revisões e tarefas já vencidas.
- Há 36 blocos OMED, 90 tarefas de revisão, 12 blocos de questões e 4 blocos de
  PDF. A estrutura é suficiente para começar, mas não deve receber todos os
  subtemas de uma vez.
- O risco principal é sobrecarga: quando um PDF novo entrar, ele deve ocupar o
  foco atual e deslocar apenas a revisão de menor prioridade, nunca duplicar o
  calendário.

### Distribuição semanal proposta — ainda não aplicada

- **Segunda, 75 min:** semestre atual — teoria da semana + questões do próprio
  subtema.
- **Terça, 75 min:** PDF novo ou material do semestre atual — Markdown primeiro,
  leitura dirigida e um caso clínico.
- **Quarta, 90 min:** OMED — tema de maior peso, resumo curto e questões.
- **Quinta, 75 min:** revisão de semestres anteriores — uma disciplina antiga,
  escolhida por lacuna e vínculo curricular.
- **Sexta, 45 min:** Anki — revisões vencidas e cartões candidatos derivados de
  erros; não criar cartões automaticamente sem fonte e revisão.
- **Sábado, 90 min:** OMED integrado — questões, casos e imagens clínicas;
  separar erros por área.
- **Domingo, 45 min:** fechamento — corrigir a fila, escolher o próximo foco e
  preservar uma pequena margem para atraso.

As revisões do Anki devem ser distribuídas em microblocos de 15–20 minutos
dentro dos blocos existentes, em vez de criar uma segunda agenda paralela.

### Ciclo de 12 semanas proposto

- **Semanas 1–4:** proteger o semestre atual; OMED em Infectologia,
  GO/Obstetrícia, Pediatria e Cirurgia/MFC.
- **Semanas 5–8:** consolidar o semestre atual e revisar os primeiros semestres
  por lacunas; OMED em Cardio, Neuro, Pneumo, Nefro e Gastro.
- **Semanas 9–12:** integração cumulativa, casos e imagens; OMED em Endócrino,
  Hemato/Onco, Derma, Reumato, Psiquiatria e especialidades menores.

### Regra para cada PDF novo

1. Converter para Markdown privado antes da leitura.
2. Registrar origem, hash, páginas, disciplina, tema e subtema.
3. Associar ao foco da semana atual, sem abrir uma nova frente paralela.
4. Criar apenas a sequência D0, D1, D7 e D21.
5. Se a carga semanal exceder a margem, adiar a revisão longitudinal de menor
   prioridade, preservando semestre atual e OMED.

### Pendências que exigem aprovação antes de executar

- [ ] Aplicar essa distribuição à agenda real sem apagar compromissos manuais.
- [ ] Recalcular o plano quando o usuário informar a rotina fixa de aulas,
  plantões e horários indisponíveis.
- [ ] Definir a primeira disciplina do semestre atual e o primeiro foco OMED.
- [ ] Criar o fluxo de cartões Anki derivados de erros, após validar o resumo e
  o gabarito de cada lote.
- [ ] Importar cada PDF diário pelo fluxo privado PDF → Markdown → D0/D1/D7/D21.
- [ ] Revisar semanalmente a proporção atual/OMED/anteriores/Anki e reduzir carga
  se a taxa de conclusão cair.

Não alterar agenda, Anki ou conteúdo clínico desta pendência até o usuário
aprovar a distribuição.

## Plano de melhoria visual, arquitetura e qualidade — 2026-08-11

Fila de planejamento: não altera dados, agenda, Anki, conteúdo clínico ou mídia
até cada bloco ser aprovado. Preservar sempre dados privados no Supabase/cofre;
o repositório público contém apenas UI, conteúdo autoral e mídia permitida.

### Achados confirmados

- [ ] Agenda e Semana mostram conclusão sobretudo por check, cor e texto riscado.
  Falta estado unificado, data de conclusão, desfazer claro e consulta de histórico.
- [ ] O mapa curricular inicia com "Só pendentes" ativado, diminuindo a percepção
  de progresso. Manter o filtro, mas começar com visão de progresso e contadores.
- [ ] O tema claro possui tokens consistentes, mas não há matriz de contraste,
  comparação visual nem validação móvel documentadas.
- [ ] Falta padrão completo de resumo didático e sistema reutilizável de módulos
  básicos (Anatomia, Fisiologia e demais Ciências Básicas).

### A. Auditoria e defeitos

- [ ] Criar roteiro de QA para início, resumos, questões, agenda, semana, curso,
  mídia, login/logout, recuperação e sessão expirada.
- [ ] Rodar typecheck, lint, build, auditorias de questões/privacidade; corrigir
  primeiro o lint de `exports/private/inspect-supabase-state.mts` (`prefer-const`).
- [ ] Rodar Lighthouse móvel/desktop, axe/WCAG 2.2, teclado, zoom 200% e testar
  estados vazio, erro recuperável e carregamento; registrar evidência e regressão.
- [ ] Retentar QA visual autenticada quando o controlador do navegador estiver
  disponível; indisponibilidade da ferramenta não é defeito do site.

### B. Modo claro e design system

- [ ] Consolidar tokens semânticos para claro/escuro: fundo, superfícies, texto,
  borda, ação, sucesso, aviso e erro; remover cores locais fora do sistema.
- [ ] Ajustar o claro para leitura longa: fundo neutro, hierarquia discreta de
  cartões, texto escuro estável, menos gradientes e sombras concorrentes.
- [ ] Validar contraste de texto/bordas/ícones e foco por teclado; foco não pode
  depender só de cor. Padronizar tipografia, espaçamento, raio e alvos de toque.
- [ ] Produzir referências desktop/celular antes de aprovar a paleta definitiva,
  preservando a preferência de tema do usuário.

### C. Progresso, pendências e rotina

- [ ] Criar componente de estados planejado, em andamento, revisão devida,
  concluído e bloqueado — com ícone, rótulo, cor acessível, contador e desfazer.
- [ ] Mostrar progresso por tema/disciplina em Agenda, Semana, Meu Curso e
  Pendências. Concluídos continuam acessíveis em aba/filtro com data de conclusão.
- [ ] Ao abrir pendência, mostrar objetivo, conteúdo delimitado, estimativa,
  resumo, questões e próxima revisão; não apenas redirecionar a página ampla.
- [ ] Substituir a ligação Agenda–Semana por chave estável sem tocar eventos manuais.
- [ ] Aplicar a agenda de 12 semanas somente após horários fixos, disciplinas
  atuais e foco OMED; PDF novo entra no foco atual e gera D0/D1/D7/D21.

### D. Resumos, módulos e mapas

- [ ] Criar template: objetivo, pré-requisitos, decisão clínica, sinais,
  diagnóstico/conduta, armadilhas, integração curricular, fontes/data, mídia e
  questões contextualizadas.
- [ ] Implementar leitura progressiva: índice, estimativa, síntese OMED, tabelas
  responsivas e conclusão por seção, sem reduzir conteúdo sem revisão editorial.
- [ ] Criar módulos reutilizáveis de Anatomia, Fisiologia, Bioquímica, Histologia,
  Patologia, Farmacologia, Microbiologia, Imunologia e Epidemiologia, ligados a
  sistema, aplicação clínica, resumo, questões, mapa e mídia.
- [ ] Criar biblioteca de diagramas/ícones e mídia licenciada com alt text, legenda
  e fonte. Arte gerada explica conceitos, mas nunca é prova clínica.
- [ ] Converter mapas em relações reais: nós curtos, setas nomeadas e ligação para
  resumo, questão, caso, mídia e referência. Entregar por prioridade OMED/semestre.

### E. Navegação e mídia

- [ ] Reorganizar navegação por "Hoje", "Aprender", "Praticar" e "Revisar";
  manter Meu Curso como currículo e Minha Mídia como biblioteca de apoio.
- [ ] Criar busca/filtros persistentes por disciplina, semestre, tema, subtema,
  prioridade OMED, recurso e estado de estudo.
- [ ] Reorganizar mídia por modalidade, patologia, contexto, caso e fonte; ampliar
  em tela cheia com legenda e retorno ao ponto de estudo. Privada continua autenticada.
- [ ] Otimizar carregamento progressivo, formatos, alt text e estados sem figura.

### F. Conteúdo, dados e liberação

- [ ] Revisão clínica por diretriz das questões/resumos e metadados de banco/prova/
  instituição/ano antes de afirmar origem.
- [ ] Triar visualmente os 321 itens privados restantes e vincular figura–subtema.
- [ ] Anki em lotes clínicos: 14 duplicatas exatas, 4 frentes ambíguas, 885 versos
  extensos e 90 referências ausentes, preservando IDs, histórico e backup.
- [ ] Reconsultar HCPM VI, validar currículo manualmente e resolver restore/RLS do
  Supabase em ambiente compatível com `supabase_vault`.
- [ ] Publicar somente com gates verdes, QA autenticada e revisão de privacidade.

### Ordem e critério de término

1. A: evidência e segurança. 2. B+C: claro, conclusão e rotina. 3. D em uma
disciplina-piloto. 4. E. 5. F contínuo. Cada bloco exige testes registrados,
estados vazio/erro/carregando, teclado/celular, revisão visual e zero perda de dados.
## Auditoria integral em 20 lentes — 2026-08-11

A revisão consolidada, os bloqueadores, a ordem de execução e os critérios de aceite estão em `docs/AUDITORIA-20-LENTES-2026-08-11.md`.

- [ ] P0: corrigir o typecheck do importador curricular e repetir todos os portões técnicos.
- [ ] P0: validar autenticação, mídia privada, RLS e restauração de backup ponta a ponta.
- [ ] P1: unificar agenda, OMED, semestre atual, revisão longitudinal e Anki em um painel canônico.
- [ ] P1: reconciliar os manifestos de mídia e concluir a triagem visual canônica.
- [ ] P1: criar a matriz de cobertura antes de produzir novos resumos, questões, casos ou imagens.
- [ ] P2: prototipar e aprovar a nova arquitetura e o design antes de implementar o redesenho amplo.
- [ ] P3: aplicar a rotina PDF → Markdown privado → classificação → semana → revisão → destino a toda fonte nova.
## Fontes universitárias de imagem clínica — 2026-08-13

- [x] Catalogar fontes universitárias de TC, RM, RX, ultrassom e patologia.
- [ ] Validar licença e créditos por item antes de baixar.
- [ ] Selecionar imagens abertas para lacunas reais de OMED e currículo.
- [ ] Relacionar imagens a resumo, questão, caso, disciplina e subtema.
- [ ] Rodar auditoria de privacidade, direitos e publicação.
## Continuação das pendências — 2026-08-13

- [x] Catalogar fontes universitárias de TC, RM, RX, ultrassom e patologia.
- [x] Registrar a regra de proveniência de imagens do Drive (documento e página).
- [x] Registrar prioridade Estratégia MED, diretrizes atuais e PubMed/PMC validado.
- [x] Corrigir o bloqueador TypeScript do mapa curricular.
- [x] Passar typecheck, lint, auditoria de questões e auditoria de privacidade.
- [ ] Validar os artefatos `out` e as rotas; o manifesto do Next registra exportação com sucesso, mas o processo do terminal excedeu o timeout.
- [ ] Diagnosticar encerramento anômalo do build antes de publicar.
- [ ] Retomar PDFs privados, triagem de imagens, resumos, questões e mapas após validação do release.
## Lote privado neuropsiquiatria — conversão concluída — 2026-08-13

- [x] Converter para Markdown privado os sete PDFs recebidos de psiquiatria e neurologia.
- [x] Confirmar camada textual utilizável em todos os sete arquivos.
- [x] Classificar fontes e listar páginas candidatas para TC, RM e EEG no manifesto privado.
- [~] Renderizar somente as páginas clínicas selecionadas e triá-las por valor didático, origem, página e direitos. Prévia privada concluída para Psiquiatria Clínica p. 91--93; faltam hash SHA-256, confirmação clínica/anonimização e os demais documentos selecionados.
- [ ] Revisar sínteses autorais contra diretrizes atuais antes de ampliar os resumos públicos.
- [ ] Criar questões, casos e mapas somente para lacunas comprovadas no mapa de cobertura.
## Atualização operacional — acervo visual 2026-08-14

- [x] Baixar/revisar os 379 objetos privados e gerar 19 folhas de contato.
- [x] Classificar o lote inteiro: 327 úteis, 21 contextuais, 31 não úteis e
  nenhum item pendente de inspeção visual.
- [x] Preservar backup, decisões, hashes e os 30 JP2 convertidos em JPEG
  privado; nenhum recorte comercial foi publicado.
- [ ] Confirmar legenda/modalidade e ligar cada imagem útil aos resumos,
  questões, casos e mapas; depois executar QA autenticado de login/logout,
  expiração de URL e isolamento entre usuários.
## Estado vigente — neuropsiquiatria e acervo visual — 2026-08-14

- [x] Fechar revisão visual e hashes do lote neuropsiquiátrico: 20 páginas
  novas, 60 itens privados, 60 vínculos taxonômicos válidos.
- [x] Reorganizar Minha mídia por disciplina, tema, subtema, patologia/achado,
  fonte, modalidade, origem/privacidade e triagem; tela cheia, alt, legenda,
  lazy loading e retorno ao resumo.
- [x] Acrescentar período curricular e caso relacionado como filtros/metadados
  opcionais; itens sem vínculo permanecem explicitamente sem classificação.
- [x] Reconciliar o acervo existente: 347 itens úteis e 21 contextuais com
  `subtema_id` válido; dois itens não úteis continuam sem vínculo por decisão
  de curadoria.
- [x] Ancorar e auditar 77/77 figuras públicas.
- [ ] QA autenticada interativa de login/logout, URL expirada, exclusão e
  isolamento entre contas; não executar publicação adicional antes desse gate.

### Reteste de rotas e build — 2026-08-14

- [x] Corrigir os cinco vínculos que apontavam para subtemas sem página estática;
  a verificação atual encontrou 0 rotas ausentes entre os 49 IDs da interface.
- [x] Repassar typecheck, lint, auditoria de figuras (77/77), privacidade,
  questões e integridade do diff.
- [x] Confirmar encerramento normal do `next build`: reteste final compilou
  413/413 páginas estáticas e encerrou com código 0.
