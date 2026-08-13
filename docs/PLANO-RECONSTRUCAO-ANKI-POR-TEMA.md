# Plano de reconstrução do Anki por grande tema

Atualizado em 2026-08-13 após exclusão autorizada dos 885 cartões longos.

## Estado após limpeza

- Backup anterior à exclusão: `exports/anki/backups/2026-08-13T22-53-36-190Z`.
- 885 notas longas removidas; busca pela tag antiga retornou zero.
- 1.960 notas permanecem no Anki.
- Auditoria posterior: zero versos longos, zero frentes longas e zero frentes
  ambíguas; 11 grupos exatos/normalizados e 90 notas legadas sem referência.
- Backup posterior: `exports/anki/backups/2026-08-13T22-54-42-348Z`.

## Padrão obrigatório dos novos cartões

- Máximo de 150 cartões por grande tema, não uma meta obrigatória.
- Uma unidade recuperável por cartão; frente curta e resposta direta.
- Organização por ciclo, disciplina, subtema e eixo: epidemiologia,
  fisiopatologia, quadro clínico, diagnóstico, tratamento e complicações.
- Fonte primária/sociedade, ano e data de revisão no campo de referência.
- Cloze apenas para fatos atômicos. Imagem e Image Occlusion quando houver
  figura aberta ou privada aprovada, com modalidade, origem e licença.
- Cartão novo é idempotente e recebe ID/tag estável. Backup e auditoria a cada
  lote; nenhum legado é removido sem cobertura comprovada.

## Ordem de reconstrução

1. Infectologia: síndromes febris, antimicrobianos, HIV, meningites, IRAS,
   tuberculose, hepatites e infecções oportunistas.
2. GO/Obstetrícia: pré-natal, hipertensão/diabetes gestacional, parto,
   hemorragias, puerpério, anticoncepção e ginecologia oncológica.
3. Pediatria: neonatologia, crescimento, imunização, urgências, infecções e
   doenças respiratórias.
4. Cirurgia e MFC: abdome agudo, trauma, perioperatório, APS, prevenção,
   rastreamento, saúde mental e abordagem familiar.
5. Cardio, Neuro e Pneumo: decisões clínicas OMED e interpretação de ECG,
   neuroimagem, TC/RX e provas funcionais.
6. Nefro, Gastro, Hemato, Endócrino, Reumato, Derma, Onco e ORL conforme a
   matriz de lacunas do site.

## Distribuição sugerida por grande tema

- 15–25 cartões: fisiopatologia e epidemiologia realmente cobradas.
- 25–35: quadro clínico, padrões e diferenciais.
- 25–35: diagnóstico, exames e interpretação de imagem.
- 35–45: tratamento e condutas por diretriz.
- 10–20: complicações, prognóstico e erros frequentes.
- 10–20: cartões visuais, quando houver imagens válidas.

O total real pode ficar abaixo de 150 quando a informação mínima não justificar
mais cartões.
