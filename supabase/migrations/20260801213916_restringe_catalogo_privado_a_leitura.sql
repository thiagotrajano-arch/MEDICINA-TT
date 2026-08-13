-- Proveniencia, hash e classificacao sao curados pelo processo administrativo.
-- O navegador autenticado pode consultar somente as linhas do proprio usuario.
revoke all on public.material_privado_usuario from authenticated;
grant select on public.material_privado_usuario to authenticated;

drop policy if exists material_privado_usuario_owner on public.material_privado_usuario;
drop policy if exists material_privado_usuario_owner_select on public.material_privado_usuario;
create policy material_privado_usuario_owner_select
  on public.material_privado_usuario
  for select
  to authenticated
  using ((select auth.uid()) = owner_id);
