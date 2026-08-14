# Plano de execucao das pendencias adicionais (2026-08-14)

Este documento registra as novas demandas e define a ordem de execucao. Nesta
primeira rodada nao foi criado jogo, lote de cards ou novo conteudo clinico:
primeiro foi feita a analise do estado real, para evitar duplicacao e material
sem fonte.

## Estado atual

- O site ja possui 37 disciplinas publicas, 234 resumos, 1.332 questoes,
  56 casos e 77 figuras publicas ancoradas.
- A matriz publica tem 304 subtemas: 70 sem resumo, 149 sem questao e 266 sem
  caso. Essas lacunas orientam qualquer expansao.
- A biblioteca privada tem 379 objetos revisados, separados por origem,
  disciplina, subtema, modalidade e privacidade.
- O mapa curricular privado reconhece 37 componentes do curso, mas o mapa
  granular detalha apenas 26. Faltam BBPM V/VI, Bases Complementares I-VI,
  Topicos Especiais em Saude I/IV e Topicos em Saude da Mulher.
- HCPM VI nao sera uma fila separada: acompanha BBPM VI e so recebe diferencas
  quando houver fonte concreta.
- Anki esta pausado. Nenhuma escrita sera feita ate nova autorizacao.

## Etapa 1 — fechar os vinculos curriculares (P0/P1)

1. Obter/confirmar os 11 planos privados ainda sem mapa granular.
2. Converter PDFs para Markdown antes da leitura e preservar marcadores de
   pagina/aula.
3. Extrair objetivos, modulos, aulas, praticas e avaliacao.
4. Relacionar cada subtema a um ID publico existente ou marcar como lacuna.
5. Relacionar resumo, questao, caso, mapa e midia por IDs estaveis.
6. Validar manualmente candidatos no painel privado, sem aplicar automaticamente.

Conclusao objetiva: 37 componentes reconciliados, 37/37 com estado, cada
subtema com evidencia, vinculos sem orfaos e dry-run do importador aprovado.

## Etapa 2 — ciencias basicas integradas

Criar uma camada reutilizavel para Anatomia, Neuroanatomia, Histologia,
Embriologia, Fisiologia, Fisiopatologia, Bioquimica, Imunologia, Microbiologia,
Parasitologia, Patologia e Farmacologia. A farmacologia deve incluir
farmacocinetica, farmacodinamica, interacoes, AINEs, analgesicos, corticoides,
antimicrobianos, antifungicos, antivirais, antiparasitarios, anticoagulantes,
antiagregantes, drogas cardiovasculares e psicofarmacos.

Cada modulo sera ligado a aplicacao clinica, por exemplo:
fisiologia renal -> lesao renal -> diureticos; anatomia do ouvido -> otite ->
audiometria -> tratamento.

Conclusao objetiva: cada modulo tem objetivo, resumo curto, pelo menos uma
questao e um link clinico, com fonte atual e sem copiar PDF comercial.

## Etapa 3 — acervo visual

1. Priorizar lacunas OMED e do semestre atual.
2. Buscar anatomia, RX, TC, RM, ultrassom, histologia, patologia,
   procedimentos e sinais clinicos em fontes universitarias e licenciadas.
3. Revisar imagens existentes e substituir apenas as pouco didaticas.
4. Registrar origem, pagina, autor, licenca, modalidade, alt text, subtema e
   ponto de interpretacao.
5. Manter imagens comerciais/pacientes somente na biblioteca autenticada.

Conclusao objetiva: nenhum item sem origem ou licenca, todos com ancoragem a
subtema, legenda, alt text, dimensoes verificadas e QA de acesso.

## Etapa 3A — mapas e resumos do Estrategia MED

Esta fila e privada e separada do conteudo ja integrado. Para cada candidato:

