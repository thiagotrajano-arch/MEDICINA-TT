-- Defende contra permissões amplas herdadas de defaults do schema.
-- O cliente autenticado só precisa manipular seus próprios registros via RLS.
revoke all privileges on public.curso_disciplina_usuario from authenticated;
revoke all privileges on public.curso_disciplina_evento from authenticated;

grant select, insert, update, delete on public.curso_disciplina_usuario to authenticated;
grant select, insert, update, delete on public.curso_disciplina_evento to authenticated;
