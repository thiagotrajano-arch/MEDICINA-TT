/**
 * Seed do Supabase a partir do conteúdo estático (taxonomia + resumos + questões).
 *
 *   npx tsx scripts/seed-supabase.mts
 *
 * Idempotente (upserts por chave). Popula o banco para que o app passe a ler do
 * Supabase. O material do usuário entra como resumo_versao(origem=usuario_original,
 * imutavel=true) — nunca sobrescrito depois. Requer SUPABASE_SERVICE_ROLE_KEY.
 */
import { loadEnv } from "./load-env.mjs";
import { DISCIPLINAS } from "../src/content/taxonomy";
import { CONTEUDOS } from "../src/content/conteudos";
import { QUESTOES } from "../src/content/questoes";
import { getSupabaseAdmin, isSupabaseConfigured } from "../src/infra/supabase/client";

loadEnv();

async function main() {
  if (!isSupabaseConfigured()) {
    console.log("[seed] Supabase não configurado — defina .env.local. Abortando.");
    return;
  }
  const db = getSupabaseAdmin();

  // 1) Taxonomia
  for (const [di, d] of DISCIPLINAS.entries()) {
    await upsert(db, "disciplina", {
      id: d.id, slug: d.slug, nome: d.nome, grupo: d.grupo,
      marca: d.marca, omed: d.omed ?? false, ordem: di,
    });
    for (const [ti, t] of d.temas.entries()) {
      await upsert(db, "tema", {
        id: t.id, disciplina_id: d.id, slug: t.slug, nome: t.nome, ordem: ti,
      });
      for (const [si, s] of t.subtemas.entries()) {
        await upsert(db, "subtema", {
          id: s.id, tema_id: t.id, slug: s.slug, nome: s.nome,
          dificuldade: s.dificuldade, tem_conteudo: s.temConteudo,
          alto_rendimento: s.altoRendimento ?? false, ordem: si,
        });
      }
    }
  }
  console.log(`[seed] taxonomia: ${DISCIPLINAS.length} disciplinas.`);

  // 2) Conteúdo (resumo → versão atual → blocos)
  for (const c of Object.values(CONTEUDOS)) {
    const resumo = await upsertReturning(db, "resumo",
      { subtema_id: c.subtemaId, tipo: "completo", titulo: c.titulo },
      "subtema_id,tipo");
    // desmarca versões anteriores como não-atuais
    check(
      await db.from("resumo_versao").update({ is_atual: false }).eq("resumo_id", resumo.id),
      "resumo_versao.update(is_atual)"
    );
    const versao = await upsertReturning(db, "resumo_versao",
      {
        resumo_id: resumo.id, numero: 1, titulo: c.titulo, origem: c.origem,
        referencias: c.referencias, imutavel: c.origem === "usuario_original",
        is_atual: true,
      },
      "resumo_id,numero");
    check(
      await db.from("bloco_conteudo").delete().eq("versao_id", versao.id),
      "bloco_conteudo.delete"
    );
    check(
      await db.from("bloco_conteudo").insert(
        c.blocos.map((b, i) => ({
          versao_id: versao.id, secao: b.secao, corpo_mdx: b.corpo, ordem: i,
          figura: b.figura ?? null,
        }))
      ),
      `bloco_conteudo.insert (${c.titulo})`
    );
  }
  console.log(`[seed] conteúdo: ${Object.keys(CONTEUDOS).length} resumos.`);

  // 3) Questões + alternativas
  for (const q of QUESTOES) {
    await upsert(db, "questao", {
      id: q.id, subtema_id: q.subtemaId, disciplina_id: q.disciplinaId,
      enunciado: q.enunciado, estilo: q.estilo, dificuldade: q.dificuldade,
      tags: q.tags, fonte: q.fonte ?? null, status: "publicada",
    });
    check(
      await db.from("alternativa").delete().eq("questao_id", q.id),
      "alternativa.delete"
    );
    check(
      await db.from("alternativa").insert(
        q.alternativas.map((a, i) => ({
          questao_id: q.id, letra: a.letra, texto: a.texto,
          correta: a.correta, comentario: a.comentario, ordem: i,
        }))
      ),
      `alternativa.insert (${q.id})`
    );
  }
  console.log(`[seed] questões: ${QUESTOES.length}.`);
  console.log("[seed] concluído.");
}

/**
 * Falha alto em qualquer erro do Supabase.
 * Sem isto, um insert rejeitado (ex.: coluna inexistente) passa despercebido e
 * o seed reporta "concluído" tendo gravado dados pela metade.
 */
function check(res: { error: { message: string } | null }, contexto: string) {
  if (res.error) throw new Error(`${contexto}: ${res.error.message}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function upsert(db: any, table: string, row: Record<string, unknown>) {
  const { error } = await db.from(table).upsert(row, { onConflict: "id" });
  if (error) throw new Error(`${table}: ${error.message}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function upsertReturning(
  db: any, table: string, row: Record<string, unknown>, onConflict: string
) {
  const { data, error } = await db
    .from(table).upsert(row, { onConflict }).select("id").single();
  if (error) throw new Error(`${table}: ${error.message}`);
  return data as { id: string };
}

main().catch((e) => {
  console.error("[seed] erro:", e);
  process.exit(1);
});