1. inventariar nome, pasta, MIME, tamanho, data e tema;
2. comparar hash com o acervo local e preservar uma copia canonica;
3. converter PDF para Markdown antes da leitura;
4. aplicar OCR/renderizacao apenas em paginas necessarias;
5. identificar mapas mentais, resumos e figuras clinicas;
6. classificar por disciplina, periodo, subtema e prioridade OMED;
7. deduplicar contra resumos, questoes, casos e mapas atuais;
8. gerar apenas sintese autoral quando houver lacuna real e fonte clinica
   vigente;
9. manter o original comercial e seus recortes no armazenamento autenticado.

Conclusao objetiva: cada arquivo tem estado inventariado/convertido/analisado/
integrado, hash, origem, paginas relevantes, destino permitido e nenhum texto
comercial bruto no site publico.

## Etapa 4 — conteudo clinico

Preencher lacunas comprovadas na ordem Infectologia, GO, Pediatria,
Cirurgia/MFC, Cardio/Neuro/Pneumo, Nefro, Gastro/Endocrino/Hemato,
Onco/ORL/Reumato/Derma. Cada lote deve conter resumo, questoes, caso e
referencias atuais quando a lacuna justificar.

Conclusao objetiva: auditoria sem duplicata, comentario curto, fonte especifica,
gabarito revisado e ligacao a disciplina/subtema.

## Etapa 5 — jogo de diagnostico clinico

Criar uma rota separada, sem alterar o quiz existente:

- caso inicialmente oculto;
- cinco tentativas;
- uma dica progressiva a cada erro;
- dica 1: epidemiologia/risco;
- dica 2: sindrome/sintoma;
- dica 3: exame fisico;
- dica 4: laboratorio/imagem;
- dica 5: achado discriminativo;
- encerramento com diagnostico, justificativa, fisiopatologia, clinica,
  exames, diferenciais, tratamento, complicacoes, erros de raciocinio e
  revisao rapida;
- desempenho salvo por usuario somente depois de RLS e retencao serem testados.

Conclusao objetiva: casos com gabarito revisado, dicas monotonicamente
discriminativas, limite de cinco tentativas, estados de erro/vazio e teste de
persistencia sem expor conteudo privado.

## Etapa 6 — Anki (depois da autorizacao)

Nao executar agora. Quando liberado:

- cards curtos e atomicos, priorizando active recall;
- dividir textos extensos;
- organizar por ciclo, area, disciplina e tags de eixo;
- usar somente fatos validados do site e diretrizes atuais;
- usar Cloze/Image Occlusion apenas quando fizer sentido e houver direitos;
- gerar a partir de erros reais, com deduplicacao e backup antes de cada lote.

Conclusao objetiva: lote piloto revisado, sem cards longos/redundantes,
referencia por card, exportacao APKG/CSV e restauração testada.

## Etapa 7 — design e experiencia

Auditar todas as rotas e padronizar hierarquia, tipografia, espacos, estados
concluido/em andamento/bloqueado, filtros persistentes, claro/escuro, teclado,
zoom 200%, celular, carregamento progressivo, vazio e erro recuperavel.

Conclusao objetiva: roteiro visual aprovado, Lighthouse/axe sem achados
criticos, teclado e celular testados manualmente, bundle medido antes de
dependencias novas.

## Ordem e dependencias

Curriculo e Markdown -> lacunas clinicas -> imagens ancoradas -> jogo ->
Anki -> redesign fino -> release. O jogo depende de casos revisados; Anki
depende de conteudo estavel; redesign amplo fica depois da arquitetura.

## Portoes de cada lote

1. Fonte e direitos identificados.
2. Privacidade revisada.
3. IDs e vinculos validados.
4. Auditorias locais aprovadas.
5. QA visual quando houver interface.
6. Commit, deploy e evidencia registrados.

## Fontes de verdade

- docs/VALIDACAO-VINCULOS-SISCAD-2026-08-14.md
- docs/PENDENCIAS-MESTRAS.md
- docs/MATRIZ-COBERTURA-CLINICA-2026-08-14.md
- docs/PLANO-EXPANSAO-ACERVO-VISUAL-2026-08-14.md
