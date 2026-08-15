# Relatório Anki — 2026-08-14

## Estado final da sessão

- AnkiConnect v6 respondeu em `127.0.0.1:8765`.
- Coleção atual: 2.001 notas/cartões em 25 decks; 18 decks de estudo com
  cartões.
- Nenhum cartão foi excluído, reescrito ou enviado ao site.
- Todos os cartões dentro da árvore `MEDICINA` receberam a tag operacional
  `codex-medicus`, sem alterar Frente/Verso.

## Segurança editorial aplicada

- Auditoria completa: 11 grupos de duplicata exata, 11 grupos normalizados,
  zero frente longa, zero verso longo e 90 notas sem referência.
- 112 cartões foram suspensos: duplicatas e notas sem fonte. A suspensão é
  reversível e evita revisão de material não validado.
- Nenhuma fonte foi inventada; as 90 notas sem referência continuam na fila de
  revalidação.
- A auditoria foi repetida depois da mudança e confirmou os mesmos dados.

## Configuração de revisão

- FSRS/retensão desejada: 90%.
- Novos: 9.999 por dia (teto técnico do Anki, sem limite prático).
- Revisões: 9.999 por dia, teto prático sem limite.
- Passos: 5 minutos, 5 horas, 3 dias e 7 dias.
- Histórico de agendamento preservado.

## Backup

Backup pós-mudança exportado em:

`exports/anki/backups/2026-08-14T22-39-42-967Z`

O manifesto contém 23 decks exportados com agendamento. O AnkiConnect continua
exclusivamente local e não é chamado pelo site.

## Pendências do Anki

- Revisar clinicamente as 90 notas sem referência com fonte primária vigente.
- Resolver duplicatas normalizadas somente após comparar subtema e conteúdo.
- Produzir cards atômicos/cloze/imagem apenas a partir de lacunas comprovadas,
  com licença/anonimização verificadas.
- Remover os dois decks vazios do projeto em uma sessão com o bug UTF-8 do
  AnkiConnect resolvido; nenhum cartão foi afetado por essa falha.

## Atualização final do lote (2026-08-14 23:04 BRT)

Esta seção substitui os números históricos acima quando houver divergência.

- Coleção verificada: 2.064 notas/cartões em 24 decks; 16 decks folha de estudo.
- A rotina de neurologia encontrou lacunas reais e criou 63 notas idempotentes a
  partir de resumos existentes. Nenhuma nota foi apagada ou reescrita.
- 62 notas que ultrapassaram o padrão curto foram preservadas e suspensas para
  reescrita atômica; nenhum cartão longo permanece ativo.
- O fechamento editorial suspendeu 120 cartões por duplicata normalizada ou
  referência ausente. A suspensão é reversível; os campos clínicos foram
  preservados.
- Taxonomia curricular aplicada somente por correspondência exata do manifesto:
  206 notas receberam `semestre::` e `componente::`; 774 receberam
  `curriculo::semestre-pendente`, sem inferência de semestre.
- Auditoria final: 19 grupos de duplicata normalizada, 90 notas sem referência,
  55 notas longas (todas suspensas), zero frente longa e zero duplicata ativa
  marcada como suspensa.
- Configuração confirmada: 5 min, 5 h, 3 d e 7 d; novos e revisões em 9.999/dia
  (teto técnico, sem limite prático); histórico preservado.
- Backup final: `exports/anki/backups/2026-08-14T23-04-06-703Z` (22 decks).
- AnkiConnect segue restrito a `127.0.0.1:8765`; o site não acessa a coleção.

Restam apenas etapas que exigem revisão clínica e de direitos: validar as 90
referências ausentes com fonte primária vigente, reescrever os 62 suspensos,
resolver os 19 grupos após comparação de conteúdo, e criar Cloze/Image
Occlusion somente com fatos e imagens aprovados. Elas permanecem suspensas para
não liberar material sem fonte.
-
## Atualizacao da validacao neurologica — 2026-08-15

- [x] Backup novo antes da mutacao: `exports/anki/backups/2026-08-15T00-02-16-316Z`.
- [x] As 90 notas sem referencia foram reavaliadas: 88 receberam referencia
  primaria atual, tags de subtema e foram reativadas; 2 placeholders de vertigem
  continuam suspensos e marcados como rejeitados.
- [x] As 62 notas longas foram reescritas no proprio ID em frente curta e uma
  ideia por verso. 55 foram reativadas com fonte; 7 permanecem suspensas para
  fonte especifica ainda nao comprovada.
- [x] Foi criado um Cloze idempotente sobre a TC inicial do AVC isquemico, com
  fonte AHA/ASA 2026, no deck de Neurologia.
