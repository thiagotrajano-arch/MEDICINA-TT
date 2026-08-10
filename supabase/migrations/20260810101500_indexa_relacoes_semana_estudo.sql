-- Índices de cobertura para as relações privadas da semana de estudo.
-- A migration é aditiva e não altera nem remove dados existentes.

create index if not exists tarefa_estudo_usuario_owner_semana_fk_idx
  on public.tarefa_estudo_usuario(owner_id, semana_id);

create index if not exists vinculo_recurso_usuario_material_fk_idx
  on public.vinculo_recurso_usuario(material_id)
  where material_id is not null;
