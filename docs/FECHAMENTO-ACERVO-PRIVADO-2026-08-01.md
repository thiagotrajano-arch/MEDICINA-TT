# Fechamento do acervo privado — 2026-08-01

Este registro descreve apenas o estado técnico e quantitativo do acervo. Nenhuma
credencial, dado acadêmico pessoal, texto integral de material comercial ou
identificador da conta foi incluído no repositório público.

## Resultado verificável

- O conector autenticado do Google Drive foi reutilizado, sem novo fluxo de login.
- Foram localizadas 15 fontes médicas prioritárias: 14 podem apoiar estudo privado
  e 1 foi bloqueada porque sua licença proíbe uso em sistemas de inteligência
  artificial.
- A matriz privada consolidou 78 entradas temáticas entre Pediatria, Cirurgia,
  Cardiologia, Pneumologia, Neurologia, MFC, Psiquiatria e Urgência e Emergência.
- Quatro documentos locais foram materializados, tiveram SHA-256 calculado e
  resultaram em 420 questões únicas. Seus caches Markdown estão completos; como
  não contêm imagens nem tabelas, OCR e renderização não eram necessários.
- A comparação com as 1.072 questões já publicadas não encontrou enunciados
  idênticos nem similaridade forte que justificasse remoção automática.
- A auditoria editorial atual permanece com zero repetição, comentário curto ou
  vazio e fonte ausente.

Os DOCX confirmam quatro lacunas editoriais concretas: Radiologia, Farmacologia
e Imunologia possuem 30 questões-fonte cada sem área correspondente no site, e
Síndrome do Respirador Oral possui 10. Oncologia, Otorrinolaringologia,
Endocrinologia e Dermatologia existem, mas ainda têm baixa densidade. Esses itens
podem orientar produção autoral, nunca importação automática de gabarito.

## Reconciliação local adicional

A varredura final foi metadata-first e reutilizou manifestos e caches existentes,
sem abrir integralmente livros ou cursos comerciais.

- A pasta médica principal contém 1.144 fontes-alvo; 1.143 já estão no manifesto
  sem divergência de tamanho. O único ausente é um temporário inválido de 162
  bytes, não material médico.
- Há 253 caches íntegros e 878 fontes médicas ainda sem cache Markdown: 858 do
  lote Estratégia, 13 livros e sete fontes de outros grupos.
- Os 14 arquivos OOXML são estruturalmente válidos e contêm 81 mídias
  incorporadas, ainda não classificadas como clínicas ou reutilizáveis.
- O recorte auxiliar contém 16 provas OMED e 21 imagens clínicas já usadas pelo
  site; esses 37 itens não pertencem ao manifesto da pasta médica principal.
- Em Downloads, 79 candidatos médicos foram reconhecidos: 29 ZIPs, 24 vídeos,
  16 PDFs e 10 Markdown. Os 29 ZIPs abriram sem falha de diretório e somam 1.120
  entradas; seis arquivos internos são candidatos visuais ainda não revisados.
- A comparação por SHA-256 encontrou 32 arquivos pequenos ou médios sem
  correspondente no manifesto. Entre as próprias raízes locais há seis pares
  Markdown e dois pares PDF duplicados, que precisam ser reduzidos a cópias
  canônicas antes de chamar o conjunto de conteúdo novo. Outros 53 arquivos
  grandes permanecem somente catalogados por metadados. Dois PDFs têm cabeçalho
  válido, mas não exibem marcador final convencional e precisam de validação
  antes do parser.

## Catálogo autenticado

A rota `/minha-midia` agora contém também um catálogo de materiais privados. O
catálogo guarda somente metadados de proveniência e classificação; não guarda o
texto nem o arquivo binário dos documentos.

- Tabela: `public.material_privado_usuario`.
- Proteção: RLS por proprietário, nenhum acesso para `anon` e somente leitura
  para o navegador autenticado; a curadoria administrativa preserva hashes,
  estado e proveniência.
- Estado inicial: 22 registros — 18 fontes do Drive e 4 documentos locais.
- Integridade: quatro hashes reais registrados e uma fonte marcada como bloqueada.
- Visibilidade: os registros só são carregados depois de uma sessão autenticada.

