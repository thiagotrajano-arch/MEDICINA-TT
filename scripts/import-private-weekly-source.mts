/**
 * Cataloga uma fonte PDF privada já convertida para Markdown e agenda revisões
 * D0, D1, D7 e D21. O manifesto e o Markdown devem permanecer fora do Git.
 *
 * Sem --apply, valida somente arquivos, privacidade, taxonomia e planejamento;
 * não carrega credenciais, não conecta ao Supabase e não grava dados.
 *
 * Uso:
 *   npm exec -- tsx scripts/import-private-weekly-source.mts --manifest <arquivo.json>
 *   npm exec -- tsx scripts/import-private-weekly-source.mts --manifest <arquivo.json> --apply
 *
 * Formato do manifesto privado:
 * {
 *   "schemaVersion": 1,
 *   "visibility": "private",
 *   "publicRepositoryAllowed": false,
 *   "date": "2026-08-10",
 *   "timezone": "America/Sao_Paulo",
 *   "title": "Título de estudo",
 *   "sourceLabel": "Fonte privada",
 *   "filename": "arquivo.pdf",
 *   "markdownPath": "arquivo.md",
 *   "sha256": "<64 hex>",
 *   "bytes": 123,
 *   "pages": 10,
 *   "discipline": "Disciplina",
 *   "theme": "Tema",
 *   "subtheme": "Subtema",
 *   "publicSubthemeId": "opcional"
 * }
 */
import { spawnSync } from "node:child_process";
import { closeSync, openSync, readFileSync, readSync, realpathSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "./load-env.mjs";
import { getSupabaseAdmin } from "../src/infra/supabase/client";
import { CONTEUDOS } from "../src/content/conteudos";
import { QUESTOES } from "../src/content/questoes";
import { DISCIPLINAS } from "../src/content/taxonomy";

type EntradaFonte = {
  schemaVersion: 1;
  visibility: "private";
  publicRepositoryAllowed: false;
  date: string;
  timezone: string;
  title: string;
  sourceLabel: string;
  filename: string;
  markdownPath: string;
  sha256: string;
  bytes: number;
  pages: number;
  discipline: string;
  theme: string;
  subtheme: string;
  publicSubthemeId?: string;
};

type CoberturaPublica = {
  disciplinaId: string;
  temResumo: boolean;
  totalQuestoes: number;
};

type SemanaRemota = {
  id: string;
  inicio: string;
  fim: string;
  estado: "ativa" | "concluida" | "arquivada";
  atualizado_em: string;
};

type MaterialRemoto = {
  id: string;
  hash_sha256: string | null;
};

type TarefaPlanejada = {
  deslocamento: 0 | 1 | 7 | 21;
  rotulo: "D0" | "D1" | "D7" | "D21";
  data: string;
  duracao: 20 | 25 | 45;
  atividade: "pdf" | "revisao" | "questoes";
};

type VinculoPlanejado = {
  owner_id: string;
  semana_id: string;
  material_id: string | null;
  recurso_tipo: "material_privado" | "resumo" | "questao";
  recurso_id: string;
  disciplina_id: string;
  tema: string;
  subtema: string;
  confianca: number;
  estado: "confirmado";
  origem: "pdf";
  atualizado_em: string;
};

const aplicar = process.argv.includes("--apply");

function argumento(nome: string): string | null {
  const indice = process.argv.indexOf(nome);
  return indice >= 0 ? process.argv[indice + 1] ?? null : null;
}

const manifestoArg = argumento("--manifest") ?? argumento("--input");
if (!manifestoArg) throw new Error("Informe --manifest com a entrada JSON privada.");

const raizRepositorio = realpathSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."));

function estaDentroDaRaiz(arquivo: string): boolean {
  const relativo = path.relative(raizRepositorio, arquivo);
  return relativo === "" || (!relativo.startsWith(`..${path.sep}`) && relativo !== ".." && !path.isAbsolute(relativo));
}

function statusGit(argumentos: string[]): number | null {
  const resultado = spawnSync("git", ["-C", raizRepositorio, ...argumentos], { stdio: "ignore", windowsHide: true });
  return resultado.error ? null : resultado.status;
}

function exigirForaDoGit(arquivo: string, rotulo: string): void {
  if (!estaDentroDaRaiz(arquivo)) return;
  const relativo = path.relative(raizRepositorio, arquivo).replaceAll(path.sep, "/");
  if (statusGit(["ls-files", "--error-unmatch", "--", relativo]) === 0) {
    throw new Error(`${rotulo} não pode ser um arquivo rastreado pelo Git.`);
  }
  if (statusGit(["check-ignore", "--quiet", "--", relativo]) !== 0) {
    throw new Error(`${rotulo} dentro do repositório precisa estar explicitamente ignorado pelo Git.`);
  }
}

function resolverArquivoPrivado(candidato: string, base: string, extensoes: string[], rotulo: string): string {
  const resolvido = path.resolve(base, candidato);
  let real: string;
  try {
    real = realpathSync(resolvido);
  } catch {
    throw new Error(`${rotulo} não existe.`);
  }
  const estado = statSync(real);
  if (!estado.isFile() || estado.size <= 0) throw new Error(`${rotulo} precisa ser um arquivo não vazio.`);
  if (!extensoes.includes(path.extname(real).toLowerCase())) throw new Error(`${rotulo} possui extensão inválida.`);
  exigirForaDoGit(real, rotulo);
  return real;
}

function validarPrefixoMarkdown(arquivo: string): void {
  const tamanho = statSync(arquivo).size;
  const quantidade = Math.min(tamanho, 4096);
  const buffer = Buffer.alloc(quantidade);
  const descritor = openSync(arquivo, "r");
  try {
    const lidos = readSync(descritor, buffer, 0, quantidade, 0);
    const prefixo = buffer.subarray(0, lidos);
    if (!lidos || prefixo.includes(0) || !prefixo.toString("utf8").replace(/^\uFEFF/u, "").trim()) {
      throw new Error("O Markdown privado não contém texto utilizável.");
    }
  } finally {
    closeSync(descritor);
  }
}

function texto(valor: unknown, maximo: number, rotulo: string): string {
  if (typeof valor !== "string") throw new Error(`${rotulo} precisa ser texto.`);
  const limpo = valor.trim();
  if (!limpo) throw new Error(`${rotulo} está vazio.`);
  if (limpo.length > maximo) throw new Error(`${rotulo} excede ${maximo} caracteres.`);
  if (/[\u0000-\u001f\u007f]/u.test(limpo)) throw new Error(`${rotulo} contém caracteres de controle.`);
  return limpo;
}

function limitar(valor: string, maximo: number): string {
  return valor.trim().slice(0, maximo);
}

function dataValida(valor: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(valor)) return false;
  const data = new Date(`${valor}T00:00:00.000Z`);
  return !Number.isNaN(data.getTime()) && data.toISOString().slice(0, 10) === valor;
}

