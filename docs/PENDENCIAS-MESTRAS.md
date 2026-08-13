# Pendências mestras — Codex Medicus

Atualizado em 2026-08-13. Este é o **único documento operacional de pendências**.
Ele reconcilia `PROXIMOS-PASSOS.md`, `docs/PLANO-100-PASSOS.md`,
`docs/AUDITORIA-20-LENTES-2026-08-11.md`, o handoff e evidências recentes.
Os arquivos anteriores permanecem como histórico e evidência; não devem gerar
filas paralelas.

## Leitura de estado

- **Concluído:** existe evidência verificável; não repetir sem motivo.
- **Parcial:** parte entregue, mas falta uma condição de aceite explícita.
- **Pendente:** ainda não iniciado ou sem evidência suficiente.
- **Bloqueado:** depende de disco, acesso, ambiente ou decisão do usuário.
- Material comercial, dados do SISCAD e mídia sensível permanecem fora do Git e
  do site público. Conteúdo público novo só nasce de síntese autoral revisada.

## Evidências já consolidadas

- Login por e-mail/senha, progresso local-first e RLS existem; a validação real
  ponta a ponta na conta do usuário ainda falta.
- Há 1.332 questões auditadas, sem duplicatas estruturais, comentários curtos,
  vazios, contraditórios ou fontes ausentes.
- O mapa curricular privado contém 26 componentes, 55 módulos, 374 subtemas e
  122 recursos; 64 resumos e 58 filas públicas estão ligados, com 276 lacunas
  honestas. HCPM VI não foi inferido.
- O Anki preserva 2.830 cartões, 16 decks canônicos e backup anterior às
  mudanças. A organização estrutural está feita; a melhoria editorial não.
- O lote neuropsiquiátrico de sete PDFs foi convertido a Markdown privado. A
  prévia de Psiquiatria Clínica p. 91--93 foi renderizada; nenhuma captura foi
  publicada.
- Typecheck, lint, auditoria de questões, privacidade e build mais recente
  passaram. A auditoria remota de rotas e a otimização das páginas lentas
  continuam pendentes separadamente.

## P0 — bloqueadores de segurança e liberação

### P0.1 Espaço e execução local — parcial

- [x] Liberar espaço no disco C:. Estado confirmado: 106,8 GB livres em
  2026-08-13.
- [ ] Confirmar que os pacotes redundantes do Estratégia MED existem no Drive
  antes de remover cópias locais; não apagar fontes únicas nem PDFs em triagem.
- [x] Reexecutar typecheck, lint, build e auditorias depois de liberar espaço.
  Em 2026-08-13: typecheck, lint, 1.332 questões e privacidade passaram; o
  build mais recente concluiu em 341,1 s, gerou 413 páginas e confirmou
  exportação estática.
- [ ] Investigar as três páginas que ultrapassaram 60 s na primeira tentativa de
  SSG (`pericardite`, `derrame pleural` e `TEP`) e reduzir seu custo de geração.
- [ ] Repetir auditoria remota de rotas em uma sessão com acesso ao host. A
  tentativa local retornou `fetch failed` para todas as URLs, portanto não é
  evidência de queda nem validação de produção.

### P0.2 Autenticação, privacidade e recuperação — pendente

- [ ] Testar, na conta real e sem registrar credenciais: login, logout,
  recuperação, persistência e expiração de sessão.
- [ ] Testar resposta de questão, simulado, resumo, caso, agenda e sincronização
  em duas sessões/dispositivos; conferir conflito e recuperação local.
- [ ] Testar mídia privada: upload, visualização, URL assinada expirada, logout,
  exclusão e bloqueio entre usuários.
- [ ] Revisar RLS e avisos de segurança do Supabase sem expor chave privilegiada
  ao cliente; tratar extensões no schema público em migração isolada.
- [ ] Revalidar restauração de backup em ambiente compatível com
  `supabase_vault`; o dump existe, mas o restore em PostgreSQL comum falhou.

