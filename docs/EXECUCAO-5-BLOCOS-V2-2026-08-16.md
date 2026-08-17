# Execução dos cinco blocos V2 — 2026-08-16

Este registro é a execução controlada após o diagnóstico F0. Nenhum conteúdo privado foi publicado, nenhum cartão do Anki foi alterado e nenhuma migração destrutiva foi executada.

## F1 — Privacidade e autenticação

**Estado: parcial, aguardando POC autenticada.** As auditorias estruturais de privacidade passaram (314 arquivos públicos e 3 arquivos curriculares). O projeto ainda usa export estático para GitHub Pages; portanto não se deve inferir que biblioteca privada ou RLS foi validada no navegador publicado. Próximo passo: executar QA autenticada em host privado/Supabase, com duas contas e URLs temporárias.

## F2 — Hoje, agenda e fila

**Estado: parcialmente validado.** A auditoria de estado passou com 138 tarefas, estados válidos e regras de proprietário/RLS. Agenda, Semana e painel Hoje já existem. O próximo incremento deve unificar o identificador da pendência e testar concluir/reabrir em duas sessões, sem criar agenda paralela.

## F3 — Hub de subtema

**Estado: concluído neste lote.** A página de estudo agora aponta questões com filtro exato por `subtema` e oferece atalhos explícitos para mapas mentais e acervo visual. Não houve alteração de conteúdo clínico.

## F4 — Drive e ingestão incremental

**Estado: bloqueado com segurança.** Os contratos de ingestão, hash, deduplicação e erro sanitizado existem no repositório. Não há neste turno um conector OAuth de Drive read-only com allowlist disponível para materializar novos arquivos; por isso nenhum PDF foi baixado, copiado ou lido e nenhum dado privado foi exposto.

## F5 — Portão de evidências

**Estado: parcial.** Questões, figuras, privacidade, cobertura e estado passaram nas auditorias. A cobertura atual registra 37 disciplinas, 311 subtemas, 241 conteúdos, 62 casos e 77 figuras catalogadas; a matriz de cobertura ainda aponta 70 subtemas sem resumo, 149 sem questões e 268 sem casos. O próximo passo é consolidar um registro de evidência por subtema (fonte, data, licença/destino e vínculo) antes de expandir conteúdo.

## Validações executadas

- `typecheck`: passou.
- `lint`: passou.
- auditoria de questões: passou (1.359 questões; 0 fonte ausente).
- auditoria de privacidade: passou.
- auditoria de figuras: passou (77/77 ancoradas).
- auditoria de cobertura: passou.
- auditoria de estado de estudo: passou.
- auditoria de rotas: parcial; rotas privadas requerem servidor/autenticação local para QA de navegador.

## Pendências abertas após o lote

1. POC privada autenticada e QA RLS em host não estático.
2. Teste de sincronização concorrente da fila Hoje/Agenda.
3. Allowlist OAuth read-only do Drive e inventário incremental por hash.
4. Registro canônico de evidências e revisão clínica dos itens sem fonte primária.
5. Fechar lacunas de cobertura somente após a matriz justificar cada lote.
