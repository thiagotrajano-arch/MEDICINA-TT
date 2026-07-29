# Relatório-base de qualidade das questões

Atualizado em 2026-07-29.

## Escopo e método

Este é um retrato de metadados do banco autoral agregado por
`src/content/questoes.ts`. Não reproduz enunciados, alternativas, fontes
privadas nem dados de estudo do usuário.

O relatório é reproduzível com:

```powershell
npm run audit:questoes
npm run audit:questoes -- --disciplina inf --subtemas
```

O script `scripts/audit-questoes.mts` aplica estes critérios:

| Indicador | Critério |
|---|---|
| Repetição exata | Duas ou mais alternativas da mesma questão têm comentários idênticos após aparar espaços nas extremidades. |
| Repetição normalizada | Duas ou mais alternativas da mesma questão continuam iguais após aparar e colapsar espaços e ignorar maiúsculas/minúsculas. É a fila de revisão adotada. |
| Comentário curto | Comentário com menos de 40 caracteres após aparar espaços. |
| Sem fonte | Campo `fonte` ausente ou vazio. |

Esses indicadores não declaram, por si só, que um gabarito está errado. Eles
identificam itens que precisam de revisão editorial antes de serem tratados
como material final: comentários repetidos são visíveis ao estudante, e um
campo de fonte ausente precisa ser completado mesmo quando a conduta vier a
ser confirmada na revisão clínica.

## Linha de base

| Métrica | Resultado |
|---|---:|
| Questões auditadas | 1.072 |
| Questões com repetição exata | 685 |
| Questões com repetição normalizada | 686 |
| Alternativas envolvidas em repetição normalizada | 2.734 |
| Questões com ao menos um comentário curto | 81 |
| Comentários curtos | 118 |
| Questões sem fonte | 48 |
| Comentários vazios | 0 |

A diferença de uma questão entre a repetição exata e a normalizada é apenas
de capitalização; a fila adota o total normalizado de 686 por representar
melhor comentários pedagogicamente indistintos.

## Painel por disciplina

| Disciplina | Questões | Repetidas normalizadas | Curtas (questões / comentários) | Sem fonte |
|---|---:|---:|---:|---:|
| Infectologia | 122 | 1 | 22 / 35 | 0 |
| Ginecologia & Obstetrícia | 115 | 2 | 21 / 28 | 0 |
| Pediatria | 73 | 2 | 26 / 36 | 0 |
| Cirurgia | 112 | 101 | 5 / 8 | 0 |
| MFC & Atenção Primária | 114 | 100 | 4 / 5 | 0 |
| Cardiologia | 163 | 160 | 1 / 4 | 0 |
| Neurologia | 161 | 160 | 0 / 0 | 0 |
| Pneumologia | 160 | 160 | 0 / 0 | 0 |
| Hematologia | 15 | 0 | 0 / 0 | 15 |
| Gastroenterologia | 11 | 0 | 0 / 0 | 11 |
| Nefrologia | 6 | 0 | 0 / 0 | 6 |
| Oncologia | 4 | 0 | 0 / 0 | 4 |
| Otorrinolaringologia | 4 | 0 | 1 / 1 | 4 |
| Endocrinologia | 3 | 0 | 0 / 0 | 3 |
| Reumatologia | 7 | 0 | 0 / 0 | 3 |
| Dermatologia | 2 | 0 | 1 / 1 | 2 |

## Próxima fila editorial

1. **Infectologia (passos 44–46):** revisar as 122 questões pelo peso OMED,
   começando pelos 35 comentários curtos, pelo único par repetido após
   normalização e pelos subtemas com maior concentração de itens curtos.
   Confirmar cada conduta em diretriz vigente e nomeada antes de alterar o
   banco.
2. **Ginecologia & Obstetrícia e Pediatria:** tratar os comentários curtos
   após concluir Infectologia, mantendo uma única alternativa correta e uma
   explicação distinta para cada alternativa.
3. **Cirurgia, MFC, Cardiologia, Neurologia e Pneumologia:** abrir um lote
   editorial próprio para os comentários legados repetidos. Não fazer uma
   substituição em massa sem revisar gabarito, fonte e intenção pedagógica.
4. **Disciplinas com fonte ausente:** completar a referência explícita e a
   data de revisão quando cada lote for clinicamente validado; não inferir
   fonte retroativamente.

## Critério de saída de um lote

Um lote só pode ser marcado como revisado quando cada questão tiver uma única
alternativa correta, comentários úteis e distintos quando a alternativa for
diferente, fonte atual explícita e conduta conferida contra referência clínica
vigente. Toda alteração continua sujeita às validações de tipo, integridade,
privacidade e direitos autorais antes de publicação.
