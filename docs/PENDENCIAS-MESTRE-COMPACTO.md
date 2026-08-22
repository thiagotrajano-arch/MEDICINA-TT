# Codex Medicus — pendências mestre compactas

> Backlog operacional único, atualizado em 2026-08-22. Os planos de 100 passos,
> handoffs e relatórios antigos continuam como histórico e evidência; não devem
> ser usados para recriar tarefas já encerradas.

## P0 — rotina de estudo e fila canônica

- [ ] Fazer da página Hoje a fila única de próxima ação.
- [ ] Reconciliar Agenda, Semana e Meu Curso pelo mesmo identificador de tarefa.
- [ ] Mostrar em cada pendência objetivo, duração, prioridade, resumo, questões,
      caso, mapa, mídia, erros e próxima revisão.
- [ ] Aplicar carga adaptativa: compromisso atual → revisão vencida → erro → OMED
      de alto rendimento → conteúdo antigo relacionado.
- [ ] Impedir que atraso duplique automaticamente tarefas.
- [ ] Validar uma semana real de uso antes de criar conteúdo novo em massa.

## P1 — segurança e QA autenticada

- [ ] Testar login, logout, recuperação, sessão expirada e reabertura.
- [ ] Testar duas sessões: questão, resumo, caso, agenda e conclusão.
- [ ] Testar upload privado, URL assinada, vencimento, exclusão, logout e outra conta.
- [ ] Reexecutar auditoria de RLS e confirmar ausência de chaves privilegiadas no navegador.
- [ ] Aplicar/testar migrations privadas e registrar evidência de sincronização.
- [ ] Corrigir ou documentar os avisos do Supabase, incluindo proteção contra
      senhas vazadas quando a configuração do plano permitir.

## P2 — currículo e SISCAD

- [ ] Completar os 11 componentes ainda incompletos.
- [ ] Reconsultar HCPM VI; manter lacuna se o plano não estiver disponível.
- [ ] Validar manualmente vínculos componente → período → disciplina → tema → subtema.
- [ ] Validar os 10 subtemas neurológicos sem semestre comprovado.
- [ ] Completar o painel privado por disciplina: cursado, domínio, lacunas,
      materiais, revisões e próximo estudo.
- [ ] Validar importador em dry-run antes de qualquer aplicação remota.

## P3 — conteúdo clínico por lacuna

Ordem editorial: Infectologia → GO/Pediatria → Cirurgia/MFC → Cardio/Neuro/Pneumo
→ Nefro/Gastro → Endócrino/Hemato/Onco → Reumato/Derma/ORL/Psiquiatria.

- [ ] Usar a matriz de cobertura para escolher apenas lacunas prioritárias.
- [ ] Validar resumo-base em fonte primária vigente.
- [ ] Criar questões/casos somente quando a lacuna justificar.
- [ ] Auditar gabarito, comentário, fonte, duplicidade e vínculo.
- [ ] Melhorar questões curtas remanescentes da neuropsiquiatria.
- [ ] Integrar antibióticos, resumos e mapas autorais com referências atuais.

## P4 — Drive, PDFs e síntese privada

- [ ] Confirmar allowlist de pastas e inventariar somente metadados novos.
- [ ] Comparar SHA-256 com manifesto e caches existentes.
- [ ] Converter candidatos únicos para Markdown privado.
- [ ] Aplicar OCR apenas onde não houver camada textual.
- [ ] Renderizar páginas candidatas a figuras, tabelas e mapas.
- [ ] Registrar cada fonte como integrada, privada, duplicada, rejeitada ou aguardando revisão.
- [ ] Atualizar o manifesto privado, Obsidian e o log de continuidade uma vez por lote.

## P5 — mídia e mapas

- [ ] Revisar os itens privados úteis quanto a modalidade, contexto, origem,
      licença, anonimização e subtema.
- [ ] Vincular mídia útil a resumo, caso e questão.
- [ ] Buscar imagens abertas somente para lacunas reais.
- [ ] Exibir Minha mídia por disciplina → tema → subtema; revelar figuras ao abrir o subtema.
- [ ] Garantir tela cheia, alt text, legenda, carregamento progressivo e retorno ao estudo.
- [ ] Transformar mapas-índice em grafos com relações nomeadas e links para recursos.

## P6 — acessibilidade, performance e design

