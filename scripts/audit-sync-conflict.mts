import { unirPorId } from "../src/lib/progresso";

const localMaisNovo = { id: "evento-1", em: 2_000, correta: true };
const remotoAtrasado = { id: "evento-1", em: 1_000, correta: false };
const resultado = unirPorId([localMaisNovo], [remotoAtrasado]);

const passou = resultado.length === 1 && resultado[0]?.em === 2_000 && resultado[0]?.correta === true;
console.log(JSON.stringify({ passou, eventoEscolhido: resultado[0] ?? null }));
if (!passou) process.exit(1);
