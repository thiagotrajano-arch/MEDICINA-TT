# Consolidação do chat no projeto SITE — 2026-08-04

Este documento registra o contexto acionável desta conversa para que outra sessão ou outra IA consiga retomar o projeto sem depender do histórico do chat. Ele é uma consolidação sanitizada, não uma cópia literal da conversa.

## Identidade do projeto

- Projeto: Codex Medicus, site de estudo médico pessoal.
- Checkout editável: `C:\Users\Adm\Documents\Codex\2026-07-21\se-conecte-ao-meu-claude\codex-medicus-live`.
- Site público: `https://thiagotrajano-arch.github.io/MEDICINA-TT/`.
- Repositório: `https://github.com/thiagotrajano-arch/MEDICINA-TT`.
- Branch de trabalho: `main`.
- Últimos commits de código registrados: `4df8856`, `00c1bb3` e `f319ede`.

## Regras permanentes de privacidade

- Nunca registrar, imprimir, commitar ou transmitir senhas, tokens, chaves, cookies, arquivos `.env` ou credenciais pessoais.
- O site público pode receber somente conteúdo autoral, próprio ou com licença aberta verificável.
- PDFs comerciais, apostilas de cursos, conteúdo do Drive, SISCAD, dados curriculares pessoais e imagens de pacientes permanecem privados.
- Imagens de pacientes exigem anonimização e autorização apropriada.
- A biblioteca privada deve usar o login atual, RLS por proprietário, bucket privado e URLs assinadas de curta duração; esconder uma rota não é proteção suficiente.
- Não recriar a rotina automática das 9h sem solicitação explícita.
- PDFs devem ser convertidos para Markdown antes da leitura; OCR somente nas páginas necessárias.
- Não publicar material protegido apenas porque o usuário autorizou uso pessoal; a autorização de estudo não altera direitos autorais.

## Objetivo educacional

O usuário cursa Medicina e quer relacionar todo o acervo acessado com as disciplinas e os períodos já cursados, inclusive Ciências Básicas do primeiro semestre. O site deve permitir revisar posteriormente materiais, resumos, questões, casos, imagens e mapas por disciplina, semestre, tema, subtema e prioridade OMED.

Também devem existir:

- acompanhamento do semestre atual e atualização futura dos períodos;
- calendário privado para anotações e compromissos;
- painel por disciplina com materiais, lacunas, revisões e próximos estudos;
- fila de questões não respondidas, erradas e revisão espaçada;
- mapas mentais reais, com conceitos-chave, setas nomeadas e relações clínicas;
- conexão futura com Anki Desktop, mantendo o Anki como aplicativo local;
- Obsidian como segundo cérebro e registro de continuidade; Notion como central privada complementar.

## Estado funcional já construído

- Progresso de questões, simulados, resumos e casos possui camada local-first e sincronização Supabase por sessão autenticada/RLS.
- A camada privada de curso existe em `/meu-curso`, com disciplina, período, status, datas, dificuldade, observação, importação Markdown/CSV e histórico mínimo.
- A rota `/minha-midia` e o bucket privado `midia-privada` foram criados com RLS e URLs assinadas; o teste funcional com a conta real e o primeiro upload ainda faltam.
- A aba de mapas existe como índice; os mapas clínicos completos com relações, setas e ligações cruzadas ainda faltam.
- Rotas públicas principais foram verificadas com HTTP 200 e auditorias estruturais anteriores passaram.
- O código-fonte contém `src/app/sitemap.ts` e `src/app/robots.ts`, mas a presença correta desses artefatos no GitHub Pages ainda precisa ser confirmada.

## Conteúdo clínico e qualidade

- O lote recente adicionou 44 questões e 32 casos clínicos em Cardiologia, Neurologia, Pneumologia, Nefrologia, Reumatologia, Hematologia/Oncologia e Dermatologia.
- A auditoria histórica registra 1.072 questões sem repetição, comentário vazio ou fonte ausente; como houve lotes posteriores, a auditoria geral precisa ser executada novamente antes de declarar a contagem final.
- A revisão clínica por diretriz vigente ainda não foi concluída. A ordem de prioridade é Infectologia, GO/Obstetrícia, Pediatria, Cirurgia/MFC, Cardio/Neuro/Pneumo, depois Nefro, Gastro, Hemato, Endócrino e especialidades menores.
- Não criar volume artificial: gerar novas questões, casos e resumos somente quando o manifesto comprovar lacuna e houver fonte primária atual.

