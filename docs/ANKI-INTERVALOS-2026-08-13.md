# Intervalos de revisão do Anki — 2026-08-13

Configuração aplicada pelo AnkiConnect local no perfil ativo, sem exclusão ou
alteração do histórico dos cartões.

- Primeiro passo: 5 minutos.
- Segundo passo: 5 horas.
- Terceiro passo: 3 dias.
- Quarto passo: 7 dias.
- Depois: o FSRS continua calculando intervalos progressivamente maiores, com
  retenção desejada de 0,90.

Backup posterior à alteração:
`exports/anki/backups/2026-08-13T22-23-53-015Z`.

O comando reproduzível é `npm.cmd run anki:intervalos`. O AnkiConnect permanece
restrito a `127.0.0.1` e não é usado pelo site público.
