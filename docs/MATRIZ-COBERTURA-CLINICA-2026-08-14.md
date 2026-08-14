# Matriz de cobertura clínica — 2026-08-14

## Resultado executivo

A auditoria foi recalculada diretamente da taxonomia estática, usando `subtemaId`
como chave única para cruzar resumos, questões e casos. Ela não considera um
subtema coberto apenas porque há texto parecido em outro lugar.

| Indicador | Resultado |
|---|---:|
| Disciplinas na taxonomia | 37 |
| Subtemas | 304 |
| Resumos | 234 |
| Subtemas sem resumo | 70 |
| Questões | 1.332 |
| Subtemas com pelo menos uma questão | 155 |
| Subtemas sem questão | 149 |
| Casos clínicos declarados | 56 |
| Casos com `subtemaId` válido | 55 |
| Subtemas com pelo menos um caso | 38 |
| Subtemas sem caso | 266 |

Com isso, não é seguro ampliar o volume de questões ou imagens por impressão
de falta. A próxima expansão deve preencher primeiro as lacunas de resumo e
questões dos subtemas OMED de alto rendimento, depois conectar casos e mídia.

## Lacunas de resumo prioritárias

Estas são as lacunas clínicas OMED que merecem a primeira rodada editorial,
sempre com diretriz vigente e fonte rastreável:

- Neurologia: meningites e encefalites — diagnóstico e conduta.
- Gastroenterologia: hemorragia digestiva — diagnóstico e conduta.
- Gastroenterologia: doenças inflamatórias intestinais — diagnóstico e conduta.
- Endocrinologia: hipotireoidismo e hipertireoidismo.
- Nefrologia: distúrbios hidroeletrolíticos e ácido-base — diagnóstico e conduta.
- Cirurgia: apendicite, trauma abdominal/torácico, complicações pós-operatórias,
  obstrução intestinal, hemorragia digestiva, isquemia arterial aguda,
  aneurisma de aorta, queimaduras, abdome/parede e nódulo cervical/tireoide.
- MFC: acesso/longitudinalidade, rastreamentos, prevenção quaternária,
  hipertensão, diabetes, vigilância, saúde mental, puericultura/senescência,
  imunização e comunicação clínica.

As lacunas restantes pertencem principalmente a disciplinas básicas e
estruturais ainda sem importação de fonte: Radiologia, Farmacologia, Patologia,
Anatomia, Histologia, Embriologia, Fisiologia, Bioquímica, Imunologia,
Parasitologia, Microbiologia, Genética, Saúde Pública, Urgência/Emergência,
Medicina Intensiva, Urologia, Cirurgia Plástica e Cirurgia Torácica. Elas não
devem receber conteúdo genérico antes de o material curricular e as fontes
serem reconciliados.

## Achados de integridade

- Um caso pediátrico (`caso-ped-disc-06`) ainda não possui `subtemaId`; ele foi
  preservado e ficou marcado para vínculo manual, pois a hipótese de ligá-lo ao
  subtema de otites de outra disciplina seria uma inferência indevida.
- A contagem de questões permanece compatível com a auditoria editorial:
  1.332 itens, sem duplicatas, comentários curtos/vazios/contraditórios ou
  fontes ausentes.
- A matriz não substitui a validação de semestre/SISCAD, prioridade OMED,
  diretriz e direitos de mídia. Esses campos entram na próxima camada do
  crosswalk privado.

## Como reproduzir

```text
npm.cmd run audit:cobertura
```

O relatório é gerado a partir de `src/content/taxonomy.ts`,
`src/content/conteudos.ts`, `src/content/questoes.ts` e `src/content/casos.ts`.
