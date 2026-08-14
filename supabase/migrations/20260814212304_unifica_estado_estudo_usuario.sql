-- Estado canônico das pendências de estudo. A migration preserva IDs e dados
-- existentes e apenas normaliza nomes antigos antes de restringir o domínio.

alter table public.tarefa_estudo_usuario
  drop constraint if exists tarefa_estudo_usuario_estado_check;

update public.tarefa_estudo_usuario
set estado = case estado
  when 'pendente' then 'planejado'
  when 'concluida' then 'concluido'
  when 'adiada' then 'planejado'
  else estado
end;

alter table public.tarefa_estudo_usuario
  add constraint tarefa_estudo_usuario_estado_check
  check (estado in ('planejado', 'em_andamento', 'revisao_devida', 'concluido', 'bloqueado'));

alter table public.tarefa_estudo_usuario
  drop constraint if exists tarefa_estudo_usuario_origem_check;

alter table public.tarefa_estudo_usuario
  add constraint tarefa_estudo_usuario_origem_check
  check (origem in ('manual', 'agenda', 'curso', 'pdf', 'atividade', 'semestre', 'omed', 'erro', 'revisao'));

alter table public.tarefa_estudo_usuario
  add column if not exists subtema text not null default '' check (char_length(subtema) <= 180),
  add column if not exists objetivo text not null default '' check (char_length(objetivo) <= 500),
  add column if not exists escopo text not null default '' check (char_length(escopo) <= 1000),
  add column if not exists prioridade text not null default 'media' check (prioridade in ('critica', 'alta', 'media', 'baixa')),
  add column if not exists ultima_revisao date,
  add column if not exists proxima_revisao date,
  add column if not exists bloqueio_motivo text not null default '' check (char_length(bloqueio_motivo) <= 500),
  add column if not exists recursos jsonb not null default '{}'::jsonb check (jsonb_typeof(recursos) = 'object'),
  add column if not exists reaberturas integer not null default 0 check (reaberturas >= 0),
  add column if not exists concluido_em timestamptz;

create index if not exists tarefa_estudo_usuario_owner_prioridade_idx
  on public.tarefa_estudo_usuario(owner_id, estado, prioridade, data, atualizado_em desc);

create index if not exists tarefa_estudo_usuario_owner_revisao_idx
  on public.tarefa_estudo_usuario(owner_id, proxima_revisao, estado)
  where proxima_revisao is not null;
