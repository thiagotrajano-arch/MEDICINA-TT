-- A constraint canônica não aceita mais o valor legado `pendente`; alinhar o
-- default evita falha em integrações que deixem o banco escolher o estado.
alter table public.tarefa_estudo_usuario
  alter column estado set default 'planejado';