- [ ] Image Occlusion nativo permanece pendente: o formato de mascara nao foi
  exposto com seguranca pelo AnkiConnect e nenhuma nota malformada foi criada.
- [ ] Os 10 subtemas neurologicos ainda nao possuem vinculo exato no manifesto
  SISCAD. Todos receberam `curriculo::semestre-pendente`; nenhum semestre foi
  inventado. A conclusao depende de evidencia do plano SISCAD correspondente.
- [x] Nenhum cartao foi apagado. Relatorios privados: `exports/anki/validacao-neuro-2026.json`,
  `exports/anki/reescrita-atomica-2026.json` e os snapshots `*-antes-private.json`.
## Evidencia pos-aplicacao — 2026-08-15 00:13 BRT

- Auditoria Anki: 2.065 notas; zero frente/verso longo; 2 notas sem referencia,
  correspondentes somente aos placeholders suspensos.
- 88 notas clinicas validadas estao ativas; 55 notas atomicas reescritas estao
  ativas; 7 continuam suspensas por fonte especifica pendente.
- Cloze verificado no modelo `Omissao de Palavras`, com fonte no campo `Verso Extra`.
- Backup pos-aplicacao: `exports/anki/backups/2026-08-15T00-13-04-214Z`.
- Typecheck e ESLint direcionado dos scripts alterados passaram. O lint global
  continua com o aviso preexistente fora deste lote em `exports/private/inspect-supabase-state.mts`.
## Evidencia final pos-retag — 2026-08-15 00:24 BRT

- Auditoria Anki: 2.065 notas, zero frente/verso longo e somente 2 notas sem
  referencia (os dois placeholders suspensos).
- Os 62 cards longos seguem reescritos; 58 estao ativos com fonte e 4 seguem
  suspensos por fonte especifica pendente.
- Backup mais recente: `exports/anki/backups/2026-08-15T00-24-37-225Z`.
- Os IDs de subtema foram alinhados aos IDs canônicos existentes no site; os
  10 subtemas sem evidencia curricular continuam `curriculo::semestre-pendente`.

## Revisão integral e lote por lacunas — 2026-08-15 02:00 UTC

Esta seção é a evidência canônica mais recente e substitui contagens históricas
divergentes deste relatório.

- Coleção ao vivo: 2.085 notas/cartões; 1.098 ativos e 987 suspensos. Há 17
  decks folha de estudo dentro da árvore médica.
- Backup anterior à intervenção: `exports/anki/backups/2026-08-15T01-45-53-743Z`.
  Backup posterior: `exports/anki/backups/2026-08-15T02-00-36-271Z`, com
  agendamento preservado.
- 839 fontes que estavam repetidas no corpo do verso foram movidas para o campo
  de referência, sem perda de texto clínico.
- Três respostas ativas realmente extensas foram suspensas de modo reversível
  para reescrita atômica. A auditoria idempotente posterior encontrou zero
  resposta longa ativa.
- Foram criados 20 cartões atômicos, cinco por lacuna em Nefrologia,
  Endocrinologia, Hematologia e Gastroenterologia. Todos têm fonte primária,
  subtema canônico, eixo clínico e ID estável; uma segunda execução não criou
  duplicatas.
- A coleção preserva 42 versos extensos apenas no material legado suspenso. As
  duas notas sem referência são placeholders rejeitados e também suspensos.
- Nenhum cartão ou nota foi apagado; nenhum agendamento foi zerado. Não existe
  grupo de duplicata normalizada com mais de um cartão ativo.
- A configuração permanece em FSRS 90%, passos 5 min/5 h/3 d/7 d e teto
  técnico de 9.999 novos e 9.999 revisões por dia.

### Pendência editorial real

- 740 notas ativas ainda não têm `subtema::`; 651 não têm nem `tema::` nem
  `subtema::`. Isso não torna o conteúdo automaticamente incorreto, mas impede
  filtragem curricular completa. A maioria é legado de GO, Pediatria,
  Infectologia, Cirurgia e MFC.
- A próxima passagem deve mapear tags legadas para IDs canônicos somente quando
  a correspondência for inequívoca. Cirurgia e MFC exigem leitura do conteúdo,
  pois não possuem uma tag temática intermediária confiável.
- Image Occlusion continua pendente até existir imagem permitida, anonimizada e
  máscara validada. Não foi criado cartão visual malformado apenas para cumprir
  volume.

Rotina reproduzível: `npm.cmd run anki:revisar-lacunas` para auditoria e
`npm.cmd run anki:revisar-lacunas -- --aplicar` para um lote aprovado.