## P1 — tornar o site uma rotina de estudo útil

### P1.1 Painel canônico de estudo — parcial

- [ ] Unificar Semana, Agenda, OMED, semestre atual, revisão de semestres e
  Anki em um painel de prioridade única, sem criar agenda paralela.
- [~] Tornar o progresso atual visível no mapa curricular: os subtemas dominados
  passam a aparecer por padrão, há métrica própria e o filtro “Só pendentes”
  permanece opcional. Falta unificar isso com Semana, Agenda, OMED e Anki.
- [ ] Criar estado único para planejado, em andamento, revisão devida, concluído
  e bloqueado, com data, contador, filtro e opção clara de desfazer.
- [ ] Ao abrir uma pendência, mostrar objetivo, escopo, estimativa, resumo,
  questões, caso/mídia disponível e próxima revisão; não só uma página ampla.
- [ ] Substituir a ligação frágil Agenda–Semana por chave estável, preservando
  eventos manuais.
- [ ] Aplicar o ciclo de 12 semanas somente após confirmar aulas, plantões,
  horários indisponíveis, disciplina atual e primeiro foco OMED.
- [ ] Para cada PDF novo: Markdown privado, metadados, vínculo ao foco vigente e
  revisões D0/D1/D7/D21, com redução automática de carga se houver atraso.

### P1.2 Currículo e semestres — parcial

- [ ] Validar manualmente vínculos candidatos entre os 26 componentes privados,
  seus módulos/subtemas e os recursos públicos/privados.
- [ ] Completar a visão privada por disciplina: materiais, lacunas, revisões,
  próximos estudos e progresso das matérias concluídas.
- [ ] Reconsultar o plano de HCPM VI quando estiver disponível; manter ausência
  explícita até então.
- [ ] Validar em ambiente estável o importador curricular em modo seco e só então
  aplicar mudanças remotas com backup e QA autenticada. A tentativa em
  2026-08-13 não gravou dados, mas excedeu o limite de execução; medir e
  otimizar o validador antes de usar `--apply`.
- [ ] Criar rotinas reutilizáveis de abertura, acompanhamento, encerramento e
  revisão longitudinal por período.

### P1.3 Conteúdo, resumos e mapas — parcial

- [~] Integridade questão–taxonomia concluída: 1.332 questões apontam para 304
  subtemas, sem vínculos órfãos. Foram corrigidos 13 vínculos e criados cinco
  subtemas comprovadamente necessários; os novos que têm somente questão seguem
  marcados como resumo pendente. Evidência:
  `docs/AUDITORIA-QUESTOES-TAXONOMIA-2026-08-13.md`.
- [ ] Construir a matriz de cobertura por disciplina, subtema, semestre,
  prioridade OMED, resumo, questões, caso, mapa, imagem e fonte; ela vem antes
  de ampliar volume. A primeira leitura clínica foi registrada em
  `docs/MATRIZ-COBERTURA-CLINICA-2026-08-13.md`; faltam semestre, mapas, imagens
  e fontes no mesmo nível de detalhe.
- [ ] Criar template de resumo: objetivo, pré-requisitos, decisão clínica,
  sinais, diagnóstico/conduta, armadilhas, integração curricular, fontes/data,
  mídia e questões.
- [ ] Implementar leitura progressiva, índice, estimativa, síntese OMED, tabelas
  responsivas e conclusão por seção.
- [ ] Criar módulos reutilizáveis de Anatomia, Fisiologia, Bioquímica,
  Histologia, Patologia, Farmacologia, Microbiologia, Imunologia e Epidemiologia.
- [ ] Transformar mapas em grafos reais: nós curtos, setas nomeadas e ligações a
  resumo, questão, caso, mídia e referência; começar pelos temas OMED/semestre.
- [ ] Revisar conteúdo clínico por diretriz, na ordem: Infectologia; GO;
  Pediatria; Cirurgia/MFC; Cardio/Neuro/Pneumo; Nefro; Gastro/Endócrino/Hemato;
  Onco/ORL/Reumato/Derma e demais áreas.