function validarTimezone(valor: string): void {
  try {
    new Intl.DateTimeFormat("pt-BR", { timeZone: valor }).format(new Date());
  } catch {
    throw new Error("Timezone inválido; use um identificador IANA.");
  }
}

function somarDias(dataIso: string, dias: number): string {
  const [ano, mes, dia] = dataIso.split("-").map(Number);
  return new Date(Date.UTC(ano, mes - 1, dia + dias)).toISOString().slice(0, 10);
}

function limitesDaSemana(dataIso: string): { inicio: string; fim: string } {
  const diaSemana = new Date(`${dataIso}T00:00:00.000Z`).getUTCDay();
  const desdeSegunda = (diaSemana + 6) % 7;
  const inicio = somarDias(dataIso, -desdeSegunda);
  return { inicio, fim: somarDias(inicio, 6) };
}

function partesNoFuso(instanteMs: number, timezone: string): [number, number, number, number, number] {
  const formatador = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const partes = new Map<string, string>(formatador.formatToParts(new Date(instanteMs)).map((parte) => [parte.type, parte.value]));
  return ["year", "month", "day", "hour", "minute"].map((chave) => Number(partes.get(chave))) as [number, number, number, number, number];
}

function instanteNoFuso(dataIso: string, hora: number, minuto: number, timezone: string): string {
  const [ano, mes, dia] = dataIso.split("-").map(Number);
  const alvo = Date.UTC(ano, mes - 1, dia, hora, minuto);
  let instante = alvo;
  for (let tentativa = 0; tentativa < 3; tentativa += 1) {
    const [anoAtual, mesAtual, diaAtual, horaAtual, minutoAtual] = partesNoFuso(instante, timezone);
    const atualComoUtc = Date.UTC(anoAtual, mesAtual - 1, diaAtual, horaAtual, minutoAtual);
    instante += alvo - atualComoUtc;
  }
  const partesFinais = partesNoFuso(instante, timezone);
  if (partesFinais.join("|") !== [ano, mes, dia, hora, minuto].join("|")) {
    throw new Error("Não foi possível materializar o horário no timezone informado.");
  }
  return new Date(instante).toISOString();
}

