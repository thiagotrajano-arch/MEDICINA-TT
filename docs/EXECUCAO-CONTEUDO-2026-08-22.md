# Execução de questões, lacunas e mídia privada — 2026-08-22

## Resultado

Foi executado o lote seguro de conteúdo sem publicar questões locais, sem
inventar material clínico e sem expor mídia privada.

### Questões

- Catálogo local: 1.371.
- Catálogo remoto: 1.072.
- Candidatas locais ausentes no remoto: 291.
- Estado da reconciliação: 291 `novo`, 0 duplicadas por conteúdo e 0 em revisão
  estrutural automática.
- A fila editorial foi materializada em
  `exports/private/fila-conteudo-privada-2026-08-22.json`.
- Nenhuma candidata foi inserida no Supabase. Antes disso, cada questão ainda
  precisa de revisão de proveniência, gabarito, explicação, fonte e licença.

### Lacunas

A fila foi calculada pelo `subtemaId` exato, sem inferência por nome:

- 69 subtemas sem resumo;
- 146 sem questão;
- 265 sem caso;
- 270 subtemas com pelo menos uma dessas lacunas.

A prioridade registrada no artefato é OMED + alto rendimento + ausência de
resumo + ausência de questão + ausência de caso. Isso organiza o trabalho, mas
não autoriza escrever conteúdo clínico sem fonte primária vigente.

### Micro-lote editorial concluído

Foi adicionado um micro-lote autoral de Infectologia para o subtema de
reconhecimento e soroterapia em acidentes por animais peçonhentos: 4 questões
e 1 caso clínico em etapas, todos com fonte do Ministério da Saúde/PCDT,
gabarito, comentários, tags e vínculo taxonômico. Nenhuma dose foi fixada fora
do PCDT vigente e do protocolo do serviço.

Em seguida, foi fechado o lote autoral de GO para o subtema
`go--infeccoes-congenitas-storch--sifilis-toxoplasmose-cmv-rubeola`: 4 questões
e 1 caso clínico em etapas, com rastreabilidade para páginas e protocolos do
Ministério da Saúde sobre sífilis gestacional/congênita, toxoplasmose e
síndrome da rubéola congênita. O lote cobre rastreamento, critérios de
tratamento adequado, interpretação contextualizada de sorologia para
toxoplasmose e vacinação contra rubéola; não foi usado para preencher lacunas
de CMV sem fonte específica no mesmo lote.

Na sequência, foi fechado o primeiro recorte de MFC/Rastreamentos
populacionais: resumo-base, 4 questões e 1 caso clínico. O recorte atualiza a
diferença entre rastreamento e investigação diagnóstica, registra a diretriz
brasileira de DNA-HPV para colo do útero, a faixa prioritária de mamografia
divulgada pelo INCA em 2025 e os riscos de falso positivo e sobrediagnóstico.
O rastreamento colorretal foi deixado fora deste lote porque a diretriz
nacional ainda está em consolidação/consulta pública no snapshot consultado.

### Mídia privada e fontes convertidas

- Manifesto canônico examinado: `drive-lote-20260801/image-manifest.json`.
- Entradas elegíveis na triagem: 215 imagens JPG/PNG.
- Atualizações no catálogo privado: 215.
- Erros: 0; faltantes: 0; conversões pendentes: 0.
- Capas/branding foram tratadas como contextuais; as demais permanecem em
  revisão visual pendente até validação humana.
- Dois registros privados continuam sem vínculo seguro de subtema.
- Um lote local adicional de 15 PDFs foi convertido para Markdown privado: 12
  com texto, 1 parcial e 2 com estrutura inválida.
- O lote privado `block-200-20260801` foi convertido/atualizado: 139 arquivos,
  70 com texto, 56 parciais, 1 imagem e 12 com erro estrutural.

## QA executado

- `npm.cmd run content:prepare-queues` — passou.
- `npm.cmd run typecheck` — passou.
- `npm.cmd run audit:questoes` — passou; sem duplicidades, comentários vazios,
  fonte ausente ou gabarito contraditório automático; permanecem 20 comentários
  curtos em 13 questões.
- `npm.cmd run audit:privacidade` — passou; 346 arquivos públicos e 3
  curriculares verificados.
- `npm.cmd run audit:anon-surface` — passou; 4 tabelas privadas retornaram 401
  e zero linhas para anônimo.
- `npm.cmd run audit:sync-conflict` — passou.
- `npm.cmd run audit:estado-estudo` — passou; RLS ativa, 138 registros, um
  proprietário e estados válidos.
- `npm.cmd run audit:cobertura` — passou; 311 subtemas, 242 resumos, 1.371
  questões e 64 casos vinculados.

## Próximo passo bloqueado por curadoria

O próximo lote clínico deve começar pelos itens de maior prioridade da fila,
com fontes atuais e revisão editorial individual. A publicação das 291 questões
e a validação clínica das imagens não devem ser automatizadas em massa.
