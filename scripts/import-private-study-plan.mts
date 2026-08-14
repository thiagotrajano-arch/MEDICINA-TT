/**
 * Importa um plano privado de estudos para Agenda + Semana atual.
 *
 * O manifesto com o cronograma e a proveniência dos PDFs fica fora do Git.
 * A rotina é aditiva, idempotente e preserva eventos/tarefas manuais.
 *
 * Uso:
 *   npm exec -- tsx scripts/import-private-study-plan.mts --manifest <arquivo.json>
 *   npm exec -- tsx scripts/import-private-study-plan.mts --manifest <arquivo.json> --apply
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { loadEnv } from "./load-env.mjs";
import { getSupabaseAdmin } from "../src/infra/supabase/client";

loadEnv();

type Prioridade = "alta" | "media" | "baixa";
type Foco = {
  disciplina: string;
  tema: string;
  subtema: string;
};
type SemanaPlano = {
  numero: number;
  atual: Foco;
  omed: Foco;
};
type PdfPlano = Foco & {
  filename: string;
  titulo: string;
  semana: number;
};
type Plano = {
  schemaVersion: 1;
  planId: string;
  timezone: "America/Sao_Paulo";
  utcOffset: string;
  periodo: number;
  inicio: string;
  fonteManifesto: string;
  fonteRotulo: string;
  semanas: SemanaPlano[];
  pdfs: PdfPlano[];
};
type FontePdf = {
  filename: string;
  bytes: number;
  pages: number;
  sha256: string;
  markdown: string;
  ocrRequired: boolean;
  extractionStatus: string;
  topics: string[];
  disciplines: string[];
  curriculumLinks: string[];
  allowedDestination: string;
};
type ManifestoFonte = {
  schemaVersion: number;
  visibility: string;
  publicRepositoryAllowed: boolean;
  items: FontePdf[];
};
type Disciplina = {
  disciplina_id: string;
  periodo: number;
  status: "concluida" | "cursando";
  observacao: string;
};
type SemanaRemota = { id: string; inicio: string; fim: string; objetivo: string; origem: string; confirmada: boolean };
type MaterialRemoto = { id: string; titulo: string };
type AgendaDraft = {
  owner_id: string;
  titulo: string;
  inicio: string;
  fim: string;
  tipo: "estudo" | "revisao";
  disciplina_id: string;
  tema: string;
  observacao: string;
  concluido: false;
};
type TarefaDraft = {
  owner_id: string;
  semana_id: string;
  data: string;
  titulo: string;
  atividade: "resumo" | "questoes" | "caso" | "revisao" | "pdf" | "outro";
  recurso_id: string;
  disciplina_id: string;
  tema: string;
  duracao_min: number;
  estado: "pendente";
  origem: "curso" | "pdf" | "agenda";
  agenda_chave: string;
};

const aplicar = process.argv.includes("--apply");
const argumento = (nome: string): string | null => {
  const indice = process.argv.indexOf(nome);
  return indice >= 0 ? process.argv[indice + 1] ?? null : null;
};
const manifestoArg = argumento("--manifest");
if (!manifestoArg) throw new Error("Informe --manifest com o plano privado.");

const lerJson = <T,>(arquivo: string): T => JSON.parse(readFileSync(arquivo, "utf8")) as T;
const limitar = (valor: string, maximo: number): string => valor.trim().slice(0, maximo);
const dataSomada = (inicio: string, dias: number): string => {
  const [ano, mes, dia] = inicio.split("-").map(Number);
  const data = new Date(Date.UTC(ano, mes - 1, dia + dias));
  return data.toISOString().slice(0, 10);
};
const instante = (data: string, hora: string, offset: string): string => `${data}T${hora}:00${offset}`;
const fimDepois = (inicio: string, minutos: number): string => new Date(new Date(inicio).getTime() + minutos * 60_000).toISOString();
const tituloPdf = (valor: string): string => valor.replace(/\.pdf$/i, "").replaceAll("_", " ");
const limparObservacaoCurricular = (valor: string): string =>
  valor.replace(/\[Mapa curricular confirmado[^\]]*\]/g, "").replace(/\s+/g, " ").trim();
const extrairTopicosCurriculares = (valor: string): string[] => {
  const texto = limparObservacaoCurricular(valor);
  const partes = texto.split(/[;\n]+/u).map((item) => item.trim()).filter(Boolean);
  return partes.length ? partes : [texto];
};

function validarPlano(plano: Plano, fonte: ManifestoFonte): void {
  if (plano.schemaVersion !== 1 || fonte.schemaVersion < 1) throw new Error("Versão de manifesto não suportada.");
  if (plano.timezone !== "America/Sao_Paulo" || !/^[+-]\d{2}:\d{2}$/.test(plano.utcOffset)) throw new Error("Fuso do plano inválido.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(plano.inicio) || plano.periodo < 1 || plano.periodo > 12) throw new Error("Período ou início inválido.");
  if (!plano.semanas.length || new Set(plano.semanas.map((item) => item.numero)).size !== plano.semanas.length) throw new Error("Semanas ausentes ou duplicadas.");
  if (fonte.visibility !== "private" || fonte.publicRepositoryAllowed !== false) throw new Error("O manifesto-fonte precisa permanecer privado.");
  const arquivos = new Set(fonte.items.map((item) => item.filename));
  const ausentes = plano.pdfs.filter((item) => !arquivos.has(item.filename));
  if (ausentes.length) throw new Error(`${ausentes.length} PDF(s) do plano não constam no manifesto de proveniência.`);
  const hashesInvalidos = fonte.items.filter((item) => !/^[0-9a-f]{64}$/i.test(item.sha256));
  if (hashesInvalidos.length) throw new Error(`${hashesInvalidos.length} PDF(s) possuem SHA-256 inválido.`);
}

function distribuirDisciplinas(itens: Disciplina[], quantidadeSemanas: number): Disciplina[][] {
  const ordenados = [...itens].sort((a, b) => a.periodo - b.periodo || a.disciplina_id.localeCompare(b.disciplina_id, "pt-BR"));
  const base = Math.floor(ordenados.length / quantidadeSemanas);
  const extras = ordenados.length % quantidadeSemanas;
  let cursor = 0;
  return Array.from({ length: quantidadeSemanas }, (_, indice) => {
    const quantidade = base + (indice < extras ? 1 : 0);
    const grupo = ordenados.slice(cursor, cursor + quantidade);
    cursor += quantidade;
    return grupo;
  });
}

async function descobrirOwner(db: ReturnType<typeof getSupabaseAdmin>): Promise<string> {
  const { data, error } = await db.from("curso_disciplina_usuario").select("owner_id").limit(1000);
  if (error) throw new Error(`Conta privada: ${error.message}`);
  const donos = [...new Set((data ?? []).map((linha) => linha.owner_id as string).filter(Boolean))];
  if (donos.length !== 1) throw new Error("Não foi possível identificar com segurança uma única conta proprietária.");
  return donos[0];
}

async function main(): Promise<void> {
  const arquivoPlano = path.resolve(manifestoArg!);
  const plano = lerJson<Plano>(arquivoPlano);
  const arquivoFonte = path.resolve(path.dirname(arquivoPlano), plano.fonteManifesto);
  const fonte = lerJson<ManifestoFonte>(arquivoFonte);
  validarPlano(plano, fonte);

  const db = getSupabaseAdmin();
  const owner = await descobrirOwner(db);
  const { data: disciplinasData, error: disciplinasErro } = await db
    .from("curso_disciplina_usuario")
    .select("disciplina_id,periodo,status,observacao")
    .eq("owner_id", owner);
  if (disciplinasErro) throw new Error(`Currículo privado: ${disciplinasErro.message}`);
  const disciplinas = (disciplinasData ?? []) as Disciplina[];
  const concluidas = disciplinas.filter((item) => item.status === "concluida");
  const cursando = disciplinas.filter((item) => item.status === "cursando");
  const revisoesPorSemana = distribuirDisciplinas(concluidas, plano.semanas.length);
  const marcador = `[Plano privado ${plano.planId}]`;

  const resumoBase = {
    aplicar,
    semanas: plano.semanas.length,
    disciplinasConcluidasNaFila: concluidas.length,
    disciplinasAtuaisMapeadas: cursando.length,
    pdfsNaFila: plano.pdfs.length,
    blocosOmed: plano.semanas.length * 3,
  };
  if (!aplicar) {
    console.log(JSON.stringify({ ...resumoBase, modo: "validação; nenhuma gravação realizada" }, null, 2));
    return;
  }

  const agora = new Date().toISOString();
  const fontesPorNome = new Map(fonte.items.map((item) => [item.filename, item]));
  const materiaisPayload = plano.pdfs.map((item) => {
    const origem = fontesPorNome.get(item.filename)!;
    const observacao = [
      "Convertido para Markdown antes da leitura e mantido no acervo privado.",
      `Extração: ${origem.extractionStatus}; OCR necessário: ${origem.ocrRequired ? "sim" : "não"}.`,
      `Vínculos curriculares: ${origem.curriculumLinks.join("; ")}.`,
      `Tópicos: ${origem.topics.join("; ")}.`,
      origem.allowedDestination,
    ].join(" ");
    return {
      owner_id: owner,
      titulo: limitar(item.titulo || tituloPdf(item.filename), 240),
      tipo_arquivo: "pdf",
      origem: "local",
      disciplina: limitar(item.disciplina, 160),
      tema: limitar(item.tema, 180),
      subtema: limitar(item.subtema, 180),
      semestre: plano.periodo,
      prioridade: "alta" as Prioridade,
      estado: "integrado",
      destino: "privado",
      fonte: limitar(plano.fonteRotulo, 600),
      tamanho_bytes: origem.bytes,
      paginas: origem.pages,
      hash_sha256: origem.sha256.toLowerCase(),
      observacao: limitar(observacao, 3000),
      atualizado_em: agora,
    };
  });
  const { data: materiaisData, error: materiaisErro } = await db
    .from("material_privado_usuario")
    .upsert(materiaisPayload, { onConflict: "owner_id,origem,titulo,fonte" })
    .select("id,titulo");
  if (materiaisErro) throw new Error(`PDFs privados: ${materiaisErro.message}`);
  const materiais = new Map(((materiaisData ?? []) as MaterialRemoto[]).map((item) => [item.titulo, item.id]));

  const primeiro = plano.inicio;
  const ultimoFim = dataSomada(primeiro, plano.semanas.length * 7 - 1);
  const { data: semanasExistentesData, error: semanasExistentesErro } = await db
    .from("semana_estudo_usuario")
    .select("id,inicio,fim,objetivo,origem,confirmada")
    .eq("owner_id", owner)
    .gte("inicio", primeiro)
    .lte("fim", ultimoFim);
  if (semanasExistentesErro) throw new Error(`Semanas existentes: ${semanasExistentesErro.message}`);
  const semanasExistentes = new Map(((semanasExistentesData ?? []) as SemanaRemota[]).map((item) => [`${item.inicio}|${item.fim}`, item]));
  const semanasRemotas = new Map<number, SemanaRemota>();

  for (let indice = 0; indice < plano.semanas.length; indice += 1) {
    const item = plano.semanas[indice];
    const inicio = dataSomada(primeiro, indice * 7);
    const fim = dataSomada(inicio, 6);
    const objetivoPlano = `${marcador} ${item.atual.disciplina}: ${item.atual.tema}. OMED: ${item.omed.disciplina} — ${item.omed.tema}.`;
    const existente = semanasExistentes.get(`${inicio}|${fim}`);
    if (existente) {
      const objetivo = existente.objetivo.includes(marcador)
        ? existente.objetivo
        : limitar([existente.objetivo, objetivoPlano].filter(Boolean).join("\n"), 500);
      const { data, error } = await db.from("semana_estudo_usuario")
        .update({ objetivo, atualizado_em: agora })
        .eq("owner_id", owner).eq("id", existente.id)
        .select("id,inicio,fim,objetivo,origem,confirmada").single();
      if (error) throw new Error(`Semana ${item.numero}: ${error.message}`);
      semanasRemotas.set(item.numero, data as SemanaRemota);
    } else {
      const { data, error } = await db.from("semana_estudo_usuario")
        .insert({ owner_id: owner, inicio, fim, periodo: plano.periodo, objetivo: limitar(objetivoPlano, 500), estado: "ativa", origem: "curso", confirmada: true })
        .select("id,inicio,fim,objetivo,origem,confirmada").single();
      if (error) throw new Error(`Semana ${item.numero}: ${error.message}`);
      semanasRemotas.set(item.numero, data as SemanaRemota);
    }
  }

  const focos = plano.semanas.flatMap((item) => {
    const semana = semanasRemotas.get(item.numero)!;
    const pdf = plano.pdfs.find((fontePdf) => fontePdf.semana === item.numero);
    return [
      { owner_id: owner, semana_id: semana.id, disciplina_id: limitar(item.atual.disciplina, 160), tema: limitar(item.atual.tema, 180), subtema: limitar(item.atual.subtema, 180), prioridade: "alta", origem: "curso", confianca: 1, estado: "confirmado", atualizado_em: agora },
      { owner_id: owner, semana_id: semana.id, disciplina_id: limitar(item.omed.disciplina, 160), tema: limitar(item.omed.tema, 180), subtema: limitar(item.omed.subtema, 180), prioridade: "alta", origem: "omed", confianca: 1, estado: "confirmado", atualizado_em: agora },
      ...(pdf ? [{ owner_id: owner, semana_id: semana.id, disciplina_id: limitar(pdf.disciplina, 160), tema: limitar(pdf.tema, 180), subtema: limitar(pdf.subtema, 180), prioridade: "alta", origem: "pdf", confianca: 1, estado: "confirmado", atualizado_em: agora }] : []),
    ];
  });
  const { error: focosErro } = await db.from("foco_semana_usuario")
    .upsert(focos, { onConflict: "owner_id,semana_id,disciplina_id,tema,subtema" });
  if (focosErro) throw new Error(`Focos semanais: ${focosErro.message}`);

  const agenda: AgendaDraft[] = [];
  const tarefas: TarefaDraft[] = [];
  for (let indice = 0; indice < plano.semanas.length; indice += 1) {
    const item = plano.semanas[indice];
    const semana = semanasRemotas.get(item.numero)!;
    const inicio = dataSomada(primeiro, indice * 7);
    const pdf = plano.pdfs.find((fontePdf) => fontePdf.semana === item.numero);
    const anteriores = revisoesPorSemana[indice];
    const eventos = [
      { dia: 0, hora: "19:00", duracao: 75, titulo: `Semestre atual · ${item.atual.disciplina}`, tipo: "estudo" as const, disciplina: item.atual.disciplina, tema: item.atual.tema, observacao: `${item.atual.subtema}. Estudo ativo com síntese curta e recuperação sem consulta.`, atividade: "resumo" as const, origem: "curso" as const },
      { dia: 1, hora: "19:00", duracao: 75, titulo: pdf ? `PDF · ${pdf.titulo}` : `Aplicação clínica · ${item.atual.disciplina}`, tipo: "estudo" as const, disciplina: pdf?.disciplina ?? item.atual.disciplina, tema: pdf?.tema ?? item.atual.tema, observacao: pdf ? `${pdf.subtema}. Fonte privada já convertida para Markdown; estudar sem republicar o conteúdo bruto.` : `${item.atual.subtema}. Resolver um caso e registrar dúvidas.`, atividade: pdf ? "pdf" as const : "caso" as const, origem: pdf ? "pdf" as const : "curso" as const },
      { dia: 2, hora: "19:00", duracao: 90, titulo: `OMED · Revisão dirigida · ${item.omed.disciplina}`, tipo: "revisao" as const, disciplina: item.omed.disciplina, tema: item.omed.tema, observacao: `${item.omed.subtema}. Revisão de alto rendimento com conceitos, condutas e critérios diagnósticos.`, atividade: "revisao" as const, origem: "agenda" as const },
      { dia: 3, hora: "19:00", duracao: 75, titulo: `Pendências antigas · ${anteriores.map((curso) => curso.disciplina_id).join(" · ")}`, tipo: "revisao" as const, disciplina: "Disciplinas já cursadas", tema: "Revisão longitudinal", observacao: anteriores.map((curso) => `${curso.disciplina_id} (P${curso.periodo}) — ${limparObservacaoCurricular(curso.observacao)}`).join("\n"), atividade: "revisao" as const, origem: "curso" as const },
      { dia: 4, hora: "19:00", duracao: 45, titulo: `OMED · Erros e repetição espaçada · ${item.omed.disciplina}`, tipo: "revisao" as const, disciplina: item.omed.disciplina, tema: "Caderno de erros", observacao: "Revisar questões erradas, classificar a causa do erro e transformar apenas os pontos úteis em repetição espaçada.", atividade: "revisao" as const, origem: "agenda" as const },
      { dia: 5, hora: "09:00", duracao: 90, titulo: `OMED · Questões e casos · ${item.omed.disciplina}`, tipo: "estudo" as const, disciplina: item.omed.disciplina, tema: item.omed.tema, observacao: `${item.omed.subtema}. Bloco de questões/casos cronometrado; revisar justificativas e imagens clínicas relacionadas.`, atividade: "questoes" as const, origem: "agenda" as const },
      { dia: 6, hora: "18:00", duracao: 45, titulo: `Fechamento da semana ${item.numero}`, tipo: "revisao" as const, disciplina: "Planejamento", tema: "Consolidação semanal", observacao: "Marcar o que foi concluído, reagendar pendências sem culpa e escolher os três pontos fracos da próxima semana.", atividade: "outro" as const, origem: "agenda" as const },
    ];

    for (const evento of eventos) {
      const data = dataSomada(inicio, evento.dia);
      const inicioIso = instante(data, evento.hora, plano.utcOffset);
      const observacao = limitar(`${marcador}\n${evento.observacao}`, 2000);
      agenda.push({ owner_id: owner, titulo: limitar(evento.titulo, 180), inicio: inicioIso, fim: fimDepois(inicioIso, evento.duracao), tipo: evento.tipo, disciplina_id: limitar(evento.disciplina, 160), tema: limitar(evento.tema, 180), observacao, concluido: false });
      tarefas.push({ owner_id: owner, semana_id: semana.id, data, titulo: limitar(evento.titulo, 180), atividade: evento.atividade, recurso_id: pdf && evento.atividade === "pdf" ? limitar(`pdf:${pdf.filename}`, 180) : "", disciplina_id: limitar(evento.disciplina, 160), tema: limitar(evento.tema, 180), duracao_min: evento.duracao, estado: "pendente", origem: evento.origem, agenda_chave: `${new Date(inicioIso).toISOString()}|${limitar(evento.titulo, 180)}` });
    }
    for (const curso of anteriores) {
      const topicos = extrairTopicosCurriculares(curso.observacao);
      const duracao = Math.max(10, Math.floor(75 / Math.max(topicos.length, 1)));
      for (const topico of topicos) {
        const tema = limitar(topico, 180);
        tarefas.push({ owner_id: owner, semana_id: semana.id, data: dataSomada(inicio, 3), titulo: limitar(`Revisar ${curso.disciplina_id}: ${tema}`, 180), atividade: "revisao", recurso_id: "", disciplina_id: limitar(curso.disciplina_id, 160), tema, duracao_min: duracao, estado: "pendente", origem: "curso", agenda_chave: "" });
      }
    }
  }

  const { data: agendaExistenteData, error: agendaExistenteErro } = await db.from("agenda_estudo_usuario")
    .select("titulo,inicio").eq("owner_id", owner).gte("inicio", instante(primeiro, "00:00", plano.utcOffset)).lte("inicio", instante(ultimoFim, "23:59", plano.utcOffset));
  if (agendaExistenteErro) throw new Error(`Agenda existente: ${agendaExistenteErro.message}`);
  const agendaExistente = new Set((agendaExistenteData ?? []).map((item) => `${new Date(item.inicio).toISOString()}|${item.titulo}`));
  const agendaNova = agenda.filter((item) => !agendaExistente.has(`${new Date(item.inicio).toISOString()}|${item.titulo}`));
  if (agendaNova.length) {
    const { error } = await db.from("agenda_estudo_usuario").insert(agendaNova);
    if (error) throw new Error(`Agenda: ${error.message}`);
  }

  const { data: agendaVinculadaData, error: agendaVinculadaErro } = await db.from("agenda_estudo_usuario")
    .select("id,titulo,inicio").eq("owner_id", owner).gte("inicio", instante(primeiro, "00:00", plano.utcOffset)).lte("inicio", instante(ultimoFim, "23:59", plano.utcOffset));
  if (agendaVinculadaErro) throw new Error(`Vínculos da agenda: ${agendaVinculadaErro.message}`);
  const idsAgendaPorChave = new Map((agendaVinculadaData ?? []).map((item) => [`${new Date(item.inicio).toISOString()}|${item.titulo}`, item.id as string]));
  const tarefasComVinculo = tarefas.map(({ agenda_chave: agendaChave, ...tarefa }) => ({
    ...tarefa,
    agenda_evento_id: agendaChave ? idsAgendaPorChave.get(agendaChave) ?? null : null,
  }));

  const idsSemanas = [...semanasRemotas.values()].map((item) => item.id);
  const { data: tarefasExistentesData, error: tarefasExistentesErro } = await db.from("tarefa_estudo_usuario")
    .select("semana_id,data,titulo").eq("owner_id", owner).in("semana_id", idsSemanas);
  if (tarefasExistentesErro) throw new Error(`Tarefas existentes: ${tarefasExistentesErro.message}`);
  const tarefasExistentes = new Set((tarefasExistentesData ?? []).map((item) => `${item.semana_id}|${item.data}|${item.titulo}`));
  const tarefasNovas = tarefasComVinculo.filter((item) => !tarefasExistentes.has(`${item.semana_id}|${item.data}|${item.titulo}`));
  if (tarefasNovas.length) {
    const { error } = await db.from("tarefa_estudo_usuario").insert(tarefasNovas);
    if (error) throw new Error(`Tarefas: ${error.message}`);
  }

  const vinculos = plano.pdfs.map((pdf) => {
    const semana = semanasRemotas.get(pdf.semana)!;
    const materialId = materiais.get(pdf.titulo);
    if (!materialId) throw new Error("Um PDF não retornou ID após a catalogação privada.");
    return { owner_id: owner, semana_id: semana.id, material_id: materialId, recurso_tipo: "material_privado", recurso_id: limitar(`pdf:${pdf.filename}`, 240), disciplina_id: limitar(pdf.disciplina, 160), tema: limitar(pdf.tema, 180), subtema: limitar(pdf.subtema, 180), confianca: 1, estado: "confirmado", origem: "pdf", atualizado_em: agora };
  });
  const { error: vinculosErro } = await db.from("vinculo_recurso_usuario")
    .upsert(vinculos, { onConflict: "owner_id,semana_id,recurso_tipo,recurso_id" });
  if (vinculosErro) throw new Error(`Vínculos dos PDFs: ${vinculosErro.message}`);

  console.log(JSON.stringify({
    ...resumoBase,
    agendaPlanejada: agenda.length,
    agendaInserida: agendaNova.length,
    tarefasPlanejadas: tarefas.length,
    tarefasInseridas: tarefasNovas.length,
    focosConfirmados: focos.length,
    materiaisPrivadosCatalogados: materiaisPayload.length,
    vinculosPdfCriados: vinculos.length,
    eventosManuaisPreservados: true,
    erros: 0,
  }, null, 2));
}

main().catch((erro) => {
  console.error(`[plano-privado] ${erro instanceof Error ? erro.message : String(erro)}`);
  process.exitCode = 1;
});