const subtemasPublicos = new Map<string, CoberturaPublica>();
const questoesPorSubtema = new Map<string, number>();
for (const questao of QUESTOES) {
  questoesPorSubtema.set(questao.subtemaId, (questoesPorSubtema.get(questao.subtemaId) ?? 0) + 1);
}
for (const disciplina of DISCIPLINAS) {
  for (const tema of disciplina.temas) {
    for (const subtema of tema.subtemas) {
      subtemasPublicos.set(subtema.id, {
        disciplinaId: disciplina.id,
        temResumo: Boolean(CONTEUDOS[subtema.id]),
        totalQuestoes: questoesPorSubtema.get(subtema.id) ?? 0,
      });
    }
  }
}

function validarEntrada(bruto: unknown, arquivoManifesto: string): {
  entrada: EntradaFonte;
  markdownReal: string;
  cobertura: CoberturaPublica | null;
  tarefas: TarefaPlanejada[];
} {
  if (!bruto || typeof bruto !== "object" || Array.isArray(bruto)) throw new Error("A entrada privada precisa ser um objeto JSON.");
  const entrada = bruto as EntradaFonte;
  if (entrada.schemaVersion !== 1 || entrada.visibility !== "private" || entrada.publicRepositoryAllowed !== false) {
    throw new Error("A entrada deve ser schemaVersion 1, privada e proibida no repositório público.");
  }

  entrada.title = texto(entrada.title, 240, "title");
  entrada.sourceLabel = texto(entrada.sourceLabel, 600, "sourceLabel");
  entrada.filename = texto(entrada.filename, 240, "filename");
  entrada.markdownPath = texto(entrada.markdownPath, 4000, "markdownPath");
  entrada.discipline = texto(entrada.discipline, 160, "discipline");
  entrada.theme = texto(entrada.theme, 180, "theme");
  entrada.subtheme = texto(entrada.subtheme, 180, "subtheme");
  entrada.timezone = texto(entrada.timezone, 100, "timezone");
  entrada.date = texto(entrada.date, 10, "date");
  if (!dataValida(entrada.date)) throw new Error("date precisa usar YYYY-MM-DD e representar uma data real.");
  validarTimezone(entrada.timezone);

  if (path.basename(entrada.filename) !== entrada.filename || path.extname(entrada.filename).toLowerCase() !== ".pdf") {
    throw new Error("filename deve conter somente o nome de um arquivo PDF, sem caminho.");
  }
  if (typeof entrada.sha256 !== "string" || !/^[0-9a-f]{64}$/iu.test(entrada.sha256)) {
    throw new Error("sha256 precisa conter exatamente 64 caracteres hexadecimais.");
  }
  entrada.sha256 = entrada.sha256.toLowerCase();
  if (!Number.isSafeInteger(entrada.bytes) || entrada.bytes <= 0) throw new Error("bytes precisa ser um inteiro positivo.");
  if (!Number.isSafeInteger(entrada.pages) || entrada.pages <= 0) throw new Error("pages precisa ser um inteiro positivo.");

  const publicSubthemeId = typeof entrada.publicSubthemeId === "string" ? entrada.publicSubthemeId.trim() : "";
  if (publicSubthemeId.length > 180) throw new Error("publicSubthemeId excede 180 caracteres.");
  entrada.publicSubthemeId = publicSubthemeId || undefined;
  const cobertura = publicSubthemeId ? subtemasPublicos.get(publicSubthemeId) ?? null : null;
  if (publicSubthemeId && !cobertura) throw new Error("publicSubthemeId não existe na taxonomia pública atual.");

  const markdownReal = resolverArquivoPrivado(entrada.markdownPath, path.dirname(arquivoManifesto), [".md", ".markdown"], "Markdown privado");
  validarPrefixoMarkdown(markdownReal);

  const tarefas: TarefaPlanejada[] = [
    { deslocamento: 0, rotulo: "D0", data: entrada.date, duracao: 45, atividade: "pdf" },
    { deslocamento: 1, rotulo: "D1", data: somarDias(entrada.date, 1), duracao: 20, atividade: "revisao" },
    { deslocamento: 7, rotulo: "D7", data: somarDias(entrada.date, 7), duracao: 25, atividade: cobertura?.totalQuestoes ? "questoes" : "revisao" },
    { deslocamento: 21, rotulo: "D21", data: somarDias(entrada.date, 21), duracao: 25, atividade: "revisao" },
  ];
  return { entrada, markdownReal, cobertura, tarefas };
}

