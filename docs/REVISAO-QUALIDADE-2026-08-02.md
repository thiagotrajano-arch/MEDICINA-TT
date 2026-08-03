# Revisão de qualidade e publicação — 2026-08-02

## Entregue nesta rodada

- `sitemap.xml` e `robots.txt` foram adicionados como rotas estáticas do site.
- O shell ganhou estados globais de carregamento e erro recuperável.
- Questões agora têm filas persistentes de novas, erradas, revisão espaçada e todas.
- Filtros de questões, curso privado e mídia são persistidos localmente.
- Mídia ganhou filtros por modalidade e licença, lazy loading, decodificação assíncrona e fallback WebP.
- Foram geradas versões WebP das imagens clínicas públicas; os originais permanecem como fallback.
- Mapas mentais passaram a exibir relações nomeadas e setas com rótulos acessíveis.
- A migração Supabase de RLS, políticas explícitas de negação e índices de chaves estrangeiras foi aplicada remotamente.
- A matriz de erros de rede, sessão, upload e estados vazios está em `docs/MATRIZ-ERROS-CLIENTE.md`.

## Evidências de validação

As métricas Lighthouse finais no site publicado foram:

| Perfil | Performance | Acessibilidade | Boas práticas | SEO |
|---|---:|---:|---:|---:|
| Celular | 82 | 93 | 100 | 100 |
| Desktop | 100 | 95 | 100 | 100 |

O axe/WCAG final encontrou 0 violações, com 33 regras aprovadas e 1 resultado inconclusivo ligado a uma avaliação visual de gradiente. A linha de base anterior tinha 42 ocorrências; o contraste da paleta clara e o landmark de navegação foram corrigidos.

TypeScript, auditoria de privacidade e auditoria de questões passaram. O lint terminou sem erros e com cinco avisos antigos em scripts auxiliares. A build local excedeu a janela de execução; a build oficial do GitHub Actions é a evidência de publicação.

## Limites e pendências honestas

- Login, recuperação, expiração de sessão, sincronização, upload autenticado, expiração de URL assinada e exclusão exigem uma sessão do proprietário no navegador. Nenhuma senha foi colocada em script, log ou commit.
- O Supabase ainda sinaliza proteção contra senhas vazadas desativada e extensões instaladas no schema público. A primeira deve ser habilitada no painel Auth; a mudança das extensões requer revisão de dependências antes de aplicar.
- AVIF não foi gerado porque não havia conversor disponível no runtime; WebP foi adotado sem adicionar dependências ao bundle.
- A fila privada do Drive continua fora do GitHub e do Pages. PDFs comerciais, hashes, imagens de pacientes e material curricular permanecem no acervo privado.

## Próxima verificação

As checagens pós-deploy de Lighthouse, axe/WCAG e HTTP foram concluídas. Resta executar os fluxos autenticados manualmente e registrar cada resultado na matriz de erros.
