-- Identificadores gerados no navegador tornam a sincronizacao idempotente:
-- repetir uma operacao apos queda de rede nao duplica respostas ou simulados.
alter table public.resposta_usuario add column if not exists client_event_id text;
alter table public.simulado_resultado add column if not exists client_event_id text;

create unique index if not exists resposta_usuario_owner_event_uidx
  on public.resposta_usuario(owner_id, client_event_id)
  where client_event_id is not null;

create unique index if not exists simulado_resultado_owner_event_uidx
  on public.simulado_resultado(owner_id, client_event_id)
  where client_event_id is not null;
