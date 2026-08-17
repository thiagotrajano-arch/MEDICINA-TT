# Segunda execução de cinco blocos V2 — 2026-08-16

## Bloco 6 — currículo

O seletor curricular já expõe os períodos 1–12. Mantida a separação entre componente institucional, subtema e evidência; nenhum vínculo foi inferido.

## Bloco 7 — fila de pendências

A fila existente continua usando o estado canônico de estudo e 138 tarefas auditadas. A regra operacional permanece: prioridade do semestre, revisão vencida, erro recente, OMED e depois lacunas antigas.

## Bloco 8 — hub de mapas

Concluído um incremento: o atalho do subtema abre mapas mentais filtrados pelo nome do subtema (`/mapas-mentais?subtema=...`). O filtro permanece opcional e não altera o catálogo.

## Bloco 9 — mídia

O fluxo existente mantém índice por disciplina/tema/subtema e revela imagens somente ao abrir o subtema, com tela cheia, origem e vínculo ao resumo. Não foram importados novos arquivos neste lote.

## Bloco 10 — QA e evidências

As auditorias estruturais foram reexecutadas após a mudança: typecheck, lint, questões, privacidade, figuras, cobertura e estado de estudo passaram. Rotas privadas continuam exigindo servidor e sessão para validação visual real.

## Pendências após esta rodada

- QA autenticada em host privado e duas sessões.
- Conector Drive read-only com allowlist para inventário por hash.
- Registro canônico de evidência por subtema.
- Revisão clínica apenas para lacunas justificadas pela matriz.
- Build/deploy somente após essas gates.