A biblioteca de imagens e o catálogo são complementares. O catálogo já possui
registros; nenhum arquivo de imagem privado foi enviado automaticamente, portanto
a galeria de imagens continuará vazia até o primeiro upload controlado.

## Endurecimento de segurança

- O rastreador interno de migrações teve acessos de cliente revogados e RLS ativado.
- O histórico do rastreador foi reconciliado com as migrações aplicadas.
- A view de estatísticas de questões passou a respeitar as permissões do chamador.
- As funções apontadas pelo auditor receberam `search_path` fixo.
- O catálogo suporta leitura paginada acima de 1.000 registros e limita a
  quantidade de cartões renderizados por vez para não poluir a interface.

Ainda falta validar o isolamento usando duas contas reais distintas. O auditor
também sinaliza a proteção contra senhas vazadas, porém a documentação oficial a
classifica como recurso do plano Pro; ela não pode ser habilitada mantendo o
requisito atual de custo zero. Como uma senha foi compartilhada anteriormente na
conversa, ela precisa ser trocada por uma senha longa, única e não compartilhada
antes de guardar material de paciente. Permanecem ainda avisos pré-existentes
sobre extensões no schema `public`; movê-las exige migração planejada porque
índices e funções dependem delas.

## Limites que permanecem honestos

- O conector do Drive fornece texto e metadados, mas não materializa todo binário
  como arquivo local. SHA-256, renderização e recorte de imagens exigem que cada
  candidato seja exportado por um caminho que entregue os bytes reais.
- Nenhuma imagem de PDF comercial ou de paciente foi publicada. Materiais
  comerciais permanecem privados; imagens de paciente exigem anonimização e
  autorização apropriada.
- As 78 entradas ainda precisam da comparação final com a cobertura existente,
  fontes clínicas primárias e associação completa aos planos do SISCAD,
  sobretudo em Pediatria e Psiquiatria.
- A presença de 878 fontes locais sem cache não autoriza conversão em massa:
  primeiro é necessário deduplicar e priorizar por lacuna clínica, semestre e
  OMED, mantendo livros e cursos comerciais apenas na camada privada.

## GitHub Pages ou Vercel

A arquitetura atual — interface estática no GitHub Pages e autenticação, banco e
Storage privado no Supabase — já suporta o catálogo e a biblioteca privada. Mover
somente a mesma exportação estática para a Vercel seria simples, mas não mudaria a
privacidade nem preencheria a biblioteca.

Uma migração para uma aplicação Next.js com servidor na Vercel é um projeto de
porte moderado: retirar a exportação estática e o `basePath`, introduzir sessão em
cookies e rotas de servidor, configurar variáveis e redirecionamentos e repetir os
testes de autenticação, RLS e deploy. Ela passa a fazer sentido quando houver
processamento protegido no servidor ou múltiplos usuários, não como requisito
para o uso privado atual.

## Próxima sequência real

1. Testar login, catálogo e upload de uma imagem própria na conta real.
2. Trocar a senha anteriormente compartilhada e executar o teste de isolamento
   entre duas contas. Reavaliar a proteção contra senhas vazadas somente se o
   projeto migrar para um plano pago.
3. Materializar, por prioridade, somente os binários médicos necessários para
   hash, OCR seletivo e revisão de imagens, começando pelos slides de PCR/ACLS,
   START e classificação de risco identificados na triagem.
4. Fechar a matriz tema → disciplina → semestre → subtema → prioridade OMED.
5. Transformar lacunas comprovadas em conteúdo autoral apoiado por fontes
   primárias; manter material comercial apenas como referência privada.
## Atualizacao de continuacao do Drive

- Um lote adicional de PDFs foi materializado em area privada, recebeu SHA-256, cache Markdown e triagem. Os materiais OMED repetidos foram reconhecidos como duplicatas exatas de fontes locais; novos materiais ficaram no catalogo privado.
- Imagens embutidas foram extraidas para revisao privada; renderizacao e OCR seletivo passaram a ser possiveis no runtime. Nao ha liberacao automatica de imagem, texto ou questao para o site.
- O cruzamento candidato com planos privados do SISCAD foi registrado sem copiar dados pessoais. A integracao exige revisao manual, diretriz vigente, licenca e privacidade.
