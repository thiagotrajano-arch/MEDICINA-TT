# Roadmap — Próximos 50 Grandes Passos

> Atualizado em 2026-07-27. Execute em lotes de até 15 blocos e atualize o Obsidian ao fim de cada lote. Nunca publicar conteúdo clínico sem validação e nunca registrar credenciais.

> [!IMPORTANT]
> Reconciliação de 2026-07-28: os itens 28, 30 e 31 receberam execução seletiva e registro privado; as tarefas 54, 56, 57, 59 e 60 também avançaram. A lista histórica de caixas abaixo não substitui o estado consolidado em `docs/PLANO-MESTRE-EXTRACAO-E-CURSO.md` e na nota privada de fechamento do Obsidian.

## Feitos hoje

- [x] 1. Consolidar contagens reais do código e corrigir os handoffs.
- [x] 2. Registrar este roadmap como fonte de continuidade.
- [x] 3. Atualizar o contexto persistente do Claude (`CLAUDE.md`).
- [x] 4. Registrar a consolidação no Obsidian.
- [x] 5. Publicar a consolidação final no repositório e no site.

## Conteúdo clínico prioritário

- [x] 6. Escrever e revisar Hepatites Virais — publicado em `1e53fcd`.
- [x] 7. Revisar adversarialmente Linfomas — publicado em `f751377`.
- [x] 8. Revisar adversarialmente Mieloma e NMP.
- [x] 9. Revisar adversarialmente Síndromes Glomerulares.
- [x] 10. Revisar adversarialmente IRA e DRC conforme KDIGO vigente.
- [x] 11. Revisar adversarialmente Cirrose e complicações.
- [x] 12. Revisar adversarialmente Pancreatite Aguda.
- [x] 13. Decidir se Oncologia será disciplina própria.
- [x] 14. Construir Emergências Oncológicas.
- [x] 15. Construir Câncer de Pulmão e princípios de Oncologia.
- [x] 16. Construir Farmacologia Oncológica e Imunoterapia.
- [x] 17. Construir Rinite e Rinossinusite.
- [x] 18. Construir Otites e complicações.
- [x] 19. Construir Vertigem e HINTS.
- [x] 20. Construir tumores de glândulas salivares e orofaringe.
- [x] 21. Construir Piodermites.
- [x] 22. Construir Neoplasias Cutâneas.
- [x] 23. Completar backlog de Reumatologia/Dermatologia já lido.
- [x] 24. Construir Doença de Wilson e Doença Hepática Alcoólica.
- [x] 25. Revisar todo conteúdo novo com fontes primárias e gabaritos distintos.

## Fontes, provas e imagens

> Execução pré-arquitetada em `docs/PLANO-PROXIMOS-BLOCOS.md`. Antes de aumentar o banco, aplicar o portão de qualidade editorial identificado na auditoria de 2026-07-27.

- [x] 26. Triar HCPM — inventário, limites e destinos registrados em `docs/TRIAGEM-HCPM.md`; nenhuma importação clínica automática.
- [x] 27. Triar BBPM III, IV, VII e VIII — inventário, amostras, exclusões e duplicidades registrados em `docs/TRIAGEM-BBPM-III-IV-VII-VIII.md`.
- [ ] 28. Triar LANN, UE e Farmacologia.
- [ ] 29. Abrir Estratégia 2024 Extensivo para Hemato/Gastro.
- [ ] 30. Extrair os 15 ZIPs de Cardio, Neuro e Cirurgia.
- [ ] 31. Identificar e eliminar duplicidades entre os ZIPs e arquivos soltos.
- [ ] 32. Abrir MEDCOF 2026 e Medcurso 2024 autorizados.
- [ ] 33. Triar as pastas Bagagem autorizadas.
- [ ] 34. Verificar BBPM I e II na bagagem autorizada de colega A.
- [ ] 35. Extrair questão a questão todas as fases OMED II–V restantes.
- [ ] 36. Atualizar o Raio-X OMED com contagens exatas por disciplina e subtema.
- [ ] 37. Resolver a extração de imagens dos PDFs com trailer malformado.
- [ ] 38. Buscar e licenciar novas imagens clínicas apenas para lacunas reais.
- [ ] 39. Ancorar imagens novas em blocos específicos de resumo.
- [ ] 40. Validar IDs, fontes, licenças e arquivos de mídia antes de cada publicação.

