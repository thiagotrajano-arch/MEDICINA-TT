import { createClient } from "@supabase/supabase-js";
import { loadEnv } from "./load-env.mjs";

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !anonKey) throw new Error("Configuração pública do Supabase ausente.");

const supabase = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const tabelasPrivadas = [
  "tarefa_estudo_usuario",
  "progresso_conteudo",
  "resposta_usuario",
  "simulado_resultado",
] as const;

let falhas = 0;
for (const tabela of tabelasPrivadas) {
  const resultado = await supabase.from(tabela).select("*").limit(1);
  const protegido = resultado.error !== null || (resultado.data ?? []).length === 0;
  console.log(JSON.stringify({ tabela, status: resultado.status, linhasVisiveis: resultado.data?.length ?? 0, protegido }));
  if (!protegido) falhas += 1;
}

if (falhas) {
  console.error(`[audit:anon-surface] falhou: ${falhas} tabela(s) privada(s) exposta(s) para anon.`);
  process.exitCode = 1;
} else {
  console.log("[audit:anon-surface] aprovado: nenhuma linha privada visível sem sessão.");
}
