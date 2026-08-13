# Auditoria de vínculos entre questões e taxonomia — 2026-08-13

## Resultado

Foram comparadas as 1.332 questões à árvore de subtemas atual. O primeiro
levantamento encontrou **18 questões em 15 IDs inexistentes**. A correção foi
concluída em 2026-08-13: há agora **zero IDs órfãos**. Nenhum enunciado,
alternativa, gabarito, fonte ou ID de questão foi alterado; mudou somente o
vínculo editorial para a árvore correta ou, quando havia lacuna comprovada,
foi criado um subtema explícito sem resumo fictício. A auditoria estrutural de
texto/gabarito permanece aprovada; este documento trata exclusivamente da
navegabilidade e da ligação correta da questão ao conteúdo.

## Correções inequívocas aplicadas

| ID legado | Questões | ID candidato atual | Motivo |
|---|---:|---|---|
| `pneumo--tromboembolismo-pulmonar--diagnostico-e-conduta` | 2 | `pneumo--tromboembolismo-pulmonar-tep--diagnostico-e-conduta` | mudança de slug com inclusão de TEP |
| `cardio--insuficiencia-cardiaca--diagnostico-e-conduta` | 1 | `cardio--insuficiencia-cardiaca-icfer-e-icfep--diagnostico-e-conduta` | tema atual expandiu a nomenclatura |
| `cardio--fibrilacao-atrial--diagnostico-e-conduta` | 1 | `cardio--fibrilacao-atrial-bradiarritmias-e-leitura-de-ecg--diagnostico-e-conduta` | tema atual agrupou arritmias e ECG |
| `pneumo--doenca-pulmonar-obstrutiva-cronica-dpoc--diagnostico-e-conduta` | 1 | `pneumo--dpoc-cronico-e-exacerbado--diagnostico-e-conduta` | mudança de nome do tema |

## Decisões editoriais concluídas

| ID anterior | Questões | Decisão aplicada |
|---|---:|---|
| `pneumo--asma--diagnostico-e-conduta` | 1 | remapeado para asma crônica e crise aguda, coerente com o enunciado de gravidade |
| `neuro--meningites--diagnostico-e-conduta` | 1 | criado `Meningites e Encefalites → Diagnóstico e conduta` (questão disponível; resumo permanece pendente) |
| `gastro--cirrose-e-hipertensao-portal--diagnostico-e-conduta` | 1 | remapeado para cirrose e complicações |
| `gastro--hemorragia-digestiva--diagnostico-e-conduta` | 1 | criado `Hemorragia Digestiva → Diagnóstico e conduta` (questão disponível; resumo pendente) |
| `gastro--doencas-inflamatorias-intestinais--diagnostico-e-conduta` | 1 | criado `Doenças Inflamatórias Intestinais → Diagnóstico e conduta` (questão disponível; resumo pendente) |
| `hemato--coagulopatias--investigacao-e-conduta` | 2 | remapeado para distúrbios da hemostasia |
| `endocrino--diabetes-mellitus--diagnostico-e-conduta` | 2 | remapeado para diabetes mellitus geral |
| `endocrino--insuficiencia-adrenal--diagnostico-e-conduta` | 1 | remapeado para distúrbios adrenais geral |
| `nefro--disturbios-hidroeletroliticos-e-acido-base--diagnostico-e-conduta` | 1 | criado tema dedicado de distúrbios hidroeletrolíticos e ácido-base; aliases históricos agora preservam esse vínculo |
| `hemato--neoplasias-hematologicas--diagnostico-e-conduta` | 1 | remapeado para linfomas Hodgkin e não-Hodgkin, conforme o cenário clínico |
| `endocrino--tireoide--hipotireoidismo-e-hipertireoidismo--diagnostico-e-conduta` | 1 | criado `Disfunções Tireoidianas → Hipotireoidismo e hipertireoidismo` (questão disponível; resumo pendente) |

## Regra de correção

Não alterar enunciado, alternativas, gabarito, fonte, ID da questão, histórico
do usuário ou registro de resposta. Um subtema que possui apenas fila de
questões deve manter a indicação explícita de resumo pendente. Após a correção
desta rodada, typecheck, lint, auditoria de questões e a verificação de
vínculos taxonômicos passaram: 1.332 questões, 304 subtemas e zero vínculos
órfãos.
