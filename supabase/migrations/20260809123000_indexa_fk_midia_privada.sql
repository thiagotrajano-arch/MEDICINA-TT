-- Índice simples para cobrir a FK usada na ligação com subtema.
create index if not exists midia_privada_usuario_subtema_fk_idx
  on public.midia_privada_usuario(subtema_id);
