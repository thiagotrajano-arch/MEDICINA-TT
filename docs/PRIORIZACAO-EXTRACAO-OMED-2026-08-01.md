# Priorizacao corrigida das extracoes - Raio-X OMED

## Fonte de prioridade

O `docs/AI-HANDOFF.md` registra a ordem baseada na releitura das provas OMED II-V:

1. Cardiologia (16 temas) - cobertura publicada; extrair apenas para enriquecimento ou lacuna comprovada.
2. Neurologia (14 temas) - cobertura publicada; extrair apenas para enriquecimento ou lacuna comprovada.
3. Pneumologia (13 temas) - cobertura publicada; extrair apenas para enriquecimento ou lacuna comprovada.
4. Nefrologia (9 temas no Raio-X; 7 temas no resumo Drive identificado) - prioridade de extração atual.
5. Gastroenterologia e Endocrinologia (aprox. 8 temas cada) - próximo lote.
6. Hematologia (7 temas) - depois do lote Nefro/Gastro/Endo.
7. Oncologia e Otorrino (6 temas cada).
8. Reumatologia e Dermatologia (4 temas cada).

GO e Pediatria já têm cobertura real e não devem receber extração em massa antes de lacuna comprovada.

## Resultado da revisão do Drive

- Nefrologia: localizado `Resumo_Absoluto_Nefrologia_HematoOnco_OMED_VI (1).pdf`, com 7 temas de Nefro e 7 de Hemato/Onco. O texto extraído confirma DRC/diálise, histopatologia glomerular, litíase, IRA, síndromes glomerulares, distúrbios hidroeletrolíticos e HAS renovascular.
- Endocrinologia: localizados materiais de fisiologia, avaliação tireoidiana e hipotireoidismo. O primeiro recorte cobre Wolff-Chaikoff/Jod-Basedow, transporte de T3/T4, gravidez e ações sistêmicas.
- Gastroenterologia: materiais seguem como lote posterior, não como prioridade número um.
- Cardiologia/Neurologia/Pneumologia: mantidos como enriquecimento dirigido, pois o site já possui cobertura dos temas OMED principais.

## Ordem operacional corrigida

1. Extrair e converter o resumo OMED de Nefrologia para Markdown privado.
2. Mapear seus 7 temas aos subtemas existentes e às 48 questões sem fonte quando houver correspondência.
3. Extrair o lote de Endocrinologia de maior retorno OMED.
4. Extrair Gastroenterologia, priorizando as questões sem fonte e as lacunas do manifesto.
5. Só depois fechar Hematologia/Oncologia e demais áreas.

Materiais comerciais/protegidos permanecem exclusivamente privados; não entram no site público.

## Sessão longa - Nefrologia concluída

- O resumo privado foi estruturado no acervo privado local e referenciado pelo manifesto sanitizado.
- Os 7 temas foram ligados aos 3 temas atuais de Nefrologia e às expansões necessárias de taxonomia.
- O lote foi relacionado a Clínica Médica e às interfaces de Fisiologia Renal, Patologia, Farmacologia, Cardiologia e Endocrinologia.
- Próximo trabalho: mapear questões Nefro e preencher fontes verificáveis; só depois expandir os três subtemas novos.