- [ ] Criar ou ampliar resumos, questões, casos e cartões apenas para lacunas
  demonstradas, em lotes pequenos e com fonte primária vigente.

### P1.4 Anki — parcial

- [x] Fechamento operacional para estudo: cartões foram alinhados à rotina do
  site, o limite de novos foi fixado em 30/dia, FSRS 0,90 e a cadência
  5 min/5 h/3 d/7 d foram confirmados. As 22 cópias de AVC e 90 notas sem fonte
  estão suspensas, preservadas e fora da fila. Evidência:
  `docs/FECHAMENTO-ANKI-2026-08-13.md` e
  `docs/PLANO-ALINHAMENTO-ANKI-SITE-QUESTOES-2026-08-13.md`.

- [x] Reorganizar os decks existentes sem remover cartões: 2.829 cartões foram
  migrados para `MEDICINA → Ciclo Básico/Clínico → área → disciplina`; os decks
  antigos foram excluídos somente depois de ficarem vazios e o backup `.apkg`
  com agendamentos foi verificado. Subtemas permanecem como tags para evitar
  árvore excessiva. Evidência: `docs/ARQUITETURA-ANKI-MEDICINA-2026-08-13.md`.
- [~] Auditoria editorial segura repetida com AnkiConnect aberto: 1.721 notas
  examinadas, 14 grupos de duplicata exata, 4 grupos de frente ambígua, 885
  versos extensos e nenhuma nota sem referência. O relatório e o snapshot de
  progresso foram salvos localmente; nenhum cartão, histórico ou deck foi
  alterado nesta rodada.
- [ ] Revisar por disciplina 14 grupos de duplicatas exatas, 4 frentes ambíguas,
  885 versos extensos e 90 notas sem referência, preservando IDs e histórico.
- [ ] Refinar cartões pelo princípio de informação mínima; usar Cloze apenas para
  fatos atômicos e Image Occlusion somente em imagem licenciada/anonimizada.
- [ ] Transformar gradualmente os 885 versos longos em cartões atômicos por
  disciplina e subtema; revisar primeiro as 14 duplicatas exatas e as 4 frentes
  ambíguas, preservando ID, histórico e fonte. Não aplicar reescrita massiva.
- [ ] Implantar cartões por eixo clínico (epidemiologia, fisiopatologia,
  sinais/sintomas, diagnóstico, tratamento e complicações) e cartões de imagem
  somente após o manifesto de direitos/anonimização. A arquitetura e o fluxo
  de OpenEvidence estão registrados em
  `docs/ARQUITETURA-ANKI-MEDICINA-2026-08-13.md`.
- [ ] Validar visualmente Onigiri e as extensões já instaladas após reiniciar o
  Anki; não instalar extensão beta sem backup e compatibilidade confirmada.
  Estado em 2026-08-13: Anki Desktop/AnkiConnect respondeu; falta apenas a
  inspeção visual do tema e das extensões.
- [ ] Criar fluxo de cartões a partir de erros de questões, com deduplicação,
  fonte, exportação `.apkg` e CSV de contingência.

## P1 — mídia e acervo privado

- [ ] Reconciliar os manifestos de 216 imagens canônicas, lote adicional de 282
  e 379 registros operacionais antes de alterar a biblioteca.
- [ ] Triar visualmente os 321 itens privados restantes; para cada aprovado,
  registrar documento, página, SHA-256, modalidade, contexto, subtema, licença,
  crédito, anonimização e destino permitido.
- [~] Completar o lote neuropsiquiátrico: hashes concluídos para Psiquiatria
  Clínica p. 91--93 e demências p. 107--111; pré-triagem visual aponta p. 91--92
  e p. 107/110 como candidatas privadas. Neuroanatomia p. 55--57 também foi
  renderizada e classificada como privada. Faltam revisão das demais páginas,
  confirmação clínica/anonimização/direitos e seleção final de cada figura.
