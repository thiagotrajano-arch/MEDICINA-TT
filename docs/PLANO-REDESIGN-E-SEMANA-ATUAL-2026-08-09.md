# Plano de redesign, arquitetura e semana atual — 2026-08-09

## Decisão desta rodada

O usuário autorizou iniciar a fase de design pelo planejamento. O objetivo não é
aplicar uma nova camada de cores sobre as páginas existentes. O Codex Medicus
deve se tornar um sistema pessoal de estudo médico orientado ao que precisa ser
feito hoje e nesta semana, preservando todo o conteúdo, progresso, autenticação,
acervo privado e histórico já existentes.

O usuário também informou que enviará PDFs diariamente. Todo novo PDF deverá ser
processado pela regra privada `PDF -> Markdown cacheado -> leitura seletiva` e
relacionado à semana vigente, às matérias em curso, aos subtemas, às revisões e
às lacunas reais. Um PDF novo não autoriza publicação automática nem cópia de
material comercial para o site público.

## Estado observado antes do redesign

### Pontos fortes que serão preservados

- 1.296 questões auditadas, resumos, casos e figuras já vinculados à taxonomia.
- Autenticação, progresso local-first e sincronização por conta.
- Biblioteca privada, agenda, curso privado e infraestrutura de URLs assinadas.
- Busca global, modo claro/escuro, rotas estáticas e navegação responsiva básica.
- Design tokens iniciais, Tailwind, ícones e Framer Motion já disponíveis.

### Problemas reais encontrados

1. A navegação global mostra muitas rotas e a árvore completa de disciplinas ao
   mesmo tempo. Isso compete com a tarefa de estudo atual.
2. O Dashboard privilegia contagens e métricas, mas não responde de forma clara
   “o que estudar agora?”.
3. `Meu curso`, `Agenda` e a atividade recente são áreas separadas. Não existe
   ainda uma entidade persistente de “semana atual” compartilhada entre elas.
4. Em produção, a agenda e o curso privado estão vazios. Portanto, o site não
   possui evidência suficiente para inferir sozinho a matéria atual; não se deve
   fabricar esse contexto.
5. A página de estudo usa muitos cartões equivalentes, não possui índice de
   seções persistente e coloca a anotação antes do conteúdo principal.
6. A página de questões expõe muitos filtros como chips simultâneos, aumentando
   a poluição visual.
7. Os mapas atuais melhoraram a apresentação, mas ainda derivam ramos genéricos
   dos títulos do resumo. Relações como “causa”, “confirma”, “contraindica” e
   “aumenta risco” precisam existir como dados editoriais reais.
8. `Minha mídia` mistura explicação, catálogo de fontes, formulário e imagens.
   A produção exibiu zero imagens para a sessão observada, embora o inventário
   remoto documentado seja maior; essa divergência funcional deve ser resolvida
   antes da reorganização visual definitiva.
9. No celular, a barra inferior cobre parte do conteúdo durante a rolagem e
   oferece apenas quatro destinos, sem representar a arquitetura completa.
10. O uso predominante de grandes superfícies azul-escuras torna páginas
    diferentes visualmente semelhantes e reduz a hierarquia.

## Referências e princípios

O plano absorve padrões, sem copiar identidade visual:

- AMBOSS: biblioteca e banco de questões interligados, planos de estudo e
  alternância entre conteúdo completo e alto rendimento.
- Osmosis: agenda de estudo, acompanhamento, perguntas e repetição espaçada
  conectados à mesma jornada.
- WCAG 2.2: navegação por teclado, foco visível e não encoberto, alvos de toque,
  autenticação acessível, contraste e redução de movimento.

Princípios do Codex Medicus:

1. A próxima ação deve ser mais visível que a estatística.
2. Uma informação deve ter um único lugar principal e links contextuais.
3. O usuário escolhe a profundidade: visão rápida, alto rendimento ou estudo
   completo.
4. Disciplina, tema, subtema, semana, fonte e progresso usam a mesma taxonomia.
5. Público, privado e comercial permanecem distinguíveis por metadados e acesso,
   sem criar três experiências desconectadas.
6. Nenhuma migração destrutiva, mudança clínica ou publicação será misturada ao
   primeiro lote visual.

## Arquitetura de informação alvo

### Cinco áreas principais

