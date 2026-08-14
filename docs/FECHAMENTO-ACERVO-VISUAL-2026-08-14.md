# Fechamento operacional do acervo visual — 2026-08-14

## Resultado

- 399 registros privados catalogados e 399 objetos presentes no bucket
  autenticado `midia-privada`.
- 215 imagens canônicas do lote principal foram reprocessadas em lotes
  idempotentes; 46 imagens dos dois lotes semanais também foram atualizadas.
- 30 arquivos JPEG 2000 foram convertidos para JPEG privado. O manifesto
  preserva `source_path`, `source_sha256`, `converted_sha256` e a origem da
  conversão; o arquivo original não foi apagado.
- Amostras de URL assinada foram verificadas com HTTP 200 e `image/jpeg`.
  AnkiConnect, GitHub Pages e o navegador público não participam do acesso a
  esses objetos.

## Estado da curadoria

A inspeção visual individual foi concluída em 19 folhas de contato (379
miniaturas) e uma folha neuropsiquiátrica adicional (20 páginas), com as decisões registradas por ID e índice nos artefatos privados
`decisions-visual-20260814.json`:

- 347 imagens: `util` — imagem/diagrama clínico legível, ancorado ao tema e
  à página de origem; liberado para estudo dentro da biblioteca autenticada.
- 21 imagens: `contextual` — captura, ilustração ou material didático que
  exige a fonte para interpretação; não tratar como achado isolado.
- 31 imagens: `nao_util` — logo, capa, página vazia ou arte sem valor clínico
  autônomo; registro preservado, sem excluir o objeto.
- 0 imagens permanecem `revisao_pendente` neste lote.

Nenhum diagnóstico foi inventado: o campo de diagnóstico permanece dependente
da legenda/fonte e de revisão clínica posterior. A aprovação `util` significa
utilidade visual para estudo pessoal, não licença de redistribuição.

## Privacidade e destino

Todo o lote permanece privado, com RLS por proprietário e URL assinada de curta
duração. Capturas comerciais e imagens sensíveis não foram copiadas para
`public/`, GitHub Pages ou o bundle estático. A biblioteca permite filtrar por
disciplina, tema, subtema, patologia/achado, fonte, modalidade, origem/privacidade
e estado da triagem, além de abrir a imagem em tela ampliada com link de retorno
ao resumo.

## Lote neuropsiquiátrico — 2026-08-14

- 20 páginas candidatas foram renderizadas a partir do cache Markdown/PDF e
  revistas visualmente: Psiquiatria Clínica p. 92, 97, 99, 100 e 102;
  Síndromes Demenciais p. 39, 68, 107, 110 e 111; Neuroanatomia Clínica
  p. 55, 56, 67, 75, 78, 97, 99, 101, 102 e 103.
- Cada página recebeu SHA-256 do recorte e do PDF de origem, modalidade,
  disciplina, tema, subtema e destino `private`. Os três hashes de PDF estão
  no manifesto privado `manifest-neuropsiquiatria-completo-20260814.json`.
- 20 novos objetos foram importados de forma idempotente; somados aos 40
  anteriores, o lote tem 60 itens neuropsiquiátricos, todos com `subtema_id`
  válido e status `util`.
- A reconciliação global vinculou todos os 347 itens `util` e 21
  `contextual` a um `subtema_id` válido; dois itens `nao_util` sem
  correspondência foram mantidos sem vínculo e não aparecem como material de
  estudo.
- A taxonomia privada passou a incluir os nós de Psiquiatria e Neuroanatomia
  necessários para que nenhum item fique em “Acervo privado/Triagem pendente”.
- A migração `20260814140000_contexto_midia_privada.sql` acrescentou
  `periodo` e `caso` opcionais ao catálogo; a API privada confirmou os dois
  campos, mantendo nulos nos itens antigos até validação manual.
- A síntese autoral existente foi revisada contra as referências de diretriz
  registradas nos conteúdos; nenhum recorte comercial foi copiado para o
  repositório público. As páginas comerciais continuam apenas como apoio
  visual autenticado e com direitos não transferidos.

## Evidências privadas

- Manifesto principal: `Desktop/MEDICINA/_private-corpus/drive-lote-20260801/image-manifest.json`.
- Backup do manifesto antes da conversão: `image-manifest.json.bak-20260814`.
- Lotes semanais: `Desktop/MEDICINA/_private-corpus/semana-20260809/`.
- Script de triagem: `scripts/triage-private-media.mts`.
- Script de aplicação auditável: `scripts/apply-private-media-visual-review.mts`.
- Catálogo baixado para revisão local: `Desktop/MEDICINA/_media-review/20260814-visual-validation/catalogo.json`.
- Backup anterior à aplicação: `catalogo-before-visual-review-20260814.json`.

## O que ainda é pendência

- Revisar manualmente apenas os vínculos sem correspondência clínica perfeita
  (os filtros e links já estão estruturados; a aprovação final da legenda é
  uma etapa editorial futura).
- Substituir, quando houver lacuna real, imagens comerciais por equivalentes de
  licença aberta antes de qualquer uso público.
- Fazer QA autenticado no navegador para login, logout, expiração de URL,
  sessão de outro usuário e exclusão; os testes de storage/admin deste lote
  confirmam apenas presença e HTTP 200 de URLs assinadas.

## Auditoria de figuras públicas

O script `scripts/audit-public-figure-anchors.mts` confirmou 77/77 figuras
públicas com âncora navegável em `Minha mídia` para um subtema de estudo. A
âncora não transforma imagem privada em pública: o catálogo público contém
somente diagramas autorais e imagens com crédito/licença declarados.

## Portão técnico

`npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run audit:privacidade`,
`npm.cmd run audit:questoes`, `git diff --check` e a auditoria de figuras
passaram. O artefato de exportação registra 413 páginas estáticas.

### Reteste após os vínculos neuropsiquiátricos

- O mapeamento foi ajustado para que todos os 49 `subtemaId` referenciados por
  `Minha mídia` tenham rota existente em `out/estudar` (0 rotas ausentes).
- O reteste atual passou em typecheck, lint, auditoria de figuras (77/77),
  privacidade, questões e `git diff --check`.
- O reteste final com timeout ampliado concluiu normalmente: `next build`
  compilou, gerou 413/413 páginas estáticas e encerrou com código 0.
- O smoke test local `npm.cmd run audit:rotas:local` passou nas oito rotas
  principais, com HTTP 200 e sem erros/IDs duplicados/imagens sem alt.