async function descobrirOwner(db: ReturnType<typeof getSupabaseAdmin>): Promise<string> {
  const donos = new Set<string>();
  for (const tabela of ["curso_disciplina_usuario", "material_privado_usuario", "semana_estudo_usuario"]) {
    const { data, error } = await db.from(tabela).select("owner_id").limit(1000);
    if (error) throw new Error("Não foi possível consultar a conta privada.");
    for (const linha of data ?? []) {
      const owner = linha.owner_id as string | undefined;
      if (owner) donos.add(owner);
    }
  }
  if (donos.size !== 1) throw new Error("Não foi possível identificar com segurança uma única conta proprietária.");
  return [...donos][0];
}

async function localizarMaterial(
  db: ReturnType<typeof getSupabaseAdmin>,
  owner: string,
  entrada: EntradaFonte,
): Promise<{ material: MaterialRemoto; inserido: boolean }> {
  const { data: porHash, error: hashErro } = await db.from("material_privado_usuario")
    .select("id,hash_sha256").eq("owner_id", owner).eq("hash_sha256", entrada.sha256).limit(2);
  if (hashErro) throw new Error("Não foi possível verificar o catálogo privado pelo hash.");
  if ((porHash ?? []).length > 1) throw new Error("O catálogo privado possui mais de um material com o mesmo SHA-256.");
  if (porHash?.[0]) return { material: porHash[0] as MaterialRemoto, inserido: false };

  const { data: porIdentidade, error: identidadeErro } = await db.from("material_privado_usuario")
    .select("id,hash_sha256")
    .eq("owner_id", owner).eq("origem", "local").eq("titulo", entrada.title).eq("fonte", entrada.sourceLabel).limit(2);
  if (identidadeErro) throw new Error("Não foi possível verificar a identidade do material privado.");
  if ((porIdentidade ?? []).length > 1) throw new Error("O catálogo privado possui uma identidade de material ambígua.");
  if (porIdentidade?.[0]) {
    const existente = porIdentidade[0] as MaterialRemoto;
    if (!existente.hash_sha256) {
      const { data: atualizado, error: atualizarErro } = await db.from("material_privado_usuario")
        .update({ hash_sha256: entrada.sha256, tamanho_bytes: entrada.bytes, paginas: entrada.pages, atualizado_em: new Date().toISOString() })
        .eq("owner_id", owner).eq("id", existente.id).is("hash_sha256", null)
        .select("id,hash_sha256").single();
      if (atualizarErro || !atualizado) throw new Error("Não foi possível completar o SHA-256 do material privado existente.");
      return { material: atualizado as MaterialRemoto, inserido: false };
    }
    if (existente.hash_sha256 !== entrada.sha256) {
      throw new Error("Já existe material com o mesmo título e fonte, mas SHA-256 diferente.");
    }
    return { material: existente, inserido: false };
  }

  const agora = new Date().toISOString();
  const { data, error } = await db.from("material_privado_usuario").insert({
    owner_id: owner,
    titulo: entrada.title,
    tipo_arquivo: "pdf",
    origem: "local",
    disciplina: entrada.discipline,
    tema: entrada.theme,
    subtema: entrada.subtheme,
    prioridade: "alta",
    estado: "integrado",
    destino: "privado",
    fonte: entrada.sourceLabel,
    tamanho_bytes: entrada.bytes,
    paginas: entrada.pages,
    hash_sha256: entrada.sha256,
    observacao: limitar(`Arquivo privado ${entrada.filename}. Markdown existente validado antes do agendamento; conteúdo bruto e caminho local não foram copiados.`, 3000),
    atualizado_em: agora,
  }).select("id,hash_sha256").single();
  if (error || !data) throw new Error("Não foi possível catalogar o material privado.");
  return { material: data as MaterialRemoto, inserido: true };
}

