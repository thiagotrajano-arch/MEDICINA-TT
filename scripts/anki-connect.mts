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
const DECK_PREFIXO = "MEDICINA::";
const DECK_PREFIXOS_LEGADOS = ["Codex Medicus::", "Codex Medicus - ", DECK_PREFIXO];
const MODEL_CSS = [
  ".card { box-sizing: border-box; max-width: 760px; margin: 0 auto; padding: 22px; background: #081521; color: #f2f8fc; font-family: Inter, Aptos, 'Segoe UI', Arial, sans-serif; font-size: 18px; line-height: 1.5; text-align: left; }",
  ".omed-card { overflow: hidden; border: 1px solid #29445a; border-top: 5px solid #61c7e2; border-radius: 18px; padding: clamp(20px, 5vw, 36px); background: #0e2030; box-shadow: 0 16px 42px rgba(0, 0, 0, .32); }",
  ".omed-header { margin-bottom: 18px; }",
  ".omed-badge { display: inline-flex; max-width: 100%; border-radius: 999px; padding: 6px 11px; background: #14384a; color: #82d8ec; font-size: 12px; font-weight: 800; letter-spacing: .08em; line-height: 1.25; text-transform: uppercase; }",
  ".omed-question { font-size: clamp(21px, 4vw, 29px); font-weight: 750; letter-spacing: -.02em; line-height: 1.3; }",
  ".omed-question-back { color: #b7c9d7; font-size: 15px; font-weight: 650; line-height: 1.4; }",
  ".omed-hint { margin-top: 24px; color: #8fa8ba; font-size: 12px; font-weight: 650; letter-spacing: .04em; }",
  ".omed-divider { height: 1px; margin: 20px 0; background: #29445a; }",
  ".omed-answer { color: #f2f8fc; font-size: clamp(18px, 3vw, 23px); font-weight: 650; line-height: 1.48; }",
  ".omed-ref { margin-top: 22px; border-left: 3px solid #61c7e2; padding: 9px 12px; background: #142a3d; color: #b7c9d7; font-size: 12px; line-height: 1.45; }",
  "img { display: block; max-width: 100%; max-height: 68vh; margin: 18px auto; border-radius: 12px; object-fit: contain; }",
  ".cloze { color: #61c7e2; font-weight: 800; }",
  "@media (max-width: 520px) { .card { padding: 10px; font-size: 17px; } .omed-card { border-radius: 14px; padding: 20px; } }",
  ".nightMode.card, .night_mode .card { background: #081521; color: #f2f8fc; }",
  ".nightMode .omed-card, .night_mode .omed-card { border-color: #29465c; border-top-color: #61c7e2; background: #0e2030; box-shadow: 0 16px 42px rgba(0, 0, 0, .32); }",
  ".nightMode .omed-badge, .night_mode .omed-badge { background: #14384a; color: #82d8ec; }",
  ".nightMode .omed-question, .nightMode .omed-answer, .night_mode .omed-question, .night_mode .omed-answer { color: #f2f8fc; }",
  ".nightMode .omed-question-back, .nightMode .omed-hint, .night_mode .omed-question-back, .night_mode .omed-hint { color: #b7c9d7; }",
  ".nightMode .omed-divider, .night_mode .omed-divider { background: #29465c; }",
  ".nightMode .omed-ref, .night_mode .omed-ref { background: #142a3d; color: #b7c9d7; }",
  ".nightMode .cloze, .night_mode .cloze { color: #61c7e2; }",
].join("\n");
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

function nomeDisciplinaAnki(valor: string): string {
  const chave = valor.trim().toLocaleLowerCase("pt-BR");
  const disciplina = DISCIPLINAS.find((item) =>
    item.id.toLocaleLowerCase("pt-BR") === chave
    || item.slug.toLocaleLowerCase("pt-BR") === chave
    || item.nome.toLocaleLowerCase("pt-BR") === chave
  );
  if (disciplina) return disciplina.nome;
  return valor
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((parte) => parte.charAt(0).toLocaleUpperCase("pt-BR") + parte.slice(1).toLocaleLowerCase("pt-BR"))
    .join(" ");
}