1. **Hoje**
   - Semana atual e foco fixado.
   - Próxima ação recomendada.
   - Aulas, provas e compromissos de hoje.
   - Revisões vencidas, erros e retomada exata.
   - PDFs recebidos/processados recentemente.
   - Métricas resumidas, em segundo plano.

2. **Conhecimento**
   - Biblioteca por disciplina, tema e subtema.
   - Resumos, casos e ciências básicas relacionadas.
   - Modo de leitura e busca clínica.
   - Mapas conceituais ligados ao conteúdo.

3. **Treino**
   - Questões novas.
   - Questões erradas.
   - Revisão espaçada.
   - Simulados e análise de desempenho.

4. **Acervo**
   - Caixa de entrada de PDFs.
   - Fontes já processadas.
   - Mídia clínica pública e privada em uma interface com permissões claras.
   - Filtros por disciplina, tema, subtema, modalidade, origem, licença,
     privacidade, semana e status de triagem.

5. **Meu curso**
   - Semestre atual.
   - Matérias já cursadas.
   - Plano longitudinal.
   - Semana e calendário.
   - Lacunas, materiais relacionados e próximos estudos.

### Navegação

- Desktop: barra lateral recolhível com apenas as cinco áreas. A navegação
  específica aparece dentro da área ativa; a árvore completa de disciplinas sai
  do shell global.
- Celular: barra inferior com cinco destinos, rótulos curtos, área segura e
  espaço inferior que impeça sobreposição.
- Busca: `Ctrl/Cmd+K` e botão global pesquisam conteúdo, fonte, imagem, questão
  e tarefa. Resultados são agrupados por tipo e privacidade.
- Breadcrumbs: refletem área -> disciplina -> tema -> subtema, sem repetir o
  título da página.
- Retorno: cada estudo mantém o ponto anterior e oferece “continuar de onde
  parei”.

## Direção visual

### Conceito

**Editorial clínico calmo:** aparência de ferramenta médica confiável, com
clareza de leitura, alta densidade quando necessária e pouca decoração.

### Sistema de cor

- Fundo claro padrão: cinza quente muito claro.
- Superfície: branco neutro.
- Texto: grafite profundo.
- Identidade: azul-petróleo escuro.
- Ação primária: verde clínico contido.
- Sucesso, alerta e erro usam cores semânticas exclusivas.
- Cores por especialidade aparecem somente em chips, ícones, linhas de gráfico e
  ramos de mapas; não tingem páginas inteiras.
- Tema escuro permanece, com contraste controlado e superfícies em camadas, não
  preto puro nem excesso de ciano.

### Tipografia e densidade

- Manter Inter no primeiro lote para não aumentar dependências.
- Corpo de leitura entre 16 e 18 px, largura máxima aproximada de 72 caracteres.
- Escala de títulos curta e consistente; caixa-alta apenas em metadados.
- Espaçamento baseado em 4/8 px, cartões com raios moderados e sombras discretas.
- Modos confortável e compacto apenas onde a densidade realmente muda.

### Componentes base

`Button`, `IconButton`, `Input`, `Select`, `Combobox`, `Tabs`,
`FilterDrawer`, `Card`, `Metric`, `Badge`, `Progress`, `Skeleton`,
`EmptyState`, `ErrorState`, `Toast`, `Dialog`, `Sheet`, `DataList`,
`QuestionCard`, `StudySection`, `MediaViewer` e `MindMapCanvas`.

Cada componente terá estados padrão, hover, foco, pressionado, desabilitado,
carregando, erro e sucesso antes de ser reutilizado nas páginas.

## Experiência por página

### Hoje

- Cabeçalho compacto: data, semana do período e foco principal.
- Bloco “Agora”: uma ação com duração estimada e motivo da recomendação.
- Linha do dia: aula, estudo, revisão, prova e tarefa.
- Três filas no máximo: continuar, revisar e material novo.
- Métricas em uma faixa compacta ou recolhível.
- Nenhum grande conjunto de cartões sem uma ordem de decisão.

### Página de estudo

- Coluna de leitura central e índice de seções persistente no desktop.
- No celular, índice em painel deslizante.
- Modos: completo, alto rendimento, véspera e foco.
- Ações de favorito, concluído e anotação em uma barra contextual; anotação abre
  em painel, sem bloquear o início do texto.
- Trilho lateral: questões, caso, mapa, mídia, ciências básicas e fontes.
- Figuras abrem ampliadas e mantêm fonte, página, legenda e vínculo.

