# Diagnóstico de codificação — lote de 300 cartões

A tentativa controlada de recuperar o lote confirmou que a corrupção não se
limita aos acentos. Há marcadores entre letras e palavras, e a remoção mecânica
elimina limites lexicais. Exemplos passam a formar cadeias como
`aterosclerosedegrandesarterias`, inadequadas para estudo.

Nenhum texto recuperado experimentalmente foi gravado no Anki. Os cartões
legados permanecem preservados. O lote deverá ser reconstruído a partir dos
resumos e diretrizes por especialidade, como já foi feito no piloto de AVC
isquêmico.

O script `anki-recuperar-codificacao-lote.mts` gera somente artefatos privados
de diagnóstico e não altera cartões.