- [ ] Auditar claro/escuro, celular, teclado, zoom 200%, foco e leitor de tela.
- [ ] Melhorar estados concluído, vazio, carregando e erro recuperável.
- [ ] Reduzir poluição visual e manter filtros persistentes.
- [ ] Medir bundle antes de dependências novas.
- [ ] Rodar Lighthouse e axe nas rotas públicas e autenticadas.
- [ ] Verificar sitemap/robots no artefato publicado.

### Snapshot verificável de conteúdo — 2026-08-22

- A auditoria local encontrou **1.374 questões** no catálogo atual, não 1.072.
- A estrutura está sem duplicidades exatas/normalizadas, sem comentários vazios,
  sem fonte ausente e sem gabarito correto contraditório automático.
- Permanecem 20 comentários curtos em 13 questões, concentrados em Neurologia e
  Psiquiatria; isso é pendência editorial, não motivo para alterar o banco em massa.
- A matriz atual registra 311 subtemas: 68 sem resumo, 146 sem questão e 264 sem
  caso. Esses números são do snapshot local de hoje e devem orientar a próxima
  curadoria, sem inventar conteúdo para preencher contagem.
- As 77 figuras públicas auditadas estão ancoradas; a cobertura por subtema ainda
  precisa de curadoria clínica e não equivale a 77 subtemas completos.
- A reconciliação local/remota encontrou **291 candidatas locais** ausentes no
  banco remoto; as 291 têm subtema válido, fonte, tags e gabarito estruturalmente
  válido, sem duplicata por conteúdo. Elas continuam fora do banco até passarem
  pelo portão editorial/proveniência; nenhuma foi publicada automaticamente.
- A fila privada `fila-conteudo-privada-2026-08-22.json` foi gerada com as 291
  candidatas e uma ordenação explícita das lacunas por OMED, alto rendimento,
  ausência de resumo, questão e caso. A rotina é somente de preparação: não
  altera o banco remoto e não cria conteúdo clínico.
- A triagem privada do manifesto canônico `drive-lote-20260801` atualizou 215
  imagens no catálogo privado, sem erro, sem faltantes e sem publicação. As
  imagens não foram consideradas clinicamente validadas: permanecem como
  `contextual` ou `revisao_pendente` conforme a regra conservadora da rotina.
  Restam 2 registros privados sem `subtema_id` que não puderam ser vinculados
  com segurança e exigem revisão humana.
- O lote editorial de Infectologia para acidentes por animais peçonhentos foi
  fechado com 4 questões e 1 caso, todos vinculados ao subtema e auditados com
  fontes do Ministério da Saúde/PCDT. O lote continua aguardando release audit
  antes de qualquer sincronização remota.
- O lote editorial de GO para infecções congênitas (STORCH) foi fechado com 4
  questões e 1 caso, todos vinculados ao subtema exato. As fontes usadas foram
  páginas/notas do Ministério da Saúde sobre sífilis gestacional/congênita,
  toxoplasmose e síndrome da rubéola congênita. O lote ainda aguarda release
  audit e revisão editorial final antes de qualquer sincronização remota.
- O primeiro recorte editorial de MFC/Rastreamentos populacionais foi fechado
  com 1 resumo, 4 questões e 1 caso. O recorte usa Ministério da Saúde e INCA,
  cobre princípios, DNA-HPV, mamografia e danos do excesso de rastreamento, e
  deixou o colorretal para uma diretriz nacional consolidada.
- O lote de Endocrinologia para disfunções tireoidianas foi fechado localmente
  com 1 resumo, 3 questões e 1 caso, usando fontes oficiais do Ministério da
  Saúde/CONITEC; permanece fora do Supabase até o release audit.
- O Drive autenticado foi consultado por metadados. Em até cinco páginas foram
  inventariados 302 documentos com “medicina”, 179 com “livro” e 426 imagens;
  as buscas iniciais de “atlas” e “manual” retornaram 36 e 41 itens. Há mais
  páginas em medicina e imagens. Nenhum item foi compartilhado, movido,
  apagado ou publicado.
- A conversão privada foi concluída para 1.449 PDFs/DOCX autorizados: 981
  texto, 343 parciais, 50 imagem-only, 71 erros estruturais e 4 acima do limite
  seguro, totalizando 86.072 páginas. O manifesto e o cache ficam em
  `C:/Users/Adm/Desktop/MEDICINA`, fora do Git. Livros/atlas comerciais são
  somente orientação privada; não são fonte pública.