### Biblioteca

- Explorador com filtros persistentes e resultado em lista/cartão compacto.
- Ordenação por semana atual, prioridade OMED, progresso, dificuldade e lacuna.
- Disciplina mostra cobertura e próxima ação, não apenas quantidade de itens.

### Questões e simulados

- Seleção inicial em painel de filtros, evitando dezenas de chips permanentes.
- Fila explícita: novas, erradas, revisão e todas.
- Retomada no item exato.
- Durante a questão, interface de foco com enunciado, alternativas, comentário e
  links contextuais para resumo/mídia apenas após resposta.
- Relatório final orientado a próximos estudos.

### Mapas

- Um mapa por página/canvas, com visão geral e zoom.
- Modelo editorial explícito:
  `nodes[] = { id, tipo, texto, importância, href }`;
  `edges[] = { origem, destino, relação, direção }`.
- Relações permitidas incluem causa, aumenta risco, produz, sugere, diferencia,
  confirma, trata, contraindica, previne e complica.
- Primeiro lote: dez temas de maior prioridade OMED; depois ampliar somente após
  revisão clínica.
- Mobile tem árvore vertical acessível como alternativa ao canvas.

### Acervo e mídia

- Abas: `Entrada`, `Processados`, `Imagens clínicas` e `Fontes públicas`.
- O formulário de upload fica em ação secundária, não ocupa a página inteira.
- O visualizador mostra imagem grande, contexto, modalidade, achado, origem,
  página, privacidade e relações com resumo/caso/questão.
- Materiais comerciais continuam autenticados e nunca entram no bundle público.

### Meu curso

- Abas: `Semestre atual`, `Semana`, `Calendário`, `Histórico` e
  `Materiais`.
- Cadastro/importação manual passa para um fluxo assistido, separado da visão
  diária.
- Cada disciplina mostra o que foi cursado, o que precisa revisão, recursos
  ligados, lacunas e última atividade.

## Motor da semana atual

### Novos dados privados

Implementação aditiva, com RLS por proprietário:

- `semana_estudo_usuario`: início, fim, período, objetivo e estado.
- `foco_semana_usuario`: disciplina, subtema, prioridade, origem, confiança e
  confirmação.
- `tarefa_estudo_usuario`: data, atividade, recurso, duração estimada, estado e
  origem.
- `vinculo_recurso_usuario`: fonte privada -> disciplina -> tema -> subtema ->
  semana, com confiança e estado de revisão.

Antes de criar tabelas novas, verificar se parte desses campos pode reutilizar a
agenda e o catálogo privado existentes. Nenhum dado será duplicado sem
necessidade.

### Como o site saberá o que está sendo estudado

O contexto atual será calculado por sinais ordenados:

1. foco fixado manualmente pelo usuário;
2. disciplina marcada como `cursando`;
3. aulas/provas/estudos da agenda na semana;
4. PDFs recebidos e confirmados na semana;
5. resumos, questões e casos usados recentemente;
6. prioridade OMED como desempate, não como substituto da rotina real.

Classificações automáticas de PDF entram como sugestão. Se houver mais de uma
ligação plausível, o recurso fica em “confirmar vínculo”; ele não muda o plano
clínico sozinho.

## Fluxo diário de PDFs

Quando o usuário enviar um PDF em uma conversa futura:

1. Registrar origem, tamanho, tipo, privacidade e hash quando materializado.
2. Detectar cópia já processada e reutilizar o cache.
3. Converter primeiro para Markdown privado com marcadores de página.
4. Classificar extração completa, parcial, imagem, OCR, corrompida ou rejeitada.
5. Ler apenas as seções relevantes do Markdown.
6. Aplicar OCR somente às páginas médicas sem texto utilizável.
7. Renderizar apenas páginas candidatas a imagem clínica.
8. Classificar disciplina, tema, subtema, modalidade, prioridade OMED e vínculo
   provável com a semana atual.
9. Criar na caixa de entrada um cartão com status, relações, páginas úteis e
   próxima ação.
10. Relacionar o PDF aos resumos, questões, casos, mapas e mídia existentes sem
    copiar o texto comercial para o conteúdo público.
11. Atualizar a semana atual e o Obsidian privado com contagens e pendências.
12. Produzir conteúdo autoral novo somente quando houver lacuna comprovada,
    fonte primária vigente e revisão clínica.

