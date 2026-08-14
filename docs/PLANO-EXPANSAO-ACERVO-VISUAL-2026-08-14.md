# Plano de expansão do acervo visual por subtema

Data-base: 2026-08-14.

## Decisão de arquitetura

O acervo deixa de ser uma parede de imagens. A navegação canônica é:

`disciplina -> tema -> subtema -> imagem contextualizada`.

No índice, o estudante vê somente cartões de subtema, contagem, modalidades e
objetivo didático. A imagem aparece apenas depois da abertura do subtema, junto
de um resumo curto, achado-chave, fonte, crédito, licença e ligações para resumo,
questões, caso e mapa. A biblioteca autenticada segue a mesma progressão e mantém
URLs temporárias.

## Registro obrigatório por item

- ID estável, disciplina, tema, subtema e `subtema_id`;
- anatomia ou patologia, modalidade e região;
- título clínico curto, alt text, legenda e bloco “Como interpretar”;
- achado-chave, armadilha diagnóstica e limite de interpretação;
- fonte primária, autor/instituição, URL, data de acesso e, quando houver,
  PMID/DOI, artigo e número da figura;
- licença exata do item, crédito exigido e destino `publico` ou `autenticado`;
- anonimização, caso relacionado, resumo, questões e mapa;
- hash SHA-256, arquivo canônico e estado da revisão clínica/editorial.

## Fontes aprovadas para prospecção

### Nível A — preferência

1. NLM Visible Human Project: anatomia normal seccional, CT, RM e criossecção;
   confirmar a condição de uso e atribuição do conjunto utilizado.
2. CDC Public Health Image Library (PHIL): infectologia, dermatologia e saúde
   pública; aceitar somente itens marcados individualmente como domínio público.
3. AnatomyTOOL/Open 3D Model: anatomia universitária; importar somente itens com
   licença aberta explícita e cumprir BY/SA/NC do próprio item.
4. The Cancer Imaging Archive (TCIA): oncologia em TC/RM/PET e histopatologia;
   usar apenas coleções de acesso e licença compatíveis, mantendo citação da
   coleção e sem tentar reidentificar participantes.
5. PubMed Central/Open-i: figuras de artigos atuais; validar a licença do artigo
   e da figura, pois “acesso livre” não equivale sempre a “reutilização livre”.

### Nível B — referência e substituição dirigida

- repositórios de universidades e sociedades médicas com licença por item;
- diretrizes e artigos primários atuais para confirmar a interpretação, mesmo
  quando a figura não puder ser copiada;
- acervos de radiologia reputados somente como referência clínica quando não
  houver licença de redistribuição.

### Somente autenticado

- Estratégia MED e outros cursos/livros comerciais;
- PDFs privados do Drive e pastas locais;
- imagens próprias ou de pacientes, apenas anonimizadas e com autorização
  apropriada.

## Fila orientada por lacuna

Não haverá meta artificial de imagens por volume. Cada lote começa pela matriz
de cobertura, priorizando OMED e o semestre atual:

1. anatomia e fisiologia normais necessárias para interpretar o exame;
2. radiografia, TC, RM, ultrassom, ECG e lâminas dos diagnósticos prioritários;
3. sinais dermatológicos e semiológicos que mudam conduta;
4. comparativos normal-versus-patológico e diagnósticos diferenciais;
5. imagens para questões e Image Occlusion, sem duplicar o que já existe.

Cada lote terá até 20 candidatos e só fecha após deduplicação, revisão visual,
licença, correlação clínica, acessibilidade, teste de rota e auditoria de
privacidade. Itens rejeitados permanecem registrados no manifesto para não serem
triados novamente.

## Critério de aceite

Uma imagem só entra quando responde a uma lacuna real, abre no destino correto,
tem contexto suficiente para ensinar sem induzir diagnóstico isolado, fonte e
direitos rastreáveis, alt text útil, boa resolução e vínculo funcional com pelo
menos um resumo. Conteúdo público e autenticado nunca compartilham o mesmo
destino de armazenamento.
