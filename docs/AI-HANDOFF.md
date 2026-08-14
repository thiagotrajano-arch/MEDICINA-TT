# Handoff para outra IA — Codex Medicus

Atualizado em 2026-08-10.

> **Pendências operacionais:** consultar primeiro
> [PENDENCIAS-MESTRAS.md](PENDENCIAS-MESTRAS.md). `PROXIMOS-PASSOS.md` e o
> Plano de 100 Passos agora são histórico/evidência e não filas paralelas.

**Antes de mais nada, leia `docs/PLANO-MESTRE-EXTRACAO-E-CURSO.md` e `docs/PLANO-INTEGRACAO-MEDICINA-DESKTOP.md`** — documentos vivos com o
inventário completo de `Desktop\MEDICINA\`, Downloads e Google Drive, o que já foi mapeado/construído,
o que está pendente, e o passo a passo consolidado (sua seção 11 é o resumo mais rápido de onde tudo
está). Sem ler isso primeiro, é fácil redescobrir fontes já catalogadas ou re-perguntar autorizações
já concedidas (uso de RESUMOS licenciado, uso de pastas de terceiros no Drive — ambas já autorizadas
pelo usuário, não perguntar de novo).

O fechamento do acervo de 1º de agosto está em
`docs/FECHAMENTO-ACERVO-PRIVADO-2026-08-01.md`. O estado operacional mais
recente está em `docs/FECHAMENTO-2026-08-10.md`, em `PROXIMOS-PASSOS.md` e nas
seções finais deste arquivo. Leia-os antes de repetir OAuth, triagem, hashing,
deduplicação, limpeza do Anki ou importação da semana neuropsiquiátrica.

## Acessos públicos

- Site: https://thiagotrajano-arch.github.io/MEDICINA-TT/
- Repositório: https://github.com/thiagotrajano-arch/MEDICINA-TT
- Branch de publicação: `main`
- Deploy: GitHub Actions → GitHub Pages.

## Fechamento técnico de 2026-08-14 — questões e rotina

- A página `/questoes` não serializa mais as 1.332 questões no HTML estático.
  O banco é carregado no cliente com estados de carregamento/erro e sem mudar a
  lógica de filtros, fila ou progresso. O artefato caiu de ~2,52 MB para
  153.085 bytes e foi validado no navegador com progresso existente.
- A ligação Agenda–Semana passou a usar `agenda_evento_id`, protegido por chave
  estrangeira composta com `owner_id`. A migration foi aplicada e vinculou os
  84 espelhos inequívocos entre 138 tarefas; eventos manuais foram preservados.
- Typecheck, lint, auditorias de 1.332 questões, 77 figuras e privacidade, além
  do build de 413 páginas, passaram depois das alterações.
- O Anki permanece pausado por decisão explícita do usuário; não retomar sem
  nova autorização.
- O commit `2dbbb28` foi publicado pelo Pages no run `31822386904`. Questões e
  Agenda abriram autenticadas em produção, com 349 respostas anteriores
  preservadas e sem mensagens de erro no console.
- O advisor de segurança do Supabase foi reduzido de quatro para um aviso após
  mover `pg_trgm`, `unaccent` e `vector` para o schema `extensions`. O único
  aviso restante é habilitar proteção contra senhas vazadas no painel de Auth.

## Cópia de trabalho

Use um clone local do repositório. O arquivo `.env.local` contém as credenciais necessárias e é ignorado pelo Git. Nunca mostrar, registrar em logs, copiar para documentação ou commitar seu conteúdo.

Estado operacional em 2026-07-21: login por e-mail/senha ativo, sessão persistente e progresso local-first sincronizado com Supabase/RLS. Não reintroduzir autenticação anônima: ela está desabilitada no projeto.

O progresso sincronizado inclui questões, simulados, resumos/casos concluídos, etapa de casos, favoritos e anotações. A migration `0004_progresso_conteudo.sql` já foi aplicada e validada com uma conta temporária apagada ao fim do teste.

## Antes de trabalhar

1. Ler `AGENTS.md`.
2. Ler `PROXIMOS-PASSOS.md`.
3. Ler `docs/PROMPTS-MASTER.md`.
4. Ler `docs/PLANO-MESTRE-EXTRACAO-E-CURSO.md` para distinguir inventário, conversão, análise e integração.
5. Consultar o arquivo local `RAIO-X-OMED.md` quando disponibilizado pelo usuário.
6. Conferir `git status` e os commits recentes.

## Contexto consolidado

Thiago é estudante de medicina da UFMS. O Codex Medicus é sua plataforma pessoal de estudos médicos, inicialmente focada na OMED VI 2026 e posteriormente na graduação e residência.

Regra inegociável: custo zero. Usar camadas gratuitas e evitar APIs pagas em produção.

Prioridade de conteúdo (atualizada 2026-07-24 com dado real, não mais inferido — ver `RAIO-X-OMED.md`
seção 0.1/0.2, arquivo local em `Desktop\med`, e `PLANO-INTEGRACAO-MEDICINA-DESKTOP.md` seção 0):
dentro de Clínica Médica (~44% da prova, maior bloco isolado), a ordem real é Infectologia(17) >
Cardiologia(16) > Neurologia(14) > Pneumologia(13) — já completas — depois Nefrologia(9, sem fonte
encontrada ainda) > Gastro≈Endócrino(8) > Hematologia(7) > Oncologia≈Otorrino(6) > Reumato≈Dermato(4,
Reumato já parcialmente construída) > Oftalmo(3) > Geriatria(1). Fora de Clínica Médica: Materno-
Infantil (~24%, GO+Pediatria já completas) e Cirurgia (~20%, expansão grande disponível — ver plano).

Nunca inventar fatos clínicos, gabaritos, fontes ou licenças. Preservar o conteúdo original do usuário e adicionar complementos em nova camada. Uma questão errada é pior que uma questão a menos. **Toda conduta precisa refletir a diretriz vigente**, não a que aparece na fonte se ela estiver desatualizada (RESUMOS, Estratégia MED e material de colega podem não estar na versão mais recente da diretriz).

## Fontes locais importantes

- PDFs do Estratégia MED já extraídos pelo usuário (`_pdfs-estrategia`, 824 PDFs, 125/125 tópicos —
  GO/Obstetrícia/Pediatria/Preventiva/Infectologia — **não retocar**).
- 15 ZIPs em Downloads = 3 cursos Estratégia MED **ainda não extraídos** (Cardiologia 105 PDFs,
  Neurologia 80 PDFs, Cirurgia 172 PDFs/33 tópicos) — ver plano seção 9.2.
- `Desktop\MEDICINA\RESUMOS\` — produto licenciado (Esther Santos, Medicina Unimontes), uso
  autorizado pelo usuário em 2026-07-25. Parcialmente extraído (virou Reumatologia).
- 4 `.docx` em `Desktop\MEDICINA\` + 6 `.md` em `Desktop\cursos\` — ~595 questões comentadas já lidas
  e mapeadas por disciplina/subtema (plano seção 2 e 9.1), prontas pra integrar.
- Google Drive de terceiros ("Resumos e cursos" — MEDCOF/Estratégia/MedCurso —, "Bagagem" de colegas
  de turma) — uso autorizado pelo usuário em 2026-07-25, reconhecimento feito, conteúdo interno não
  aberto ainda. Ver plano seção 9.3.
- `BBPM I-VIII`, `HCPM`, `LANN`, `UE`, `Farmacologia` do próprio usuário — maioria não triada, ver
  plano seção 1 e Etapa A.
- Histórico local do Claude, quando autorizado e disponível.

Para extração, preferir Mapas Mentais; flashcards são úteis para questões. Muitos slides são imagens e exigem OCR ou inspeção própria. **Extração de imagem via PDF Tools MCP está bloqueada** pra pelo menos parte do lote Estratégia MED (trailer malformado, artefato de export Google Drive) — ver plano seção 9.4 antes de tentar de novo.

## Operação

- **PDFs:** regra obrigatória: `PDF -> Markdown cacheado -> leitura/triagem`. Localizar o cache antes de abrir o original; converter somente se ainda não houver Markdown verificável. Isso reduz releituras, consumo de contexto e risco de usar extração incompleta.

- Instalação: `npm ci`
- Desenvolvimento: `npm run dev`
- Typecheck: `npm run typecheck`
- Seed: `npm run seed`
- Sincronização do Drive: `npm run sync-drive`
- Migrações: `npx tsx scripts/apply-migration.mts`

Após alterar `src/content/**` ou a taxonomia, executar o seed antes de validar a versão que usa Supabase. Verificar IDs de subtemas, questões, casos e figuras para evitar vínculos órfãos.

Estado quantitativo validado em 2026-07-26: 36 disciplinas (13 com conteúdo real — GO, Pediatria,
Infectologia, Cirurgia, MFC, Cardiologia, Pneumologia, Neurologia, Reumatologia, Endocrinologia,
Hematologia, Nefrologia e Gastroenterologia), 282 subtemas, 209 resumos prontos, 1054 questões,
24 casos clínicos, 73 figuras (61 reais + 12 diagramas, 57 ancoradas).
A extração NÃO está mais encerrada — ver `PLANO-INTEGRACAO-MEDICINA-DESKTOP.md` pra tudo que foi
descoberto em 2026-07-25 e ainda não construído (17 subtemas mapeados, 3 cursos Estratégia MED nunca
extraídos, Drive de terceiros liberado). Os bancos exatos de Cirurgia 160 e MFC 80 não estão no disco e só têm páginas parciais no histórico; os acervos recuperados dos Resumos Absolutos (10 temas/100 questões por disciplina) já foram incorporados em `src/content/raw/`. Para a ordem completa das próximas etapas, ler também `docs/ROADMAP-50-PASSOS.md`.

## Publicação

Mudanças em `main` acionam o workflow de GitHub Pages. Antes de publicar: typecheck, validação dos vínculos, seed quando aplicável e revisão de `git diff`. Não incluir `.env.local`.

## Segurança

Credenciais antigas aparecem em históricos do Claude. Elas podem ser usadas somente para a tarefa autorizada, mas não devem ser reproduzidas em prompts, relatórios, commits ou mensagens. Recomenda-se rotacioná-las quando a migração estiver estabilizada.

## Pendências externas exatas

- O `Site URL` e a allowlist de redirect do Auth do Supabase foram confirmados no painel administrativo para o domínio público em 2026-07-29. Ainda falta testar, na conta do usuário e sem registrar senha, login, recuperação e sessão persistente (passo 93).
- `SUPABASE_DB_URL` e `SUPABASE_SERVICE_ROLE_KEY` já estão cadastrados como GitHub Actions Secrets com autorização explícita do usuário. O run `29885112038` confirma um dump anterior, mas não valida a restauração instrumentada depois; o próximo run deve comprovar dump, artefato e restore em PostgreSQL temporário. Ausência do segredo agora é falha explícita, não sucesso por etapas puladas.
- Para Drive, obter autorização Google própria, uma allowlist explícita de pastas e um baseline revisado; a rotina incremental exige `DRIVE_SYNC_ENABLED=true` e não deve ser habilitada antes de `npm run drive:inventory`. Nunca inventar, solicitar senha de e-mail ou reutilizar credencial alheia.
- Não há nova extração segura até o usuário fornecer os PDFs faltantes descritos em `PROXIMOS-PASSOS.md`.

## Fechamento de 2026-07-28

- SISCAD reconciliado em área privada: 37 componentes, 36 planos aprovados e um plano acessível com status “Submetido para aprovação”. Nenhum dado individual foi copiado para o repositório.
- As fontes LANN, UE, Farmacologia e `RESUMOS` (30/30) foram triadas privadamente. As 34 variantes distintas de colisão do Estratégia foram recuperadas com hash e proveniência preservados; o inventário agora distingue 863 entradas ZIP, 824 nomes iniciais, cinco duplicatas exatas e 858 PDFs distintos preservados.
- A prioridade não é extrair em massa: primeiro criar o manifesto unificado de fontes, depois a matriz `plano → tema → subtema → recurso`, e então aplicar o portão editorial em Infectologia e GO.
- Para o estado privado completo e a fila de retomada, consultar `Analise Integrada - Fechamento 2026-07-28.md` no Obsidian. Não publicar material comercial nem derivado de SISCAD sem validação clínica, licença e revisão de privacidade.
- O roteiro consolidado de continuidade é `docs/PLANO-100-PASSOS.md`. Ele não autoriza executar os itens automaticamente: respeitar dependências, portões editoriais e autorizações externas.

## Fechamento de 2026-07-29

- Os passos 1–5 do plano foram concluídos em armazenamento privado: snapshot, manifesto unificado, SHA-256, classificação inicial e catálogo de caches. O acervo `Desktop/MEDICINA` tem 1.161 arquivos inventariados; todos receberam hash sem erro. Há cinco grupos de cópias idênticas, preservadas sem remoção.
- A continuidade começa pelo passo 6 (divergências entre ZIPs, PDFs, caches e inventários) e pelo passo 7 (matriz longitudinal fonte → período/componente → disciplina → tema/subtema → destino permitido). Não reabrir PDFs já convertidos sem uma lacuna concreta.
- Os passos 6–9, 11–12 e 14 também foram concluídos em seguida: divergências reconciliadas por escopo, matriz inicial criada no cofre, classificação privada/pública definida, figuras auditadas e checklist sanitizado criado. A próxima tarefa desse eixo é normalizar os onze alvos visuais históricos (passo 10); o restore do backup Supabase permanece separado, pois requer ambiente seguro.
- A normalização visual foi concluída: cinco lacunas reais permanecem em `docs/LACUNAS-VISUAIS.md`. O passo 13 foi instrumentado, mas ainda não concluído: `backup.yml` agora restaurará o próximo dump em PostgreSQL 17 temporário e apagará o contêiner ao final. Conferir o primeiro run antes de marcar a restauração como validada.
- A documentação sanitizada e o workflow foram publicados no commit `6a126af` em `main`; o deploy GitHub Pages `30452513229` concluiu com sucesso. O próximo run de **Backup e keep-alive** é a evidência necessária para fechar o passo 13.
- Os passos 15 e 43 foram reconciliados como concluídos. O relatório sanitizado de qualidade das questões está em `docs/RELATORIO-QUALIDADE-QUESTOES.md` e pode ser refeito com `npm run audit:questoes`: 1.072 questões, 686 com repetição normalizada, 118 comentários curtos em 81 questões, 48 questões sem fonte e nenhum comentário vazio. Não alterar o banco inteiro em massa; a sequência editorial é Infectologia (44–46), depois GO e Pediatria, com diretrizes vigentes nomeadas e revisão de gabarito antes de qualquer publicação clínica.
- O primeiro micro-lote de Infectologia foi revisado em 2026-07-29 e está documentado sem conteúdo privado em `docs/REVISAO-INFECTOLOGIA-LOTE-1.md`: quatro itens STORCH receberam rastreabilidade oficial atual, e a janela de imunoprofilaxia neonatal contra HBV foi ajustada. Não marcar os passos 44–46 como concluídos: meningite, sepse e os demais itens continuam exigindo fonte primária atual antes de revisão clínica.
- O lote foi publicado no commit `a89fc83`; GitHub Pages `30456204375` concluiu com sucesso e `/` e `/questoes/` responderam HTTP 200. Typecheck, lint e auditoria filtrada passaram. A build local gerou as páginas estáticas, mas atingiu o limite na otimização final; o seed Supabase não respondeu no limite seguro e continua pendente de execução verificável. O site estático publicado não depende desse seed.
- O segundo e o terceiro micro-lotes estão documentados em `docs/REVISAO-INFECTOLOGIA-LOTE-2.md` e `docs/REVISAO-INFECTOLOGIA-LOTE-3.md`: duas questões de imunizações receberam fontes atuais do PNI e um item de sífilis recebeu o PCDT IST. A auditoria filtrada agora encontra zero comentários repetidos após normalização em Infectologia e 33 comentários curtos em 21 questões. Não alterar meningite ou sepse sem diretriz primária atual e específica.
- Os lotes 2 e 3 foram publicados no commit `6dcc44f`; GitHub Pages `30457470874` concluiu com sucesso e `/` e `/questoes/` responderam HTTP 200. Typecheck, lint e auditoria filtrada passaram. O seed Supabase continua pendente de execução verificável; não assumir sincronização remota por causa desta publicação estática.

## Bloco de privacidade e operação — 2026-07-29

- A rota pública `/semestres` foi neutralizada: exibe apenas ciclos genéricos de revisão. Todo vínculo individual de curso permanece no cofre privado; `npm run audit:privacidade` impede o retorno de marcadores curriculares protegidos aos arquivos públicos dessa rota.
- A ingestão do Drive foi separada em inventário de metadados e sincronização incremental. O inventário não baixa, não grava e não imprime identificadores; a sincronização só aceita allowlist, opt-in e baseline. Os logs usam apenas contagens e códigos seguros.
- O backup agora falha sem conexão configurada, confirma dump não vazio e torna o keep-alive estrito. A restauração real segue pendente até um run novo com evidência.
- A telemetria cliente foi reduzida a um envelope sanitizado, limitado por carregamento e restrito ao usuário autenticado. A migration `0007_restringe_monitoramento_autenticado.sql` foi aplicada e a política RLS foi verificada sem ler dados de usuários.
- O lote 4 de Infectologia revisou cinco itens contra fontes oficiais específicas; a auditoria filtrada passou de 33 para 23 comentários curtos em 16 questões, mantendo zero repetições e zero fontes vazias. Consultar `docs/REVISAO-INFECTOLOGIA-LOTE-4.md`.
- O bloco foi publicado no commit `31b3a36`. A produção respondeu HTTP 200 em `/`, `/semestres/` e `/questoes/`; a checagem de conteúdo confirmou a trilha pública nova e a ausência do marcador individual antigo. O backup restaurado e o inventário/baseline do Drive continuam pendências externas deliberadas.

## Camada privada do curso — 2026-07-29

- A rota `/meu-curso` é a camada autenticada para progresso acadêmico individual. Ela oferece formulário manual, rascunho local, importação de Markdown/CSV com pré-visualização e confirmação, edição e histórico mínimo. A rota pública `/semestres` continua somente com trilhas genéricas.
- As migrations `20260729170921_cria_camada_privada_do_curso.sql` e `20260729172234_restringe_permissoes_curso_privado.sql` foram aplicadas. As tabelas `curso_disciplina_usuario` e `curso_disciplina_evento` têm RLS por `owner_id`; acesso anônimo é revogado e o papel autenticado possui somente `select`, `insert`, `update` e `delete`. A verificação foi estrutural e não consultou registros de usuários.
- Validações locais concluídas: parser Markdown/CSV, TypeScript, lint, auditoria de privacidade, revisão de diff e build de produção com 366 páginas. Antes de ampliar a camada, testar uma atualização autenticada real em produção; não usar senha de usuário em scripts ou registros.
- Próxima sequência: passos 27–28 do `docs/PLANO-100-PASSOS.md` (matriz privada completa e painel longitudinal de materiais, lacunas e próximos estudos), mantendo SISCAD, Drive e acervo comercial fora do repositório público.

### Recorte público seguro do painel longitudinal

- O painel privado passou a receber um catálogo serializável calculado no servidor a partir de taxonomia, resumos, questões e casos já públicos. Ele nunca recebe SISCAD, PDFs, observações, notas, arquivos do Drive ou credenciais.
- Para cada disciplina registrada, exibe cobertura publicada (resumos, questões, casos e figuras ancoradas), lacunas de conteúdo na taxonomia e até três tópicos recomendados. A prioridade local ordena `revisar`, `cursando`, `planejada` e `concluida`, usando dificuldade como desempate.
- O passo 27 não está encerrado: faltam documentos/materiais privados autorizados e a matriz longitudinal real. Não substituir esses vínculos por inferência ou dados publicados.

## Publicação e retomada — 2026-07-29

- Os commits `cc08b86` (camada privada do curso) e `cac0eae` (recorte longitudinal seguro) foram enviados para `main`. O deploy GitHub Pages `30482759219` concluiu com sucesso; `/` e `/meu-curso/` responderam HTTP 200.
- O cofre privado recebeu `Matriz Longitudinal - Cobertura Operacional 2026-07-29`, que fecha o passo 18 em nível de metadados. Os passos 19–20 e 27–28 continuam abertos: exigem curadoria manual dos vínculos plano → tema → subtema e materiais privados, sem publicar SISCAD, Drive, PDFs comerciais ou dados pessoais.
- Próxima retomada recomendada: primeiro confirmar os testes pessoais 93–96 (login, recuperação, sessão e sincronização); em paralelo passivo, aguardar o backup restaurado do passo 13 e a eventual liberação de HCPM VI. O próximo bloco clínico autorizado deve retomar a revisão editorial de Infectologia (44–46), antes de GO e Pediatria.

## Ordem mestra de construção — 2026-07-29

- Ler `docs/ORDEM-MESTRA-ACERVO-MIDIA-MAPAS-DESIGN.md` antes de escolher o próximo bloco grande.
- Depois dos portões técnicos, a ordem confirmada é: varredura do Drive/acervo autorizado → correlação com semestres já cursados → validação clínica → arquitetura e expansão de mídia → mapas conceituais reais → Anki → redesign apenas visual.
- Capturas de imagens de PDFs comerciais são permitidas somente na biblioteca autenticada do proprietário, armazenadas em bucket privado fora do repositório/GitHub Pages, com origem e página. O site público recebe apenas imagem própria ou com licença aberta verificável, sempre contextualizada.
- Imagens de pacientes permanecem privadas por padrão e exigem anonimização e autorização apropriada. Reutilizar a autenticação atual: tabela e objetos escopados por `owner_id`, Storage RLS e URLs assinadas de curta duração. Não criar senha paralela, não expor `service_role` e não confiar apenas em esconder a rota.
- A base dessa arquitetura foi implementada em `/minha-midia` e na migration `20260729194500_cria_biblioteca_midia_privada.sql`. O bucket `midia-privada` é não público, aceita somente JPG/PNG/WebP/AVIF até 20 MB, e os objetos usam caminho `<auth.uid()>/<uuid>.<ext>`. O cliente gera URL assinada por cinco minutos; sem sessão, não consulta metadados nem Storage. Antes de considerar o fluxo encerrado, testar com a conta real: bloqueio deslogado, upload comercial, renovação, logout e exclusão. Nenhum arquivo privado faz parte do repositório.
- O commit `8b37d84` foi publicado; o deploy `30501713751` passou e `/minha-midia/` respondeu HTTP 200. Typecheck, lint, auditoria de privacidade e build oficial passaram. A rotina das 9h foi apagada; não criar novo agendamento sem pedido explícito.
- Os mapas mentais atuais não devem ser considerados concluídos apenas por existirem 60 entradas. A meta é transformá-los em grafos legíveis com conceitos-chave e relações nomeadas por setas.
## Atualizacao privada do Drive - 2026-08-01

- O conector autenticado agora permitiu materializar um lote seletivo privado: sete PDFs iniciais, mais treze arquivos de ampliacao. Todos foram mantidos fora do repositorio.
- Foram calculados hashes, gerados caches Markdown e produzidos manifestos privados. O lote OMED de onze fontes confirmou copias identicas ja existentes localmente; dois materiais adicionais foram preservados somente na biblioteca privada.
- Foram extraidas imagens embutidas e executados renderizacao/OCR seletivos. Resultados de OCR de baixa confianca continuam em fila de revisao humana; nenhum texto OCR foi integrado automaticamente.
- A matriz privada Drive -> SISCAD recebeu vinculos candidatos por componente/período. Esses vinculos exigem revisao manual e clinica antes de qualquer uso no site.
- Nao publicar PDFs, textos derivados, imagens, hashes, identificadores de Drive ou dados curriculares individuais. O estado completo desta rodada esta no Obsidian e em `Desktop\\MEDICINA\\_private-corpus\\drive-lote-20260801`.
- Proxima sequencia: comparar apenas novos hashes com o manifesto amplo, priorizar fontes realmente unicas por lacuna OMED, revisar clinicamente com diretrizes atuais e separar candidatos a conteudo autoral de referencias privadas.

## Auditoria de design e produto - 2026-08-02

- A solicitacao de novo redesign foi registrada como pendencia; esta rodada nao alterou a interface nem instalou plugins.
- Rotas publicadas verificadas responderam HTTP 200; deploy remoto passou; auditorias de questoes e privacidade passaram.
- Pendencias tecnicas encontradas: avisos de Supabase para protecao contra senhas vazadas desativada, tabelas com RLS sem politica, extensoes no schema public, chaves estrangeiras sem indices de cobertura e politicas RLS com `auth.*` sem initplan otimizado.
- Pendencias de produto: benchmarking de AMBOSS/Osmosis e design systems acessiveis; brief visual; arquitetura de informacao; kit de componentes; leitura sem distracao; treino de questoes com retomada; midia publica/privada; mapas clinicos com relacoes nomeadas; estados de erro/loading; Lighthouse/axe; testes de fluxos.
- Antigravity nao esta disponivel na sessao atual. Product Design/Figma/Build Web Apps/Sentry/PostHog/Vercel foram apenas listados como candidatos para avaliacao posterior; nenhum foi instalado.
- Preservar todo o acervo atual, progresso, autentificacao, catalogos privados e separacao entre publico/comercial/paciente. A ordem recomendada e: seguranca e autenticacao -> aprendizagem/benchmarking -> arquitetura -> qualidade -> acervo e SISCAD -> Anki.

## Atualizacao do acervo privado - 2026-08-02

- A conexao autenticada do Drive foi reutilizada sem novo fluxo de login.
- Tres PDFs de resumo OMED foram materializados seletivamente em `Desktop\\MEDICINA\\_private-corpus\\drive-lote-20260802` (Pneumologia, GO e Pediatria). O lote tem 3 arquivos unicos, com SHA-256 e copia canonica por hash.
- O pipeline `PDF -> Markdown` foi executado uma vez para cada arquivo: 230 paginas, 521.699 caracteres extraiveis, nenhuma pagina exclusivamente-imagem e nenhum erro de conversao.
- O lote e privado: nenhum binario, hash, texto comercial ou imagem foi adicionado ao repositorio, ao site publico ou a uma nota compartilhavel. A renderizacao visual permanece pendente porque o wrapper Poppler local nao esta operacional neste runtime.
- Proxima fila: comparar hashes com o manifesto amplo, selecionar somente fontes novas, relacionar ao mapa privado de semestres/SISCAD e validar clinicamente antes de produzir conteudo autoral.

### Lote de 30 PDFs e triagem visual - 2026-08-02

- Foram materializados 27 PDFs novos, somados aos 3 do lote inicial: 30 PDFs na sessao.
- O lote novo tem 27 unicos, nenhuma duplicata interna e nenhuma colisao de hash com o lote inicial.
- A conversao produziu 1.194 paginas e 2.133.689 caracteres: 23 completas, 3 parciais e 1 erro estrutural preservado para reparo/OCR.
- O Poppler foi corrigido usando diretamente `pdftoppm.exe` do runtime nativo. Foram gerados 217 PNGs privados para triagem (primeiras paginas e candidatos visuais/parciais).
- O wrapper `.cmd` permanece evitado por falha de caminho; o script seguro `scripts/render-private-pdfs.ps1` e o comando `npm run render:private` documentam a rota funcional.
- Nenhum PDF, PNG, hash, ID do Drive ou texto derivado foi adicionado ao site publico ou ao GitHub.

## Analise de lacunas e proxima selecao - 2026-08-02

- A cobertura OMED foi recalculada por subtema: GO, Pediatria, Infectologia, Cardiologia, Pneumologia, Neurologia, Oncologia e Otorrino estao completas; Cirurgia e MFC estao parciais.
- As quatro lacunas de maior retorno sao Endocrinologia (33%), Nefrologia (67%), Gastroenterologia (71%) e Hematologia (83%). A fila de conteudo fica Endocrino -> Gastro -> Nefro -> Hemato.
- Cardiologia/Neurologia/Pneumologia nao precisam de mais apostilas em massa; precisam de imagens licenciadas, casos e revisao de diretrizes.
- O cruzamento com os periodos privados 2024-1 a 2026-2 mostrou lacunas publicas claras em Radiologia, Farmacologia, Imunologia e Urgencia/Emergencia, apesar de existirem questoes e fontes privadas. A fila de imagens/casos fica Radio -> UE -> Cardio/Neuro/Pneumo.
- Patologia e Fisiologia serao camadas transversais; as demais ciencias basicas so devem ser integradas quando houver um vinculo clinico ou curricular concreto.
- A busca metadata-only do Drive encontrou candidatos em todas essas areas, mas os resultados incluem duplicatas e livros protegidos. Nao interpretar contagem de resultados como necessidade de download.

### Lote prioritario OMED executado - 2026-08-02

- Foram materializados 30 PDFs direcionados a Endocrinologia, Gastroenterologia, Nefrologia e Hematologia.
- Manifesto: 30 unicos, 0 duplicatas internas e 0 colisoes com os manifestos privados anteriores.
- Conversao: 1.479 paginas e 2.010.026 caracteres; 21 completas, 9 parciais e nenhum erro fatal.
- Renderizacao: 30 primeiras paginas e 544 paginas dos nove candidatos parciais.
- Nenhum binario, hash, PNG, texto integral ou ID do Drive foi publicado. A proxima etapa e OCR seletivo/reparo e matriz fonte -> subtema, nao uma nova busca ampla.
- A triagem visual confirmou que as 9 conversoes parciais sao slides comerciais graficos; 544 paginas renderizadas foram preservadas para revisao privada.
- O runtime local nao possui Tesseract/OCRmyPDF e nao ha ferramenta Kimi/OpenRouter disponivel nesta sessao. Nao enviar material privado a servicos externos sem aprovacao e rota segura.

## Auditoria do site e fila adicional do Drive - 2026-08-02

- A revisão pós-publicação testou dez rotas públicas/autenticadas estáticas; todas responderam HTTP 200 e nenhuma continha `Application error`, `Unhandled Runtime Error`, `404` ou `Not Found`.
- `npm run typecheck`, `npm run lint`, `npm run audit:privacidade` e `npm run audit:questoes` passaram. O lint produz somente cinco warnings em scripts de manutenção; não há erros bloqueantes.
- A publicação oficial pelo GitHub Actions passou; a build local excedeu o tempo máximo nesta rodada e deve ser repetida quando for necessário otimizar o bundle.
- `sitemap.xml` e `robots.txt` ainda não existem no Pages; tratar como P3 de SEO/descoberta, não como falha funcional.
- A conexão autenticada do Drive foi consultada apenas por metadados e resultou em 67 candidatos médicos para a fila privada. A lista nominal está no Obsidian, não no site: `Pendência Drive - 70 PDFs Médicos para Triagem 2026-08-02`.
- Próxima ordem segura: hash/deduplicação dos candidatos → PDF/DOCX para Markdown → OCR/renderização seletivos → vinculação a disciplina/semestre/subtema → revisão clínica e de licença → somente então conteúdo autoral ou mídia privada.

## Atualização Codex — 2026-08-03

- O checkout estava limpo em `main` antes desta atualização; a consolidação atual modifica apenas estes documentos de continuidade. Os commits de código mais recentes são `4df8856`, `00c1bb3` e `f319ede`.
- A camada Anki local foi ampliada: decks OMED prioritários e os 14 subtemas de Neurologia foram criados/completados via AnkiConnect, com proteção contra notas duplicadas. Image Occlusion Enhanced e FSRS Helper foram instalados somente no Anki Desktop local.
- O dashboard recebeu importação manual de `exports/anki/progresso.json`; por segurança, a ponte continua local e não abre `127.0.0.1:8765` no navegador público. A sincronização autenticada entre dispositivos ainda não foi implementada.
- Notion Desktop foi instalado e uma central privada foi criada com as bases de rotina e fila de revisão. Falta povoamento contínuo e integração de dados, sem copiar material comercial ou dados pessoais para o repositório.
- O plano histórico dos 100 passos ainda subestima o avanço do Anki: os passos 88 e 89 devem ser tratados como concluídos na próxima reconciliação documental. Permanecem 90–91 (flashcards por erros e backup/exportação), além dos testes de produto e publicação.
- A última auditoria publicada confirmou rotas sem erro e auditorias estruturais; `sitemap.xml`/`robots.txt` ainda precisam de verificação no artefato Pages, e a build local do commit de integração Anki excedeu o limite de execução. Não declarar esse commit publicado sem um run remoto confirmado.
- A consolidação sanitizada de todo o contexto desta conversa está em `docs/CHAT-CONSOLIDADO-SITE-2026-08-04.md`. Usá-la junto de `PROXIMOS-PASSOS.md` e `docs/PLANO-100-PASSOS.md` na próxima retomada; ela não contém credenciais nem dados pessoais brutos.

## Atualização Codex — 2026-08-04

- A sessão autenticada do SISCAD foi revisada novamente. O plano de Habilidades Clínicas da Prática Médica VI está acessível, porém ainda submetido para aprovação; tratá-lo como fonte curricular provisória.
- Foi criado um plano privado de consolidação curricular em 12 semanas, compatível com Obsidian e sem datas fixas. Ele não deve ser publicado no GitHub Pages.
- Retomada recomendada do site: matriz privada curso → disciplina → subtema → recurso, painel longitudinal autenticado e auditoria do commit local do Anki; redesign visual permanece posterior.

## Atualização Codex — 2026-08-09

- O fluxo do Anki foi aplicado: 209 decks legados foram consolidados em decks curtos por disciplina (`Codex Medicus::...`), títulos novos são compactos e o estilo do modelo `OMED Bonito` foi atualizado; nenhum deck antigo foi apagado. `npm run anki:organizar` continua disponível para novas migrações.
- AnkiConnect, Image Occlusion Enhanced, FSRS Helper e Deckhand já estavam instalados localmente. A ponte continua somente em `127.0.0.1`; nenhuma extensão nova foi instalada às cegas.
- `Minha mídia` foi unificada como biblioteca autenticada com busca, filtros por origem e referência/proveniência visível. Conteúdo restrito continua fora do site público, mesmo quando aparece junto dos demais itens na biblioteca da conta.
- A agenda agora oferece foco de hoje, rotinas rápidas, filtros, busca e lista de pendências; o dashboard ganhou atalhos para Agenda e Minha mídia.
- O checkout foi validado com `npm run typecheck`, auditorias públicas e ESLint direcionado aos arquivos alterados; não houve erros. A QA autenticada do site (upload, URL assinada, filtros e agenda) ainda aguarda teste no navegador.
- Nova prioridade registrada: extrair imagens dos PDFs privados (inclusive comerciais) via PDF → Markdown + renderização seletiva, anexar fonte/página e classificá-las na biblioteca autenticada `Minha mídia`, sem publicar esse material.
- O prompt fornecido pelo usuário para imagens médicas de alta fidelidade foi incorporado como regra operacional em `docs/PROMPT-IMAGENS-MEDICAS-ALTA-FIDELIDADE.md` e referenciado no `PROMPTS-MASTER.md`. Ele exige modalidade, anatomia, achados, diferenciais, fonte/licença, privacidade e QA; imagens geradas devem ser rotuladas como ilustração didática e não como exame real.

## Atualização Codex — triagem visual e auditoria do site — 2026-08-09

- O lote canônico privado foi processado: 215 imagens elegíveis, 179 importações novas anteriores e 36 objetos já existentes. O catálogo remoto agora tem 312 registros, dos quais 297 possuem imagem exibível.
- A tabela privada recebeu `subtema_id`, `triagem_status` e `triagem_motivo`; 177 registros têm vínculo com resumo, 2 são contextuais, 6 não devem ser usados e 295 aguardam revisão visual conservadora.
- `Minha mídia` agora abre cada imagem em modal ampliado, mostra proveniência/status e oferece link para o resumo relacionado; filtros por origem e triagem foram adicionados.
- Foram encontrados 30 JPEG 2000 canônicos que não puderam ser decodificados pelo runtime atual; permanecem privados e documentados como pendência, sem conversão inventada.
- Rotas publicadas raiz, Biblioteca, Mídia, Mapas, Semestres e Minha mídia responderam sem erro visível; console da amostra sem erros. Typecheck, ESLint direcionado e diff-check passaram. A build completa ainda excede o limite local.
- Próxima prioridade real: revisão visual em lote dos 295 pendentes, conversão JP2 com ferramenta compatível, ancoragem dos itens úteis nos blocos de resumo/caso/questão e, depois, QA autenticada de URL assinada, logout, exclusão e bloqueio entre contas.
- O Advisor do Supabase não encontrou mais FK sem índice após a correção; restam avisos de segurança pré-existentes (proteção contra senha vazada desativada e extensões no schema `public`) que exigem decisão/migração própria, não devem ser alterados às cegas.
- O AnkiConnect está respondendo à versão, mas o perfil não abriu a coleção (`collection is not available`); não foi feita nenhuma escrita nesta sessão. O script agora aceita `--limpar-vazios` para remover apenas decks legados sem cartões após mover tudo para nomes curtos. A extensão visual candidata é Modernki (`739968151`), compatível com Anki 25.09.2+, mas requer backup e confirmação da versão antes da instalação.

## Retomada Opera/Kimi e inventário Anki — 2026-08-09

- A janela nativa do Opera foi localizada com o título `Prompt Med - Kimi - Opera`. A ponte de controle conseguiu confirmar a janela, mas não conseguiu inspecionar o conteúdo/DOM; portanto o chat não foi lido e nenhuma credencial foi solicitada ou usada. Para continuar, o usuário precisa deixar a sessão autenticada e o chat aberto quando a ponte visual estiver disponível.
- O inventário somente leitura de uma cópia temporária do perfil `Usuário 1` encontrou 318 decks e 2.830 cartões. Há 209 decks legados `Codex Medicus - ...`, todos vazios na cópia auditada; 164 decks excedem 70 caracteres. Nenhum banco vivo foi alterado.
- `npm run anki:organizar -- --aplicar --limpar-vazios` continua preparado, mas só deve ser executado quando `deckNames` voltar a responder com a coleção aberta. O comando move cartões para decks curtos e remove apenas decks legados comprovadamente vazios, preservando o backup existente.
- Nenhuma extensão nova foi instalada nesta retomada. Modernki permanece candidato visual, condicionado à confirmação da versão do Anki e a um backup recente; as extensões locais existentes foram preservadas.
- Auditorias repetidas: 1.296 questões, sem duplicatas/comentários curtos/fontes ausentes; 217 arquivos públicos e 3 curriculares passaram a auditoria de privacidade; typecheck, ESLint direcionado e diff-check aprovados.
- Os 30 JP2 canônicos foram decodificados localmente com Pillow/OpenJPEG e processados sem enviar o material a serviço externo. O catálogo privado passou a 333 registros, 314 imagens JPG exibíveis; 30 URLs assinadas foram testadas por 300 s e responderam sem erro.
- A auditoria de lint deixou de ter erro no componente de importação do progresso do Anki; a inicialização agora usa estado lazy e a rotina de observação continua local. Os cinco avisos de scripts auxiliares também foram removidos.

### Snapshot de pendências

- O plano mestre permanece com 64 caixas abertas: 13, 19–20, 27–28, 31, 36–39, 41–42, 44–61, 62, 64–73, 74–75, 77–83, 84–87, 90–91, 93–96 e 97–100.
- A maior fila ainda é revisão clínica rastreável, integração curricular privada e QA autenticada; não é falta de imagens JP2, pois os 30 arquivos canônicos já foram decodificados e testados.
- Fora do plano de 100 passos, permanecem leitura do chat Kimi/Opera e instalação opcional de extensão visual do Anki, ambas condicionadas à ponte/versão local.

## Fechamento operacional confirmado — 2026-08-09

- Portões aprovados: auditoria de 1.296 questões, privacidade (218 públicos + 3 curriculares), TypeScript, lint e build de produção com 402 rotas.
- A auditoria semântica nova corrigiu 342 comentários que negavam alternativas marcadas como corretas; nenhum gabarito ou conteúdo clínico foi alterado.
- Supabase confirmou 10 migrations remotas; advisors ainda têm avisos de extensões no schema público, leaked-password protection desativada e índices sem uso.
- Drive via conector encontra as pastas médicas, mas GitHub/local estão sem `DRIVE_FOLDER_IDS` e credencial do workflow; o job de inventário falhou sem processar arquivos.
- Anki snapshot atual: 226 decks, 1.703 cartões e 210 vazios; AnkiConnect v6 responde, mas a coleção não está disponível. Nenhuma escrita foi feita.
- Próxima ordem: configurar allowlist privada do Drive → materializar GO/Obstetrícia → PDF→Markdown/hashes/deduplicação/OCR seletivo → vínculos curriculares → QA autenticada → Anki → Lighthouse/axe → publicação.
- Registro completo: `docs/FECHAMENTO-2026-08-09.md`.

## Redesign e semana atual — decisão de 2026-08-09

- O usuário autorizou começar a fase de design pelo planejamento. Ler
  `docs/PLANO-REDESIGN-E-SEMANA-ATUAL-2026-08-09.md` antes de alterar o shell
  ou qualquer página.
- A mudança não é apenas visual: a arquitetura alvo organiza o produto em Hoje,
  Conhecimento, Treino, Acervo e Meu curso, com contexto privado de semana atual.
- PDFs recebidos diariamente devem passar primeiro por Markdown privado e ser
  ligados à semana, disciplina e subtema. Não copiar material comercial para o
  conteúdo público e não inferir a rotina sem evidência.
- Implementar primeiro linha de base + sistema visual + shell por feature flag,
  preservando rotas, IDs, progresso, autenticação e acervo.

## Redesign visual implementado — 2026-08-09

- O primeiro lote visual foi implementado apenas na branch de agente, sem
  publicação e sem migração de dados. A branch é a fronteira de rollback; não
  há flag remota nova em produção.
- A arquitetura global agora apresenta cinco áreas: Hoje, Conhecimento,
  Treino, Acervo e Meu curso. Biblioteca, casos, mapas, simulados, mídia,
  semestres e agenda continuam disponíveis como navegação contextual.
- A paleta deixou o azul/ciano tecnológico: usa mineral + branco + grafite +
  verde clínico + petróleo no claro e grafite esverdeado no escuro. Contrastes
  dos tokens principais foram calculados acima de 4,5:1.
- A sidebar desktop é recolhível (256/76 px). No celular, a barra de cinco áreas
  participa do layout, tem alvos de 52 px e não cobre o conteúdo rolável.
- A página Hoje foi reorganizada em próxima ação, ponto de partida, progresso,
  atividade e conhecimento pessoal, mantendo todos os dados e destinos
  anteriores.
- QA aprovada: desktop 1440 x 1000, celular 390 x 844, claro/escuro, menu,
  sidebar, navegação principal, sem overflow horizontal, sem erro de console e
  checagens semânticas básicas. TypeScript, lint completo, privacidade, 1.296
  questões e build de 402 páginas passaram.
- Antes de publicar ainda faltam Lighthouse/axe completos, QA autenticada e
  aprovação visual. Próximo bloco funcional: semana atual privada + primeiro
  vínculo diário de PDF convertido para Markdown.

## Acabamento visual adicional — 2026-08-09

- A tela de questões deixou de despejar todas as disciplinas na primeira dobra:
  os modos Novas/Erros/Revisão/Todas ficam visíveis e o filtro de disciplina
  abre um painel compacto, mantendo a escolha atual em destaque.
- O drawer móvel fechado foi marcado como `inert`; seus links não entram mais no
  foco do teclado enquanto a navegação desktop está ativa.
- A leitura clínica recebeu hierarquia tipográfica para títulos intermediários
  e respeito explícito a `prefers-reduced-motion`.
- A prévia móvel foi revisada novamente em 390 x 844, com alternativas visíveis,
  sem rolagem horizontal e sem sobreposição da barra de áreas.

## Publicação do redesign — 2026-08-09

- A branch `agent/auditoria-integracoes-2026-08-09` foi enviada e o PR #2 foi
  mesclado na `main` pelo commit `c260ef8`.
- O workflow `Deploy (GitHub Pages)` `31338545947` concluiu build e deploy com
  sucesso. Rotas `/`, `/questoes/`, `/biblioteca/`, `/mapas-mentais/` e
  `/meu-curso/` foram verificadas no artefato publicado com HTTP 200 e sem
  marcadores de erro de aplicação.
- Auditorias finais: TypeScript, lint, build de 402 rotas, auditoria de 1.296
  questões e privacidade (220 arquivos públicos + 3 curriculares) aprovados.
- O redesign está publicado, mas Lighthouse/axe completos e QA autenticada de
  login, agenda e `Minha mídia` continuam pendentes e não devem ser presumidos
  como concluídos por este deploy.

## Bloco 2 local — semana atual — 2026-08-09

- Foi criado o módulo privado `src/lib/semana-atual.ts` com semana, foco e
  tarefas; ele usa Supabase quando disponível e fallback local-first quando a
  sessão ou a migration ainda não está disponível.
- A migration aditiva `supabase/migrations/20260809140000_cria_semana_atual_privada.sql`
  cria quatro tabelas privadas com RLS, grants autenticados e vínculo composto
  por proprietário. Nenhum conteúdo de Drive, SISCAD ou PDF é copiado.
- `SemanaAtualPanel` foi integrado ao Hoje. O usuário confirma período, objetivo,
  disciplina/tema e próximos passos; sem confirmação, o site não inventa a
  matéria atual. OMED permanece apenas como desempate.
- Validações: typecheck, lint, auditoria de 1.296 questões, privacidade (224
  arquivos públicos + 3 curriculares) e build de 402 rotas passaram. A rota
  local `/` respondeu HTTP 200 e não exibiu erro de aplicação.
- O lote está somente local na branch `docs/publicacao-redesign`; não afirmar
  sincronização remota nem publicação até aplicar e testar a migration.
- Próximo bloco: conectar a entrada diária de PDF ao catálogo privado, sempre
  `PDF → hash → Markdown → classificação → confirmação → semana`.

## Bloco 2 local — materiais privados e semana — 2026-08-09

- `src/lib/semana-materiais.ts` lista, vincula e desvincula materiais privados
  por semana com chave idempotente, RLS e fallback local-first.
- `src/components/semana/MateriaisDaSemanaPanel.tsx` foi ligado ao painel da
  Semana atual; a busca usa somente título, disciplina, tema e subtema.
- A migration `20260809140000_cria_semana_atual_privada.sql` teve os defaults
  de estado corrigidos para valores aceitos pelos checks SQL.
- Typecheck e lint passaram; a migration continua local até aplicação remota.
- Nenhum PDF, DOCX, imagem comercial, hash ou credencial foi publicado.

## Bloco 3 local — acessibilidade e rotas — 2026-08-09

- `scripts/audit-static-routes.mts` foi adicionado como gate leve para oito
  rotas, sem dependência nova e sem conteúdo privado.
- O gate verifica status, marcadores de erro, imagens sem `alt`, botões sem nome,
  IDs duplicados e `h1`; rotas protegidas podem ter SSR vazio antes da hidratação.
- O lote exportado passou em todas as oito rotas. Isso não substitui axe,
  Lighthouse/PageSpeed, teclado, contraste ou QA autenticada.
- O servidor de teste local foi encerrado após a verificação; nenhum cache de
  build foi incluído no Git.

## Bloco 4 local — editorial, privacidade e performance — 2026-08-09

- Auditorias `audit:questoes` e `audit:privacidade` passaram: 1.296 questões
  limpas; 227 arquivos públicos e 3 curriculares verificados.
- Busca rastreada não encontrou senha ou valor de credencial; referências a
  secrets são apenas nomes em workflow, documentação ou código de configuração.
- A migration privada foi revisada para RLS, grants autenticados, owner checks
  e defaults que satisfazem os checks SQL.
- `robots.txt` bloqueia Minha mídia, Meu curso e Agenda; `sitemap.xml` não os
  inclui. O export tem 41 assets e 4,57 MB.
- Build anterior levou cerca de 308 s e reprocessou páginas lentas; otimização
  continua aberta. Não declarar Lighthouse/axe nem QA autenticada concluídos.

## Bloco 5 local — release — 2026-08-09

- Gate local completo: typecheck, lint, auditorias de questões/privacidade,
  `audit:rotas`, diff-check e build de 402 rotas.
- Relatório reproduzível em `docs/RELEASE-AUDIT-2026-08-09.md`.
- A branch está pronta para push e publicação autorizada; registrar commit,
  PR/merge, workflow Pages e URLs verificadas após o retorno remoto.
- Não confundir publicação do código com aplicação da migration privada nem com
  QA autenticada, Lighthouse/axe, Drive ou Anki.

## Confirmacao pos-publicacao — 2026-08-09

- PR #5 foi mesclado na `main` (`bd98d584906792da9e70e02d9334a010eedd551d`).
- Pages run `31341518573` concluiu com sucesso e as rotas principais retornaram
  HTTP 200 sem marcadores de erro.
- Site publicado: https://thiagotrajano-arch.github.io/MEDICINA-TT/
- Nao confundir deploy com migration remota, QA autenticada, Lighthouse/axe,
  Drive, Anki ou restore; todos continuam como portoes separados.

## Ajuste do Anki — 2026-08-09

- AnkiConnect v6 respondeu com a coleção aberta; o inventário atual tem 318
  decks, dos quais 226 entram no snapshot do Codex Medicus, com 1.703 cartões.
- Backup local pré-ajuste: `exports/anki/backup-pre-repair-20260809.apkg`.
- `anki:organizar -- --aplicar` foi executado e o estilo `OMED Bonito` foi
  atualizado; a limpeza posterior removeu apenas decks legados vazios, mediante
  autorização explícita.
- Snapshots antes/depois têm 1.703 cartões e nenhuma mudança de contagem.
- Backup pré-limpeza: `exports/anki/backup-before-deck-cleanup-20260809.apkg`.
- Estado atual: 108 decks totais, 16 decks Codex monitorados, 1.703 cartões e
  zero nomes legados restantes. Snapshot: `exports/anki/progresso-after-cleanup.json`.

## Limpeza autorizada do Anki — 2026-08-09

- O AnkiConnect v6 respondeu com a coleção aberta.
- Os 210 alvos tinham `findCards = 0`; a chamada `deleteDecks` usou
  `cardsToo=true` apenas porque as versões atuais do Anki exigem esse campo.
- Nenhum cartão foi apagado, movido ou duplicado. A operação não toca no site
  público nem expõe o endpoint local.

## Estado transferível — neuropsiquiatria e lote privado — 2026-08-09

- O lote de quatro PDFs desta semana foi processado na ordem obrigatória
  `PDF → Markdown privado → seleção de páginas → revisão visual → catálogo`.
  São 378 páginas e 46 imagens comerciais importadas apenas no bucket privado,
  todas com origem, página e classificação; os binários e manifestos permanecem
  fora do repositório.
- O curso privado foi sincronizado com 37 componentes (30 concluídos e 7
  atuais), sem inserir SISCAD ou dados pessoais na camada pública.
- O site local contém 234 resumos, 56 casos, 1.332 questões e 408 páginas
  estáticas. O novo recorte neuropsiquiátrico acrescentou 8 resumos, 36 questões
  e 4 diagramas autorais. A tela de questões aceita teclado e o contador foi
  corrigido para não avançar antes da troca de item.
- Gates locais aprovados: typecheck, lint, auditoria editorial (zero duplicatas,
  comentários curtos/vazios, fontes ausentes ou contradições), privacidade,
  build e QA móvel 390 × 844 sem overflow/erros de console.
- A publicação está confirmada abaixo. Pendências reais: aplicar/testar a
  migration da semana; QA autenticada de login, catálogo privado e URLs
  assinadas; Lighthouse/axe; e adaptar o restore do backup, atualmente bloqueado
  no PostgreSQL stock pela extensão `supabase_vault`.

Não interpretar a autorização para imagens comerciais como autorização de
redistribuição pública. Elas pertencem à biblioteca pessoal autenticada.

### Publicação confirmada

- PR #7 mesclado na `main` em
  `e502f5a0eba682c2689ed83d8934f07e4a0e438c`.
- Workflow Pages `31348422663` aprovado; raiz, Psiquiatria, novo resumo,
  Questões, robots e sitemap retornaram HTTP 200.
- O lote público está concluído. Permanecem externos: migration/QA autenticada,
  Lighthouse/axe e reparo do teste de restore com `supabase_vault`.

## Estado privado — plano de estudos de 12 semanas — 2026-08-10

- A migration `cria_semana_atual_privada` e a migration de índices relacionais
  foram aplicadas no Supabase remoto. As quatro tabelas usam RLS por
  proprietário; não há dados da agenda na camada pública.
- A conta privada possui um plano aditivo de 12 semanas (10/08–01/11/2026): 84
  eventos de agenda, 114 tarefas, 28 focos confirmados e zero duplicações.
- O plano cobre os 7 componentes atuais, distribui as 30 disciplinas concluídas
  para revisão longitudinal e reserva 3 blocos OMED por semana (36 no total).
- Os quatro PDFs neuropsiquiátricos foram catalogados e vinculados às semanas
  1–4 somente por metadados privados. O manifesto real, hashes, Markdown e
  binários ficam em `Desktop\\MEDICINA\\_private-corpus\\semana-20260809` e não
  devem ser copiados para Git, logs ou conteúdo público.
- O importador reproduzível é `npm run curso:plano-private -- --manifest
  <manifesto-privado> [--apply]`. Ele preserva eventos manuais e evita duplicar
  agenda/tarefas.
- QA autenticada no navegador ainda é necessária. HCPM VI permanece como lacuna
  explícita até o plano do SISCAD ficar disponível; não inferir seu conteúdo.
- Publicação do suporte concluída pelo PR #10, merge `f68d4b3`, Pages run
  `31354606003`; raiz, `/agenda/` e `/meu-curso/` responderam HTTP 200. Isso não
  substitui QA visual com a sessão real.
- O reteste idempotente expôs diferença `+00:00`/`Z` na comparação dos horários
  da Agenda. O importador agora normaliza ambos com `toISOString()`; 84 cópias
  geradas pelo teste foram removidas por marcador/ID, nenhum evento manual foi
  alterado e o estado final voltou a 84 eventos únicos.

## Fila guiada e revisão longitudinal — 2026-08-10

- A Semana atual passou a exibir progresso, próxima pendência e links diretos
  para o resumo público relacionado a cada tarefa; a lista se reordena depois
  da conclusão, sem exigir refresh manual.
- A Agenda privada ganhou uma fila de pendências guiadas. Eventos gerados pelo
  plano e tarefas semanais são sincronizados por proprietário, data e título;
  eventos manuais ficam fora dessa sincronização.
- O importador privado agora separa observações curriculares por ponto e vírgula
  em revisões menores. O estado remoto verificado após a aplicação ficou em 138
  tarefas, incluindo 54 revisões granulares; o corpus e o SISCAD continuam
  somente no Supabase/cofre privado.
- A matriz SISCAD confirmada continua em 37 componentes (30 concluídos e 7
  atuais). Ela está catalogada por blocos temáticos de disciplina; o vínculo
  subtema a subtema ainda precisa de QA visual/manual e HCPM VI permanece sem
  plano confirmado.
- O código desta rodada ainda está local na branch `docs/publicacao-redesign`;
  rodar os gates, conferir a sessão autenticada e só então publicar.

### Publicação confirmada — fila guiada

- PR #13 foi mesclado na `main` pelo commit `3a0783d`.
- GitHub Pages run `31446358148` concluiu build e deploy; `/`, `/agenda/` e
  `/meu-curso/` responderam HTTP 200 sem erro de aplicação.
- A confirmação que falta é visual/autenticada: entrar na conta, concluir uma
  tarefa na Semana, concluir o espelho na Agenda e abrir os resumos sugeridos.

## Estado transferível — currículo granular e Anki — 2026-08-10

- A visão acadêmica resumida continua com 37 componentes (30 concluídos e 7
  atuais). Em paralelo, o recorte profundo pedido pelo usuário contém exatamente
  26 componentes: BBPM I/II/III/IV/VII/VIII, HCPM I–VIII, APS I–VI, Cirurgia
  I–III e Urgência/Emergência I–III.
- A migration `20260810183000_cria_mapa_curricular_granular.sql` foi aplicada.
  Estado remoto confirmado: 26 componentes, 55 módulos, 374 subtemas e 122
  recursos autenticados. O manifesto privado e dados pessoais não entram no Git.
- A cobertura pública validada desse mapa é de 64 resumos e 58 filas de questões;
  276 subtemas continuam como lacunas honestas. HCPM VI segue sem plano aprovado
  e não pode ser inferido.
- `MapaCurricularPrivado` consulta os recursos gravados e só oferece resumo ou
  questões quando existem e não foram rejeitados. O `QuizClient` mantém um
  subtema sem questões como vazio real, sem expandir para a disciplina.
- O esquema de `Questao` aceita `bancos`, `prova`, `instituicao` e `ano`, mas a
  migração editorial do corpus ainda está pendente. O banco de imagens exige
  `figura` real.
- O catálogo privado foi testado no runtime: 379 metadados e 379 objetos, zero
  ausentes, URL assinada e leitura parcial aprovadas. O snapshot anterior de
  321 imagens pendentes foi encerrado em 2026-08-14; o estado atual é 327 úteis,
  21 contextuais, 31 não úteis e 0 pendentes.
- O Anki local possui 2.830 cartões preservados. São 2.829 em 16 decks canônicos
  por disciplina e um piloto separado. Foram movidos 1.126 cartões legados e
  removidos apenas 89 decks comprovadamente vazios. Backups `.apkg` precedem as
  mudanças.
- FSRS foi conferido com retenção 0,90, aprendizagem 1m/10m, reaprendizagem 10m,
  25 novos/dia e revisões sem limite artificial. Onigiri foi configurado para o
  perfil local; conferir aparência após reinício normal do Anki.
- A auditoria Anki marcou, sem excluir: 14 grupos duplicados exatos, 4 frentes
  ambíguas, 885 versos extensos e 90 notas sem referência. A refatoração deve ser
  clínica, em lotes por área, preservando IDs e histórico.
- O próximo lote diário de PDFs deve sempre converter para Markdown privado,
  registrar hash/metadados e criar D+1, D+7 e D+21 sem despejar todo o backlog no
  calendário.
- Restore do Supabase continua aberto: houve dump/artefato real, porém o restore
  em PostgreSQL stock falhou por ausência de `supabase_vault`.
- O fechamento completo está em `docs/FECHAMENTO-2026-08-10.md`.

## Plano integrado aguardando aprovação — semestre, OMED, anteriores e Anki

- A agenda atual é utilizável, mas já tem carga relevante: 12 semanas, 84
  eventos, 138 tarefas, 36 blocos OMED, 90 revisões, 12 blocos de questões e 4
  blocos de PDF. Não agendar os 374 subtemas de uma vez.
- Proposta semanal não aplicada: segunda semestre atual (75 min), terça PDF do
  foco atual (75), quarta OMED (90), quinta semestres anteriores (75), sexta
  Anki/erros (45), sábado OMED integrado com casos e imagens (90), domingo
  fechamento (45). Revisões Anki de 15–20 minutos ficam dentro dos blocos, não
  como uma agenda paralela.
- Proposta de fases: semanas 1–4 semestre atual + Infectologia/GO/Pediatria/
  Cirurgia-MFC; semanas 5–8 consolidação + Cardio/Neuro/Pneumo/Nefro/Gastro;
  semanas 9–12 integração + Endócrino/Hemato-Onco/Derma/Reumato/Psiquiatria.
- PDF diário: Markdown privado primeiro, vínculo ao foco da semana, depois D0,
  D1, D7 e D21. Se houver sobrecarga, adiar a revisão antiga de menor prioridade.
- Antes de aplicar, falta o usuário confirmar horários fixos, plantões,
  disciplinas do semestre atual e primeiro foco OMED. Não criar cartões nem
  modificar a agenda enquanto a distribuição estiver apenas proposta.

## Atualização de planejamento — 2026-08-11

O pedido atual prioriza melhorar a leitura visual de conclusão, modo claro,
resumos e módulos didáticos de Ciências Básicas. O plano completo foi registrado
em `PROXIMOS-PASSOS.md` sob "Plano de melhoria visual, arquitetura e qualidade
— 2026-08-11". Executar nesta ordem: gates e QA; design system e progresso;
piloto de resumos/módulos/mapas; navegação/mídia; conteúdo, Anki, currículo e
Supabase. Não refazer toda a interface de uma vez nem alterar dados privados.

A QA visual autenticada ainda deve ser repetida: o controlador de navegador da
sessão não inicializou, o que é limitação de ferramenta e não evidência de erro
no site. Há uma falha de lint confirmada fora do app em
`exports/private/inspect-supabase-state.mts` (`prefer-const`); typecheck passou
na última verificação e os demais gates dependem dessa correção.
## Auditoria integral em 20 lentes — atualização 2026-08-11

- Fonte consolidada: `docs/AUDITORIA-20-LENTES-2026-08-11.md`.
- O lote permanece local e não deve ser publicado até o typecheck, build, rotas e fluxos privados passarem.
- Evidência atual: lint e diff-check passam; 1.332 questões passam na auditoria estrutural; privacidade passa para 241 arquivos públicos e 3 curriculares.
- Bloqueador atual: `scripts/import-private-curriculum-map.mts` aceita `publicSubthemeId` como possivelmente indefinido ao montar `recurso_id`.
- Auditoria de rotas foi inconclusiva por indisponibilidade de acesso ao host nesta sessão; não registrar como queda confirmada.
- Pendências históricas foram consolidadas em P0–P3; não somar caixas de `PROXIMOS-PASSOS.md` e `PLANO-100-PASSOS.md` como tarefas independentes.
- Mídia exige reconciliação dos universos de 216 canônicas, lote adicional de 282 imagens e 379 registros operacionais antes de declarar conclusão.
## Retomada principal — 2026-08-13

- Reassumido o trabalho de pendências; a migração para ChatGPT Sites ficou fora do escopo.
- Fontes universitárias de imagem clínica catalogadas em `docs/FONTES-IMAGEM-CLINICA-UNIVERSITARIAS-2026-08-13.md`.
- Regra de mídia confirmada: toda imagem do Drive deve carregar documento e página de origem, hash privado, tema, subtema, modalidade, diagnóstico, licença, crédito e destino permitido.
- Prioridade de fontes: Estratégia MED/acervo autorizado para triagem privada; diretrizes atuais; PubMed/PMC validado; atlas universitários licenciados; equivalentes abertos.
- Typecheck, lint, auditoria de questões e privacidade passaram.
- O comando de build ultrapassou o timeout do terminal, mas `.next/export-detail.json` registra `success: true` e `out` foi gerado. Tratar como exportação aparentemente concluída com encerramento anômalo, pendente de validação de artefatos e rotas.

## Validação técnica após liberação de espaço — 2026-08-13

- Disco C: confirmado com 106,8 GB livres.
- `typecheck`, `lint`, `audit:questoes` e `audit:privacidade` passaram; a auditoria confirmou 1.332 questões e 244 arquivos públicos/3 curriculares dentro do limite de privacidade.
- A validação mais recente de `npm.cmd run build` concluiu com sucesso em 341,1
  s: 413 páginas estáticas e exportação confirmada. As rotas lentas observadas
  anteriormente continuam como pendência de desempenho, mas a geração atual
  não falhou nem exigiu repetição.
- A auditoria remota de rotas retornou `fetch failed` para todas as URLs nesta sessão; resultado inconclusivo, sem evidência de indisponibilidade do site.
- O importador curricular em modo seco não gravou dados, mas excedeu o tempo do ambiente. Não executar `--apply` sem medir/otimizar a validação.
- AnkiConnect voltou a responder em 2026-08-13. A auditoria editorial leu 1.721
  notas sem modificar cartões: 14 grupos de duplicata exata, 4 frentes ambíguas,
  885 versos extensos e nenhuma nota sem referência. O snapshot local de
  progresso foi exportado; a revisão editorial continua pendente.
- A organização estrutural do Anki foi aplicada com backup `.apkg` incluindo
  agendamentos: 2.829 cartões migraram para `MEDICINA → Ciclo Básico/Clínico →
  área → disciplina`; nenhum cartão foi excluído. Subtemas e eixos clínicos são
  tags, evitando milhares de subdecks. A próxima rodada deve revisar 14 grupos
  de duplicata exata, 4 frentes ambíguas e 885 versos extensos em lotes seguros.
  Ver `docs/ARQUITETURA-ANKI-MEDICINA-2026-08-13.md`.
- Auditoria adicional cruzando todas as questões contra a taxonomia achou 18 questões em 15 IDs de subtema inexistentes. Não houve remapeamento automático: quatro são candidatos claros (TEP, ICFER/ICFEP, FA e DPOC), enquanto os demais podem representar lacunas taxonômicas/editoriais e exigem matriz de cobertura.
- A integridade questão–taxonomia foi concluída: os 18 vínculos inicialmente
  órfãos foram reclassificados ou receberam cinco subtemas explícitos. A
  verificação aponta 1.332 questões, 304 subtemas e zero vínculos órfãos;
  typecheck, lint e auditoria de questões passaram. Os cinco novos subtemas com
  questão continuam honestamente marcados como resumo pendente. Evidências:
  `docs/AUDITORIA-QUESTOES-TAXONOMIA-2026-08-13.md` e
  `docs/MATRIZ-COBERTURA-CLINICA-2026-08-13.md`.

## Continuação da triagem de mídia privada — 2026-08-13

- A cópia canônica dos PDFs neuropsiquiátricos foi confirmada em `Desktop\\MEDICINA\\_private-corpus`; a exclusão da cópia em Downloads não perdeu a fonte de trabalho.
- Demências p. 107--111 foram renderizadas localmente, com hashes SHA-256. A pré-triagem visual marcou p. 107 (RM temporal medial/hipocampal) e p. 110 (RM em HPN) como candidatas privadas de alto valor didático.
- Nenhuma figura foi enviada ao bucket, ao Git ou ao site. O manifesto privado contém hashes, fonte/página declarada e decisões provisórias; direitos, anonimização e correlação clínica permanecem pendentes.
- Neuroanatomia p. 55--57 também foi renderizada/revisada. As RMs de anatomia temporal medial são candidatas apenas privadas; as ilustrações que citam fonte interna/Shutterstock não podem ser reaproveitadas publicamente. Uma referência CC BY no material exige obtenção direta da fonte antes de qualquer uso público.
## Lote privado neuropsiquiatria — 2026-08-13

- Os sete PDFs recebidos (humor, psicofarmacologia, hipnosedativos, psiquiatria, demências e neuroanatomia) foram convertidos integralmente para Markdown privado fora do repositório.
- Todos apresentaram texto utilizável. Alguns avisos de fonte no extrator não impediram a conversão.
- O manifesto privado contém fontes, classificação e páginas candidatas de TC/RM/EEG; nenhum PDF, texto bruto ou imagem comercial foi publicado.
- O site já possui resumos/questões para os subtemas de Psiquiatria; este lote deve preencher somente lacunas comprovadas após revisão de diretriz e direitos.
- A primeira prévia visual privada foi gerada para Psiquiatria Clínica p. 91--93. As páginas 91--92 foram conferidas: são material de apoio a TC/RM/EEG no diferencial de quadro psiquiátrico com possível causa orgânica. O registro detalhado permanece apenas no manifesto privado; não houve publicação de recortes.
- A validação seca do importador curricular não alterou banco, mas excedeu o timeout do terminal nesta máquina. Reexecutar em sessão local estável antes de tratá-la como aprovada; não usar `--apply` sem esse portão e QA autenticada.
## Atualização de retomada — acervo visual 2026-08-14

- A validação visual do lote privado foi encerrada: 379/379 objetos foram
  baixados para revisão local, vistos em 19 folhas de contato e classificados.
- Estado remoto atual: 327 `util`, 21 `contextual`, 31 `nao_util`, 0
  `revisao_pendente`. O campo de diagnóstico não foi inventado/preenchido por
  aparência; exige legenda e revisão editorial.
- 30 JPEG 2000 foram convertidos para JPEG privado, preservando os originais e
  hashes no manifesto. Nenhum objeto comercial/sensível foi para `public/`.
- Evidências privadas: `Desktop/MEDICINA/_media-review/20260814-visual-validation/`
  (catálogo, decisões e backup). Scripts: `triage-private-media.mts`,
  `download-private-media-review.mts` e `apply-private-media-visual-review.mts`.
- Portão técnico deste lote: typecheck, lint completo, `audit:privacidade`,
  `audit:questoes`, `git diff --check` e `next build` passaram. Ainda falta QA
  autenticado real no navegador e a etapa editorial de ligar cada imagem útil a
  resumo, questão, caso e mapa.
## Estado vigente — neuropsiquiatria e mídia — 2026-08-14

- O catálogo remoto tem 399 objetos privados: 347 `util`, 21 `contextual` e
  31 `nao_util`; os números anteriores são históricos.
- Todos os 347 itens `util` e 21 `contextual` agora possuem `subtema_id`
  válido; dois itens `nao_util` sem correspondência foram mantidos
  explicitamente fora da trilha de estudo. O backup da reconciliação está no
  corpus privado.
- O lote neuropsiquiátrico fechou 20 páginas novas e 60 itens totais, com
  hashes privados, fonte/página, modalidade e `subtema_id` válido. Os 60 são
  `pdf_comercial` no bucket autenticado; nenhum recorte ou texto comercial foi
  publicado.
- `Minha mídia` ganhou filtros de tema, patologia/achado e fonte, mantendo
  disciplina, subtema, modalidade, origem, triagem, fullscreen, alt text,
  legenda e carregamento progressivo.
- A migração `20260814140000_contexto_midia_privada.sql` adicionou os campos
  opcionais `periodo` e `caso`; a consulta autenticada confirmou que a API
  os expõe. Os registros antigos permanecem nulos para evitar inferência.
- `scripts/audit-public-figure-anchors.mts` confirmou 77/77 figuras públicas
  com âncora navegável para estudo. Resta somente QA interativa autenticada de
  login/logout, URL expirada, exclusão e isolamento entre contas.
- Reteste: os 49 `subtemaId` usados pela mídia agora resolvem para rotas em
  `out/estudar` (0 ausentes); typecheck, lint, auditorias e diff check passaram.
  O reteste final do `next build` também encerrou normalmente, compilando
  413/413 páginas estáticas.
- O gate `npm.cmd run audit:rotas:local` passou nas oito rotas principais
  (HTTP 200, sem erros de aplicação, alt ausente, botões sem nome ou IDs
  duplicados). Isso não substitui a auditoria do host nem QA autenticada.

## Estado de cobertura — 2026-08-14

- `npm.cmd run audit:cobertura` agora recalcula a matriz por `subtemaId` sem
  depender de texto aproximado: 304 subtemas, 234 resumos, 1.332 questões e
  55 casos vinculados (de 56 declarados).
- Permanecem 70 subtemas sem resumo, 149 sem questão e 266 sem caso. As
  lacunas OMED prioritárias foram separadas em
  `docs/MATRIZ-COBERTURA-CLINICA-2026-08-14.md`; não criar lote genérico antes
  de usar essa fila com fonte vigente.
- Um caso pediátrico (`caso-ped-disc-06`) não foi remapeado automaticamente,
  pois não possui `subtemaId` e a única correspondência evidente está em outra
  disciplina. Requer validação manual.
- O lote validado foi commitado como `425fd66`/`a49c975`, merged no commit
  `b1ca7e7` de `main` pelo PR #26 e publicado pelo Pages no run
  `31808280211`. A home e `Minha mídia` foram abertas no endereço público sem
  erro de aplicação. Ainda faltam QA autenticada completa, Lighthouse/axe e
  testes entre contas.

## Arquitetura visual por subtema — 2026-08-14

- A biblioteca pública deixou de renderizar uma grade de imagens no índice. Ela
  agrupa disciplina, tema e subtema e só revela as figuras dentro da rota de
  estudo correspondente.
- `Minha mídia` mantém os filtros e URLs assinadas, mas exige seleção explícita
  do subtema antes de renderizar imagens. Cada item mostra contexto de
  interpretação, procedência e ligação ao resumo quando disponível.
- A navegação principal foi consolidada em Hoje, Aprender, Praticar, Revisar e
  Meu Curso; Mídia pública e privada ficam sob Aprender.
- A expansão futura está especificada em
  `docs/PLANO-EXPANSAO-ACERVO-VISUAL-2026-08-14.md`: usar lotes pequenos guiados
  por lacuna e fonte institucional, com licença e privacidade verificadas por
  item. Não preencher volume artificial nem republicar imagem comercial.
- Um protótipo privado no Lovable recebeu a mesma arquitetura usando apenas
  dados fictícios; ele é referência de interface, não fonte de dados nem novo
  ambiente oficial.

## Auditoria de experiência e pausa do Anki — 2026-08-14

- Por decisão explícita do usuário, o Anki foi retirado do escopo atual. Não
  alterar decks, cartões, intervalos ou extensões até nova autorização.
- O Lighthouse de produção mediu home em 87/84/100/100 e `/midia` em
  79/90/100/100 (performance/acessibilidade/boas práticas/SEO). Os achados
  reproduzíveis eram contraste do tema claro, nome acessível do login, nome da
  busca e rótulo do importador local.
- O tema claro recebeu texto auxiliar mais escuro; botões/campo receberam nomes
  acessíveis; a paleta de busca global agora é um chunk carregado somente quando
  aberta. Typecheck, lint, auditorias de questões/figuras/privacidade, build das
  413 páginas e auditoria local de rotas passaram. O build precisou repetir a
  geração de `/questoes` uma vez por ultrapassar 60 s, portanto o peso dessa rota
  continua como oportunidade real de performance, não erro funcional.
- Após o primeiro deploy, Lighthouse confirmou acessibilidade 100, boas práticas
  100 e SEO 100 na home e em `/midia`; axe-core 4.12.1 encontrou zero violações
  automáticas nas duas rotas. Performance oscilou entre 70–87 na home e 59–79 em
  Mídia, portanto não foi marcada como resolvida.
- O índice de Mídia passou a receber somente metadados serializáveis; o código
  React dos diagramas permanece nas páginas de estudo e deixou o bundle do
  índice. O build de verificação gerou 413/413 páginas em 83 s, sem a repetição
  de `/questoes` observada no build anterior.
