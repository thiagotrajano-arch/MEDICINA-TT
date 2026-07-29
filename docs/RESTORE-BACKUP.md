# Validação de Restauração do Backup

## Objetivo

O workflow semanal produz um dump lógico PostgreSQL em formato customizado e agora tenta restaurá-lo em um PostgreSQL 17 temporário no runner do GitHub Actions. O destino nunca é o banco Supabase de produção.

## Fluxo

1. Confirmar que a conexão segura do banco está disponível; se ela faltar, o
   workflow falha de forma explícita e nenhum backup é declarado como feito.
2. Criar o dump com `pg_dump --format=custom` e confirmar que o arquivo não
   está vazio.
3. Armazenar o dump como artefato com retenção de 90 dias.
4. Iniciar `postgres:17-alpine` temporário e aguardar disponibilidade.
5. Executar `pg_restore --exit-on-error --no-owner --no-privileges` contra esse banco efêmero.
6. Remover o contêiner, inclusive quando a restauração falhar.

## Interpretação

- Sucesso: o artefato pode ser lido e restaurado estruturalmente sem tocar na produção.
- Falha de configuração: não houve backup; corrigir o segredo ou a variável e
  disparar uma execução nova. Um workflow verde por etapas puladas não é
  evidência de backup.
- Falha por extensão: registrar a extensão ausente e reproduzir o teste em imagem segura que a suporte; não desabilitar extensão em produção para “fazer o teste passar”.
- Falha por objeto/dado: preservar o artefato, investigar o log sem expor dados e corrigir o procedimento de backup/restauração.

## Limites

- O teste não valida login de usuários nem uso de dados reais no site.
- Nenhum dado do dump é impresso intencionalmente no log.
- Uma restauração em novo projeto Supabase, com dados anonimizados, continua sendo etapa futura se for necessária validação funcional completa.
- O passo só pode ser marcado como concluído após uma execução posterior a esta
  instrumentação mostrar `pg_dump`, artefato e restore temporário bem-sucedidos.

## Referências

- Workflow: `.github/workflows/backup.yml`.
- Checklist: `docs/CHECKLIST-PRIVACIDADE.md`.
- O projeto usa PostgreSQL 17; revisar extensões antes de qualquer mudança de versão ou destino de restauração.
