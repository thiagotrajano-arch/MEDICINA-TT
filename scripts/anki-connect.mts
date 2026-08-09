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
const DECK_PREFIXO = "Codex Medicus::";
const args = process.argv.slice(2);
const comando = args[0] ?? "status";
const valorDaFlag = (flag: string): string | undefined => {
  const indice = args.indexOf(flag);
  return indice >= 0 ? args[indice + 1] : undefined;
};
const subtemaId = valorDaFlag("--subtema");
const questoesArg = valorDaFlag("--questoes");
const saidaArg = valorDaFlag("--saida");

type RespostaAnki<T> = { result: T; error: string | null };

async function anki<T>(action: string, params: Record<string, unknown> = {}): Promise<T> {
  const resposta = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, version: 6, params }),
    signal: AbortSignal.timeout(15000),
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
  // Um deck por disciplina deixa o Anki navegavel. O subtema permanece em
  // tags/Tema, evitando nomes de 100+ caracteres e a proliferacao de decks.
  const disciplina = (disciplinaSlug || "geral").replace(/[^a-zA-Z0-9_-]+/g, "-").slice(0, 36);
  return `${DECK_PREFIXO}${disciplina || subtemaSlug}`;
}

function encurtarTitulo(titulo: string, limite = 88): string {
  const limpo = titulo.replace(/\s+/g, " ").trim();
  if (limpo.length <= limite) return limpo;
  const corte = limpo.slice(0, limite - 1).replace(/\s+\S*$/, "").trim();
  return `${corte || limpo.slice(0, limite - 1)}...`;
}

