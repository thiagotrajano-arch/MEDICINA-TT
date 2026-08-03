-- Segurança e desempenho: políticas explícitas para tabelas internas,
-- auth.uid() avaliado uma vez por consulta e índices de FKs.

do $$
declare t text;
begin
  foreach t in array array['arquivo_importado','extracao','sync_drive','schema_migrations'] loop
    execute format('drop policy if exists %I on public.%I', t || '_deny_client', t);
    execute format(
      'create policy %I on public.%I for all to anon, authenticated using (false) with check (false)',
      t || '_deny_client', t
    );
  end loop;
end $$;

do $$
declare t text;
begin
  foreach t in array array[
    'simulado','simulado_resultado','resposta_usuario','srs_card',
    'sessao_estudo','meta','favorito','nota_pessoal','etiqueta',
    'proposta_atualizacao','progresso_conteudo'
  ] loop
    execute format('drop policy if exists %I on public.%I', t || '_owner', t);
    execute format(
      'create policy %I on public.%I for all to authenticated
       using ((select auth.uid()) = owner_id)
       with check ((select auth.uid()) = owner_id)',
      t || '_owner', t
    );
  end loop;
end $$;

create index if not exists caso_clinico_disciplina_id_idx on public.caso_clinico(disciplina_id);
create index if not exists caso_clinico_subtema_id_idx on public.caso_clinico(subtema_id);
create index if not exists caso_secao_caso_id_idx on public.caso_secao(caso_id);
create index if not exists extracao_arquivo_id_idx on public.extracao(arquivo_id);
create index if not exists midia_disciplina_id_idx on public.midia(disciplina_id);
create index if not exists midia_tema_id_idx on public.midia(tema_id);
create index if not exists midia_ancora_bloco_id_idx on public.midia_ancora(bloco_id);
create index if not exists midia_ancora_midia_id_idx on public.midia_ancora(midia_id);
create index if not exists proposta_atualizacao_fonte_id_idx on public.proposta_atualizacao(fonte_id);
create index if not exists proposta_atualizacao_resumo_id_idx on public.proposta_atualizacao(resumo_id);
create index if not exists questao_imagem_id_idx on public.questao(imagem_id);
create index if not exists resumo_versao_fonte_id_idx on public.resumo_versao(fonte_id);
create index if not exists sessao_estudo_disciplina_id_idx on public.sessao_estudo(disciplina_id);
create index if not exists simulado_questao_questao_id_idx on public.simulado_questao(questao_id);
create index if not exists simulado_resultado_simulado_id_idx on public.simulado_resultado(simulado_id);
