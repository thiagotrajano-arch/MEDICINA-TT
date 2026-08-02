# Revisão do site — 2026-08-02

## Resultado

As rotas públicas verificadas responderam HTTP 200 e não apresentaram marcadores de erro de aplicação no HTML entregue. A auditoria de privacidade aprovou 188 arquivos públicos e três arquivos curriculares sanitizados. O banco de questões permanece com 1.072 itens, sem duplicações normalizadas, comentários curtos/vazios ou fontes ausentes.

## Rotas verificadas

`/`, `/biblioteca/`, `/questoes/`, `/simulado/`, `/casos/`, `/midia/`, `/minha-midia/`, `/mapas-mentais/`, `/semestres/` e `/meu-curso/`.

## Melhorias identificadas

### P0 — segurança e confiabilidade

- Executar testes pessoais de login, logout, recuperação, renovação e sincronização em duas sessões, sem registrar credenciais.
- Testar upload, URL assinada expirada, logout e exclusão na biblioteca privada.
- Revisar avisos do Supabase sobre RLS, proteção contra senhas vazadas, extensões e índices antes de ampliar o acervo.
- Criar uma matriz visível de falhas: rede offline, sessão expirada, upload interrompido, conteúdo vazio e permissão insuficiente.

### P1 — descoberta e acessibilidade

- Adicionar `sitemap.xml` e `robots.txt` ao Pages.
- Medir Lighthouse/PageSpeed em celular e desktop.
- Rodar axe/WCAG 2.2 AA em todas as áreas: foco, teclado, contraste, rótulos e anúncios de mudança de rota.
- Auditar peso, dimensões, `alt`, lazy loading e formatos das imagens.

### P2 — experiência de estudo

- Persistir filtros e busca por disciplina, tema, subtema, prioridade OMED e estado.
- Criar fila explícita de questões não respondidas, erros e revisão espaçada, com retomada exata.
- Adicionar layouts de leitura sem distração para resumos e casos.
- Melhorar estados de carregamento, vazio, erro recuperável e confirmação.
- Separar visualmente conteúdo público, biblioteca privada, curso/SISCAD e material comercial.

### P3 — arquitetura visual

- Transformar mapas em grafos clínicos legíveis: conceito central, ramos, relações nomeadas por setas, níveis e modo móvel.
- Organizar mídia por modalidade, patologia, subtema, licença e privacidade.
- Definir tokens de cor, tipografia, espaçamento, estados e componentes antes de novo redesign.
- Medir bundle e dependências antes de instalar plugins ou bibliotecas.

## Limitações desta rodada

- A build local atingiu o limite de execução; a build oficial do GitHub Actions passou.
- A revisão foi estrutural e de respostas HTTP; não substitui teste manual autenticado nem auditoria visual completa.
- Os 67 candidatos do Drive foram apenas inventariados por metadados e permanecem no cofre privado.
