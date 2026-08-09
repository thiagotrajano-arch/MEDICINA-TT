import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const arquivos = [
  "src/content/questoes/cardio.ts",
  "src/content/questoes/neuro.ts",
  "src/content/questoes/pneumo.ts",
];

const prefixosContraditorios = [
  "Esta alternativa não corresponde à conduta recomendada. ",
  "Esta opção diverge da diretriz atual. ",
  "Esta resposta não reflete o padrão-ouro. ",
];

let total = 0;

for (const arquivo of arquivos) {
  const caminho = path.join(process.cwd(), arquivo);
  const original = await readFile(caminho, "utf8");
  let alteracoes = 0;

  const normalizado = original
    .split(/(?<=\n)/)
    .map((linha) => {
      if (!/correta:\s*true/.test(linha) || !/comentario:\s*"/.test(linha)) {
        return linha;
      }

      let resultado = linha;
      for (const prefixo of prefixosContraditorios) {
        const alvo = `comentario: "${prefixo}`;
        if (resultado.includes(alvo)) {
          resultado = resultado.replace(alvo, 'comentario: "Alternativa correta. ');
          alteracoes += 1;
          break;
        }
      }
      return resultado;
    })
    .join("");

  if (normalizado !== original) {
    await writeFile(caminho, normalizado, "utf8");
  }

  total += alteracoes;
  console.log(`${arquivo}: ${alteracoes} comentários normalizados`);
}

console.log(`Total: ${total} comentários de respostas corretas normalizados.`);
