# Execução de dez pendências — 2026-08-13

## Concluído nesta rodada

1. Auditoria editorial do Anki executada sem mutação.
2. Backup `.apkg` com agendamento criado antes da revisão editorial.
3. Rota inicial publicada respondeu HTTP 200.
4. `/questoes/` respondeu HTTP 200.
5. `/biblioteca/` respondeu HTTP 200.
6. `/mapas-mentais/` respondeu HTTP 200.
7. `/meu-curso/` respondeu HTTP 200.
8. `/agenda/` respondeu HTTP 200.
9. `/minha-midia/` respondeu HTTP 200.
10. `/semestres/` respondeu HTTP 200.

Também foram verificados `sitemap.xml` e `robots.txt`, ambos com HTTP 200.

## Evidências

- Auditoria Anki: 1.721 notas; 14 grupos de duplicata exata; 14 grupos
  normalizados; 4 grupos de frente ambígua; 885 versos longos; zero notas sem
  referência; zero cartões excluídos.
- Backup: `exports/anki/backups/2026-08-13T22-20-59-144Z`.
- As respostas HTTP confirmam publicação e disponibilidade de transporte. Elas
  não substituem testes autenticados, Lighthouse, axe/WCAG ou inspeção visual.

## Próxima fila segura

- Revisar os 14 grupos exatos e 4 ambíguos por lote, preservando IDs e histórico.
- Testar login, sessão, sincronização e mídia privada na conta real.
- Rodar Lighthouse/axe e investigar as páginas estáticas que demoraram mais de
  60 segundos na geração.
