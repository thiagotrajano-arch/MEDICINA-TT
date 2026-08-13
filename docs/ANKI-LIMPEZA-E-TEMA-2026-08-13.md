# Anki — limpeza autorizada, organização e tema

## Limpeza

- Foram confirmadas 885 notas com `codex-medicus` e verso longo, distribuídas
  em 16 disciplinas.
- Backup anterior: `exports/anki/backups/2026-08-13T22-53-36-190Z`.
- As 885 notas foram excluídas conforme autorização explícita do usuário.
- Verificação posterior por tag: zero notas longas restantes.
- Auditoria posterior: 1.960 notas, zero versos longos, zero frentes longas,
  zero frentes ambíguas, 11 grupos duplicados e 90 notas legadas sem referência.
- Backup posterior: `exports/anki/backups/2026-08-13T22-54-42-348Z`.

O primeiro resultado retornado por `notesInfo` após a exclusão não era uma
contagem confiável de existência. A confirmação definitiva foi feita por
`findNotes` e pela auditoria completa, ambas com zero notas longas.

## Tema e idioma

- O idioma global já estava configurado como Português do Brasil (`pt_BR`).
- O modelo `OMED Bonito` passou para tema escuro: fundo grafite, superfície
  azul-escura, texto claro e acentos teal, com contraste mais alto.
- Conteúdo, cartões e agendamento não foram alterados pela mudança visual.

## Reconstrução

O padrão e a ordem estão em `docs/PLANO-RECONSTRUCAO-ANKI-POR-TEMA.md`.
Cada grande tema terá no máximo 150 cartões, priorizando informação mínima,
eixos clínicos, diretrizes atuais e cartões visuais com proveniência.
