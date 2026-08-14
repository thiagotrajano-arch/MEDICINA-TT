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
- Novos: 30 por dia.
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
