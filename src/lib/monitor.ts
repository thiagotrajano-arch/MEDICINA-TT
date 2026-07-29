"use client";

import { isSupabaseConfigured } from "@/infra/supabase/config";

/**
 * Monitoramento real de erro do cliente, sem depender de conta em serviço
 * terceiro (Sentry etc.) — grava em client_error_log (Supabase, já
 * configurado) além de logar no console. Nunca lança: uma falha aqui não
 * pode derrubar o app que está tentando monitorar.
 */

let instalado = false;
let eventosEnviados = 0;
const LIMITE_DE_EVENTOS_POR_CARREGAMENTO = 12;

function resumirMensagem(mensagem: string): string {
  const texto = String(mensagem).toLocaleLowerCase("pt-BR");
  if (texto.includes("timeout") || texto.includes("timed out")) return "Tempo limite excedido";
  if (texto.includes("network") || texto.includes("fetch") || texto.includes("conex")) return "Falha de rede";
  if (texto.includes("permission") || texto.includes("not authorized") || texto.includes("rls")) return "Falha de autorização";
  return "Falha operacional no cliente";
}

function detalhesSanitizados(detalhes: unknown): Record<string, string | number> | null {
  if (!detalhes || typeof detalhes !== "object") return null;
  const origem = detalhes as Record<string, unknown>;
  const seguro: Record<string, string | number> = {};
  if (typeof origem.codigo === "string") seguro.codigo = origem.codigo.slice(0, 80);
  if (typeof origem.status === "number" && Number.isFinite(origem.status)) seguro.status = origem.status;
  if (typeof origem.tipo === "string") seguro.tipo = origem.tipo.slice(0, 80);
  return Object.keys(seguro).length ? seguro : null;
}

async function registrar(
  nivel: "error" | "warn",
  contexto: string,
  mensagem: string,
  detalhes?: unknown
): Promise<void> {
  if (!isSupabaseConfigured() || eventosEnviados >= LIMITE_DE_EVENTOS_POR_CARREGAMENTO) return;
  try {
    const { getSupabaseAnon } = await import("@/infra/supabase/client");
    const supabase = getSupabaseAnon();
    const sessao = await supabase.auth.getSession();
    const ownerId = sessao.data.session?.user?.id;
    if (!ownerId) return;
    eventosEnviados++;
    await supabase.from("client_error_log").insert({
      nivel,
      contexto: contexto.slice(0, 120),
      mensagem: resumirMensagem(mensagem),
      detalhes: detalhesSanitizados(detalhes),
      pagina: typeof window !== "undefined" ? window.location.pathname : null,
      owner_id: ownerId,
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
      tipo: "erro-global",
    });
  });

  window.addEventListener("unhandledrejection", (evento) => {
    const razao = evento.reason as { message?: string } | undefined;
    registrarErro("unhandledrejection", razao?.message ?? String(razao ?? "rejeição desconhecida"), {
      tipo: "promessa-rejeitada",
    });
  });
}
