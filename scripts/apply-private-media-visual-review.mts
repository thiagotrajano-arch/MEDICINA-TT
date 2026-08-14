/**
 * Aplica a decisÃ£o de revisÃ£o visual feita a partir do contato local do acervo
 * privado. NÃ£o altera objetos no storage, nÃ£o publica mÃ­dia e nÃ£o inventa
 * diagnÃ³sticos: somente atualiza o status e o motivo de triagem do proprietÃ¡rio.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { loadEnv } from "./load-env.mjs";
import { getSupabaseAdmin } from "../src/infra/supabase/client";

loadEnv();

type Row = { id: string; owner_id: string; object_path: string; triagem_status: string; triagem_motivo: string; disciplina: string; tema: string; subtema: string };
type Catalogo = { rows: Array<Row & { local_path?: string }> };

const args = process.argv.slice(2);
const flag = (nome: string) => { const i = args.indexOf(nome); return i >= 0 ? args[i + 1] : undefined; };
const catalogPath = resolve(flag("--catalog") ?? "C:/Users/Adm/Desktop/MEDICINA/_media-review/20260814-visual-validation/catalogo.json");
const decisionsPath = resolve(flag("--decisions") ?? `${dirname(catalogPath)}/decisions-visual-20260814.json`);
const backupPath = resolve(flag("--backup") ?? `${dirname(catalogPath)}/catalogo-before-visual-review-20260814.json`);

function parseIndexes(value: string | undefined): Set<number> {
  const out = new Set<number>();
  for (const piece of (value ?? "").split(",")) {
    const [a, b] = piece.split("-").map((v) => Number(v.trim()));
    if (!Number.isFinite(a)) continue;
    const end = Number.isFinite(b) ? b : a;
    for (let i = a; i <= end; i += 1) out.add(i);
  }
  return out;
}

const groups: Array<{ status: "util" | "contextual" | "nao_util"; indexes: Set<number>; motivo: string }> = [
  { status: "util", indexes: parseIndexes(flag("--util")), motivo: "RevisÃ£o visual concluÃ­da: imagem/diagrama clÃ­nico legÃ­vel e ancorÃ¡vel ao tema e Ã  pÃ¡gina de origem; manter exclusivamente na biblioteca privada." },
  { status: "contextual", indexes: parseIndexes(flag("--contextual")), motivo: "RevisÃ£o visual concluÃ­da: material didÃ¡tico/captura ou ilustraÃ§Ã£o que exige o contexto da fonte; nÃ£o usar como achado clÃ­nico isolado." },
  { status: "nao_util", indexes: parseIndexes(flag("--nao-util")), motivo: "RevisÃ£o visual concluÃ­da: logo, capa, pÃ¡gina vazia ou arte sem valor clÃ­nico autÃ´nomo; preservar o registro, mas nÃ£o usar no estudo." },
];

async function main() {
  const local = JSON.parse(await readFile(catalogPath, "utf8")) as Catalogo;
  if (!Array.isArray(local.rows) || local.rows.length === 0) throw new Error("CatÃ¡logo local vazio.");
  const selecionadas = new Map<number, { status: "util" | "contextual" | "nao_util"; motivo: string }>();
  for (const group of groups) for (const index of group.indexes) {
    if (index < 1 || index > local.rows.length) throw new Error(`Ãndice fora do catÃ¡logo: ${index}`);
    if (selecionadas.has(index)) throw new Error(`Ãndice classificado duas vezes: ${index}`);
    selecionadas.set(index, { status: group.status, motivo: group.motivo });
  }
  if (selecionadas.size === 0) throw new Error("Nenhuma decisÃ£o fornecida.");

  const db = getSupabaseAdmin();
  const { data: atual, error: erroAtual } = await db.from("midia_privada_usuario")
    .select("id,owner_id,object_path,triagem_status,triagem_motivo,disciplina,tema,subtema")
    .limit(10000) as { data: Row[] | null; error: { message: string } | null };
  if (erroAtual) throw new Error(`catÃ¡logo remoto: ${erroAtual.message}`);
  const remoto = atual ?? [];
  const owner = remoto[0]?.owner_id;
  if (!owner) throw new Error("Nenhum proprietÃ¡rio encontrado.");
  if (remoto.some((r) => r.owner_id !== owner)) throw new Error("Mais de um proprietÃ¡rio no catÃ¡logo; abortado.");
  const porId = new Map(remoto.map((r) => [r.id, r]));
  const decisoes = [...selecionadas.entries()].map(([index, decision]) => {
    const row = local.rows[index - 1];
    const current = porId.get(row.id);
    if (!current) throw new Error(`Registro local nÃ£o encontrado no catÃ¡logo remoto: Ã­ndice ${index}`);
    return { index, id: row.id, object_path: current.object_path, disciplina: current.disciplina, tema: current.tema, subtema: current.subtema, ...decision };
  });

  await mkdir(dirname(backupPath), { recursive: true });
  await writeFile(backupPath, JSON.stringify({ generatedAt: new Date().toISOString(), rows: remoto }, null, 2), "utf8");
  await writeFile(decisionsPath, JSON.stringify({ generatedAt: new Date().toISOString(), catalogPath, owner, decisions: decisoes }, null, 2), "utf8");

  let atualizados = 0;
  for (const group of groups) {
    const ids = decisoes.filter((d) => d.status === group.status).map((d) => d.id);
    if (ids.length === 0) continue;
    const { error } = await db.from("midia_privada_usuario").update({ triagem_status: group.status, triagem_motivo: group.motivo }).eq("owner_id", owner).in("id", ids);
    if (error) throw new Error(`atualizaÃ§Ã£o ${group.status}: ${error.message}`);
    atualizados += ids.length;
  }

  const { data: verificado, error: erroVerificacao } = await db.from("midia_privada_usuario").select("id,triagem_status").eq("owner_id", owner).in("id", decisoes.map((d) => d.id));
  if (erroVerificacao) throw new Error(`verificaÃ§Ã£o: ${erroVerificacao.message}`);
  const divergentes = (verificado ?? []).filter((r) => r.triagem_status !== decisoes.find((d) => d.id === r.id)?.status);
  if (divergentes.length) throw new Error(`VerificaÃ§Ã£o encontrou ${divergentes.length} divergÃªncia(s).`);

  console.log(JSON.stringify({ catalogPath, decisionsPath, backupPath, selecionadas: decisoes.length, atualizados, porStatus: Object.fromEntries(groups.map((g) => [g.status, decisoes.filter((d) => d.status === g.status).length])) }, null, 2));
}

main().catch((erro) => { console.error(`[revisao-visual] ${erro instanceof Error ? erro.message : String(erro)}`); process.exitCode = 1; });
