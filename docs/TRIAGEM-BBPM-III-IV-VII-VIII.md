# Triagem BBPM III, IV, VII e VIII — 2026-07-28

## Método e escopo

Triagem realizada somente nos Markdown e manifestos em `Desktop\MEDICINA\_md-cache`. Nenhum PDF foi relido. Foram inspecionados inventário, qualidade da conversão, pastas temáticas e uma amostra curta de fonte elegível por bloco. Livros comerciais e tratados foram excluídos do pipeline editorial.

## Inventário

| Bloco | Markdown | Qualidade registrada no manifesto | Núcleo útil | Limites principais |
|---|---:|---|---|---|
| BBPM III | 39 | 37 texto; 1 parcial; manifesto | tutorias, integrada, anatomia/histologia reprodutiva, imunologia e genética | contém livros comerciais; não reutilizar esses textos |
| BBPM IV | 63 | 54 texto; 7 parciais; 1 imagem; 1 erro; 1 ignorado por tamanho | HIV, malária, IST, síndromes gripais, parasitologia, dermatologia e provas integradas | recomendações clínicas precisam de confronto com diretrizes atuais |
| BBPM VII | 34 | 16 texto; 12 parciais; 5 imagens; 1 ignorado por tamanho | ECG, síndrome coronariana/IAM, cardites, febre reumática, pericardites e anticoagulação | vários slides sem camada textual suficiente; OCR/reexportação sob demanda |
| BBPM VIII | 55 | 47 texto; 7 parciais; manifesto | Hematologia, Oncologia, Otorrino, Dermatologia, Imunologia e tutorias | sobreposição alta com conteúdo já integrado pelo Claude; comparar antes de escrever |

## Amostras conferidas

1. **BBPM III — `resumo - integradinha 1[1].md`:** anatomia e histologia do sistema reprodutor feminino, com foco de prova. Destino: futura área `Meu Curso` e apoio curricular; não criar resumo clínico isolado sem fonte melhor.
2. **BBPM IV — `Síndromes gripais (1).md`:** introdução a IVAS, mecanismos de defesa e diferenciação inicial. Destino: cruzar com Infectologia/Pediatria e atualizar contra diretriz vigente antes de publicar.
3. **BBPM VII — `CADERNO TUTORIAS.md`:** conversão parcial; páginas iniciais sem texto, com trecho útil sobre anticoagulação. Destino: Cardiologia, mas somente após localizar fonte textual completa e revisar conduta atual.
4. **BBPM VIII — `resumo e questoes.md`:** semiologia otorrinolaringológica e tópicos de ouvido/equilíbrio. Destino: comparar com os quatro conteúdos de Otorrino já publicados e aproveitar apenas lacunas reais.

## Exclusões e duplicidades

- Excluir obras comerciais identificáveis, incluindo Thompson, Abbas e tratados/manuais de editora; podem orientar busca de diretriz, mas não alimentar cópia ou publicação.
- BBPM IV tem duas revisões integradas de 159 páginas quase do mesmo tamanho; tratar como provável duplicidade até comparação por seção.
- BBPM VIII tem `MELANOMA E NEOPLASIA T1` e `T1.1` com mesma extensão/contagem, além de versões repetidas de `Infecções de Via`; não importar as duas.
- A tentativa de hash global de todos os Markdown ultrapassou 120 segundos no ambiente. Antes de importar qualquer arquivo candidato, calcular hash apenas do pequeno grupo selecionado.

## Matriz de destino e prioridade

1. **Infectologia/BBPM IV:** maior prioridade, mas entra depois do portão editorial do banco existente.
2. **Cardiologia/BBPM VII:** ECG e SCA/IAM podem complementar temas existentes; material parcial exige seleção cuidadosa.
3. **Otorrino/Hemato/Onco/BBPM VIII:** primeiro deduplicar contra conteúdo já publicado e notas do Claude.
4. **BBPM III:** organizar na nova área `Meu Curso`; baixa prioridade para expansão OMED imediata.

## Decisão

Nenhum texto clínico, questão ou gabarito foi importado automaticamente. O passo 27 fecha como inventário e roteamento; a escrita futura continua condicionada a fonte verificável, deduplicação focal e revisão de atualidade.