function tituloCartao(titulo: string, secao: string): string {
  return `<div class="codex-front-title">${encurtarTitulo(titulo)}</div><div class="codex-front-section">${encurtarTitulo(secao, 72)}</div>`;
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

async function exportarProgressoAnki() {
  const decks = (await anki<string[]>("deckNames"))
    .filter((deck) => deck.startsWith("Codex Medicus - ") || deck.startsWith(DECK_PREFIXO));
  const estatisticas: Record<string, {
    name: string;
    new: number;
    learn: number;
    review: number;
    due: number;
    cards: number;
    newToday: number;
    learnToday: number;
    reviewToday: number;
  }> = {};
  // O AnkiConnect instalado nesta máquina não expõe deckStats. A leitura
  // equivalente por findCards/cardsInfo é compatível com a versão atual e
  // não altera intervalos, histórico ou conteúdo dos cartões.
  for (const deck of decks) {
    const cardIds = await anki<number[]>("findCards", { query: `deck:"${deck}"` });
    const cards: Array<{ queue: number; type: number; due: number; mod: number; reps: number }> = [];
    for (let i = 0; i < cardIds.length; i += 25) {
      const lote = cardIds.slice(i, i + 25);
      try {
        cards.push(...await anki<Array<{ queue: number; type: number; due: number; mod: number; reps: number }>>("cardsInfo", { cards: lote }));
      } catch {
        // Algumas compilações do Anki no Windows recusam lotes; degrade para
        // chamadas unitárias, sem interromper a exportação.
        for (const cardId of lote) {
          try { cards.push(...await anki<Array<{ queue: number; type: number; due: number; mod: number; reps: number }>>("cardsInfo", { cards: [cardId] })); } catch { /* cartão removido durante a leitura */ }
        }
      }
    }
    const inicioHoje = Math.floor(Date.now() / 86400000) * 86400;
    estatisticas[deck] = {
      name: deck,
      cards: cards.length,
      new: cards.filter((card) => card.type === 0).length,
      learn: cards.filter((card) => card.queue === 1 || card.queue === 3).length,
      review: cards.filter((card) => card.queue === 2).length,
      due: cards.filter((card) => card.queue === 1 || card.queue === 2 || card.queue === 3).length,
      newToday: 0,
      learnToday: 0,
      reviewToday: cards.filter((card) => card.reps > 0 && card.mod >= inicioHoje).length,
    };
  }
  const relatorio = {
    schemaVersion: 1 as const,
    generatedAt: new Date().toISOString(),
    source: "anki-connect-local" as const,
    decks: Object.entries(estatisticas).map(([, dados]) => ({
      name: dados.name,
      cards: Number(dados.cards ?? 0),
      new: Number(dados.new ?? 0),
      learn: Number(dados.learn ?? 0),
      review: Number(dados.review ?? 0),
      due: Number(dados.due ?? 0),
      newToday: Number(dados.newToday ?? 0),
      learnToday: Number(dados.learnToday ?? 0),
      reviewToday: Number(dados.reviewToday ?? 0),
    })),
  };
  const destino = resolve(saidaArg ?? "exports/anki/progresso.json");
  await mkdir(dirname(destino), { recursive: true });
  await writeFile(destino, `${JSON.stringify(relatorio, null, 2)}\n`, "utf8");
  console.log(`[anki] Relatório local criado: ${destino} (${relatorio.decks.length} deck(s)).`);
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
        Frente: tituloCartao(conteudo.titulo, bloco.secao),
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
    try {
      const existentes = await anki<number[]>("findNotes", { query: `deck:"${deck}" tag:${tagSubtema(item.id)}` });
      if (existentes.length < esperados) {
        pendentes.push(item);
        incompletos += 1;
      }
    } catch (erro) {
      console.error(`[anki] não foi possível conferir ${item.id}; será tratado como pendente: ${erro instanceof Error ? erro.message : String(erro)}`);
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

async function criarLoteNeuroPendente() {
  const disciplina = DISCIPLINAS.find((item) => item.id === "neuro");
  if (!disciplina) throw new Error("Disciplina de Neurologia não encontrada.");
  const decks = await anki<string[]>("deckNames");
  const candidatos = disciplina.temas.flatMap((tema) => tema.subtemas
    .filter((subtema) => CONTEUDOS[subtema.id])
    .map((subtema) => ({ id: subtema.id, slug: subtema.slug, disciplina, altoRendimento: Boolean(subtema.altoRendimento) })))
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
    try {
      const existentes = await anki<number[]>("findNotes", { query: `deck:"${deck}" tag:${tagSubtema(item.id)}` });
      if (existentes.length < esperados) {
        pendentes.push(item);
        incompletos += 1;
      }
    } catch (erro) {
      console.error(`[anki] não foi possível conferir ${item.id}; será tratado como pendente: ${erro instanceof Error ? erro.message : String(erro)}`);
      pendentes.push(item);
      incompletos += 1;
    }
  }
  console.log(`[anki] Neurologia: ${candidatos.length} subtemas com resumo; ${semDeck} sem deck; ${incompletos} incompletos.`);
  for (const [index, item] of pendentes.entries()) {
    console.log(`[anki] Neuro ${index + 1}/${pendentes.length} — ${item.id}`);
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

async function organizarDecks(aplicar: boolean) {
  const decks = await anki<string[]>("deckNames");
  const limparVazios = args.includes("--limpar-vazios");
  const legados = decks.filter((deck) => (deck.startsWith("Codex Medicus - ") || (deck.startsWith(DECK_PREFIXO) && deck.split("::").length > 2)) && !deck.includes("Probe") && !deck.includes("Piloto"));
  const plano = legados.map((origem) => {
    const partes = origem.startsWith("Codex Medicus - ") ? origem.split(" - ") : origem.split("::");
    const disciplina = (partes[1] || "geral").replace(/[^a-zA-Z0-9_-]+/g, "-").slice(0, 36) || "geral";
    return { origem, destino: `${DECK_PREFIXO}${disciplina}` };
  }).filter((item) => item.origem !== item.destino);

  console.log(`[anki] Plano de organizacao: ${plano.length} deck(s) legado(s). Decks vazios só serão removidos com --limpar-vazios.`);
  for (const item of plano) console.log(`  ${item.origem} -> ${item.destino}`);
  if (!aplicar) {
    console.log("[anki] Simulacao concluida. Para mover os cartoes, use: npm run anki:organizar -- --aplicar");
    return;
  }
  for (const item of plano) {
    await garantirDeck(item.destino);
    const cards = await anki<number[]>("findCards", { query: `deck:"${item.origem}"` });
    for (let indice = 0; indice < cards.length; indice += 200) {
      await anki("changeDeck", { cards: cards.slice(indice, indice + 200), deck: item.destino });
    }
    // Anki 2.1.28+ requires cardsToo=true to delete a deck. The guard above
    // proves this deck has no cards, so this cannot remove a card.
    if (limparVazios && cards.length === 0) await anki("deleteDecks", { decks: [item.origem], cardsToo: true });
    console.log(`[anki] ${cards.length} cartao(oes) movido(s): ${item.origem} -> ${item.destino}.`);
  }
  try {
    await anki("updateModelStyling", {
      model: { name: MODEL_NAME, css: `
.card { font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; max-width: 720px; margin: 0 auto; }
.codex-front-title { font-size: 1.08em; font-weight: 700; line-height: 1.3; margin-bottom: 0.8em; }
.codex-front-section { display: inline-block; font-size: 0.86em; font-weight: 600; color: #3f6370; padding: 0.25em 0.55em; border-radius: 0.45em; background: #e7f2f3; }
img { max-width: 100%; height: auto; }
` },
    });
    console.log(`[anki] Estilo do modelo ${MODEL_NAME} ajustado para titulos compactos.`);
  } catch (erro) {
    console.warn(`[anki] Nao foi possivel atualizar o estilo agora: ${erro instanceof Error ? erro.message : String(erro)}`);
  }
  console.log(limparVazios ? "[anki] Organizacao aplicada; decks legados vazios foram removidos após verificação." : "[anki] Organizacao aplicada. Decks antigos foram mantidos vazios para permitir reversao manual.");
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
  if (comando === "progresso") return exportarProgressoAnki();
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
  if (comando === "lote-neuro-pendente") return criarLoteNeuroPendente();
  if (comando === "organizar") return organizarDecks(args.includes("--aplicar"));
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
