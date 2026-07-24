-- Corrige bug critico: nenhuma resposta de questao nem resultado de simulado
-- estava sendo sincronizado com a conta do usuario, silenciosamente, desde a
-- migracao 0004.
--
-- A 0004 criou indices UNICOS PARCIAIS (`where client_event_id is not null`)
-- para permitir upsert idempotente por client_event_id. Mas o Postgres so usa
-- um indice parcial como arbitro de ON CONFLICT quando o predicado do WHERE e
-- repetido na propria clausula ON CONFLICT -- e o cliente (supabase-js,
-- `.upsert(dados, { onConflict: "owner_id,client_event_id" })` em
-- src/lib/progresso.ts) so envia a lista de colunas, sem predicado. Resultado:
-- TODO upsert em resposta_usuario/simulado_resultado falhava com
-- "42P10 - there is no unique or exclusion constraint matching the ON
-- CONFLICT specification", em 100% das tentativas, para todo usuario. O erro
-- nunca era verificado no codigo (`await auth.supabase.from(...).upsert(...)`
-- sem checar `.error`), entao falhava em silencio total -- sem console, sem
-- aviso na tela. Progresso de resumo/caso (progresso_conteudo, 0004) nao foi
-- afetado: sua chave e uma primary key comum (owner_id, alvo_tipo, alvo_id),
-- nao um indice parcial.
--
-- Correcao: indice unico comum (nao parcial) nas mesmas colunas. Em Postgres,
-- NULL nunca conflita com NULL num indice unico normal -- entao linhas sem
-- client_event_id continuam livres de colisao entre si, exatamente como no
-- indice parcial antigo. So corrige o caso (client_event_id preenchido) que
-- estava quebrado.

drop index if exists public.resposta_usuario_owner_event_uidx;
create unique index if not exists resposta_usuario_owner_event_uidx
  on public.resposta_usuario(owner_id, client_event_id);

drop index if exists public.simulado_resultado_owner_event_uidx;
create unique index if not exists simulado_resultado_owner_event_uidx
  on public.simulado_resultado(owner_id, client_event_id);
