# Auditoria integral em 20 lentes — 2026-08-11

## Objetivo e regra de leitura

Esta revisão consolida o estado verificável do Codex Medicus sem publicar, alterar funcionalidades ou apagar dados. “Revisar 20 vezes” foi operacionalizado como 20 lentes independentes, cada uma com achado, risco, próxima ação e critério de aceite. Dados privados, credenciais, identificadores pessoais, hashes e conteúdo comercial não são reproduzidos aqui.

## Resumo executivo

- Estado do lote: alterações locais preservadas na branch `docs/publicacao-redesign`; publicação bloqueada até corrigir e validar o lote.
- Qualidade editorial estrutural: 1.332 questões; zero duplicatas exatas ou normalizadas, comentários curtos, vazios, contraditórios ou fontes ausentes.
- Privacidade pública: auditoria aprovada para 241 arquivos públicos e 3 arquivos curriculares.
- Código: lint e `git diff --check` aprovados; typecheck reprovado no importador do mapa curricular por `recurso_id` potencialmente indefinido. A gravação de `tsconfig.tsbuildinfo` também foi impedida pelo ambiente, mas existe erro TypeScript independente dessa limitação.
- Rotas publicadas: auditoria automatizada inconclusiva porque o host não pôde ser alcançado nesta sessão. Não equivale a site fora do ar.
- Pendências antes deste registro: `PROXIMOS-PASSOS.md` continha 78 caixas abertas e 153 concluídas; `PLANO-100-PASSOS.md` contém 64 abertas e 36 concluídas. Há sobreposição, histórico e itens compostos; os números não devem ser somados.
- Imagens: o acervo privado contém múltiplos manifestos e lotes. O manifesto-base registra 692 extrações, 216 canônicas por SHA-256 e 476 duplicatas; outro lote registra 282 imagens; o catálogo privado operacional já registrou 379 itens. Esses universos precisam ser reconciliados antes de declarar a triagem concluída.

## As 20 lentes

