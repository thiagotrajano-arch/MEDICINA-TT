# Execução do plano mestre — 2026-08-14

Este documento é o quadro de execução do plano mestre. `docs/PENDENCIAS-MESTRAS.md`
continua sendo a fila operacional canônica; `PROXIMOS-PASSOS.md` e o plano de
100 passos são apenas histórico.

## Estados

- `concluído`: aceite comprovado por evidência reproduzível.
- `parcial`: entrega utilizável, mas ainda falta parte do aceite.
- `em execução`: lote atual com mudança local ainda não publicada.
- `pendente`: ainda sem evidência suficiente.
- `bloqueado`: depende de acesso, custo ou decisão externa documentada.

## Lote em execução

| Bloco | Estado | Evidência atual | Próximo portão |
|---|---|---|---|
| 1. Backlog | em execução | fila canônica preservada; restore retirado dos bloqueadores; duplicidades reconciliadas | publicar este registro e manter históricos somente como evidência |
| 2. Segurança | parcial | RLS, isolamento técnico e restore já validados; proteção contra senha vazada exige plano Supabase Pro | QA visual de recuperação, sessão expirada e duas sessões |
| 3. Painel canônico | parcial | estados, prioridade, objetivo, revisão, bloqueio, histórico e recursos aplicados; Agenda e Semana usam o mesmo ID | validar visualmente na conta autenticada |
| 4. Semana e PDFs | parcial | semana confirmável e materiais privados já relacionados; importadores usam estado canônico | configurar disponibilidade real e automatizar D0/D1/D7/D21 |
| 5. Currículo | parcial | 26/37 componentes granularizados; HCPM VI tratado com BBPM VI | fechar 11 componentes por evidência e revisar 276 vínculos |
| 6. Ingestão privada | parcial | pipeline, manifestos e corpus existem; 379 mídias classificadas | metadados/hash dos candidatos ainda não triados, sem apagar originais |
| 7. Cobertura | em execução | auditor cruza 304 subtemas com resumo, questão, caso, mapa, mídia pública e fontes | incorporar progresso/semestre privados após QA autenticada |
| 8. Ciências básicas | pendente | taxonomia e regra de integração definidas | criar um módulo piloto ligado a uma trilha clínica |
| 9. Resumos | pendente | modelo editorial definido no plano | validar um resumo clínico e um básico antes da migração gradual |
| 10. Conteúdo clínico | pendente | ordem editorial e lacunas registradas | primeiro lote de até 10 questões de meningites/encefalites |
| 11. Acervo visual | parcial | 77 figuras públicas; 379 itens privados revisados | expansão de até 20 candidatos por lacuna real |
| 12. Mapas mentais | parcial | 60 entradas navegáveis existentes | transformar pilotos em relações clínicas nomeadas |
| 13. Jogo diagnóstico | pendente | contrato funcional definido | schema privado, RLS e um caso piloto |
| 14. Anki | bloqueado | pausado por decisão explícita; nenhuma mutação neste lote | nova autorização explícita |
| 15. Design e desempenho | parcial | arquitetura principal e baseline Lighthouse existentes | QA completo claro/escuro, celular, teclado, zoom e axe |
| 16. Simulados e release | parcial | simulados e pipeline de publicação existem | validar este lote, publicar e verificar produção |

## Contrato do painel canônico

O registro de estudo aceita `planejado`, `em_andamento`,
`revisao_devida`, `concluido` e `bloqueado`. Cada tarefa pode guardar origem,
disciplina, tema, subtema, objetivo, escopo, duração, prioridade, última/próxima
revisão, motivo de bloqueio, recursos relacionados, data de conclusão e número
de reaberturas. Estados legados são migrados sem perda: `pendente` e `adiada`
viram `planejado`; `concluida` vira `concluido`.

As migrations foram aplicadas e a auditoria remota confirmou 138 tarefas, RLS
ativa, política por proprietário, zero valor inválido e default `planejado`.

Agenda e Semana são duas visualizações do mesmo compromisso quando há
`agenda_evento_id`. Concluir ou reabrir em qualquer uma atualiza a outra pelo
ID estável, preservando eventos manuais.

## Matriz de cobertura ampliada

O auditor `npm.cmd run audit:cobertura` agora calcula, por `subtemaId`, resumo,
quantidade de questões, casos, mapa, figuras públicas ancoradas e quantidade de
fontes clínicas. O resultado atual é:

- 304 subtemas, 234 resumos, 1.332 questões e 55 casos vinculados;
- 60 mapas derivados de resumos;
- 39 subtemas com mídia pública ancorada, 62 âncoras e 61 IDs de figura únicos;
- 270 subtemas na fila OMED/alto rendimento e 34 na fila de referência.

Semestre atual e semestres anteriores dependem do estado privado confirmado e
não são inferidos no artefato público.

## Limites honestos deste lote

- A proteção contra senhas vazadas do Supabase usa Have I Been Pwned e está
  disponível apenas no plano Pro; o requisito de custo zero impede habilitá-la.
- Testes que alteram conta, mídia e progresso em duas sessões só serão marcados
  concluídos com evidência autenticada real.
- Nenhum PDF comercial, dado do SISCAD, mídia privada ou credencial entra no Git.
- Nenhuma mudança no Anki é autorizada neste lote.

## Publicação e produção

- PR `#27`, commit de `main` `0c0c0b7`.
- GitHub Pages run `31844575458`: build e deploy concluídos.
- Em produção, a página Hoje carregou “Semana atual” e os cinco estados
  canônicos, sem erro no console do navegador.
- A sessão disponível estava deslogada; por isso a QA autenticada de gravação,
  duas sessões e recuperação continua pendente.
- O workflow emitiu aviso de depreciação do runtime Node 20 usado internamente
  por algumas versões de Actions; registrar atualização separada, sem trocar
  versões às cegas.
