# Fila de reescrita atômica do Anki

Atualizado em 2026-08-13. Esta é uma fila editorial, não um convite para
reativar cartões antigos nem para resumir condutas por corte automático.

## Situação de partida

- 967 notas foram preservadas e suspensas por ultrapassarem o padrão curto.
- Nenhuma nota foi apagada, nem teve texto, histórico ou agendamento modificado.
- 190 notas não têm tag de subtema; a taxonomia precisa ser resolvida antes da
  reautoria clínica.
- Toda nota da fila recebe `editorial::fonte-revalidar` e
  `editorial::reautoria-atomica`. Isso não afirma que a fonte é errada; impede
  que uma referência genérica ou desatualizada seja tratada como evidência atual.

## Ordem de trabalho

| Onda | Áreas | Notas preservadas | Critério para reentrada |
| --- | --- | ---: | --- |
| 1 | Infectologia 135; Cardiologia 52; Neurologia 164; Pneumologia 49 | 400 | Diretriz oficial atual, subtema confirmado, cartões atômicos e deduplicados. |
| 2 | GO 218; Pediatria 182; Cirurgia 4; MFC 4 | 408 | Mesmo portão, com fontes brasileiras/internacionais vigentes quando aplicáveis. |
| 3 | Oncologia 56; ORL 33; Reumato 34; Dermato 16; Gastro 20 | 159 | Mesmo portão, orientado pela matriz de lacunas e prioridade OMED. |

## Padrão de substituição

Para cada ideia clínica validada:

1. conservar a nota antiga suspensa como registro de origem;
2. conferir a conduta em diretriz primária atual ou documento oficial;
3. criar uma nova nota, em vez de editar a antiga, com uma decisão/fato por
   cartão, frente de até 88 e verso de até 170 caracteres;
4. usar tags de ciclo, área, disciplina, subtema e eixo clínico;
5. registrar fonte nomeada, ano e data de revisão;
6. auditar tamanho, duplicidade e referência antes de deixá-la ativa.

Cartões complexos viram unidades separadas: diagnóstico, fisiopatologia,
sinais/sintomas, tratamento, complicação e exceção não ficam no mesmo verso.
Imagem só entra em cartão privado, anonimizado e com proveniência confirmada;
quando for uma estrutura visual, usa-se Image Occlusion, não uma imagem sem
pergunta.

## Lotes validados até esta rodada

Quarenta e um cartões substitutos curtos foram criados para lacunas comprovadas:
meningite, hemorragia digestiva, retocolite ulcerativa, tireoide, acidose na
DRC, insuficiência cardíaca, asma/DPOC e AVC isquêmico. As fontes foram WHO,
ACG, NICE, KDIGO, AHA/ASA, AHA/ACC/HFSA, GINA e GOLD, revisadas nesta rodada.

Eles são deliberadamente poucos: constituem o modelo de qualidade para a
reconstrução das 967 notas, não uma substituição fictícia de todo o acervo.

## Evidência local não publicada

O relatório de contagem e tags fica em
`exports/anki/fila-reescrita-atomica.json`, ignorado pelo Git. Ele não contém
conteúdo de cartões nem dados do usuário.

## Fechamento integral da fila — 2026-08-14

- 967/967 notas antigas foram processadas; a fila
  `editorial::aguarda-reescrita-curta` ficou vazia.
- 133 perguntas clínicas reais foram reescritas no próprio ID, com frente de
  até 100 e verso de até 170 caracteres. Permanecem suspensas sob
  `editorial::aguarda-validacao-clinica`.
- 834 notas sem uma pergunta/fato confiável foram aposentadas, sem exclusão.
- Oito cartões longos ativos que estavam fora da fila também foram encontrados
  e suspensos. Assim, 842 notas estão aposentadas ao todo.
- Estado final da fila de estudo: 913 cartões ativos, zero violações do limite
  88/170 e zero grupos de duplicata exata.
- Backup anterior à operação:
  `exports/anki/backups/2026-08-14T00-34-39-905Z`. Backup posterior:
  `exports/anki/backups/2026-08-14T00-44-27-521Z`.
- Snapshot privado reversível dos campos originais:
  `exports/anki/reautoria-originais-private.json`.