Se o usuário enviar apenas o arquivo, o pipeline começa sem exigir uma descrição.
Uma confirmação curta será solicitada apenas quando disciplina/semana não puder
ser determinada com segurança.

## Arquitetura técnica do redesign

- Manter Next.js, React, Tailwind e Supabase atuais.
- Criar tokens semânticos antes de alterar páginas.
- Separar primitivas visuais, componentes de domínio e composição de páginas.
- Manter taxonomia e IDs atuais; rotas antigas recebem aliases/redirects quando
  a navegação mudar.
- Adotar feature flag para o novo shell e para a nova página Hoje.
- Não instalar biblioteca de mapas antes de medir bundle. Primeiro protótipo em
  SVG/CSS; avaliar `@xyflow/react` somente se acessibilidade, zoom e manutenção
  justificarem o custo.
- Framer Motion já instalado será usado apenas para transições úteis e respeitará
  `prefers-reduced-motion`.
- Toda migration será aditiva, revisável e acompanhada por teste de RLS.

## Blocos de implementação

### Bloco 0 — proteção e linha de base

- Snapshot de rotas, dados, progresso e métricas.
- Resolver a divergência de imagens privadas visíveis por conta.
- Medir bundle, Lighthouse e axe antes da mudança.
- Criar testes mínimos de navegação e fluxos autenticados.

### Bloco 1 — sistema visual e shell

- Tokens, componentes base e estados.
- Nova navegação das cinco áreas atrás de feature flag.
- Barra móvel sem sobreposição.
- Busca e breadcrumbs consistentes.

### Bloco 2 — Hoje e semana atual

- Modelo privado da semana.
- Importação/reuso de agenda, curso e atividade.
- Página Hoje orientada a próxima ação.
- Primeiro vínculo automático de PDF à semana com confirmação.

### Bloco 3 — Conhecimento e leitura

- Biblioteca por filtros persistentes.
- Página de estudo sem distração.
- Modos completo/alto rendimento/véspera.
- Índice, notas em painel e relações contextuais.

### Bloco 4 — Treino

- Filtros em painel.
- Filas novas/erros/revisão.
- Retomada exata e relatório acionável.

### Bloco 5 — Acervo e mídia

- Caixa de entrada diária.
- Catálogo de fontes e imagens reorganizado.
- Visualizador ampliado e vínculos com a semana/conteúdo.

### Bloco 6 — mapas conceituais

- Novo modelo de nós/arestas.
- Dez mapas OMED curados.
- Canvas desktop e alternativa vertical móvel.

### Bloco 7 — qualidade e publicação controlada

- Testes de login, sessão, RLS, URLs assinadas e conta diferente.
- Lighthouse, axe/WCAG 2.2, teclado, contraste e responsive.
- Auditorias de conteúdo/privacidade, typecheck, lint e build.
- Comparação visual antes/depois e publicação somente após aprovação.

## Critérios de aceite

1. Nenhuma questão, progresso, anotação, agenda, curso ou mídia é perdida.
2. O usuário chega à próxima ação em até dois cliques a partir de Hoje.
3. A semana atual usa evidência real e permite correção em um clique.
4. Um PDF duplicado é reconhecido; um PDF novo gera Markdown privado e vínculo
   rastreável sem publicação automática.
5. A página de estudo é legível em 390 px e desktop, sem barra sobreposta.
6. O mapa mostra relações semanticamente nomeadas; não reutiliza títulos de
   seção como se fossem relações clínicas.
7. Conteúdo privado nega acesso anônimo e entre contas.
8. Axe não encontra problemas sérios/críticos nos fluxos principais.
9. Lighthouse deve atingir, como meta, acessibilidade >= 95 e desempenho >= 90
   nas rotas públicas principais, registrando exceções justificadas.
10. Nenhuma dependência nova entra sem medição de bundle e revisão do lockfile.
11. Produção permanece na versão anterior até validação visual e funcional do
    lote completo.

## Primeiro bloco recomendado

Executar o Bloco 0 e o Bloco 1 juntos: congelar a linha de base, resolver a
visibilidade da mídia privada, criar o sistema visual e construir o novo shell
atrás de feature flag. Esse lote não altera conteúdo clínico, não migra dados e
não publica automaticamente.

## Fontes de benchmarking

- https://www.amboss.com/us/students
- https://www.amboss.com/int/students/study
- https://www.osmosis.org/features
- https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