## Produto, Anki e segundo cérebro

- [x] 41. Auditar login e recuperação: endpoint de Auth acessível e e-mail habilitado; teste da senha pessoal fica exclusivamente com o usuário.
- [x] 42. Corrigir corrida da fila: resposta local recente prevalece sobre retorno remoto atrasado; revisão segue intencional.
- [x] 43. Auditar reconciliação do dashboard: eventos por `client_event_id` e conteúdos por versão mais recente.
- [x] 44. Projetar integração local segura com AnkiConnect (ponte local por script, sem site/servidor).
- [x] 45. Detectar Anki/AnkiConnect instalado e oferecer diagnóstico claro no terminal.
- [x] 46. Gerar flashcards de resumos e erros com deck por disciplina/subtema (sob pedido; evita duplicar).
- [x] 47. Oferecer CSV de contingência para importação manual no Anki; `.apkg` fica como exportação nativa do próprio Anki após a importação.
- [x] 48. Criar aba Mapas Mentais baseada na taxonomia e nos resumos publicados.
- [x] 49. Evoluir hubs e links do Obsidian para Anki e Mapas Mentais.
- [x] 50. Fazer auditoria de fechamento: código, fontes de configuração, progresso, deploy, backup e roadmap.

## Expansoes pendentes apos os 50 passos

- [ ] 51. Criar mapas mentais individuais para temas prioritarios, iniciando pelos subtemas de Infectologia ja revisados editorialmente. A aba atual e um indice navegavel; ela nao substitui diagramas de estudo por tema.
- [x] 52. Criar a aba `Meu Curso` com estrutura de 12 semestres, pronta para receber matriz curricular, disciplinas, cronogramas e documentos enviados pelo usuario.
- [x] 53. Preencher `Meu Curso` a partir da matriz oficial consultada no SISCAD, sem inferir grade, ementas ou ordem da instituicao.

## Plano mestre de extração e curso

> O estado detalhado e os critérios de conclusão estão em
> `docs/PLANO-MESTRE-EXTRACAO-E-CURSO.md`. Localizar ou converter um arquivo não
> significa que ele já foi analisado clinicamente.

- [ ] 54. Reconciliar o inventário atual de 824 PDFs do Estratégia com a contagem histórica de 871.
- [ ] 55. Gerar manifesto unificado com hash, origem, cache e estado de cada fonte.
- [ ] 56. Triar LANN, UE e Farmacologia.
- [ ] 57. Capturar planos e ementas históricos disponíveis no SISCAD.
- [ ] 58. Criar atualização privada dos semestres por formulário e importação Markdown/CSV.
- [ ] 59. Triar os 30 arquivos da pasta `RESUMOS` por lacunas reais.
- [ ] 60. Conectar o Drive `Resumos e cursos` e inventariar metadados antes de baixar.
- [ ] 61. Deduplicar Drive e acervo local antes da conversão de novos lotes.
- [ ] 62. Extrair e classificar imagens clínicas embutidas, separando uso privado de publicação licenciada.
- [ ] 63. Integrar os lotes aprovados com casos, questões, mapas mentais e Anki, seguidos de QA clínico e técnico.

## Regra de retomada

Leia `AGENTS.md`, `docs/AI-HANDOFF.md`, `PROXIMOS-PASSOS.md`, este arquivo e o `Codex Medicus Dashboard.md` no Obsidian. Comece pelo menor grupo prioritário ainda não concluído; ao fechar um lote, valide, registre e só então publique com autorização do usuário.