- [ ] Converter fontes privadas selecionadas em síntese autoral somente após
  diretriz atual; nenhum recorte comercial entra no repositório público.
- [ ] Validar licença/crédito de fontes universitárias por item e buscar imagens
  abertas apenas para lacunas clínicas reais.
- [ ] Reorganizar Minha Mídia por disciplina, período, tema, subtema, modalidade,
  patologia, caso, fonte e privacidade; adicionar tela cheia, legenda, alt text,
  carregamento progressivo e retorno ao ponto de estudo.
- [ ] Ancorar cada figura pública ao bloco de resumo/caso correspondente e auditar
  IDs, arquivos, créditos, licenças, âncoras e privacidade antes de publicar.

## P2 — experiência, design e acessibilidade

- [ ] Executar QA por roteiro nas rotas de início, resumos, questões, Agenda,
  Semana, Meu Curso, Mídia, autenticação e estados vazio/erro/carregando.
- [ ] Rodar Lighthouse móvel/desktop, axe/WCAG 2.2, teclado, zoom 200% e teste
  em celular; priorizar achados confirmados.
- [ ] Consolidar tokens para claro/escuro e redesenhar o claro para leitura longa:
  fundo neutro, contraste auditado, foco visível, menos sombras/gradientes e
  tipografia/espaçamentos consistentes.
- [ ] Produzir referências desktop/celular e aprovar protótipo antes de um
  redesenho amplo; preservar os dados e fluxos atuais.
- [ ] Reorganizar navegação em Hoje, Aprender, Praticar e Revisar; manter Meu
  Curso como currículo e Minha Mídia como biblioteca.
- [ ] Criar busca e filtros persistentes por disciplina, semestre, tema, subtema,
  prioridade OMED, recurso e estado de estudo.
- [ ] Medir bundle, otimizar imagens (WebP/AVIF quando apropriado), lazy loading,
  alt text e formatos antes de instalar dependências novas.

## P3 — ingestão contínua e manutenção

- [ ] Para cada lote aprovado do Drive/local: comparar metadados e SHA-256,
  deduplicar, materializar somente o necessário, converter a Markdown, fazer OCR
  seletivo, renderizar páginas clínicas e classificar por currículo/OMED.
- [ ] Tratar PDFs com trailer malformado por rota segura e registrar rejeições;
  não insistir em parser que falhou.
- [ ] Atualizar manifesto privado e Obsidian ao fechar cada fonte, inclusive
  rejeitada, sem registrar conteúdo comercial bruto no Git.
- [ ] Produzir relatório de proveniência/deduplicação antes de importar questões
  externas, provas ou bancos antigos.
- [ ] Confirmar gabarito em fonte vigente antes de adaptar questão; registrar
  banco/prova/instituição/ano somente quando comprovados.
- [ ] Montar simulados por prioridade OMED, dificuldade e erros reais sem repetir
  itens já respondidos; validar fila e dashboard no navegador.
- [ ] A cada lote público aprovado: rodar gates, revisão de direitos/fontes/
  acessibilidade, publicar, checar produção e atualizar handoff/Obsidian.

## Ordem recomendada de execução

1. Liberar espaço e estabilizar build/auditorias.
2. QA autenticada, RLS e recuperação de backup.
3. Painel canônico, vínculo Agenda–Semana e validação curricular.
4. Matriz de cobertura; revisão editorial e Anki por lacuna real.
5. Triagem de mídia e integração privada/pública com rastreabilidade.
6. Design system, acessibilidade, navegação e performance.
7. Ingestão contínua, simulados e publicação de lotes aprovados.

## Critério de encerramento de um item

Um item só muda para concluído quando houver: alteração registrada, teste
proporcional, estado visual quando aplicável, revisão de privacidade/direitos e
link para a evidência. HTTP 200 isolado não é confirmação de qualidade.
