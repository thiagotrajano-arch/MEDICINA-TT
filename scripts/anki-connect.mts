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
const MODEL_NAME = "OMED Bonito";
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
  if (corpo.error) throw new Error(`${action}: ${corpo.error}`);
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

function normalizarSimbolosAnki(texto: string): string {
  const trocas: Array<[string, string]> = [
    [String.fromCharCode(8212), "-"],
    [String.fromCharCode(8211), "-"],
    [String.fromCharCode(8594), "->"],
    [String.fromCharCode(8592), "<-"],
    [String.fromCharCode(8804), "<="],
    [String.fromCharCode(8805), ">="],
    [String.fromCharCode(177), "+/-"],
  ];
  return trocas
    .reduce((resultado, [origem, destino]) => resultado.split(origem).join(destino), texto)
    // Evita que comparadores como "PAS <90" sejam interpretados como tags HTML
    // pelo Anki; as tags que geramos (<br>, <b>, <small>) permanecem intactas.
    .replace(/<(?=\s*(?:\d|=))/g, "&lt;")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\u0000-\u007F]/g, "");
}

function tagSubtema(id: string): string {
  return `codex-medicus-subtema-${id.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function nomeDeck(id: string, disciplinaSlug: string, subtemaSlug: string): string {
  return `Codex Medicus - ${disciplinaSlug} - ${id.replace(/[^a-zA-Z0-9]+/g, "-") || subtemaSlug}`;
}

function adaptarNotaParaModelo(nota: { fields: Record<string, string>; [chave: string]: unknown }) {
  return {
    ...nota,
    fields: {
      Frente: normalizarSimbolosAnki(nota.fields.Frente ?? nota.fields.Front ?? ""),
      Verso: normalizarSimbolosAnki(nota.fields.Verso ?? nota.fields.Back ?? ""),
      Tema: normalizarSimbolosAnki(nota.fields.Tema ?? "Codex Medicus"),
      Referencia: normalizarSimbolosAnki(nota.fields.Referencia ?? "Codex Medicus"),
    },
  };
}

async function adicionarNotas(notas: Array<{ fields: Record<string, string>; [chave: string]: unknown }>): Promise<Array<number | null>> {
  const ids: Array<number | null> = [];
  for (const [indice, nota] of notas.entries()) {
    try {
      ids.push(await anki<number>("addNote", { note: adaptarNotaParaModelo(nota) }));
    } catch (erro) {
      const mensagem = erro instanceof Error ? erro.message : String(erro);
      if (mensagem.includes("[Errno 22]")) {
        // Fallback para o parser HTML local do Anki: mantém o conteúdo, mas
        // remove marcação que possa ser interpretada como HTML inválido.
        const seguro = adaptarNotaParaModelo(nota);
        const simples = {
          ...seguro,
          fields: Object.fromEntries(Object.entries(seguro.fields).map(([campo, valor]) => [
            campo,
            valor.replace(/<br\s*\/?>(?=\s*)/gi, "\n").replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
          ])),
        };
        try {
          ids.push(await anki<number>("addNote", { note: simples }));
          continue;
        } catch {
          // Registra abaixo a falha final sem interromper os demais cartões.
        }
      }
      if (!mensagem.includes("duplicate")) {
        const marcador = (nota.fields.Frente ?? nota.fields.Front ?? "").replace(/<[^>]+>/g, " ").slice(0, 100);
        console.error(`[anki] nota ${indice + 1}/${notas.length} ignorada (${marcador}): ${mensagem}`);
      }
      ids.push(null);
    }
  }
  return ids;
}

async function status() {
  const versao = await anki<number>("version");
  const decks = await anki<string[]>("deckNames");
  console.log(`[anki] conectado ao AnkiConnect v${versao}. ${decks.length} deck(s) disponíveis.`);
}

async function garantirDeck(deck: string): Promise<void> {
  const decks = await anki<string[]>("deckNames");
  if (decks.includes(deck)) return;
  try {
    await anki("createDeck", { deck });
  } catch (erro) {
    // Em algumas instalações do Anki no Windows, createDeck pode retornar
    // Errno 22 apesar de ter criado o deck. Confirme o estado antes de falhar.
    const atualizados = await anki<string[]>("deckNames");
    if (!atualizados.includes(deck)) throw erro;
  }
}

async function criarDeResumo(id: string) {
  const conteudo = CONTEUDOS[id];
  const taxonomia = encontrarSubtema(id);
  if (!conteudo || !taxonomia) throw new Error(`Subtema não encontrado ou sem resumo: ${id}`);

  const deck = nomeDeck(id, taxonomia.disciplina.slug, taxonomia.subtema.slug);
  const subtemaTag = tagSubtema(id);
  await garantirDeck(deck);
  // A rotina é idempotente por nota: duplicatas são recusadas pelo AnkiConnect
  // e as lacunas continuam sendo preenchidas em decks parcialmente importados.

  const notas = conteudo.blocos
    .filter((bloco) => textoLimpo(bloco.corpo).length >= 40)
    .map((bloco) => ({
      deckName: deck,
      modelName: MODEL_NAME,
      fields: {
        Frente: `${conteudo.titulo}<br><br><b>${bloco.secao}</b>`,
        Verso: `${textoLimpo(bloco.corpo).replace(/\n/g, "<br>")}<br><br><small>Fonte: ${conteudo.referencias.join("; ")}</small>`,
        Tema: taxonomia.subtema.nome,
        Referencia: conteudo.referencias.join("; "),
      },
      tags: ["codex-medicus", subtemaTag, `disciplina-${taxonomia.disciplina.slug}`],
      options: { allowDuplicate: false, duplicateScope: "deck" },
    }));
  const resultado = await adicionarNotas(notas);
  const criados = resultado.filter((item) => item !== null).length;
  console.log(`[anki] ${criados}/${notas.length} cartão(ões) criados em ${deck}.`);
}

async function criarDeErros(ids: string[]) {
  const questoes = QUESTOES.filter((questao) => ids.includes(questao.id));
  if (!questoes.length) throw new Error("Nenhuma questão encontrada nos IDs informados.");
  const deck = "Codex Medicus - Erros";
  await garantirDeck(deck);
  const notas = questoes.map((questao) => {
    const correta = questao.alternativas.find((alternativa) => alternativa.correta);
    return {
      deckName: deck,
      modelName: MODEL_NAME,
      fields: {
        Front: `Questão de revisão<br><br>${questao.enunciado}`,
        Back: `<b>Resposta: ${correta?.letra ?? "—"}. ${correta?.texto ?? ""}</b><br><br>${correta?.comentario ?? ""}<br><br><small>Fonte: ${questao.fonte ?? "Codex Medicus"}</small>`,
      },
      tags: ["codex-medicus", "erros", tagSubtema(questao.subtemaId), `disciplina-${questao.disciplinaId}`],
      options: { allowDuplicate: false, duplicateScope: "deck" },
    };
  });
  const resultado = await adicionarNotas(notas);
  console.log(`[anki] ${resultado.filter((item) => item !== null).length}/${notas.length} cartão(ões) de erro criados em ${deck}.`);
}

async function criarLoteOmedNeuro() {
  const ids = DISCIPLINAS
    .filter((disciplina) => disciplina.omed || disciplina.id === "neuro")
    .flatMap((disciplina) => disciplina.temas.flatMap((tema) => tema.subtemas.map((subtema) => subtema.id)))
    .filter((id, index, todos) => CONTEUDOS[id] && todos.indexOf(id) === index);
  console.log(`[anki] Lote OMED + Neurologia: ${ids.length} subtemas com resumo.`);
  for (const [index, id] of ids.entries()) {
    console.log(`[anki] ${index + 1}/${ids.length} — ${id}`);
    try {
      await criarDeResumo(id);
    } catch (erro) {
      console.error(`[anki] subtema ignorado e registrado para nova tentativa: ${id} — ${erro instanceof Error ? erro.message : String(erro)}`);
    }
  }
}

async function criarLotePrioritario() {
  const prioritarias = new Set(["cardio", "pneumo", "nefro", "endocrino", "hemato", "onco", "derma"]);
  const decks = await anki<string[]>("deckNames");
  const candidatos = DISCIPLINAS
    .filter((disciplina) => prioritarias.has(disciplina.id))
    .flatMap((disciplina) => disciplina.temas.flatMap((tema) => tema.subtemas
      .filter((subtema) => CONTEUDOS[subtema.id])
      .map((subtema) => ({ id: subtema.id, slug: subtema.slug, disciplina, altoRendimento: Boolean(subtema.altoRendimento) }))))
    .filter((item, index, todos) => todos.findIndex((outro) => outro.id === item.id) === index)
    .sort((a, b) => Number(b.altoRendimento) - Number(a.altoRendimento));
  const pendentes: typeof candidatos = [];
  let semDeck = 0;
  let incompletos = 0;
  for (const item of candidatos) {
    const deck = nomeDeck(item.id, item.disciplina.slug, item.slug);
    if (!decks.includes(deck)) {
      pendentes.push(item);
      semDeck += 1;
      continue;
    }
    const esperados = CONTEUDOS[item.id].blocos.filter((bloco) => textoLimpo(bloco.corpo).length >= 40).length;
    const existentes = await anki<number[]>("findNotes", { query: `deck:"${deck}" tag:${tagSubtema(item.id)}` });
    if (existentes.length < esperados) {
      pendentes.push(item);
      incompletos += 1;
    }
  }
  console.log(`[anki] Prioritárias OMED: ${candidatos.length} subtemas com resumo; ${semDeck} sem deck; ${incompletos} incompletos.`);
  for (const [index, item] of pendentes.entries()) {
    console.log(`[anki] ${index + 1}/${pendentes.length} — ${item.id}`);
    try {
      await criarDeResumo(item.id);
    } catch (erro) {
      console.error(`[anki] falha registrada: ${item.id} — ${erro instanceof Error ? erro.message : String(erro)}`);
    }
  }
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
  if (comando === "lote-omed-neuro") return criarLoteOmedNeuro();
  if (comando === "lote-prioritario") return criarLotePrioritario();
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