function cobreData(semana: SemanaRemota, data: string): boolean {
  return semana.inicio <= data && semana.fim >= data;
}

async function localizarSemanas(
  db: ReturnType<typeof getSupabaseAdmin>,
  owner: string,
  tarefas: TarefaPlanejada[],
): Promise<{ porData: Map<string, SemanaRemota>; inseridas: number }> {
  const primeira = tarefas[0].data;
  const ultima = tarefas[tarefas.length - 1].data;
  const { data, error } = await db.from("semana_estudo_usuario")
    .select("id,inicio,fim,estado,atualizado_em")
    .eq("owner_id", owner).lte("inicio", ultima).gte("fim", primeira)
    .order("atualizado_em", { ascending: false });
  if (error) throw new Error("Não foi possível localizar as semanas privadas.");
  const conhecidas = (data ?? []) as SemanaRemota[];
  const porData = new Map<string, SemanaRemota>();
  let inseridas = 0;

  for (const tarefa of tarefas) {
    if (porData.has(tarefa.data)) continue;
    const limites = limitesDaSemana(tarefa.data);
    const candidatas = conhecidas.filter((semana) => cobreData(semana, tarefa.data));
    const exata = candidatas.find((semana) => semana.inicio === limites.inicio && semana.fim === limites.fim);
    if (!exata && candidatas.length > 1) throw new Error("Há mais de uma semana privada cobrindo uma data planejada.");
    let semana = exata ?? candidatas[0];
    if (!semana) {
      const { data: criada, error: criarErro } = await db.from("semana_estudo_usuario").insert({
        owner_id: owner,
        inicio: limites.inicio,
        fim: limites.fim,
        periodo: null,
        objetivo: "Fonte privada diária vinculada para revisão longitudinal.",
        estado: "ativa",
        origem: "pdf",
        confirmada: true,
      }).select("id,inicio,fim,estado,atualizado_em").single();
      if (criarErro || !criada) throw new Error("Não foi possível criar uma semana privada necessária.");
      semana = criada as SemanaRemota;
      conhecidas.push(semana);
      inseridas += 1;
    }
    for (const item of tarefas.filter((item) => cobreData(semana!, item.data))) porData.set(item.data, semana);
  }
  return { porData, inseridas };
}

async function inserirFocosAusentes(
  db: ReturnType<typeof getSupabaseAdmin>,
  owner: string,
  semanas: SemanaRemota[],
  entrada: EntradaFonte,
): Promise<number> {
  const ids = [...new Set(semanas.map((semana) => semana.id))];
  const { data, error } = await db.from("foco_semana_usuario")
    .select("semana_id,disciplina_id,tema,subtema").eq("owner_id", owner).in("semana_id", ids);
  if (error) throw new Error("Não foi possível verificar os focos semanais.");
  const existentes = new Set((data ?? []).map((item) => `${item.semana_id}|${item.disciplina_id}|${item.tema}|${item.subtema}`));
  const agora = new Date().toISOString();
  const novos = ids.filter((semanaId) => !existentes.has(`${semanaId}|${entrada.discipline}|${entrada.theme}|${entrada.subtheme}`)).map((semanaId) => ({
    owner_id: owner,
    semana_id: semanaId,
    disciplina_id: entrada.discipline,
    tema: entrada.theme,
    subtema: entrada.subtheme,
    prioridade: "alta",
    origem: "pdf",
    confianca: 1,
    estado: "confirmado",
    atualizado_em: agora,
  }));
  if (novos.length) {
    const { error: inserirErro } = await db.from("foco_semana_usuario").insert(novos);
    if (inserirErro) throw new Error("Não foi possível criar os focos semanais.");
  }
  return novos.length;
}