## Drive, acervo e SISCAD

- O inventário local de `Desktop/MEDICINA` recebeu metadados e hashes; fontes comerciais e pessoais permanecem fora do Git.
- A conexão autenticada do Drive foi usada em modo metadata-only e identificou 67 candidatos médicos distintos para triagem privada; isso não autoriza baixar tudo.
- Foram materializados seletivamente três lotes privados: 3 PDFs OMED, mais 27 PDFs e mais 30 PDFs prioritários, totalizando 60 PDFs nessa sequência.
- Os lotes receberam SHA-256 e cópia canônica; foram convertidos para Markdown. O lote ampliado possui conversões parciais e um PDF estruturalmente inválido preservado para reparo.
- O Poppler direto renderizou 217 PNGs privados. Ainda faltam revisão visual, OCR seletivo, reparo, deduplicação ampla, classificação curricular e revisão de licença.
- O SISCAD foi consultado em área privada: há registro de 37 componentes, 36 planos analisados e um plano indisponível. Ainda faltam vínculos detalhados plano → disciplina → tema → subtema → recurso e a visão longitudinal completa no painel.
- A fila segura é: hash/deduplicação → Markdown → OCR/renderização seletivos → vínculo curricular → revisão clínica/licença → conteúdo autoral ou mídia privada.

## Anki e Notion

- Anki Desktop e AnkiConnect estão instalados localmente.
- Foram preparados decks OMED prioritários de Cardiologia, Pneumologia, Nefrologia, Endocrinologia, Hematologia, Oncologia, Dermatologia e 14 subtemas de Neurologia.
- A ponte local exporta `exports/anki/progresso.json`; o dashboard importa esse JSON, sem abrir o Anki para a internet.
- Os passos de validar a ponte e criar o primeiro deck foram concluídos. Ainda faltam flashcards derivados dos erros, backup `.apkg`/CSV e uma decisão segura sobre eventual sincronização autenticada.
- Image Occlusion Enhanced e FSRS Helper foram instalados apenas no Anki Desktop.
- Notion Desktop foi instalado e recebeu uma central privada com as bases `Rotina de Estudos` e `Fila de Revisão`. Falta alimentar essas bases continuamente e definir se haverá integração sem duplicar dados ou expor material privado.

## Design e arquitetura — decisão do usuário

- O redesign anterior não agradou e não deve ser tratado como concluído.
- O redesign visual completo fica depois da estabilização funcional do acervo, SISCAD, autenticação, conteúdo e mídia.
- Quando iniciado, deve usar referências profissionais de plataformas de estudo, arquitetura limpa, filtros, busca, carregamento progressivo, responsividade e acessibilidade.
- A navegação deve separar Hoje, Biblioteca, Treino, Revisão visual, Meu curso e Minha mídia.
- Os mapas devem se parecer com mapas clínicos de alto rendimento: nó central, ramos, relações nomeadas, setas, conceitos-chave e ligações para resumo, questões, casos, imagens e referências.

## Pendências prioritárias para a próxima retomada

1. Testar login, logout, recuperação, expiração, sincronização e RLS com sessões reais sem registrar credenciais.
2. Carregar e validar o primeiro lote de imagens privadas no bucket autenticado.
3. Fechar os avisos de segurança do Supabase e a matriz de erros de rede/sessão/upload.
4. Finalizar manifesto do Drive, OCR/reparo e classificação por semestre/disciplina/subtema.
5. Reconsultar o plano SISCAD indisponível e finalizar vínculos curriculares.
6. Rodar auditoria clínica atualizada das questões e revisar gabaritos contra fontes primárias.
7. Completar mídia licenciada e ancoragem de figuras.
8. Transformar o índice de mapas em mapas clínicos reais.
9. Finalizar fluxo de Anki por erros e backups.
10. Rodar Lighthouse, axe/WCAG, testes críticos, build final e só então publicar o lote aprovado.

## Fonte de verdade e retomada

- Pendências numeradas: `docs/PLANO-100-PASSOS.md`.
- Ordem operacional e evidências: `PROXIMOS-PASSOS.md`.
- Handoff resumido: `docs/AI-HANDOFF.md`.
- Memória consolidada: `docs/MEMORIA-CONSOLIDADA.md`.
- O plano dos 100 passos tem 34 itens marcados como concluídos e 66 pendentes após a reconciliação dos passos 88 e 89. Essa contagem é documental; cada item continua sujeito às evidências e aos portões de privacidade/qualidade.

