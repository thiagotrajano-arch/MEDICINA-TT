# Trilhas do Curso — contrato de privacidade

## Camada pública

A rota `/semestres` é uma orientação de revisão em três ciclos da formação
médica. Ela pode listar apenas eixos genéricos, os períodos como referência e
atalhos para conteúdo já publicado no Codex Medicus.

Ela nunca contém dados individualizados, documentos de origem, situação de
componentes, percentuais, cronogramas pessoais, nomes, identificadores ou
anotações de estudo.

## Camada privada

O mapa curricular individual, os materiais autorizados, as conexões por
disciplina e as lacunas de estudo são mantidos exclusivamente no cofre privado
do Obsidian. Eles não entram no Git, no bundle estático, em logs do Actions ou
em qualquer página pública.

## Atualização segura

1. Receber uma nova fonte somente no ambiente privado.
2. Se a fonte for PDF, criar ou conferir seu Markdown cacheado antes da leitura.
3. Atualizar a matriz privada com proveniência, data e destino permitido.
4. Publicar apenas uma síntese original, clínica e licenciada quando houver
   uma lacuna real no acervo público.
5. Executar `npm run audit:privacidade` antes de cada publicação que tocar na
   rota de trilhas.

## Próxima evolução

Uma área autenticada de atualização semestral só será construída depois de
revisar autenticação, RLS, importação e histórico de alterações. Até lá, o
cofre privado é a fonte de verdade para qualquer acompanhamento individual.
