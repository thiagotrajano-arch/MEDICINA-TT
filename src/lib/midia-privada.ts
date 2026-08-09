import type { SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "midia-privada";
const MIME_PERMITIDOS = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const LIMITE_BYTES = 20 * 1024 * 1024;

export type TipoOrigemMidiaPrivada = "pdf_comercial" | "paciente" | "propria_privada";
export type EntradaMidiaPrivada = {
  titulo: string; tipoOrigem: TipoOrigemMidiaPrivada; disciplina: string;
  tema: string; subtema: string; diagnostico: string; modalidade: string;
  fonte: string; pagina: number | null; observacao: string;
  pacienteAnonimizado: boolean; autorizacaoPaciente: boolean;
};
export type MidiaPrivada = EntradaMidiaPrivada & {
  id: string; objectPath: string; criadoEm: string; urlTemporaria: string | null;
  subtemaId: string | null; triagemStatus: "util" | "contextual" | "revisao_pendente" | "nao_util"; triagemMotivo: string;
};
type Registro = {
  id: string; object_path: string; titulo: string; tipo_origem: TipoOrigemMidiaPrivada;
  disciplina: string; tema: string; subtema: string; diagnostico: string;
  modalidade: string; fonte: string; pagina: number | null; observacao: string;
  paciente_anonimizado: boolean; autorizacao_paciente: boolean; criado_em: string;
  subtema_id: string | null; triagem_status: MidiaPrivada["triagemStatus"]; triagem_motivo: string;
};

async function autenticacao(): Promise<{ supabase: SupabaseClient; userId: string }> {
  const { getSupabaseAnon } = await import("@/infra/supabase/client");
  const supabase = getSupabaseAnon();
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session?.user) throw new Error("Entre na sua conta para acessar a biblioteca privada.");
  return { supabase, userId: data.session.user.id };
}

function mapear(r: Registro, urlTemporaria: string | null): MidiaPrivada {
  return { id: r.id, objectPath: r.object_path, titulo: r.titulo, tipoOrigem: r.tipo_origem,
    disciplina: r.disciplina, tema: r.tema, subtema: r.subtema, diagnostico: r.diagnostico,
    modalidade: r.modalidade, fonte: r.fonte, pagina: r.pagina, observacao: r.observacao,
    pacienteAnonimizado: r.paciente_anonimizado, autorizacaoPaciente: r.autorizacao_paciente,
    criadoEm: r.criado_em, urlTemporaria, subtemaId: r.subtema_id,
    triagemStatus: r.triagem_status, triagemMotivo: r.triagem_motivo };
}

export async function carregarMidiaPrivada(): Promise<MidiaPrivada[]> {
  const { supabase, userId } = await autenticacao();
  const { data, error } = await supabase.from("midia_privada_usuario")
    .select("id,object_path,titulo,tipo_origem,disciplina,tema,subtema,diagnostico,modalidade,fonte,pagina,observacao,paciente_anonimizado,autorizacao_paciente,criado_em,subtema_id,triagem_status,triagem_motivo")
    .eq("owner_id", userId).order("criado_em", { ascending: false });
  if (error) throw new Error(`Nao foi possivel carregar a biblioteca privada: ${error.message}`);
  return Promise.all(((data ?? []) as Registro[]).map(async (r) => {
    const assinatura = await supabase.storage.from(BUCKET).createSignedUrl(r.object_path, 300);
    return mapear(r, assinatura.error ? null : assinatura.data.signedUrl);
  }));
}

export function validarArquivoPrivado(arquivo: File, entrada: EntradaMidiaPrivada): string[] {
  const erros: string[] = [];
  if (!entrada.titulo.trim()) erros.push("Informe um titulo.");
  if (!MIME_PERMITIDOS.has(arquivo.type)) erros.push("Use JPG, PNG, WebP ou AVIF.");
  if (arquivo.size > LIMITE_BYTES) erros.push("A imagem deve ter no maximo 20 MB.");
  if (entrada.tipoOrigem === "pdf_comercial" && !entrada.fonte.trim()) erros.push("Registre a origem do PDF comercial.");
  if (entrada.tipoOrigem === "pdf_comercial" && !entrada.pagina) erros.push("Registre a pagina do PDF comercial.");
  if (entrada.tipoOrigem === "paciente" && !entrada.pacienteAnonimizado) erros.push("Confirme que a imagem foi anonimizada.");
  if (entrada.tipoOrigem === "paciente" && !entrada.autorizacaoPaciente) erros.push("Confirme a autorizacao apropriada.");
  return erros;
}

export async function salvarMidiaPrivada(arquivo: File, entrada: EntradaMidiaPrivada): Promise<void> {
  const erros = validarArquivoPrivado(arquivo, entrada);
  if (erros.length) throw new Error(erros.join(" "));
  const { supabase, userId } = await autenticacao();
  const extensao = arquivo.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "img";
  const objectPath = `${userId}/${crypto.randomUUID()}.${extensao}`;
  const upload = await supabase.storage.from(BUCKET).upload(objectPath, arquivo, { contentType: arquivo.type, cacheControl: "300", upsert: false });
  if (upload.error) throw new Error(`Nao foi possivel enviar a imagem privada: ${upload.error.message}`);
  const { error } = await supabase.from("midia_privada_usuario").insert({
    owner_id: userId, object_path: objectPath, titulo: entrada.titulo.trim(), tipo_origem: entrada.tipoOrigem,
    disciplina: entrada.disciplina.trim(), tema: entrada.tema.trim(), subtema: entrada.subtema.trim(),
    diagnostico: entrada.diagnostico.trim(), modalidade: entrada.modalidade.trim(), fonte: entrada.fonte.trim(),
    pagina: entrada.pagina, observacao: entrada.observacao.trim(), paciente_anonimizado: entrada.pacienteAnonimizado,
    autorizacao_paciente: entrada.autorizacaoPaciente,
  });
  if (error) { await supabase.storage.from(BUCKET).remove([objectPath]); throw new Error(`Nao foi possivel registrar a imagem privada: ${error.message}`); }
}

export async function excluirMidiaPrivada(item: Pick<MidiaPrivada, "id" | "objectPath">): Promise<void> {
  const { supabase, userId } = await autenticacao();
  const arquivo = await supabase.storage.from(BUCKET).remove([item.objectPath]);
  if (arquivo.error) throw new Error(`Nao foi possivel remover o arquivo: ${arquivo.error.message}`);
  const { error } = await supabase.from("midia_privada_usuario").delete().eq("owner_id", userId).eq("id", item.id);
  if (error) throw new Error(`O arquivo foi removido, mas o registro precisa de revisao: ${error.message}`);
}