function deckDaDisciplina(disciplina: string): string {
  const nome = nomeDisciplinaAnki(disciplina);
  const item = DISCIPLINAS.find((disciplinaAtual) => disciplinaAtual.nome === nome);
  if (!item) return `${DECK_PREFIXO}Ciclo Clínico::Geral::${nome}`;
  const ciclo = item.grupo === "Ciências Básicas" ? "Ciclo Básico" : "Ciclo Clínico";
  const area = item.grupo
    .replace("Saúde Coletiva & Emergência", "Saúde Coletiva e Emergência")
    .replace("Psiquiatria & Diagnóstico", "Psiquiatria e Diagnóstico");
  return `${DECK_PREFIXO}${ciclo}::${area}::${item.nome}`;
}

function nomeDeck(id: string, disciplinaSlug: string, subtemaSlug: string): string {
  // Um deck por disciplina deixa o Anki navegavel. O subtema permanece em
  // tags/Tema, evitando nomes de 100+ caracteres e a proliferacao de decks.
  return deckDaDisciplina(disciplinaSlug || subtemaSlug || id || "Geral");
}

function tagSeguro(valor: string): string {
  return valor.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function adicionarTagsEmLotes(noteIds: number[], tags: string[]) {
  for (let indice = 0; indice < noteIds.length; indice += 500) {
    await anki("addTags", { notes: noteIds.slice(indice, indice + 500), tags: tags.join(" ") });
  }
}

async function classificarDeckPorEstrutura(deck: string, disciplinaNome: string) {
  const disciplina = DISCIPLINAS.find((item) => item.nome === nomeDisciplinaAnki(disciplinaNome));
  if (!disciplina) return;
  const noteIds = await anki<number[]>("findNotes", { query: `deck:\"${deck}\"` });
  if (!noteIds.length) return;
  const ciclo = disciplina.grupo === "Ciências Básicas" ? "basico" : "clinico";
  await adicionarTagsEmLotes(noteIds, [
    `ciclo::${ciclo}`,
    `area::${tagSeguro(disciplina.grupo)}`,
    `disciplina::${tagSeguro(disciplina.nome)}`,
  ]);
  const notas: NotaAnkiInfo[] = [];
  for (let indice = 0; indice < noteIds.length; indice += 100) {
    notas.push(...await anki<NotaAnkiInfo[]>("notesInfo", { notes: noteIds.slice(indice, indice + 100) }));
  }
  const porSubtema = new Map<string, number[]>();
  for (const nota of notas) {
    const tagLegada = nota.tags.find((tag) => tag.startsWith("codex-medicus-subtema-"));
    if (!tagLegada) continue;
    const subtema = tagLegada.slice("codex-medicus-subtema-".length);
    porSubtema.set(subtema, [...(porSubtema.get(subtema) ?? []), nota.noteId]);
  }
  for (const [subtema, ids] of porSubtema) await adicionarTagsEmLotes(ids, [`subtema::${subtema}`]);
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

type NotaAnkiInfo = {
  noteId: number;
  tags: string[];
  fields: Record<string, { value: string; order: number }>;
  cards: number[];
};

type CartaoAuditoria = { note: number; queue: number };

function textoAuditoria(valor: string): string {
  return valor
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function chaveAuditoria(valor: string): string {
  return textoAuditoria(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

async function auditarEditorialAnki(aplicarTags: boolean, todosOsDecks = false) {
  const escopo = todosOsDecks ? "*" : "tag:codex-medicus";
  const noteIds = await anki<number[]>("findNotes", { query: escopo });
  const notas: NotaAnkiInfo[] = [];
  for (let indice = 0; indice < noteIds.length; indice += 100) {
    notas.push(...await anki<NotaAnkiInfo[]>("notesInfo", { notes: noteIds.slice(indice, indice + 100) }));
  }
  const cartoes: CartaoAuditoria[] = [];
  const cardIds = notas.flatMap((nota) => nota.cards);
  for (let indice = 0; indice < cardIds.length; indice += 100) {
    cartoes.push(...await anki<CartaoAuditoria[]>("cardsInfo", { cards: cardIds.slice(indice, indice + 100) }));
  }
  const notasAtivas = new Set(cartoes.filter((cartao) => cartao.queue !== -1).map((cartao) => cartao.note));
  const linhas = notas.map((nota) => {
    const frente = nota.fields.Frente?.value ?? nota.fields.Front?.value ?? "";
    const verso = nota.fields.Verso?.value ?? nota.fields.Back?.value ?? "";
    // Modelos nativos de Cloze/Image Occlusion não possuem o campo
    // `Referencia`; nesses casos a proveniência fica no campo extra do modelo.
    const referencia = nota.fields.Referencia?.value
      ?? nota.fields["Verso Extra"]?.value
      ?? nota.fields.Sources?.value
      ?? (/(?:^|\n|<br\s*\/?>|<small\s*>)[\s<\/]*Fonte:\s*([^<\n]+)/i.exec(verso)?.[1]
        ?? /<summary>\s*Fonte\s*<\/summary>\s*<small>([\s\S]*?)<\/small>/i.exec(verso)?.[1]
        ?? "");
    return {
      noteId: nota.noteId,
      frente: textoAuditoria(frente),
      verso: textoAuditoria(verso),
      referencia: textoAuditoria(referencia),
      chaveFrente: chaveAuditoria(frente),
      chaveCompletaExata: frente.trim() + "\u0000" + verso.trim(),
      chaveCompletaNormalizada: chaveAuditoria(frente) + "\u0000" + chaveAuditoria(verso),
    };
  });

  const porCompletaExata = new Map<string, number[]>();
  const porCompletaNormalizada = new Map<string, number[]>();
  const porFrente = new Map<string, typeof linhas>();
  for (const linha of linhas) {
    if (linha.chaveCompletaExata !== "\u0000") porCompletaExata.set(linha.chaveCompletaExata, [...(porCompletaExata.get(linha.chaveCompletaExata) ?? []), linha.noteId]);
    if (linha.chaveCompletaNormalizada !== "\u0000") porCompletaNormalizada.set(linha.chaveCompletaNormalizada, [...(porCompletaNormalizada.get(linha.chaveCompletaNormalizada) ?? []), linha.noteId]);
    if (linha.chaveFrente) porFrente.set(linha.chaveFrente, [...(porFrente.get(linha.chaveFrente) ?? []), linha]);
  }
  const duplicatas = [...porCompletaExata.values()].filter((ids) => ids.length > 1);
  const duplicatasNormalizadas = [...porCompletaNormalizada.values()].filter((ids) => ids.length > 1);
  const ambiguas = [...porFrente.values()]
    .filter((grupo) => grupo.length > 1 && new Set(grupo.map((linha) => chaveAuditoria(linha.verso))).size > 1)
    .map((grupo) => grupo.map((linha) => linha.noteId));
  const frentesLongas = linhas.filter((linha) => linha.frente.length > 180).map((linha) => linha.noteId);
  const versosLongos = linhas.filter((linha) => linha.verso.length > 500).map((linha) => linha.noteId);
  const fontesPendentes = linhas.filter((linha) => !linha.referencia).map((linha) => linha.noteId);
  const versosLongosAtivos = versosLongos.filter((noteId) => notasAtivas.has(noteId));
  const fontesPendentesAtivas = fontesPendentes.filter((noteId) => notasAtivas.has(noteId));
  const semSubtemaAtivos = notas.filter((nota) => notasAtivas.has(nota.noteId) && !nota.tags.some((tag) => tag.startsWith("subtema::"))).map((nota) => nota.noteId);

  async function marcar(ids: number[], tag: string) {
    if (!aplicarTags || !ids.length) return;
    const unicos = [...new Set(ids)];
    for (let indice = 0; indice < unicos.length; indice += 500) {
      await anki("addTags", { notes: unicos.slice(indice, indice + 500), tags: tag });
    }
  }
  if (aplicarTags && noteIds.length) {
    await anki("removeTags", {
      notes: noteIds,
      tags: [
        "codex-auditoria::duplicata-exata",
        "codex-auditoria::duplicata-normalizada",
        "codex-auditoria::frente-ambigua",
        "codex-auditoria::frente-longa",
        "codex-auditoria::verso-longo",
        "codex-auditoria::fonte-pendente",
      ].join(" "),
    });
  }
  await marcar(duplicatas.flat(), "codex-auditoria::duplicata-exata");
  await marcar(duplicatasNormalizadas.flat(), "codex-auditoria::duplicata-normalizada");
  await marcar(ambiguas.flat(), "codex-auditoria::frente-ambigua");
  await marcar(frentesLongas, "codex-auditoria::frente-longa");
  await marcar(versosLongos, "codex-auditoria::verso-longo");
  await marcar(fontesPendentes, "codex-auditoria::fonte-pendente");

  const relatorio = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    scope: escopo,
    cardsDeleted: 0,
    contentChanged: false,
    tagsApplied: aplicarTags,
    totals: {
      notes: notas.length,
      activeNotes: notasAtivas.size,
      exactDuplicateGroups: duplicatas.length,
      exactDuplicateNotes: new Set(duplicatas.flat()).size,
      normalizedDuplicateGroups: duplicatasNormalizadas.length,
      normalizedDuplicateNotes: new Set(duplicatasNormalizadas.flat()).size,
      ambiguousFrontGroups: ambiguas.length,
      ambiguousFrontNotes: new Set(ambiguas.flat()).size,
      longFrontNotes: frentesLongas.length,
      longBackNotes: versosLongos.length,
      activeLongBackNotes: versosLongosAtivos.length,
      missingReferenceNotes: fontesPendentes.length,
      activeMissingReferenceNotes: fontesPendentesAtivas.length,
      activeWithoutSubthemeNotes: semSubtemaAtivos.length,
    },
    queues: {
      exactDuplicateNoteIds: duplicatas,
      normalizedDuplicateNoteIds: duplicatasNormalizadas,
      ambiguousFrontNoteIds: ambiguas,
      longFrontNoteIds: frentesLongas,
      longBackNoteIds: versosLongos,
      activeLongBackNoteIds: versosLongosAtivos,
      missingReferenceNoteIds: fontesPendentes,
      activeMissingReferenceNoteIds: fontesPendentesAtivas,
      activeWithoutSubthemeNoteIds: semSubtemaAtivos,
    },
  };
  const destino = resolve(saidaArg ?? "exports/anki/auditoria-editorial.json");
  await mkdir(dirname(destino), { recursive: true });
  await writeFile(destino, JSON.stringify(relatorio, null, 2) + "\n", "utf8");
  console.log(JSON.stringify({ destino, ...relatorio.totals, tagsAplicadas: aplicarTags, cartoesExcluidos: 0 }, null, 2));
}

async function exportarProgressoAnki() {
  const todosDecks = await anki<string[]>("deckNames");
  const decks = todosDecks
    .filter((deck) => DECK_PREFIXOS_LEGADOS.some((prefixo) => deck.startsWith(prefixo)))
    .filter((deck) => !todosDecks.some((outro) => outro.startsWith(`${deck}::`)));
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

async function exportarBackupAnki() {
  const data = new Date().toISOString().replace(/[:.]/g, "-");
  const pasta = resolve(`exports/anki/backups/${data}`);
  await mkdir(pasta, { recursive: true });
  const decks = (await anki<string[]>("deckNames"))
    .filter((deck) => DECK_PREFIXOS_LEGADOS.some((prefixo) => deck.startsWith(prefixo)))
    .filter((deck) => deck !== "Codex Medicus" && !deck.includes("Probe") && !deck.includes("Piloto"));
  const arquivos: string[] = [];
  for (const deck of decks) {
    const nome = tagSeguro(deck).slice(0, 110) || "deck";
    const destino = resolve(pasta, `${nome}.apkg`);
    const exportado = await anki<boolean>("exportPackage", { deck, path: destino.replace(/\\/g, "/"), includeSched: true });
    if (!exportado) throw new Error(`Não foi possível exportar backup do deck ${deck}.`);
    arquivos.push(destino);
  }
  await writeFile(resolve(pasta, "MANIFESTO.json"), `${JSON.stringify({ geradoEm: new Date().toISOString(), decks, arquivos }, null, 2)}\n`, "utf8");
  console.log(`[anki] Backup com agendamento criado: ${pasta} (${arquivos.length} deck(s)).`);
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
  const candidatos = decks.filter((deck) =>
    DECK_PREFIXOS_LEGADOS.some((prefixo) => deck.startsWith(prefixo))
    && !deck.includes("Probe")
    && !deck.includes("Piloto")
    && deck !== "Codex Medicus"
    && !decks.some((outro) => outro.startsWith(`${deck}::`))
  );
  const plano = candidatos.map((origem) => {
    const partes = origem.startsWith("Codex Medicus - ") ? origem.split(" - ") : origem.split("::");
    const disciplina = partes.at(-1) || "Geral";
    return { origem, destino: deckDaDisciplina(disciplina) };
  }).filter((item) => item.origem !== item.destino);

  console.log(`[anki] Plano de organizacao: ${plano.length} deck(s) a padronizar. Decks vazios só serão removidos com --limpar-vazios.`);
  for (const item of plano) console.log(`  ${item.origem} -> ${item.destino}`);
  if (!aplicar) {
    console.log("[anki] Simulacao concluida. Para mover os cartoes, use: npm run anki:organizar -- --aplicar");
    return;
  }
  for (const item of plano) {
    const cards = await anki<number[]>("findCards", { query: `deck:"${item.origem}"` });
    const mudaSomenteCapitalizacao = item.origem.toLocaleLowerCase("pt-BR") === item.destino.toLocaleLowerCase("pt-BR");
    if (mudaSomenteCapitalizacao) {
      const sufixoTemporario = item.origem
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(-48);
      const temporario = `Codex Medicus migracao temporaria ${sufixoTemporario}`;
      await garantirDeck(temporario);
      for (let indice = 0; indice < cards.length; indice += 200) {
        await anki("changeDeck", { cards: cards.slice(indice, indice + 200), deck: temporario });
      }
      const restantesOrigem = await anki<number[]>("findCards", { query: `deck:"${item.origem}"` });
      if (restantesOrigem.length > 0) {
        throw new Error(`A migracao segura foi interrompida: ${restantesOrigem.length} cartao(oes) ainda estao em ${item.origem}.`);
      }
      await anki("deleteDecks", { decks: [item.origem], cardsToo: true });
      await garantirDeck(item.destino);
      for (let indice = 0; indice < cards.length; indice += 200) {
        await anki("changeDeck", { cards: cards.slice(indice, indice + 200), deck: item.destino });
      }
      const restantesTemporario = await anki<number[]>("findCards", { query: `deck:"${temporario}"` });
      if (restantesTemporario.length > 0) {
        throw new Error(`A migracao segura foi interrompida: ${restantesTemporario.length} cartao(oes) ainda estao no deck temporario ${temporario}.`);
      }
      await anki("deleteDecks", { decks: [temporario], cardsToo: true });
      console.log(`[anki] ${cards.length} cartao(oes) migrado(s) com capitalizacao corrigida: ${item.origem} -> ${item.destino}.`);
      continue;
    }
    await garantirDeck(item.destino);
    for (let indice = 0; indice < cards.length; indice += 200) {
      await anki("changeDeck", { cards: cards.slice(indice, indice + 200), deck: item.destino });
    }
    const restantes = limparVazios
      ? await anki<number[]>("findCards", { query: `deck:"${item.origem}"` })
      : [];
    // Anki 2.1.28+ requires cardsToo=true to delete a deck. The guard above
    // proves this deck has no cards, so this cannot remove a card.
    if (limparVazios && restantes.length === 0) await anki("deleteDecks", { decks: [item.origem], cardsToo: true });
    await classificarDeckPorEstrutura(item.destino, item.destino.split("::").at(-1) ?? "Geral");
    console.log(`[anki] ${cards.length} cartao(oes) movido(s): ${item.origem} -> ${item.destino}.`);
  }
  if (limparVazios) {
    const decksAtuais = await anki<string[]>("deckNames");
    const temFilhosLegados = decksAtuais.some((deck) => deck.startsWith("Codex Medicus::"));
    const cartoesLegados = await anki<number[]>("findCards", { query: "deck:\"Codex Medicus\"" });
    if (!temFilhosLegados && cartoesLegados.length === 0 && decksAtuais.includes("Codex Medicus")) {
      await anki("deleteDecks", { decks: ["Codex Medicus"], cardsToo: true });
      console.log("[anki] Raiz legada vazia ‘Codex Medicus’ removida após conferência.");
    }
  }
  try {
    await anki("updateModelStyling", {
      model: { name: MODEL_NAME, css: MODEL_CSS },
    });
    console.log(`[anki] Estilo do modelo ${MODEL_NAME} ajustado para titulos compactos.`);
  } catch (erro) {
    console.warn(`[anki] Nao foi possivel atualizar o estilo agora: ${erro instanceof Error ? erro.message : String(erro)}`);
  }
  console.log(limparVazios ? "[anki] Organizacao aplicada; decks legados vazios foram removidos após verificação." : "[anki] Organizacao aplicada. Decks antigos foram mantidos vazios para permitir reversao manual.");
}

async function repararArvoreAnki() {
  const decksAntes = await anki<string[]>("deckNames");
  let movidos = 0;
  for (const disciplina of DISCIPLINAS) {
    const tag = `disciplina::${tagSeguro(disciplina.nome)}`;
    const cards = await anki<number[]>("findCards", { query: `tag:${tag}` });
    if (!cards.length) continue;
    const destino = deckDaDisciplina(disciplina.nome);
    await garantirDeck(destino);
    for (let indice = 0; indice < cards.length; indice += 200) {
      await anki("changeDeck", { cards: cards.slice(indice, indice + 200), deck: destino });
    }
    const restantes = await anki<number[]>("findCards", { query: `tag:${tag} -deck:\"${destino}\"` });
    if (restantes.length > 0) throw new Error(`Recuperação interrompida: ${restantes.length} cartão(ões) de ${disciplina.nome} não chegaram ao destino.`);
    movidos += cards.length;
  }
  const decksDepois = await anki<string[]>("deckNames");
  for (const deck of decksDepois.filter((item) => item.startsWith(DECK_PREFIXO)).sort((a, b) => b.length - a.length)) {
    const temFilho = decksDepois.some((outro) => outro.startsWith(`${deck}::`));
    const cardsDiretos = await anki<number[]>("findCards", { query: `deck:\"${deck}\"` });
    if (!temFilho && cardsDiretos.length === 0) await anki("deleteDecks", { decks: [deck], cardsToo: true });
  }
  console.log(`[anki] Árvore recuperada por tags de disciplina: ${movidos} cartão(ões) conferidos. Decks antes: ${decksAntes.length}; verificar progresso após a recuperação.`);
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
  if (comando === "backup") return exportarBackupAnki();
  if (comando === "auditoria") return auditarEditorialAnki(args.includes("--aplicar-tags"), args.includes("--todos"));
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
  if (comando === "reparar-arvore") return repararArvoreAnki();
  throw new Error("Comando inválido. Use status, progresso, backup, auditoria, resumo, erros, csv-resumo, organizar ou reparar-arvore.");
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
