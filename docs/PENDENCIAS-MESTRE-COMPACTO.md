# Codex Medicus — pendências mestre compactas

> Backlog operacional único, atualizado em 2026-08-16. Os planos de 100 passos,
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

- A auditoria local encontrou **1.359 questões** no catálogo atual, não 1.072.
- A estrutura está sem duplicidades exatas/normalizadas, sem comentários vazios,
  sem fonte ausente e sem gabarito correto contraditório automático.
- Permanecem 20 comentários curtos em 13 questões, concentrados em Neurologia e
  Psiquiatria; isso é pendência editorial, não motivo para alterar o banco em massa.
- A matriz atual registra 311 subtemas: 70 sem resumo, 149 sem questão e 268 sem
  caso. Esses números são do snapshot local de hoje e devem orientar a próxima
  curadoria, sem inventar conteúdo para preencher contagem.
- As 77 figuras públicas auditadas estão ancoradas; a cobertura por subtema ainda
  precisa de curadoria clínica e não equivale a 77 subtemas completos.
- A reconciliação local/remota encontrou **287 candidatas locais** ausentes no
  banco remoto; as 287 têm subtema válido, fonte, tags e gabarito estruturalmente
  válido, sem duplicata por conteúdo. Elas continuam fora do banco até passarem
  pelo portão editorial/proveniência; nenhuma foi publicada automaticamente.

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
