# Registro de ingestao do Drive - 2026-08-01

## Resultado

A conexao autenticada do Google Drive respondeu e permitiu inventario metadata-first. Foram localizados lotes prioritarios de Hematologia, Gastroenterologia, Cirurgia/MEDCOF/Medcurso, Bagagem e BBPM.

## Primeiros candidatos

- Hematologia: `Anemias_Microcíticas.pdf`, `Leucemias_Crônicas,_Linfomas,_Mielodisplasias_e_Mie_1.pdf`, `Anemias_Macrocíticas.pdf`, `Anemias_Hemolíticas.pdf`, `Hemostasia_I__Co.pdf`.
- Gastroenterologia: `MEDCURSO_-_GAS_2_-_DOENÇAS_INTESTINAIS.pdf`, `MEDCURSO_-_GASTRO_1_-_ESOFAGO,_ESTOMAGO_E_DUODENO.pdf`, hemorragia digestiva alta/baixa.
- Curriculo: roteiro BBPM 1 de coração/mediastino/pericardio e materiais Bagagem Integrada.

## Politica aplicada

- Somente metadados e texto extraivel foram consultados nesta etapa.
- PDFs comerciais/protegidos permanecem privados; nao entram no repositorio publico.
- O PDF deve ser convertido para Markdown cacheado antes da leitura editorial completa.
- Hash, OCR e recortes de imagens dependem da materializacao local do lote aprovado.
- Nao foram registrados tokens, credenciais, dados pessoais ou conteudo bruto protegido.

## Proxima etapa tecnica

Baixar um lote minimo aprovado, calcular SHA-256, comparar com o manifesto, converter PDF -> Markdown, validar paginas sem texto, e so depois criar sinteses relacionadas a disciplina, semestre, subtema e prioridade OMED.
