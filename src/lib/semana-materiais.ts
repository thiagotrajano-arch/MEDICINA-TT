"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { MaterialPrivado } from "@/lib/materiais-privados";

export type EstadoVinculoMaterial = "confirmado" | "sugerido" | "rejeitado";

export type VinculoMaterialSemana = {
  id: string;
  semanaId: string;
  materialId: string;
  disciplinaId: string;
  tema: string;
  subtema: string;
  confianca: number;
  estado: EstadoVinculoMaterial;
  origem: "manual" | "pdf" | "agenda" | "curso" | "atividade";
  criadoEm: string;
  atualizadoEm: string;
};

type LinhaVinculo = {
  id: string;
  semana_id: string;
  material_id: string | null;
  recurso_id: string;
  disciplina_id: string;
  tema: string;
  subtema: string;
  confianca: number;
  estado: EstadoVinculoMaterial;
  origem: VinculoMaterialSemana["origem"];
  criado_em: string;
  atualizado_em: string;
};

const CHAVE_LOCAL = "codex:semana-materiais";

async function sessao(): Promise<{ supabase: SupabaseClient; userId: string } | null> {
  try {
    const { getSupabaseAnon } = await import("@/infra/supabase/client");
    const supabase = getSupabaseAnon();
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session?.user) return null;
    return { supabase, userId: data.session.user.id };
  } catch {
    return null;
  }
}

function tabelaAusente(error: { code?: string; message?: string } | null): boolean {
  return Boolean(error && (error.code === "42P01" || error.code === "PGRST205" || /relation .* does not exist|could not find the table/i.test(error.message ?? "")));
}

function falhaDeSincronizacao(error: { code?: string; message?: string } | null): boolean {
  return Boolean(error && (tabelaAusente(error) || error.code === "23503" || error.code === "22P02"));
}

function lerLocal(): VinculoMaterialSemana[] {
  if (typeof window === "undefined") return [];
  try {
    const bruto = window.localStorage.getItem(CHAVE_LOCAL);
    const valor = bruto ? JSON.parse(bruto) : [];
    return Array.isArray(valor) ? valor as VinculoMaterialSemana[] : [];
  } catch {
    return [];
  }
}

function gravarLocal(valor: VinculoMaterialSemana[]): void {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(CHAVE_LOCAL, JSON.stringify(valor)); } catch { /* fallback nao bloqueia o estudo */ }
}

function idLocal(): string {
  try { return crypto.randomUUID(); } catch { return `local-${Date.now()}-${Math.random().toString(36).slice(2)}`; }
}

function mapear(linha: LinhaVinculo): VinculoMaterialSemana {
  return {
    id: linha.id,
    semanaId: linha.semana_id,
    materialId: linha.material_id ?? linha.recurso_id,
    disciplinaId: linha.disciplina_id,
    tema: linha.tema,
    subtema: linha.subtema,
    confianca: Number(linha.confianca),
    estado: linha.estado,
    origem: linha.origem,
    criadoEm: linha.criado_em,
    atualizadoEm: linha.atualizado_em,
  };
}

export async function carregarVinculosMateriaisSemana(semanaId: string): Promise<{ vinculos: VinculoMaterialSemana[]; remoto: boolean }> {
  const locais = lerLocal().filter((item) => item.semanaId === semanaId);
  const auth = await sessao();
  if (!auth) return { vinculos: locais, remoto: false };

  const { data, error } = await auth.supabase.from("vinculo_recurso_usuario")
    .select("id,semana_id,material_id,recurso_id,disciplina_id,tema,subtema,confianca,estado,origem,criado_em,atualizado_em")
    .eq("owner_id", auth.userId).eq("semana_id", semanaId).eq("recurso_tipo", "material_privado")
    .order("atualizado_em", { ascending: false });
  if (error) {
    if (tabelaAusente(error) || falhaDeSincronizacao(error)) return { vinculos: locais, remoto: false };
    return { vinculos: locais, remoto: false };
  }

  const remotos = ((data ?? []) as LinhaVinculo[]).map(mapear);
  const idsRemotos = new Set(remotos.map((item) => item.materialId));
  return { vinculos: [...remotos, ...locais.filter((item) => !idsRemotos.has(item.materialId))], remoto: true };
}

export async function vincularMaterialNaSemana(semanaId: string, material: MaterialPrivado, extras?: Pick<VinculoMaterialSemana, "disciplinaId" | "tema" | "subtema">): Promise<VinculoMaterialSemana> {
  const agora = new Date().toISOString();
  const vinculo: VinculoMaterialSemana = {
    id: idLocal(),
    semanaId,
    materialId: material.id,
    disciplinaId: (extras?.disciplinaId || material.disciplina || "").trim(),
    tema: (extras?.tema || material.tema || "").trim(),
    subtema: (extras?.subtema || material.subtema || "").trim(),
    confianca: 1,
    estado: "confirmado",
    origem: material.origem === "drive" ? "pdf" : "manual",
    criadoEm: agora,
    atualizadoEm: agora,
  };
  const auth = await sessao();
  if (auth) {
    const { data, error } = await auth.supabase.from("vinculo_recurso_usuario").upsert({
      owner_id: auth.userId,
      semana_id: semanaId,
      material_id: material.id,
      recurso_tipo: "material_privado",
      recurso_id: material.id,
      disciplina_id: vinculo.disciplinaId,
      tema: vinculo.tema,
      subtema: vinculo.subtema,
      confianca: vinculo.confianca,
      estado: vinculo.estado,
      origem: vinculo.origem,
      atualizado_em: agora,
    }, { onConflict: "owner_id,semana_id,recurso_tipo,recurso_id" }).select("id,semana_id,material_id,recurso_id,disciplina_id,tema,subtema,confianca,estado,origem,criado_em,atualizado_em").single();
    if (data && !error) return mapear(data as LinhaVinculo);
    if (error && !falhaDeSincronizacao(error)) throw new Error("Nao foi possivel vincular este material a semana.");
  }
  const locais = lerLocal().filter((item) => !(item.semanaId === semanaId && item.materialId === material.id));
  gravarLocal([...locais, vinculo]);
  return vinculo;
}

export async function desvincularMaterialDaSemana(semanaId: string, vinculo: VinculoMaterialSemana): Promise<void> {
  const auth = await sessao();
  if (auth && !vinculo.id.startsWith("local-")) {
    const { error } = await auth.supabase.from("vinculo_recurso_usuario").delete().eq("owner_id", auth.userId).eq("id", vinculo.id);
    if (error && !falhaDeSincronizacao(error)) throw new Error("Nao foi possivel remover o vinculo.");
  }
  gravarLocal(lerLocal().filter((item) => !(item.semanaId === semanaId && item.materialId === vinculo.materialId)));
}