| # | Lente | Estado verificado | Próxima ação | Critério de aceite |
|---|---|---|---|---|
| 1 | Fontes de verdade | Handoff, memória, prompts, próximos passos e plano de 100 foram relidos; existem repetições históricas. | Criar um painel canônico de pendências e deixar os arquivos históricos como registro. | Cada tarefa ativa aparece uma vez, com origem e evidência. |
| 2 | Segurança do Git | Lote local grande e não publicado preservado; `git diff --check` passa. | Separar documentação, correções técnicas e dados privados em commits revisáveis. | Nenhuma mudança alheia perdida; diff intencional e revisado. |
| 3 | Tipos e lint | Lint passa; typecheck falha no importador curricular por ID possivelmente indefinido. | Validar/filtrar IDs vazios antes de montar os vínculos e repetir o typecheck. | Typecheck e lint com saída zero. |
| 4 | Build e rotas | Build não deve ser usado como portão enquanto o typecheck falha; auditoria de rotas não alcançou o host. | Corrigir tipos, executar build limpo e repetir rotas em ambiente com rede. | Build concluído e rotas principais respondendo sem erro. |
| 5 | Autenticação e sessão | Arquitetura privada existe, mas login, logout, recuperação, expiração e persistência ainda exigem teste humano ponta a ponta. | Executar matriz autenticada em desktop e celular. | Todos os fluxos funcionam, com estados de erro recuperáveis. |
| 6 | Supabase, RLS e backup | Alertas de RLS/segurança continuam relevantes; restore em PostgreSQL comum falhou pela extensão `supabase_vault`. | Corrigir advisors, produzir backup compatível e provar restauração em ambiente Supabase equivalente. | RLS validada e restauração documentada bem-sucedida. |
| 7 | Privacidade e direitos | Auditoria pública passa; material comercial deve continuar privado, e imagem de paciente exige anonimização e autorização. | Revisar destino e licença por item antes de qualquer exposição. | Nenhum conteúdo protegido ou identificável no repositório/site público. |
| 8 | Catálogo de mídia | Há discrepância entre 216 canônicas, lote de 282 e 379 registros operacionais. | Criar manifesto mestre por SHA-256, com estado e destino. | Um item canônico por conteúdo e contagens reconciliadas. |
| 9 | Qualidade clínica das imagens | Parte pequena foi revisada; centenas permanecem sem revisão visual. Há logos, texturas e ícones sem valor clínico entre extrações. | Triar em lotes por utilidade diagnóstica, legibilidade, contexto, modalidade e anonimização. | Todo item marcado como útil, contextual, rejeitado ou pendente justificado. |
| 10 | Visualizador e correlações | Imagens privadas possuem metadados de disciplina/subtema em lotes recentes, mas a cobertura não é uniforme. | Ligar imagem a resumo, questão, caso e mapa; testar ampliação e URL assinada. | Imagem abre em tela maior e possui relações navegáveis válidas. |
| 11 | Cobertura de conteúdo | Cobertura é desigual entre disciplinas; quantidade não substitui lacuna comprovada. | Gerar matriz tema × resumo × questão × caso × imagem × mapa, priorizada por OMED e semestre. | Novos conteúdos só surgem para lacunas mensuradas. |
| 12 | Qualidade clínica e fontes | Auditoria estrutural das questões passa, mas não substitui revisão por diretrizes vigentes. | Revisão clínica por prioridade com fonte primária atual e data de validade. | Afirmações críticas rastreáveis e revisão clínica registrada. |
| 13 | Banco de questões | 1.332 questões estão estruturalmente limpas; áreas menores seguem com menor volume. | Definir meta por subtema e separar OMED, residência e banco de imagens sem copiar provas protegidas. | Cobertura equilibrada e filtros por origem/prioridade funcionais. |
| 14 | Resumos, módulos e mapas | Resumos e mapas têm cobertura/forma heterogênea; mapas ainda precisam de relações nomeadas. | Padronizar resumo clínico e transformar mapas prioritários em nós, setas e relações. | Cada mapa liga conceitos e aponta para resumo, questões, casos, mídia e referências. |
| 15 | Currículo e SISCAD | Mapa granular local existe; importação está bloqueada pelo typecheck e alguns vínculos exigem validação manual. | Corrigir importador, validar componentes e não inferir plano indisponível. | Disciplina → módulo → subtema → recurso aparece corretamente no painel privado. |
| 16 | Agenda e estratégia de estudo | Plano de 12 semanas existe, mas ainda precisa conciliar semestre atual, OMED, revisões antigas e Anki com capacidade diária real. | Aplicar orçamento semanal e regras D0/D1/D7/D21 após aprovação do plano. | Agenda sem sobrecarga, tarefas clicáveis e reagendamento automático explícito. |
| 17 | Anki | Organização principal e FSRS foram configurados; auditoria ainda aponta duplicatas exatas, frentes ambíguas, versos longos e referências pendentes. | Backup, resolver grupos ambíguos, atomizar com revisão editorial e sincronizar somente progresso agregado. | Nenhum cartão apagado sem prova; cartões concisos e revisões sustentáveis. |
| 18 | Arquitetura de informação | Navegação melhorou, mas mídia, mapas, semestres e pendências ainda competem por atenção. | Organizar em Hoje, Aprender, Praticar, Revisar e Acervo, com divulgação progressiva. | Usuário chega à próxima ação em até dois passos, sem perder profundidade. |
| 19 | Design, claro/escuro, celular e acessibilidade | Design ainda carece de validação visual; progresso concluído depende muito de check/risco. | Redesenhar estados semânticos, modo claro, cards de anatomia/fisiologia, responsividade e WCAG após protótipo aprovado. | Contraste, foco, teclado, zoom, mobile e estados vazios aprovados. |
| 20 | Operação e liberação | Handoff é rico, porém extenso; publicação não tem portão único com evidência atual. | Criar checklist de release e fechamento diário conciso, atualizar Obsidian e só então publicar. | Uma execução reproduzível prova código, conteúdo, privacidade, dados e interface. |

## Pendências canônicas por prioridade

Os 64 passos ainda abertos no plano numerado são: **13, 19, 20, 27, 28, 31, 36–39, 41, 42, 44–62, 64–75, 77–87, 90, 91 e 93–100**. Eles foram agrupados abaixo por dependência e valor, sem mudar seu estado histórico.

