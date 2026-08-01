-- Mantem a ordenacao do catalogo coerente quando um item for reclassificado.
create or replace function public.tg_touch_atualizado_em()
returns trigger
language plpgsql
set search_path = pg_catalog, public
as $$
begin
  new.atualizado_em = now();
  return new;
end
$$;

drop trigger if exists material_privado_usuario_touch_atualizado_em
  on public.material_privado_usuario;
create trigger material_privado_usuario_touch_atualizado_em
  before update on public.material_privado_usuario
  for each row execute function public.tg_touch_atualizado_em();
