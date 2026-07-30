# Ordem Mestra — Acervo, Curso, Mídia, Mapas, Anki e Design

Atualizado em 2026-07-29. Este documento fixa a ordem pedida pelo usuário e complementa `docs/PLANO-100-PASSOS.md`.

## Resultado desejado

Todo material médico autorizado deve ser encontrável pela trajetória acadêmica: semestre cursado → componente → tema/subtema → resumo → questões/casos → mídia clínica → mapa mental. O Anki entra somente quando essa base estiver consolidada. O redesign visual do site é a última fase e não deve mascarar lacunas de conteúdo ou funcionamento.

## Ordem obrigatória

### 1. Portões técnicos e de privacidade

- Concluir os testes reais de login, recuperação, sessão persistente e sincronização.
- Validar o restore seguro do backup quando houver execução verificável.
- Manter SISCAD, desempenho, documentos pessoais, URLs internas e material comercial fora do repositório público.

### 2. Varredura ampla do acervo e do Drive autorizado

- Inventariar por metadados toda a área autorizada do Drive, procurando assuntos relacionados à medicina e materiais úteis à graduação, OMED e revisão futura.
- Reconciliar nomes, tamanhos e hashes contra o manifesto local antes de baixar ou converter.
- Classificar cada achado por semestre/componente, disciplina, tema, subtema, modalidade, valor clínico, prioridade OMED, direitos e estado de análise.
- Processar em lotes: PDF → Markdown cacheado → triagem → validação → integração privada ou pública.
- Não converter ou baixar milhares de arquivos sem seleção; a varredura é completa, mas a extração profunda é priorizada por utilidade e lacuna real.

### 3. Imagens existentes nos PDFs

- Detectar páginas com radiologia, dermatologia, anatomopatologia, exame físico, gráficos ou fotografias clínicas úteis.
- Renderizar somente páginas selecionadas e recortar a imagem quando isso melhorar o estudo.
- Registrar arquivo de origem, página, legenda, diagnóstico/modalidade, contexto, direitos e destino.
- Capturas de material comercial podem aparecer somente na biblioteca autenticada do próprio usuário, armazenadas em bucket privado fora do repositório e do pacote estático. Para a biblioteca pública, usar apenas imagem própria ou licença aberta verificável; quando necessário, procurar equivalente aberto.
- Imagens de pacientes ficam privadas por padrão e só podem ser armazenadas após anonimização e confirmação de autorização apropriada. Publicação pública exige, além disso, direito de publicação documentado e revisão de privacidade.
- Nunca publicar uma captura isolada sem contexto clínico, crédito e vínculo com um resumo ou caso.

### 4. Correlação longitudinal com o curso

- Ligar todo material já analisado aos semestres e matérias cursados, não apenas ao semestre atual.
- Manter Ciências Básicas como camada transversal de retorno: Anatomia, Fisiologia, Imunologia, Patologia, Farmacologia, Microbiologia e Neuroanatomia.
- Mostrar esses vínculos somente na área autenticada `Meu curso`, com navegação para revisão das matérias concluídas.
- Revisar manualmente relações plano → tema → subtema; não inferir HCPM VI enquanto o plano estiver indisponível.

### 5. Arquitetura de mídia clínica

- Reestruturar a biblioteca por disciplina → tema → subtema, com filtros por modalidade, caso relacionado, fonte/licença e semestre/componente.
- Separar claramente: acervo público licenciado, referência externa e acervo privado autenticado.
- Reutilizar o login atual do site; não criar uma segunda senha. A sessão autenticada identifica o proprietário, e cada registro/objeto deve ser limitado por `owner_id` e RLS.
- Guardar imagens privadas no Supabase Storage em bucket não público, sob caminho iniciado pelo ID do proprietário. Entregar a imagem somente por URL assinada de curta duração.
- Nunca colocar imagem comercial ou de paciente em `public/`, no Git, no bundle do GitHub Pages ou em URL pública previsível. A chave `service_role` nunca pode ir ao navegador.
- Ampliar imagens clínicas de alto valor, priorizando lacunas reais e correlação com patologias; quantidade nunca substitui adequação clínica.
- Cada imagem pública deve ter legenda útil, crédito, licença, data de revisão e ligação a resumo/caso.

#### Regra de destino

| Tipo de imagem | Destino | Condição mínima |
|---|---|---|
| Própria ou com licença aberta | Biblioteca pública | autoria/fonte, licença, crédito e correlação clínica registrados |
| Captura de PDF comercial | Biblioteca privada autenticada | arquivo fora do repositório público, origem e página registradas, acesso exclusivo do proprietário |
| Paciente | Biblioteca privada autenticada por padrão | anonimização e autorização apropriada confirmadas; publicação pública somente com direito específico documentado |

O site público pode exibir a interface da biblioteca, mas o arquivo privado nunca é servido pelo GitHub Pages: sem sessão válida e política de propriedade, não há leitura do objeto.

### 6. Mapas mentais verdadeiros

- Substituir mapas que funcionam apenas como índices/listas por mapas conceituais com nós, setas e relações nomeadas.
- Cada mapa deve destacar conceitos-chave, mecanismo/fisiopatologia, manifestações, diagnóstico, diferenciais, conduta, armadilhas e conexões de Ciências Básicas pertinentes.
- Setas devem explicar a relação (`causa`, `aumenta risco`, `sugere`, `diferencia`, `confirma`, `trata`, `contraindica`), não apenas ligar caixas.
- Permitir abrir o resumo, questões, caso e mídia relacionados sem poluir o mapa principal.
- Validar legibilidade em celular e computador; evitar texto longo dentro dos nós.

### 7. Anki somente ao fim do conteúdo

- Não priorizar novos decks enquanto acervo, correlação curricular, mídia e mapas não estiverem consolidados.
- Ao final, validar AnkiConnect e gerar cartões somente de resumos aprovados e erros reais, com deduplicação e referências.

### 8. Design visual por último

- Após as fases funcionais, executar uma etapa exclusiva de design: hierarquia visual, tipografia, espaçamento, navegação, responsividade, acessibilidade e consistência.
- Nesta fase, não alterar conteúdo clínico, regras de sincronização ou estrutura de dados, salvo correção indispensável descoberta pelo QA.

## Critério de conclusão

A fase estará concluída quando o usuário conseguir escolher um semestre ou matéria já cursada, abrir conteúdos correlacionados, estudar resumos/casos/questões, visualizar mídia clinicamente contextualizada e navegar por mapas conceituais reais — com origem, privacidade e direitos rastreáveis. A biblioteca privada também deverá negar acesso sem login, impedir leitura cruzada entre contas e usar apenas URLs temporárias.
