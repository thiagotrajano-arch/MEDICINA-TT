# Validação de Restauração do Backup

## Objetivo

O workflow semanal produz um dump lógico PostgreSQL em formato customizado e agora tenta restaurá-lo em um PostgreSQL 17 temporário no runner do GitHub Actions. O destino nunca é o banco Supabase de produção.

## Fluxo

1. Criar o dump com `pg_dump --format=custom`.
2. Armazenar o dump como artefato com retenção de 90 dias.
3. Iniciar `postgres:17-alpine` temporário e aguardar disponibilidade.
4. Executar `pg_restore --exit-on-error --no-owner --no-privileges` contra esse banco efêmero.
5. Remover o contêiner, inclusive quando a restauração falhar.

## Interpretação

- Sucesso: o artefato pode ser lido e restaurado estruturalmente sem tocar na produção.
- Falha por extensão: registrar a extensão ausente e reproduzir o teste em imagem segura que a suporte; não desabilitar extensão em produção para “fazer o teste passar”.
- Falha por objeto/dado: preservar o artefato, investigar o log sem expor dados e corrigir o procedimento de backup/restauração.

## Limites

- O teste não valida login de usuários nem uso de dados reais no site.
- Nenhum dado do dump é impresso intencionalmente no log.
- Uma restauração em novo projeto Supabase, com dados anonimizados, continua sendo etapa futura se for necessária validação funcional completa.

## Referências

- Workflow: `.github/workflows/backup.yml`.
- Checklist: `docs/CHECKLIST-PRIVACIDADE.md`.
- O projeto usa PostgreSQL 17; revisar extensões antes de qualquer mudança de versão ou destino de restauração.
