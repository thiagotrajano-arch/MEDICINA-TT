-- Vínculo estável entre uma tarefa da semana e seu evento-espelho na Agenda.
-- A chave composta impede que um usuário relacione uma tarefa a evento alheio.

alter table public.agenda_estudo_usuario
  add constraint agenda_estudo_usuario_owner_id_unique unique (owner_id, id);

alter table public.tarefa_estudo_usuario
  add column if not exists agenda_evento_id uuid;

alter table public.tarefa_estudo_usuario
  drop constraint if exists tarefa_estudo_usuario_agenda_owner_fk;
alter table public.tarefa_estudo_usuario
  add constraint tarefa_estudo_usuario_agenda_owner_fk
  foreign key (owner_id, agenda_evento_id)
  references public.agenda_estudo_usuario(owner_id, id)
  on delete set null (agenda_evento_id);

create index if not exists tarefa_estudo_usuario_owner_agenda_idx
  on public.tarefa_estudo_usuario(owner_id, agenda_evento_id)
  where agenda_evento_id is not null;

-- Migra apenas os espelhos inequívocos do plano privado. Eventos manuais e
-- pares ambíguos permanecem intactos e sem vínculo automático.
with candidatos as (
  select
    tarefa.id as tarefa_id,
    min(agenda.id::text)::uuid as agenda_id,
    count(*) as quantidade
  from public.tarefa_estudo_usuario tarefa
  join public.agenda_estudo_usuario agenda
    on agenda.owner_id = tarefa.owner_id
   and agenda.titulo = tarefa.titulo
   and (agenda.inicio at time zone 'America/Sao_Paulo')::date = tarefa.data
   and agenda.observacao like '[Plano privado%'
  where tarefa.agenda_evento_id is null
  group by tarefa.id
)
update public.tarefa_estudo_usuario tarefa
set agenda_evento_id = candidatos.agenda_id,
    atualizado_em = now()
from candidatos
where candidatos.tarefa_id = tarefa.id
  and candidatos.quantidade = 1;
