# Handoff para outra IA — Codex Medicus

Atualizado em 2026-08-01.

**Antes de mais nada, leia `docs/PLANO-MESTRE-EXTRACAO-E-CURSO.md` e `docs/PLANO-INTEGRACAO-MEDICINA-DESKTOP.md`** — documentos vivos com o
inventário completo de `Desktop\MEDICINA\`, Downloads e Google Drive, o que já foi mapeado/construído,
o que está pendente, e o passo a passo consolidado (sua seção 11 é o resumo mais rápido de onde tudo
está). Sem ler isso primeiro, é fácil redescobrir fontes já catalogadas ou re-perguntar autorizações
já concedidas (uso de RESUMOS licenciado, uso de pastas de terceiros no Drive — ambas já autorizadas
pelo usuário, não perguntar de novo).

O fechamento verificável mais recente do catálogo privado, da triagem do Drive,
dos quatro DOCX locais e dos limites ainda reais está em
`docs/FECHAMENTO-ACERVO-PRIVADO-2026-08-01.md`. Leia-o antes de repetir OAuth,
triagem, hashing ou deduplicação.

## Acessos públicos

- Site: https://thiagotrajano-arch.github.io/MEDICINA-TT/
- Repositório: https://github.com/thiagotrajano-arch/MEDICINA-TT
- Branch de publicação: `main`
- Deploy: GitHub Actions → GitHub Pages.

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
- Pendências reais: publicar este lote e confirmar o workflow; aplicar/testar a
  migration da semana; QA autenticada de login, catálogo privado e URLs
  assinadas; Lighthouse/axe; e adaptar o restore do backup, atualmente bloqueado
  no PostgreSQL stock pela extensão `supabase_vault`.

Não interpretar a autorização para imagens comerciais como autorização de
redistribuição pública. Elas pertencem à biblioteca pessoal autenticada.