### P0 — bloqueiam liberação

- Corrigir o erro TypeScript do importador curricular sem descartar recursos válidos.
- Rodar typecheck, lint, auditorias, build e rotas em ambiente com acesso adequado.
- Testar autenticação, sincronização e mídia privada ponta a ponta.
- Reconciliar migrations aplicadas, RLS e restauração de backup compatível.
- Confirmar que nenhum dado privado entrou no diff público.

### P1 — fazem o produto cumprir o objetivo de estudo

- Consolidar agenda única: semestre atual + OMED + semestres anteriores + Anki.
- Tornar pendências clicáveis, com escopo do estudo, resumo, questões, imagens e próximo intervalo.
- Concluir mapa curricular granular e validar vínculos candidatos manualmente.
- Reconciliar o manifesto de mídia e terminar triagem visual dos canônicos.
- Criar matriz de cobertura e preencher apenas lacunas clínicas comprovadas.
- Revisar editorialmente Anki e banco de questões por prioridade clínica.

### P2 — melhoria de experiência e design

- Painel único de progresso com estados “não iniciado”, “em estudo”, “revisão vencida” e “dominado”.
- Arquitetura Hoje / Aprender / Praticar / Revisar / Acervo.
- Modo claro com contraste consistente e design system unificado.
- Cards didáticos específicos para anatomia, fisiologia e bases biológicas.
- Mapas mentais reais, com setas e relações nomeadas.
- Filtros persistentes e divulgação progressiva para evitar poluição visual.
- Validação mobile, teclado, leitores de tela, Lighthouse e axe/WCAG.

### P3 — corpus e rotina contínua

- Para cada PDF novo: catalogar → hash/deduplicar → converter para Markdown privado → classificar → ligar à semana → revisar clinicamente → decidir destino.
- Processar os PDFs de psicofarmacologia já catalogados, ainda sem leitura clínica completa.
- Completar inventário recursivo e seletivo do Drive sem baixar indiscriminadamente.
- Manter conteúdo comercial, imagens extraídas e dados acadêmicos somente na camada autenticada.

## Plano de execução em blocos

1. **Saneamento e portão técnico:** corrigir typecheck, revisar migrations, executar gates e produzir evidências.
2. **Dados privados:** autenticação, RLS, backup restaurável, URLs assinadas e exclusão segura.
3. **Painel canônico:** unificar pendências, progresso, agenda e mapa curricular.
4. **Rotina de estudo:** distribuir semestre atual, OMED, revisão longitudinal e Anki por capacidade semanal.
5. **Mídia:** manifesto mestre, triagem visual, vínculos clínicos e visualizador ampliado.
6. **Conteúdo:** matriz de lacunas, revisão por diretrizes, questões/casos/imagens somente onde necessário.
7. **Anki:** backup, deduplicação conservadora, atomização editorial e progresso agregado.
8. **Arquitetura e design:** protótipo, estados, modo claro, mobile e mapas mentais.
9. **QA humano:** fluxos reais, acessibilidade, desempenho e regressão.
10. **Publicação:** commits separados, push, deploy, smoke test e handoff final.

## Evidências desta rodada

- `npm.cmd run lint`: aprovado.
- `git diff --check`: aprovado.
- `npm.cmd run typecheck`: reprovado no importador curricular; ambiente também impediu a gravação do cache incremental.
- `npm.cmd run audit:questoes`: 1.332 questões, zero achados nos critérios estruturais auditados.
- `npm.cmd run audit:privacidade`: aprovado para 241 arquivos públicos e 3 curriculares.
- `npm.cmd run audit:rotas`: inconclusivo por falha de acesso ao host em todas as rotas consultadas.
- A conexão ao navegador para inspeção visual também expirou; portanto nenhuma conclusão visual nova foi registrada como comprovada.
- Build, Lighthouse, axe e teste visual/interativo: não executados como aprovados nesta rodada.

## Decisão de liberação

**Não publicar este lote ainda.** O portão mínimo exige typecheck, build, rotas e fluxos privados comprovados. Esta decisão não invalida o conteúdo já auditado; apenas impede que um lote integrado seja enviado sem evidência suficiente.
