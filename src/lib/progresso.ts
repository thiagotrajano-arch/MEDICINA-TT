"use client";

import type { Questao } from "@/domain/content/types";

/**
 * Progresso de estudo persistido no navegador (localStorage).
 *
 * Por que localStorage e não Supabase: o site é publicado como export estático
 * (hospedagem grátis), sem sessão de servidor. O progresso é pessoal e local —
 * quando houver login, o mesmo formato migra para a tabela `resposta_usuario`
 * sem mudar as telas, porque tudo aqui é lido/escrito por estas funções.
 */

const CHAVE_RESPOSTAS = "codex:respostas";
const CHAVE_SIMULADOS = "codex:simulados";

export interface RespostaRegistrada {
  questaoId: string;
  disciplinaId: string;
  correta: boolean;
  em: number; // epoch ms
}

export interface ResultadoSimulado {
  em: number;
  acertos: number;
  total: number;
  duracaoSeg: number;
  porDisciplina: Record<string, { acertos: number; total: number }>;
}

function ler<T>(chave: string, padrao: T): T {
  if (typeof window === "undefined") return padrao;
  try {
    const raw = window.localStorage.getItem(chave);
    return raw ? (JSON.parse(raw) as T) : padrao;
  } catch {
    return padrao;
  }
}

function gravar(chave: string, valor: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    // Cota cheia ou storage bloqueado: o estudo continua, só não persiste.
  }
}

// ── Respostas ───────────────────────────────────────────────────
export function lerRespostas(): RespostaRegistrada[] {
  return ler<RespostaRegistrada[]>(CHAVE_RESPOSTAS, []);
}

export function registrarResposta(q: Questao, correta: boolean): void {
  const todas = lerRespostas();
  todas.push({ questaoId: q.id, disciplinaId: q.disciplinaId, correta, em: Date.now() });
  gravar(CHAVE_RESPOSTAS, todas);
}

// ── Simulados ───────────────────────────────────────────────────
export function lerSimulados(): ResultadoSimulado[] {
  return ler<ResultadoSimulado[]>(CHAVE_SIMULADOS, []);
}

export function registrarSimulado(r: ResultadoSimulado): void {
  gravar(CHAVE_SIMULADOS, [...lerSimulados(), r]);
}

export function limparProgresso(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CHAVE_RESPOSTAS);
  window.localStorage.removeItem(CHAVE_SIMULADOS);
}

// ── Estatísticas derivadas ──────────────────────────────────────
export interface Estatisticas {
  respondidas: number;
  acertos: number;
  erros: number;
  percentual: number;
  porDisciplina: Record<string, { acertos: number; total: number; pct: number }>;
  /** Dias consecutivos com pelo menos uma resposta, terminando hoje/ontem. */
  sequencia: number;
  /** Respostas por dia nos últimos 14 dias, do mais antigo ao mais recente. */
  ultimos14Dias: { dia: string; total: number; acertos: number }[];
}

function chaveDia(ms: number): string {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function calcularEstatisticas(respostas: RespostaRegistrada[]): Estatisticas {
  const acertos = respostas.filter((r) => r.correta).length;
  const respondidas = respostas.length;

  const porDisciplina: Estatisticas["porDisciplina"] = {};
  for (const r of respostas) {
    const d = (porDisciplina[r.disciplinaId] ??= { acertos: 0, total: 0, pct: 0 });
    d.total++;
    if (r.correta) d.acertos++;
  }
  for (const d of Object.values(porDisciplina)) {
    d.pct = d.total ? Math.round((d.acertos / d.total) * 100) : 0;
  }

  // Últimos 14 dias
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const porDia = new Map<string, { total: number; acertos: number }>();
  for (const r of respostas) {
    const k = chaveDia(r.em);
    const e = porDia.get(k) ?? { total: 0, acertos: 0 };
    e.total++;
    if (r.correta) e.acertos++;
    porDia.set(k, e);
  }
  const ultimos14Dias = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(hoje);
    d.setDate(d.getDate() - (13 - i));
    const k = chaveDia(d.getTime());
    const e = porDia.get(k) ?? { total: 0, acertos: 0 };
    return { dia: k, ...e };
  });

  // Sequência: conta dias consecutivos para trás. Ontem também vale como
  // início, para não zerar a sequência antes de o dia de hoje começar.
  let sequencia = 0;
  const cursor = new Date(hoje);
  if (!porDia.has(chaveDia(cursor.getTime()))) cursor.setDate(cursor.getDate() - 1);
  while (porDia.has(chaveDia(cursor.getTime()))) {
    sequencia++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return {
    respondidas,
    acertos,
    erros: respondidas - acertos,
    percentual: respondidas ? Math.round((acertos / respondidas) * 100) : 0,
    porDisciplina,
    sequencia,
    ultimos14Dias,
  };
}

/** Fisher-Yates — embaralhamento uniforme, para simulado e alternativas. */
export function embaralhar<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
