"use client";

import type { DisciplinaCursoPrivado, EntradaCursoPrivado, EventoCursoPrivado, LinhaImportacaoCurso, OrigemCurso, StatusCurso } from "@/domain/curso/types";
import { ORIGENS_CURSO, STATUS_CURSO } from "@/domain/curso/types";
import { registrarErro } from "@/lib/monitor";

const CHAVE_RASCUNHO = "codex:curso-privado-rascunho";

type LinhaRemota = { disciplina_id: string; periodo: number | null; status: StatusCurso; data_inicio: string | null; data_fim: string | null; dificuldade: number | null; observacao: string; origem: OrigemCurso; criado_em: string; atualizado_em: string };
type EventoRemoto = { id: string; disciplina_id: string; tipo: EventoCursoPrivado["tipo"]; origem: OrigemCurso; campos: string[]; criado_em: string };

export function criarRascunhoCurso(disciplinaId = ""): EntradaCursoPrivado {
  return { disciplinaId, periodo: null, status: "planejada", dificuldade: null, observacao: "", origem: "manual" };
}

export function lerRascunhoCurso(): EntradaCursoPrivado | null {
  if (typeof window === "undefined") return null;
  try { const raw = window.localStorage.getItem(CHAVE_RASCUNHO); return raw ? JSON.parse(raw) as EntradaCursoPrivado : null; } catch { return null; }
}

export function salvarRascunhoCurso(entrada: EntradaCursoPrivado): void {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(entrada)); } catch {}
}

export function limparRascunhoCurso(): void {
  if (typeof window !== "undefined") window.localStorage.removeItem(CHAVE_RASCUNHO);
}

export function validarEntradaCurso(entrada: EntradaCursoPrivado): LinhaImportacaoCurso {
  const erros: string[] = [];
  const disciplinaId = entrada.disciplinaId.trim();
  const observacao = (entrada.observacao ?? "").trim();
  const periodo = entrada.periodo ?? null;
  const dificuldade = entrada.dificuldade ?? null;
  const status = entrada.status ?? "planejada";
  const origem = entrada.origem ?? "manual";
  if (!disciplinaId || disciplinaId.length > 160) erros.push("Selecione uma disciplina valida.");
  if (periodo !== null && (!Number.isInteger(periodo) || periodo < 1 || periodo > 12)) erros.push("Periodo deve ficar entre 1 e 12.");
  if (!STATUS_CURSO.includes(status)) erros.push("Status invalido.");
  if (dificuldade !== null && (!Number.isInteger(dificuldade) || dificuldade < 1 || dificuldade > 5)) erros.push("Dificuldade deve ficar entre 1 e 5.");
  if (observacao.length > 2000) erros.push("Observacao deve ter no maximo 2000 caracteres.");
  if (!ORIGENS_CURSO.includes(origem)) erros.push("Origem invalida.");
  if (entrada.dataInicio && entrada.dataFim && entrada.dataFim < entrada.dataInicio) erros.push("A data final nao pode vir antes da inicial.");
  return { linha: 0, erros, entrada: erros.length ? undefined : { disciplinaId, periodo, status, dataInicio: entrada.dataInicio || null, dataFim: entrada.dataFim || null, dificuldade, observacao, origem } };
}

export function interpretarImportacaoCurso(texto: string, origem: Extract<OrigemCurso, "markdown" | "csv">): LinhaImportacaoCurso[] {
  const linhas = origem === "csv" ? linhasCsv(texto) : linhasMarkdown(texto);
  if (!linhas.length) return [{ linha: 0, erros: ["Nenhuma linha de dados foi encontrada."] }];
  const [cabecalho, ...dados] = linhas;
  const chaves = cabecalho.map(normalizarCabecalho);
  return dados.filter((linha) => linha.some((celula) => celula.trim())).map((linha, indice) => {
    const valores = Object.fromEntries(chaves.map((chave, coluna) => [chave, linha[coluna]?.trim() ?? ""]));
    const resultado = validarEntradaCurso({ disciplinaId: valores.disciplina ?? valores.disciplinaid ?? "", periodo: numeroOuNulo(valores.periodo), status: (valores.status || "planejada") as StatusCurso, dataInicio: valores.datainicio || null, dataFim: valores.datafim || null, dificuldade: numeroOuNulo(valores.dificuldade), observacao: valores.observacao ?? "", origem });
    return { ...resultado, linha: indice + 2 };
  });
}

function linhasMarkdown(texto: string): string[][] {
  return texto.split(/\r?\n/).filter((linha) => linha.trim().startsWith("|")).map((linha) => linha.trim().replace(/^\||\|$/g, "").split("|").map((celula) => celula.trim())).filter((linha) => !linha.every((celula) => /^:?-{3,}:?$/.test(celula)));
}

function linhasCsv(texto: string): string[][] { return texto.split(/\r?\n/).filter(Boolean).map(separarCsv); }

