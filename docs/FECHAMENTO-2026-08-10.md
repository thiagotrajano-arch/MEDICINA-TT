# Fechamento operacional — 2026-08-10

Este documento registra o estado verificável do lote de currículo, agenda,
Anki, questões e mídia privada. Ele não contém credenciais, identificadores da
conta, caminhos do corpus privado nem conteúdo de materiais comerciais.

## Resultado entregue

- Foi criada uma camada curricular autenticada e granular para os 26
  componentes pedidos: BBPM I, II, III, IV, VII e VIII; HCPM I–VIII; APS I–VI;
  Cirurgia I–III; e Urgência/Emergência I–III.
- A hierarquia privada contém 55 módulos e 374 temas/subtemas. Cada item guarda
  evidência, situação de estudo, prioridade OMED, modalidades visuais desejadas
  e bancos de questões recomendados.
- O manifesto só cria links para conteúdo público realmente existente: 64
  resumos e 58 destinos de questões foram validados contra a taxonomia. As 276
  lacunas restantes são mostradas como lacunas; a interface não amplia
  silenciosamente a busca para outra matéria.
- HCPM VI permanece sem conteúdo inventado. O plano consultado ainda não estava
  aprovado/disponível e deve ser reconsultado.
- O painel privado ganhou busca, índice dos 26 componentes, filtros por período,
  categoria, estado, prioridade OMED e evidência, além de atalhos separados
  para resumo, questões e mídia.
- Agenda e Semana atual agora levam diretamente ao resumo e à fila de questões
  do tema. O ciclo privado tem 12 semanas, 84 eventos e 138 tarefas, incluindo
  revisão do semestre atual, matérias anteriores e três blocos OMED por semana.
- O banco de questões reconhece as filas Geral, Imagens, OMED e
  Residência/Revalida. O banco de imagens exige figura real; uma lacuna não é
  preenchida com questões sem imagem.
- O tipo de questão passou a aceitar metadados estruturados de banco, prova,
  instituição e ano. O corpus atual ainda precisa ser migrado desses rótulos
  textuais para os campos estruturados.

## Distinção curricular que deve ser preservada

- **37 componentes** é a visão institucional resumida do histórico/período
  atual anteriormente catalogada: 30 concluídos e 7 atuais.
- **26 componentes** é o recorte profundo solicitado nesta etapa, organizado em
  módulos e subtemas para revisão longitudinal.
- Um número não substitui o outro. O painel granular complementa a visão de 37
  componentes; ele não deve apagar nem publicar o histórico individual.

## Agenda e PDFs recebidos diariamente

- Todo PDF novo deve seguir a ordem `arquivo privado → Markdown privado →
  leitura/triagem → vínculo com a semana → revisões D+1, D+7 e D+21`.
- O evento principal entra no dia de estudo; as revisões espaçadas entram na
  fila semanal, evitando poluir o calendário.
- A entrada deve registrar apenas metadados privados verificáveis: origem,
  hash, páginas, disciplina, tema, subtema e destino. Binário, Markdown
  comercial e hash não entram no Git nem no bundle público.
- A carga semanal não deve crescer sem limite. O mapa de 374 tópicos é backlog;
  a agenda ativa deve puxar somente o foco da semana, OMED, erros e revisões já
  vencidas.

## Anki — estado real

- A coleção foi preservada em backups `.apkg` antes da reorganização.
- Permanecem 2.830 cartões no total: 2.829 distribuídos em 16 decks canônicos
  por área e um cartão piloto separado. Nenhum cartão foi apagado.
- Foram movidos 1.126 cartões legados para decks curtos por disciplina e foram
  removidos somente 89 decks comprovadamente vazios.
- O FSRS está ativo com retenção desejada de 0,90, passos de aprendizagem de 1
  e 10 minutos, reaprendizagem de 10 minutos e limite de 25 novos por dia.
- O modelo `OMED Bonito` recebeu CSS responsivo claro/escuro. O Onigiri foi
  instalado e configurado com rótulos em português; a aparência final deve ser
  conferida após uma reinicialização normal do Anki.
- A auditoria editorial encontrou 14 grupos de duplicatas exatas, 14 grupos de
  equivalência normalizada, 4 grupos com a mesma frente e respostas diferentes,
  885 versos extensos e 90 cartões legados sem referência. Esses itens foram
  marcados para revisão; não houve deduplicação automática nem conversão em
  massa para Cloze/Image Occlusion.
