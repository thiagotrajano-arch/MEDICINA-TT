# Plano integrado — Anki, mídia, OpenEvidence e experiência

Atualizado em 2026-08-13. Este plano organiza a próxima fase sem liberar
material privado/comercial no site público e sem apagar histórico de estudo.

## Diagnóstico atual

- O banco público tem 1.332 questões estruturalmente auditadas. A cobertura
  clínica, os resumos, os mapas e a mídia ainda precisam ser comparados por
  lacuna real antes de crescer em volume.
- O Anki possui 2.829 cartões preservados em uma árvore `MEDICINA` e um backup
  `.apkg` com agendamentos. A estrutura está pronta; a edição didática é a
  próxima tarefa. Não haverá reescrita ou exclusão em massa.
- A mídia pública já publicada continua disponível. As novas imagens de fontes
  comerciais ou sensíveis são candidatas **privadas**, não um lote pronto para
  publicação. Cada uma precisa de contexto, origem/página, modalidade,
  subtema, anonimização, destino e teste de URL assinada.
- A inspeção funcional autenticada de Início, Questões, Meu Curso, Minha Mídia
  e Mapas não mostrou erros de console. Isso não substitui QA de interação,
  acessibilidade, celular ou sessão expirada.
- O protótipo privado criado no Lovable é apenas uma referência visual sem
  dados clínicos, autenticação ou integração. O repositório permanece a fonte
  de verdade.

## Frente A — Anki útil e sustentável

### Arquitetura

1. Manter poucos decks: `MEDICINA > Ciclo Básico/Clínico > área > disciplina`.
2. Usar tags para subtema, eixo clínico, semestre, OMED, fonte e estado; não
   criar um deck por aula, tema ou cartão.
3. Tratar o subtema como unidade de estudo: epidemiologia, fisiopatologia,
   sinais/sintomas, diagnóstico, tratamento, complicações e erro pessoal.

### Regra editorial por cartão

1. Pergunta atômica, com um único ponto recuperável e contexto suficiente.
2. Frente curta; resposta objetiva; uma fonte e data quando a conduta for
   sensível a diretriz.
3. Cloze somente para relações pontuais, sem esconder uma frase inteira.
4. Image Occlusion somente para imagem licenciada, original ou privada
   aprovada/anônima; sempre com legenda e ponto anatômico/clínico explícito.
5. Converter versos longos gradualmente por área, começando por duplicatas e
   ambiguidade, preservando IDs e histórico de revisão.

### Ordem de execução

1. Backup e snapshot; revisar as 14 duplicatas exatas e 4 frentes ambíguas.
2. Cardio, Neuro e Pneumo: revisar os cartões mais longos e mapear lacunas
   comprovadas pela matriz clínica/OMED.
3. Depois GO, Pediatria, Infectologia, Cirurgia/MFC; por último as demais
   áreas. Em cada lote: prévia, deduplicação, AnkiConnect local, snapshot e
   revisão no aplicativo.
4. Ligar o progresso ao site somente por exportação local segura; o site nunca
   acessa AnkiConnect diretamente.

## Frente B — lançamento responsável de imagens

1. Reconciliar os três manifestos privados (216/282/379 registros) e eliminar
   candidatos duplicados antes de qualquer upload.
2. Escolher lacunas visuais prioritárias por OMED e semestre: radiografia,
   tomografia, RM, anatomia, sinais e padrões clínicos com real utilidade de
   decisão.
3. Para cada figura: registrar documento/página ou fonte aberta, hash,
   modalidade, achado, diagnóstico, disciplina, subtema, licença/crédito,
   anonimização, alt text e links para resumo, questão e caso.
4. Publicar apenas imagem própria ou com licença aberta verificável, com
   crédito. Enviar imagens comerciais ou sensíveis somente para o bucket
   privado, sob RLS e URLs curtas.
5. Fazer lançamento em lotes pequenos: 20 figuras privadas bem classificadas
   e um lote público somente se os direitos estiverem confirmados. Testar
   visualização, tela cheia, expiração, logout, troca de usuário e ausência de
   arquivo antes de chamar o lote de pronto.

## Frente C — OpenEvidence como apoio editorial, não atalho clínico

1. Criar no processo editorial um registro: pergunta clínica, data, síntese
   do achado, diretriz/artigo primário confirmado, data de revisão e próximo
   revisor.
2. Usar OpenEvidence para localizar evidência atual e hipóteses de atualização;
   a fonte citada no site deve continuar sendo a diretriz, artigo ou órgão
   primário verificável.
3. Não enviar PDF comercial, imagem de paciente, dados do SISCAD, prontuário ou
   credenciais a ferramentas externas.
4. Não há API pública/documentação de desenvolvedor confirmada nesta auditoria.
   Se houver acesso formal e documentação futura, avaliar um conector privado
   server-side/Edge Function, com chave em segredo, limite de uso, logs mínimos
   e revisão humana. Sem isso, manter o fluxo manual com links de pesquisa.

## Frente D — experiência e design

### Direção visual a prototipar e aprovar

- Estética clínica serena: superfícies neutras frias, texto grafite/azul-escuro,
  acento teal para ação, âmbar para revisão e verde discreto para domínio.
- Tipografia de leitura longa, contraste AA, foco de teclado visível, alvos de
  toque de pelo menos 44 px e modo claro redesenhado sem excesso de sombras.
- Navegação por intenção: Hoje, Aprender, Praticar, Revisar, Meu Curso, Minha
  Mídia e Mapas. No celular, manter ações principais acessíveis sem poluir a
  tela.

### Sequência

1. Rodar Lighthouse/axe/WCAG, teclado, zoom 200%, celular e fluxos de erro.
2. Medir bundle e imagens; corrigir achados confirmados antes de dependências
   visuais novas.
3. Criar telas de referência para início, questão, resumo, mídia, mapa e curso
   usando o plano do Lovable apenas como benchmark, sem copiar código/dados.
4. Aprovar a proposta visual e então implementar em componentes reutilizáveis,
   preservando rotas, progresso e conteúdo atual.

## Critérios de aceite

- Anki: backup restaurável, nenhuma exclusão involuntária, cards revisados por
  lote, identificação de fonte e verificação no aplicativo.
- Mídia: proveniência, direitos/privacidade, âncora didática e testes de acesso
  documentados por figura.
- OpenEvidence: nenhuma automação sem acesso/documentação formal; toda afirmação
  clínica com fonte primária e data de revisão.
- Design: contraste, teclado, celular, desempenho e estados vazio/erro/
  carregando validados antes da publicação.