function separarCsv(linha: string): string[] {
  const campos: string[] = []; let atual = ""; let aspas = false;
  for (let i = 0; i < linha.length; i += 1) { const caractere = linha[i]; if (caractere === '"') { if (aspas && linha[i + 1] === '"') { atual += '"'; i += 1; } else aspas = !aspas; } else if (caractere === "," && !aspas) { campos.push(atual); atual = ""; } else atual += caractere; }
  campos.push(atual); return campos;
}

function normalizarCabecalho(valor: string): string { return valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, ""); }
function numeroOuNulo(valor: string | undefined): number | null { if (!valor?.trim()) return null; const numero = Number(valor); return Number.isFinite(numero) ? numero : Number.NaN; }
function paraCurso(row: LinhaRemota): DisciplinaCursoPrivado { return { disciplinaId: row.disciplina_id, periodo: row.periodo, status: row.status, dataInicio: row.data_inicio, dataFim: row.data_fim, dificuldade: row.dificuldade, observacao: row.observacao, origem: row.origem, criadoEm: row.criado_em, atualizadoEm: row.atualizado_em }; }
function paraEvento(row: EventoRemoto): EventoCursoPrivado { return { id: row.id, disciplinaId: row.disciplina_id, tipo: row.tipo, origem: row.origem, campos: row.campos, criadoEm: row.criado_em }; }

async function sessaoCurso() {
  const { getSupabaseAnon } = await import("@/infra/supabase/client");
  const supabase = getSupabaseAnon(); const { data } = await supabase.auth.getSession();
  return data.session?.user ? { supabase, userId: data.session.user.id } : null;
}

export async function carregarCursoPrivado(): Promise<{ disciplinas: DisciplinaCursoPrivado[]; eventos: EventoCursoPrivado[] }> {
  const auth = await sessaoCurso(); if (!auth) return { disciplinas: [], eventos: [] };
  const [disciplinas, eventos] = await Promise.all([
    auth.supabase.from("curso_disciplina_usuario").select("disciplina_id,periodo,status,data_inicio,data_fim,dificuldade,observacao,origem,criado_em,atualizado_em").eq("owner_id", auth.userId).order("periodo", { ascending: true }),
    auth.supabase.from("curso_disciplina_evento").select("id,disciplina_id,tipo,origem,campos,criado_em").eq("owner_id", auth.userId).order("criado_em", { ascending: false }).limit(20),
  ]);
  if (disciplinas.error) throw new Error("Nao foi possivel carregar seu curso privado.");
  if (eventos.error) throw new Error("Nao foi possivel carregar o historico privado.");
  return { disciplinas: (disciplinas.data as LinhaRemota[]).map(paraCurso), eventos: (eventos.data as EventoRemoto[]).map(paraEvento) };
}

export async function salvarDisciplinaCurso(entrada: EntradaCursoPrivado, tipoEvento: EventoCursoPrivado["tipo"] = "atualizada"): Promise<DisciplinaCursoPrivado> {
  const validacao = validarEntradaCurso(entrada); if (!validacao.entrada) throw new Error(validacao.erros.join(" "));
  const auth = await sessaoCurso(); if (!auth) throw new Error("Entre na sua conta para salvar o curso privado.");
  const item = validacao.entrada;
  const existente = await auth.supabase.from("curso_disciplina_usuario").select("disciplina_id").eq("owner_id", auth.userId).eq("disciplina_id", item.disciplinaId).maybeSingle();
  if (existente.error) throw new Error("Nao foi possivel verificar a disciplina.");
  const { data, error } = await auth.supabase.from("curso_disciplina_usuario").upsert({ owner_id: auth.userId, disciplina_id: item.disciplinaId, periodo: item.periodo ?? null, status: item.status, data_inicio: item.dataInicio ?? null, data_fim: item.dataFim ?? null, dificuldade: item.dificuldade ?? null, observacao: item.observacao ?? "", origem: item.origem, atualizado_em: new Date().toISOString() }, { onConflict: "owner_id,disciplina_id" }).select("disciplina_id,periodo,status,data_inicio,data_fim,dificuldade,observacao,origem,criado_em,atualizado_em").single();
  if (error) { registrarErro("curso-privado-salvar", error.message, { codigo: error.code, tipo: "upsert" }); throw new Error("Nao foi possivel salvar a disciplina."); }
  const evento = await auth.supabase.from("curso_disciplina_evento").insert({ owner_id: auth.userId, disciplina_id: item.disciplinaId, tipo: existente.data ? tipoEvento : "criada", origem: item.origem, campos: ["periodo", "status", "datas", "dificuldade", "observacao"] });
  if (evento.error) registrarErro("curso-privado-historico", evento.error.message, { codigo: evento.error.code, tipo: "historico" });
  limparRascunhoCurso(); return paraCurso(data as LinhaRemota);
}