- Próximo trabalho seguro no Anki: revisar por disciplina, preservando IDs e
  histórico; dividir somente cartões clinicamente validados em fatos atômicos;
  usar Cloze quando a omissão tiver contexto suficiente e Image Occlusion apenas
  em imagem revisada, anonimizada e com destino permitido.

## Mídia privada — teste funcional

- O catálogo remoto contém 379 registros e o bucket contém os 379 objetos
  correspondentes; não há registro apontando para arquivo ausente.
- A consulta autenticada, a geração de URL assinada e a leitura do objeto foram
  validadas. A camada privada está acessível sem tornar os arquivos públicos.
- Curadoria atual: 46 imagens úteis, 3 contextuais, 9 não úteis e 321 ainda
  pendentes de revisão visual.
- A interface privada ganhou filtros por disciplina, subtema, modalidade,
  origem e estado de triagem, além de abertura ampliada e retorno ao resumo.
- A biblioteca pública e a privada permanecem separadas. Material comercial é
  referência pessoal autenticada; imagem de paciente exige anonimização e
  autorização apropriada.

## Conteúdo clínico e questões — limite honesto

- A auditoria estrutural do banco está limpa: sem duplicações, comentários
  vazios/curtos, fontes ausentes ou contradições automáticas detectadas.
- Isso não equivale a revisão médica completa. Ainda falta resolver e conferir
  cada lote contra diretrizes primárias vigentes, começando por Infectologia,
  GO/Obstetrícia, Pediatria, Cirurgia/MFC e Cardio/Neuro/Pneumo.
- A cobertura visual segue insuficiente: somente uma fração pequena das
  questões possui figura real. A meta por subtema deve ser atendida por lacuna
  clínica comprovada, com modalidade e objetivo didático definidos, não por
  quantidade arbitrária.
- Provas oficiais do Revalida, ENARE, FMUSP/FUVEST e materiais de amostra do
  USMLE são a fila de proveniência preferida. Questões inéditas devem ser
  autorais e apenas depois de o resumo-base e o gabarito terem sido revisados.

## Ferramentas complementares

- OpenEvidence: localizar rapidamente evidência clínica e identificar fontes;
  a decisão final deve voltar à diretriz ou publicação primária.
- Gemini: comparar PDFs longos/multimodais e apontar páginas candidatas; não é
  autoridade clínica nem destino automático de material privado.
- Kimi: rascunhos de síntese, mnemônicos e comparação de contexto longo; toda
  afirmação médica precisa de validação independente.
- Chagas IA: integrar somente quando o usuário fornecer a saída e a origem.

## Pendências reais em ordem

1. Corrigir e validar o restore do backup Supabase; o dump existe, mas
   PostgreSQL stock não possui a extensão `supabase_vault`.
2. Fazer QA autenticada de login, recuperação, expiração, sincronização,
   Agenda/Semana e navegação dos 26 componentes.
3. Reconsultar HCPM VI e validar manualmente os vínculos candidatos dos planos.
4. Migrar metadados textuais das questões para banco/prova/instituição/ano e
   revisar os lotes clínicos por diretrizes atuais.
5. Curar visualmente as 321 mídias pendentes e só então criar o banco de
   questões por imagem e as ligações imagem–resumo–caso.
6. Revisar os 885 cartões extensos, 90 sem referência e grupos duplicados do
   Anki, por disciplina e sem apagar histórico.
7. Substituir a sincronização Agenda–Semana por uma chave estável, em vez de
   depender de título e data.
8. Fazer o importador curricular relatar e reconciliar registros obsoletos sem
   apagá-los automaticamente.
9. Completar mapas conceituais reais com relações nomeadas, setas, casos,
   imagens, questões e referências.
10. Executar Lighthouse, axe/WCAG, QA móvel e testes de produção a cada lote.

## Portão de publicação

Antes de publicar: `typecheck`, `lint`, auditoria de questões, auditoria de
privacidade, `git diff --check`, build completo e conferência do artefato. A
publicação só inclui código, conteúdo autoral/revisado e documentação
sanitizada; os dados curriculares, PDFs, capturas comerciais, backups e
manifestos privados permanecem fora do GitHub Pages.
