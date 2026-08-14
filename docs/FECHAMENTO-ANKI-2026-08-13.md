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

## Teste funcional final — 2026-08-13

- AnkiConnect v6 respondeu; a coleção abriu com 25 entradas de deck e 18 decks
  de estudo exportados. Não há mais deck visível com o título `Codex`.
- O teste de backup/restauração foi executado em um deck técnico temporário:
  exportação `.apkg` com agendamento, exclusão do deck temporário, importação,
  conferência de um cartão restaurado e limpeza final. O pacote de teste tem
  21.670 bytes e não deixou cartão técnico ativo.
- Backup final do acervo: `exports/anki/backups/2026-08-13T23-33-40-588Z`.
  Snapshot final: `exports/anki/progresso.json`.
- Há 1.847 cartões ativos, todos no modelo `OMED Bonito`. Os 112 cartões
  editoriais inseguros (22 cópias, 90 sem referência) e o cartão técnico estão
  suspensos; as buscas confirmaram zero cópia ou nota sem fonte na fila ativa.
- Onigiri, AnkiConnect, FSRS Helper, Deckhand e Image Occlusion constam como
  instalados e habilitados. A inspeção visual do tema dentro da janela do Anki
  ainda depende do controlador gráfico local, não da integridade da coleção.

## Correção de qualidade: padrão curto real — 2026-08-13

- A auditoria anterior usava apenas o limiar técnico de 500 caracteres no verso;
  ela não assegurava que o cartão fosse confortável para recuperação ativa.
- O padrão atual é deliberadamente estrito: frente com no máximo 88 caracteres
  e verso com no máximo 170 caracteres, após remover HTML. Isso corresponde a
  uma pergunta recuperável e uma resposta de uma frase curta, sem lista de
  condutas ou exceções misturadas.
- Foram preservadas, etiquetadas como `editorial::texto-longo` e suspensas 967
  notas que excediam esse padrão. Nenhuma foi apagada ou reescrita
  automaticamente, preservando ID, histórico e fonte para revisão por lote.
- A fila ativa passou a conter 902 cartões e **zero** violação do padrão curto.
  O lote adicionou 22 cartões atômicos para meningite, hemorragia digestiva,
  retocolite ulcerativa, disfunção tireoidiana e acidose na DRC, todos com
  referência rastreável em diretriz e data de revisão.
- Evidência local: `exports/anki/revisao-curta-2026-08-14.json`, snapshot de
  progresso e backup com agendamentos em
  `exports/anki/backups/2026-08-13T23-46-48-008Z`.

### Continuação editorial — 2026-08-14

- A fila preservada foi classificada por ondas: 400 notas OMED prioritárias,
  408 de GO/Pediatria/Cirurgia/MFC e 159 das demais áreas.
- 190 notas sem subtema foram sinalizadas para reconciliação taxonômica antes
  de qualquer reconstrução clínica.
- Foram acrescentados 19 cartões atômicos para IC, asma/DPOC e AVC isquêmico;
  com os 22 anteriores, há 41 substitutos novos, todos com fonte nomeada.
- Novo backup local com agendamentos: `exports/anki/backups/2026-08-14T00-13-10-543Z`.

### Fechamento da fila longa — 2026-08-14

- Todas as 967 notas da fila foram julgadas: 133 perguntas clínicas reais foram
  reescritas no próprio ID e 834 títulos/panoramas genéricos foram aposentados.
- Oito cartões longos ativos fora da fila foram detectados e aposentados. Nada
  foi apagado; backups e snapshot privado permitem recuperação.
- Os 133 reescritos continuam suspensos até validação clínica por diretriz; o
  limite de caracteres não substitui revisão médica.
- Estado final validado: 913 cartões ativos, zero acima de 88/170 e zero grupos
  de duplicata exata.
- Backups de segurança: antes da operação em
  `exports/anki/backups/2026-08-14T00-34-39-905Z`; depois em
  `exports/anki/backups/2026-08-14T00-44-27-521Z`.

### Primeira liberação clínica — 2026-08-14

- Dos 133 candidatos curtos, 21 foram confrontados com fontes oficiais atuais,
  corrigidos no próprio ID e liberados: rastreamento cervical, PNI, tuberculose,
  asma, sepse e meningite.
- Foram substituídas recomendações antigas, incluindo citologia como teste
  primário, esquema rotineiro de duas doses para HPV e limites etários antigos
  da vacina rotavírus. A data/edição da fonte ficou explícita em cada nota.
- Os 112 candidatos restantes continuam suspensos e receberam a marca
  `editorial::fonte-generica-bloqueia-ativacao`; passar no limite de caracteres
  não autoriza uso clínico sem uma fonte específica vigente.
- Estado estudável após a liberação: 934 cartões ativos, zero frente acima de
  88 caracteres, zero verso acima de 170, zero fonte ausente e zero duplicata
  exata na fila ativa. Nenhuma nota ou cartão foi excluído.
- Evidências locais: `exports/anki/liberacao-validada-2026.json`, snapshot dos
  campos anteriores em `exports/anki/liberacao-validada-2026-antes-private.json`
  e backup com agendamento em
  `exports/anki/backups/2026-08-14T00-56-28-097Z`.

### Revisões diárias sem limite — 2026-08-14

- Os 18 decks finais `MEDICINA` foram verificados e compartilham a configuração
  1, agora explicitamente definida com 9.999 revisões/dia, o teto máximo do
  Anki e equivalente operacional a não limitar revisões vencidas.
- O limite de introdução foi preservado em 30 cartões novos/dia; FSRS 0,90 e os
  passos 5 min, 5 h, 3 d e 7 d não foram alterados.
- Nenhum cartão ou histórico de agendamento foi modificado. Backup anterior à
  reaplicação: `exports/anki/backups/2026-08-14T01-05-52-913Z`.