- Foram convertidos para Markdown privado 15 PDFs adicionais (12 texto, 1
  parcial, 2 inválidos) e atualizado o lote privado de 139 PDFs (70 texto, 56
  parciais, 1 imagem, 12 inválidos). Nenhum PDF, Markdown ou texto comercial
  entrou no Git público.

## P7 — Anki, somente manutenção controlada

- [ ] Fazer backup antes de qualquer mutação.
- [ ] Resolver duplicatas e cards longos apenas com revisão editorial.
- [ ] Validar fonte de cards legados sem referência.
- [ ] Criar cards por erros e fatos atômicos, não por volume.
- [ ] Testar restauração em perfil temporário.

## Critério de encerramento de cada lote

Um lote só termina quando possui escopo fechado, evidência da fonte, QA
proporcional, atualização deste backlog e do estado compacto, `git diff --check`,
commit identificável e, se houver publicação autorizada, verificação em produção.

## Próximo lote recomendado

1. Auditar a fila Hoje/Agenda com a sessão real.
2. Remover duplicações e excesso de carga.
3. Confirmar uma semana de estudo real.
4. Só depois selecionar a primeira lacuna clínica do semestre/OMED.

## Atualização operacional — lote GO/STORCH — 2026-08-22

- Catálogo local: 1.374 questões; remoto: 1.072; candidatas locais fora do
  remoto: 291.
- Cobertura: 311 subtemas, 243 resumos, 146 sem questão e 264 sem caso; 65
  casos totais vinculados a subtema.
- O subtema OMED de infecções congênitas passou de 0 para 4 questões e 1 caso.
- `typecheck`, `audit:questoes`, `audit:cobertura`, `audit:privacidade` e
  `audit:sync-conflict` passaram.
- O conteúdo novo permanece local e não foi inserido no Supabase nem publicado.

### Atualização após três lotes clínicos — 2026-08-22

- Catálogo local: **1.383 questões**, 245 resumos e 68 casos totais, dos quais
  67 estão vinculados a subtema.
- Lacunas atuais: **66 sem resumo, 146 sem questão e 262 sem caso**. A fila
  ainda contém 291 candidatas locais ausentes do banco remoto; elas continuam
  fora do Supabase até revisão editorial e proveniência.
- Foram fechados localmente hemorragia digestiva, doenças inflamatórias
  intestinais e meningites/encefalites, cada um com resumo, 3 questões e caso.
- QA pós-lotes: typecheck, lint, auditorias de questões, cobertura, privacidade,
  superfície anônima, conflitos e estado de estudo passaram. Build passou com
  435 páginas estáticas; rotas locais passaram com HTTP 200 e sem falhas
  estruturais de acessibilidade.
- Conversão privada: 1.449 arquivos autorizados catalogados; 71 continuam com
  erro estrutural, 50 são imagem-only e 4 excedem 250 MB. Permanecem privados
  e aguardam recuperação seletiva, sem OCR/regravação em massa.

### Atualização final desta rodada — 2026-08-22

- Fechado também `go--rotura-prematura-de-membranas--diagnostico-e-conduta`
  com 1 resumo, 3 questões e 1 caso em etapas.
- Estado do agregador: **1.392 questões, 246 resumos e 72 casos**; a matriz
  contabiliza 71 casos vinculados a subtema, 143 subtemas sem questão e 258
  sem caso.
- `audit:cobertura` passou; o build passou gerando **438 páginas estáticas**.
- Permanecem 291 candidatas locais fora do banco remoto, 65 subtemas sem
  resumo e a validação owner-only em navegador/dois dispositivos.

### Atualização após os lotes GO — 2026-08-22

- Catálogo local: **1.389 questões**, 247 resumos e 71 casos totais, com 70
  casos vinculados na matriz de cobertura.
- O subtema de abdome agudo ginecológico e o subtema de atendimento à pessoa
  em situação de violência sexual receberam, cada um, 1 resumo, 3 questões e
  1 caso em etapas.
- QA dos lotes: typecheck, lint, auditoria de questões, privacidade,
  superfície anônima, conflitos, estado de estudo e build passaram. O build
  gerou 437 páginas estáticas.
- Permanecem 291 candidatas locais fora do banco remoto; a publicação e a
  sincronização continuam separadas do trabalho editorial.