async function inserirTarefasAusentes(
  db: ReturnType<typeof getSupabaseAdmin>,
  owner: string,
  tarefas: TarefaPlanejada[],
  semanasPorData: Map<string, SemanaRemota>,
  entrada: EntradaFonte,
  cobertura: CoberturaPublica | null,
): Promise<number> {
  const ids = [...new Set([...semanasPorData.values()].map((semana) => semana.id))];
  const { data, error } = await db.from("tarefa_estudo_usuario")
    .select("semana_id,data,titulo,recurso_id").eq("owner_id", owner).in("semana_id", ids);
  if (error) throw new Error("Não foi possível verificar as tarefas privadas.");
  const existentes = new Set((data ?? []).map((item) => `${item.semana_id}|${item.data}|${item.titulo}|${item.recurso_id}`));
  const recursoId = cobertura?.temResumo && entrada.publicSubthemeId ? entrada.publicSubthemeId : `pdf:${entrada.sha256}`;
  const disciplinaId = cobertura?.temResumo ? cobertura.disciplinaId : entrada.discipline;
  const novos = tarefas.map((tarefa) => {
    const semana = semanasPorData.get(tarefa.data);
    if (!semana) throw new Error("Uma tarefa ficou sem semana privada correspondente.");
    const titulo = limitar(`${tarefa.rotulo} · ${entrada.title}`, 180);
    return {
      chave: `${semana.id}|${tarefa.data}|${titulo}|${recursoId}`,
      payload: {
        owner_id: owner,
        semana_id: semana.id,
        data: tarefa.data,
        titulo,
        atividade: tarefa.atividade,
        recurso_id: recursoId,
        disciplina_id: disciplinaId,
        tema: entrada.theme,
        duracao_min: tarefa.duracao,
        estado: "planejado",
        origem: "pdf",
      },
    };
  }).filter((item) => !existentes.has(item.chave)).map((item) => item.payload);
  if (novos.length) {
    const { error: inserirErro } = await db.from("tarefa_estudo_usuario").insert(novos);
    if (inserirErro) throw new Error("Não foi possível criar as tarefas privadas.");
  }
  return novos.length;
}

async function inserirAgendaD0(
  db: ReturnType<typeof getSupabaseAdmin>,
  owner: string,
  entrada: EntradaFonte,
  cobertura: CoberturaPublica | null,
): Promise<number> {
  const inicio = instanteNoFuso(entrada.date, 19, 0, entrada.timezone);
  const fim = new Date(new Date(inicio).getTime() + 45 * 60_000).toISOString();
  const marcador = `[Fonte privada ${entrada.sha256.slice(0, 12)}]`;
  const { data, error } = await db.from("agenda_estudo_usuario")
    .select("id").eq("owner_id", owner).eq("inicio", inicio).like("observacao", `${marcador}%`).limit(1);
  if (error) throw new Error("Não foi possível verificar o evento D0 da Agenda.");
  if (data?.length) return 0;
  const { error: inserirErro } = await db.from("agenda_estudo_usuario").insert({
    owner_id: owner,
    titulo: limitar(`D0 · ${entrada.title}`, 180),
    inicio,
    fim,
    tipo: "estudo",
    disciplina_id: cobertura?.temResumo ? cobertura.disciplinaId : entrada.discipline,
    tema: entrada.theme,
    observacao: limitar(`${marcador} Markdown privado validado. Leitura ativa de 45 minutos; D1, D7 e D21 permanecem somente na fila semanal.`, 2000),
    concluido: false,
  });
  if (inserirErro) throw new Error("Não foi possível criar o evento D0 da Agenda.");
  return 1;
}

