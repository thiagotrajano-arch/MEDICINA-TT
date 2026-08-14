-- Mantém extensões fora do schema exposto pela Data API.
-- Os objetos dependentes existentes continuam apontando para os mesmos OIDs.

create schema if not exists extensions;
revoke create on schema extensions from public;

alter extension pg_trgm set schema extensions;
alter extension unaccent set schema extensions;
alter extension vector set schema extensions;
