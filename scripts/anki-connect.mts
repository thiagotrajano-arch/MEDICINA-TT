/**
 * Ponte local Codex Medicus -> Anki Desktop.
 *
 * Uso:
 *   npm run anki:status
 *   npm run anki:resumo -- --subtema <id>
 *
 * Requer o Anki Desktop aberto com o complemento AnkiConnect. Nenhum cartão
 * passa pelo site, pelo Supabase ou por serviço externo: a conexão é apenas
 * com http://127.0.0.1:8765 nesta máquina.
 */
import { CONTEUDOS } from "../src/content/conteudos";
import { QUESTOES } from "../src/content/questoes";
import { DISCIPLINAS } from "../src/content/taxonomy";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const ENDPOINT = "http://127.0.0.1:8765";
const args = process.argv.slice(2);
const comando = args[0] ?? "status";
const subtemaId = args[args.indexOf("--subtema") + 1];
const questoesArg = args[args.indexOf("--questoes") + 1];
const saidaArg = args[args.indexOf("--saida") + 1];

type RespostaAnki<T> = { result: T; error: string | null };

async function anki<T>(action: string, params: Record<string, unknown> = {}): Promise<T> {
  const resposta = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, version: 6, params }),
    signal: AbortSignal.timeout(4000),
  });
  if (!resposta.ok) throw new Error(`AnkiConnect respondeu HTTP ${resposta.status}.`);
  const corpo = await resposta.json() as RespostaAnki<T>;
  if (corpo.error) throw new Error(corpo.error);
  return corpo.result;
}

function textoLimpo(texto: string): string {
  return texto
    .replace(/!?(\[[^\]]*\]\([^)]*\))/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\|/g, " · ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function encontrarSubtema(id: string) {
  for (const disciplina of DISCIPLINAS) {
    for (const tema of disciplina.temas) {
      const subtema = tema.subtemas.find((item) => item.id === id);
      if (subtema) return { disciplina, subtema };
    }
  }
  return null;
}

async function status() {
  const versao = await anki<number>("version");
  const decks = await anki<string[]>("deckNames");
  console.log(`[anki] conectado ao AnkiConnect v${versao}. ${decks.length} deck(s) disponíveis.`);
}

async function criarDeResumo(id: string) {
  const conteudo = CONTEUDOS[id];
  const taxonomia = encontrarSubtema(id);
  if (!conteudo || !taxonomia) throw new Error(`Subtema não encontrado ou sem resumo: ${id}`);

  const deck = `Codex Medicus::${taxonomia.disciplina.nome}::${taxonomia.subtema.nome}`;
  await anki("createDeck", { deck });
  const existentes = await anki<number[]>("findNotes", { query: `deck:"${deck}" tag:codex-medicus::${id}` });
  if (existentes.length) {
    console.log(`[anki] Nenhum cartão criado: este resumo já possui ${existentes.length} nota(s) Codex Medicus no deck.`);
    return;
  }

  const notas = conteudo.blocos
    .filter((bloco) => textoLimpo(bloco.corpo).length >= 40)
    .map((bloco) => ({
      deckName: deck,
      modelName: "Basic",
      fields: {
        Front: `${conteudo.titulo}<br><br><b>${bloco.secao}</b>`,
        Back: `${textoLimpo(bloco.corpo).replace(/\n/g, "<br>")}<br><br><small>Fonte: ${conteudo.referencias.join("; ")}</small>`,
      },
      tags: ["codex-medicus", `codex-medicus::${id}`, `disciplina::${taxonomia.disciplina.slug}`],
      options: { allowDuplicate: false, duplicateScope: "deck" },
    }));
  const resultado = await anki<(number | null)[]>("addNotes", { notes: notas });
  const criados = resultado.filter((item) => item !== null).length;
  console.log(`[anki] ${criados}/${notas.length} cartão(ões) criados em ${deck}.`);
}

async function criarDeErros(ids: string[]) {
  const questoes = QUESTOES.filter((questao) => ids.includes(questao.id));
  if (!questoes.length) throw new Error("Nenhuma questão encontrada nos IDs informados.");
  const deck = "Codex Medicus::Erros";
  await anki("createDeck", { deck });
  const notas = questoes.map((questao) => {
    const correta = questao.alternativas.find((alternativa) => alternativa.correta);
    return {
      deckName: deck,
      modelName: "Basic",
      fields: {
        Front: `Questão de revisão<br><br>${questao.enunciado}`,
        Back: `<b>Resposta: ${correta?.letra ?? "—"}. ${correta?.texto ?? ""}</b><br><br>${correta?.comentario ?? ""}<br><br><small>Fonte: ${questao.fonte ?? "Codex Medicus"}</small>`,
      },
      tags: ["codex-medicus", "erros", `subtema::${questao.subtemaId}`, `disciplina::${questao.disciplinaId}`],
      options: { allowDuplicate: false, duplicateScope: "deck" },
    };
  });
  const resultado = await anki<(number | null)[]>("addNotes", { notes: notas });
  console.log(`[anki] ${resultado.filter((item) => item !== null).length}/${notas.length} cartão(ões) de erro criados em ${deck}.`);
}

function csv(valor: string): string {
  return `"${valor.replace(/"/g, '""').replace(/\r?\n/g, "<br>")}"`;
}

async function exportarResumoCsv(id: string) {
  const conteudo = CONTEUDOS[id];
  const taxonomia = encontrarSubtema(id);
  if (!conteudo || !taxonomia) throw new Error(`Subtema não encontrado ou sem resumo: ${id}`);
  const linhas = ["Front,Back,Tags"];
  for (const bloco of conteudo.blocos.filter((item) => textoLimpo(item.corpo).length >= 40)) {
    linhas.push([
      csv(`${conteudo.titulo} — ${bloco.secao}`),
      csv(`${textoLimpo(bloco.corpo)}\n\nFonte: ${conteudo.referencias.join("; ")}`),
      csv(`codex-medicus disciplina::${taxonomia.disciplina.slug} subtema::${id}`),
    ].join(","));
  }
  const destino = resolve(saidaArg ?? `exports/anki/${id}.csv`);
  await mkdir(dirname(destino), { recursive: true });
  await writeFile(destino, `\uFEFF${linhas.join("\n")}\n`, "utf8");
  console.log(`[anki] CSV criado: ${destino}. Importe no Anki com os campos Front, Back e Tags.`);
}

async function main() {
  if (comando === "status") return status();
  if (comando === "resumo") {
    if (!subtemaId) throw new Error("Informe --subtema <id>.");
    return criarDeResumo(subtemaId);
  }
  if (comando === "erros") {
    if (!questoesArg) throw new Error("Informe --questoes id-1,id-2.");
    return criarDeErros(questoesArg.split(",").map((id) => id.trim()).filter(Boolean));
  }
  if (comando === "csv-resumo") {
    if (!subtemaId) throw new Error("Informe --subtema <id>.");
    return exportarResumoCsv(subtemaId);
  }
  throw new Error("Comando inválido. Use status, resumo, erros ou csv-resumo.");
}

main().catch((erro: unknown) => {
  const mensagem = erro instanceof Error ? erro.message : String(erro);
  if (mensagem.includes("fetch failed") || mensagem.includes("timeout")) {
    console.error("[anki] Anki Desktop não está aberto ou o AnkiConnect não respondeu em 127.0.0.1:8765.");
  } else {
    console.error(`[anki] erro: ${mensagem}`);
  }
  process.exit(1);
});