async function inserirVinculosAusentes(
  db: ReturnType<typeof getSupabaseAdmin>,
  owner: string,
  semanas: SemanaRemota[],
  material: MaterialRemoto,
  entrada: EntradaFonte,
  cobertura: CoberturaPublica | null,
): Promise<number> {
  const ids = [...new Set(semanas.map((semana) => semana.id))];
  const { data, error } = await db.from("vinculo_recurso_usuario")
    .select("semana_id,recurso_tipo,recurso_id").eq("owner_id", owner).in("semana_id", ids);
  if (error) throw new Error("Não foi possível verificar os vínculos semanais.");
  const existentes = new Set((data ?? []).map((item) => `${item.semana_id}|${item.recurso_tipo}|${item.recurso_id}`));
  const agora = new Date().toISOString();
  const candidatos = ids.flatMap((semanaId) => {
    const base: Omit<VinculoPlanejado, "material_id" | "recurso_tipo" | "recurso_id"> = {
      owner_id: owner,
      semana_id: semanaId,
      disciplina_id: entrada.discipline,
      tema: entrada.theme,
      subtema: entrada.subtheme,
      confianca: 1,
      estado: "confirmado",
      origem: "pdf",
      atualizado_em: agora,
    };
    const itens: VinculoPlanejado[] = [{
      ...base,
      material_id: material.id,
      recurso_tipo: "material_privado",
      recurso_id: `sha256:${entrada.sha256}`,
    }];
    if (entrada.publicSubthemeId && cobertura?.temResumo) itens.push({
      ...base,
      disciplina_id: cobertura.disciplinaId,
      material_id: null,
      recurso_tipo: "resumo",
      recurso_id: entrada.publicSubthemeId,
    });
    if (entrada.publicSubthemeId && cobertura && cobertura.totalQuestoes > 0) itens.push({
      ...base,
      disciplina_id: cobertura.disciplinaId,
      material_id: null,
      recurso_tipo: "questao",
      recurso_id: entrada.publicSubthemeId,
    });
    return itens;
  });
  const novos = candidatos.filter((item) => !existentes.has(`${item.semana_id}|${item.recurso_tipo}|${item.recurso_id}`));
  if (novos.length) {
    const { error: inserirErro } = await db.from("vinculo_recurso_usuario").insert(novos);
    if (inserirErro) throw new Error("Não foi possível criar os vínculos semanais.");
  }
  return novos.length;
}

async function main(): Promise<void> {
  const arquivoManifesto = resolverArquivoPrivado(manifestoArg!, process.cwd(), [".json"], "Manifesto privado");
  if (statSync(arquivoManifesto).size > 1_000_000) throw new Error("O manifesto privado excede o limite de 1 MB.");
  let bruto: unknown;
  try {
    bruto = JSON.parse(readFileSync(arquivoManifesto, "utf8")) as unknown;
  } catch {
    throw new Error("O manifesto privado não contém JSON válido.");
  }
  const { entrada, cobertura, tarefas } = validarEntrada(bruto, arquivoManifesto);
  void instanteNoFuso(entrada.date, 19, 0, entrada.timezone);
  const semanasPlanejadas = new Set(tarefas.map((tarefa) => {
    const limites = limitesDaSemana(tarefa.data);
    return `${limites.inicio}|${limites.fim}`;
  })).size;
  const resumoBase = {
    aplicar,
    markdownValidado: true,
    markdownIntegralLido: false,
    sha256FormatoValidado: true,
    tarefasPlanejadas: tarefas.length,
    agendaPlanejada: 1,
    semanasPlanejadas,
    resumoPublicoDisponivel: cobertura?.temResumo ?? false,
    questoesPublicasDisponiveis: cobertura?.totalQuestoes ?? 0,
    conteudoBrutoCopiado: false,
    credenciaisExpostas: false,
  };

  if (!aplicar) {
    console.log(JSON.stringify({ ...resumoBase, modo: "validação; nenhuma conexão ou gravação realizada" }, null, 2));
    return;
  }

  loadEnv();
  const db = getSupabaseAdmin();
  const owner = await descobrirOwner(db);
  const { material, inserido: materialInserido } = await localizarMaterial(db, owner, entrada);
  const { porData: semanasPorData, inseridas: semanasInseridas } = await localizarSemanas(db, owner, tarefas);
  const semanas = [...new Map([...semanasPorData.values()].map((semana) => [semana.id, semana])).values()];
  const focosInseridos = await inserirFocosAusentes(db, owner, semanas, entrada);
  const tarefasInseridas = await inserirTarefasAusentes(db, owner, tarefas, semanasPorData, entrada, cobertura);
  const agendaInserida = await inserirAgendaD0(db, owner, entrada, cobertura);
  const vinculosInseridos = await inserirVinculosAusentes(db, owner, semanas, material, entrada, cobertura);

  console.log(JSON.stringify({
    ...resumoBase,
    materialInserido: materialInserido ? 1 : 0,
    materialReutilizado: materialInserido ? 0 : 1,
    semanasInseridas,
    focosInseridos,
    tarefasInseridas,
    agendaInserida,
    vinculosInseridos,
    progressoPreservado: true,
    ownerExposto: false,
    erros: 0,
  }, null, 2));
}

main().catch((erro) => {
  console.error(`[fonte-semanal-privada] ${erro instanceof Error ? erro.message : String(erro)}`);
  process.exitCode = 1;
});
