# Integração local Anki + dashboard + Notion

Atualizado em 2026-08-03.

## Anki

- O modelo local é `OMED Bonito`.
- O lote prioritário tem 36 subtemas completos em Cardiologia, Pneumologia, Nefrologia, Endocrinologia, Hematologia, Oncologia e Dermatologia, com 17 cartões por subtema.
- Neurologia foi conferida separadamente: 14 subtemas com resumo estão completos; o deck legado de AVC foi preservado para não apagar conteúdo anterior.
- O relatório local é gerado com `npm run anki:progresso -- --saida exports/anki/progresso.json`.
- `exports/` é ignorado pelo Git. O relatório não deve ser publicado nem enviado a serviços externos.
- A ponte usa `findCards`/`cardsInfo` somente para leitura e não altera intervalos, histórico ou conteúdo.

## Dashboard

O dashboard importa o JSON em `src/lib/progresso-anki.ts` e guarda somente um resumo no navegador: número de decks, cartões, cartões para revisar e revisões do dia. A integração não tenta acessar `127.0.0.1:8765` a partir do site público.

## Complementos instalados localmente

- Image Occlusion Enhanced: criação de cartões de oclusão para imagens clínicas.
- FSRS Helper: organização da revisão espaçada e redistribuição de carga.

Testar os complementos após atualizar o Anki antes de rodar novos lotes.

## Notion

Foi criada uma central privada com uma página de visão geral e as bases `Rotina de Estudos` e `Fila de Revisão`. Ela guarda organização, links e indicadores, não PDFs comerciais, documentos pessoais, imagens sensíveis ou credenciais. IDs e URLs do workspace ficam fora do repositório.
