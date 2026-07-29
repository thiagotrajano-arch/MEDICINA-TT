# Revisão clínica — Infectologia, lote 2

Atualizado em 2026-07-29.

## Escopo

Segundo micro-lote da revisão editorial de Infectologia. Ele trata o único par
de comentários repetidos detectado na linha de base, sem reproduzir o banco
privado de origem.

| ID | Tema | Resultado da revisão |
|---|---|---|
| `inf-imun-01` | Vacinação na gestação | Fonte atual do calendário da gestante adicionada; os comentários sobre SCR e varicela foram diferenciados pelo objetivo clínico de cada alternativa. |
| `inf-imun-02` | Vacinação e imunossupressão | Fonte atual do Manual de Normas e Procedimentos para Vacinação adicionada; comentário refinado para adiar vacinas vivas atenuadas durante corticoide em dose imunossupressora e observar o intervalo mínimo após a suspensão. |

## Resultado mensurável

A auditoria filtrada passou de uma questão com comentários repetidos após
normalização para zero em Infectologia. Ao encerrar este lote, havia 35
comentários curtos em 22 questões e nenhum campo de fonte vazio; os indicadores
seguem na fila de revisão individual nos lotes posteriores.

## Fontes de verificação

- [Ministério da Saúde — Calendário Técnico Nacional de Vacinação da Gestante](https://www.gov.br/saude/pt-br/composicao/svsa/pni/calendario-tecnico/calendario-tecnico-nacional-de-vacinacao-gestante/view)
- [Ministério da Saúde — Instrução Normativa do Calendário Nacional de Vacinação 2026](https://www.gov.br/saude/pt-br/vacinacao/publicacoes/instrucao-normativa-que-instrui-o-calendario-nacional-de-vacinacao-2026.pdf)
- [Ministério da Saúde — Manual de Normas e Procedimentos para Vacinação](https://www.gov.br/saude/pt-br/vacinacao/publicacoes/manual-de-normas-e-procedimentos-para-vacinacao)

## Limite e próxima fila

Este lote não encerra os passos 44–46. O próximo recorte deve abordar
comentários curtos de Infectologia, começando pelos itens de meningites apenas
quando houver uma diretriz atual e específica para a conduta que se pretende
validar.

## Validação e publicação

O lote foi publicado em conjunto com o lote 3 no commit `6dcc44f`. Typecheck,
lint e auditoria filtrada passaram; o GitHub Pages
[`30457470874`](https://github.com/thiagotrajano-arch/MEDICINA-TT/actions/runs/30457470874)
concluiu com sucesso, e `/` e `/questoes/` responderam HTTP 200.
