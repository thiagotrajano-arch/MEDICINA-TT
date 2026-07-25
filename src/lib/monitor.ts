"use client";

import { isSupabaseConfigured } from "@/infra/supabase/config";

/**
 * Monitoramento real de erro do cliente, sem depender de conta em serviço
 * terceiro (Sentry etc.) — grava em client_error_log (Supabase, já
 * configurado) além de logar no console. Nunca lança: uma falha aqui não
 * pode derrubar o app que está tentando monitorar.
 */

let instalado = false;

function safeJson(valor: unknown): unknown {
  try {
    return JSON.parse(JSON.stringify(valor));
  } catch {
    return { valor: String(valor) };
  }
}

async function registrar(
  nivel: "error" | "warn",
  contexto: string,
  mensagem: string,
  detalhes?: unknown
): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    const { getSupabaseAnon } = await import("@/infra/supabase/client");
    const supabase = getSupabaseAnon();
    const sessao = await supabase.auth.getSession();
    await supabase.from("client_error_log").insert({
      nivel,
      contexto,
      mensagem: String(mensagem).slice(0, 2000),
      detalhes: detalhes ? safeJson(detalhes) : null,
      pagina: typeof window !== "undefined" ? window.location.pathname : null,
      owner_id: sessao.data.session?.user?.id ?? null,
    });
  } catch {
    // Monitoramento nunca pode quebrar o app — silenciar aqui é intencional.
  }
}

export function registrarErro(contexto: string, mensagem: string, detalhes?: unknown): void {
  console.error(`[${contexto}]`, mensagem, detalhes ?? "");
  void registrar("error", contexto, mensagem, detalhes);
}

export function registrarAviso(contexto: string, mensagem: string, detalhes?: unknown): void {
  console.warn(`[${contexto}]`, mensagem, detalhes ?? "");
  void registrar("warn", contexto, mensagem, detalhes);
}

/** Captura global — chame uma vez, perto da raiz do app (AppShell). */
export function instalarMonitoramentoGlobal(): void {
  if (instalado || typeof window === "undefined") return;
  instalado = true;

  window.addEventListener("error", (evento) => {
    registrarErro("window.onerror", evento.message || "Erro desconhecido", {
      arquivo: evento.filename,
      linha: evento.lineno,
      coluna: evento.colno,
      stack: evento.error?.stack,
    });
  });

  window.addEventListener("unhandledrejection", (evento) => {
    const razao = evento.reason as { message?: string; stack?: string } | undefined;
    registrarErro("unhandledrejection", razao?.message ?? String(razao ?? "rejeição desconhecida"), {
      stack: razao?.stack,
    });
  });
}
