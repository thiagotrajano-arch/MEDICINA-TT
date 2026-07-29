# Handoff para outra IA — Codex Medicus

Atualizado em 2026-07-29.

**Antes de mais nada, leia `docs/PLANO-MESTRE-EXTRACAO-E-CURSO.md` e `docs/PLANO-INTEGRACAO-MEDICINA-DESKTOP.md`** — documentos vivos com o
inventário completo de `Desktop\MEDICINA\`, Downloads e Google Drive, o que já foi mapeado/construído,
o que está pendente, e o passo a passo consolidado (sua seção 11 é o resumo mais rápido de onde tudo
está). Sem ler isso primeiro, é fácil redescobrir fontes já catalogadas ou re-perguntar autorizações
já concedidas (uso de RESUMOS licenciado, uso de pastas de terceiros no Drive — ambas já autorizadas
pelo usuário, não perguntar de novo).

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

- Corrigir `Site URL` e redirect allowlist no Auth do Supabase para o domínio público. Isso requer painel administrativo ou PAT do Management API; não tentar com service role.
- `SUPABASE_DB_URL` e `SUPABASE_SERVICE_ROLE_KEY` já estão cadastrados como GitHub Actions Secrets com autorização explícita do usuário. O backup semanal foi validado no run `29885112038`; usa Supavisor session mode/IPv4 e `postgres:17-alpine`, pois o endpoint direto é IPv6 e o servidor está no PostgreSQL 17.
- Para Drive, obter autorização Google própria e `DRIVE_FOLDER_IDS`; nunca inventar, solicitar senha de e-mail ou reutilizar credencial alheia.
- Não há nova extração segura até o usuário fornecer os PDFs faltantes descritos em `PROXIMOS-PASSOS.md`.

## Fechamento de 2026-07-28

- SISCAD reconciliado em área privada: 37 componentes, 36 planos analisados e um plano indisponível; não há página pendente. Nenhum dado individual foi copiado para o repositório.
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
