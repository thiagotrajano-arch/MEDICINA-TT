# Fechamento das pendências do Anki — 2026-08-13

## Executado

- Auditoria editorial repetida após a configuração dos intervalos.
- Tags de auditoria aplicadas aos cartões elegíveis, sem apagar notas.
- Lote OMED prioritário conferido: 36 subtemas com resumo, nenhum deck
  incompleto.
- Lote de Neurologia conferido: 15 subtemas com resumo; 7 cartões atômicos
  criados para `neuroanatomia-clinica--localizacao-neurologica`.
- Novo backup com agendamento criado após os lotes:
  `exports/anki/backups/2026-08-13T22-26-50-705Z`.
- Snapshot de progresso atualizado em `exports/anki/progresso.json`.

## Estado editorial restante

- 1.728 notas auditadas.
- 14 grupos de duplicata exata e 14 normalizados.
- 4 grupos de frente ambígua.
- 885 versos longos.
- Zero notas sem referência e zero cartões excluídos.

Esses itens não foram reescritos automaticamente: exigem revisão do conteúdo
clínico, preservação do histórico e decisão sobre cartões que compartilham a
mesma frente. Image Occlusion e Cloze continuam reservados para imagens e
fatos atômicos aprovados.

## Fechamento operacional atualizado — 2026-08-13

- Backup com agendamentos confirmado antes da limpeza operacional em
  `exports/anki/backups/2026-08-13T23-13-20-237Z`.
- Configuração compartilhada: FSRS com retenção alvo 0,90; aprendizagem em
  **5 min → 5 h → 3 d → 7 d**; reaprendizagem de 10 min; 30 novos/dia e
  revisões sem teto artificial.
- Foram encontradas 11 famílias normalizadas de cópias do antigo lote de AVC.
  Em cada família foi preservada a nota com tag/subtema correto e acentuação;
  as 22 cópias redundantes foram **suspensas e etiquetadas**, sem exclusão.
- As 90 notas sem referência foram **suspensas e etiquetadas**. Não houve
  reescrita médica, exclusão, nem alteração de Frente/Verso.
- 208 notas de Neurologia receberam a taxonomia estrutural consistente
  (`ciclo`, `área`, `disciplina`).
- Snapshot renovado: `exports/anki/progresso.json`. Relatório reprodutível:
  `exports/anki/fechamento-rotina-estudo.json`.

Após essa decisão existem 112 cartões suspensos por segurança editorial; os
demais cartões permanecem estudáveis. A auditoria ainda lista as cópias e
notas sem fonte porque ela mede o acervo preservado, não somente a fila ativa.

- O modelo `OMED Bonito` agora espelha o tema escuro do site: fundo grafite
  clínico, superfícies azul-petróleo, contraste de leitura e destaque aqua.
  O tema da janela do aplicativo continua responsabilidade do Onigiri/Anki e
  requer uma confirmação visual local após reinício.
