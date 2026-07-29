-- Telemetria é permitida somente ao usuário autenticado que é dono da linha.
-- O cliente já reduz o payload e não envia stack traces, caminhos ou detalhes crus.
alter table public.client_error_log enable row level security;

drop policy if exists client_error_log_insert on public.client_error_log;
revoke insert on table public.client_error_log from anon;
grant insert on table public.client_error_log to authenticated;

create policy client_error_log_insert on public.client_error_log
  for insert
  to authenticated
  with check ((select auth.uid()) = owner_id);
