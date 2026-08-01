import type { SupabaseClient } from "@supabase/supabase-js";

export type MaterialPrivado = {
  id: string;
  titulo: string;
  tipoArquivo: "pdf" | "docx" | "markdown" | "imagem" | "outro";
  origem: "drive" | "local" | "obsidian" | "manual";
  disciplina: string;
  tema: string;
  subtema: string;
  semestre: number | null;
  prioridade: "alta" | "media" | "baixa";
  estado: "inventariado" | "lido" | "catalogado" | "validacao" | "integrado" | "bloqueado";
  destino: "privado" | "sintese_autoral" | "publico_licenciado" | "nao_publicar";
  fonte: string;
  tamanhoBytes: number | null;
  paginas: number | null;
  hashSha256: string | null;
  observacao: string;
  atualizadoEm: string;
};

type Registro = {
  id: string;
  titulo: string;
  tipo_arquivo: MaterialPrivado["tipoArquivo"];
  origem: MaterialPrivado["origem"];
  disciplina: string;
  tema: string;
  subtema: string;
  semestre: number | null;
  prioridade: MaterialPrivado["prioridade"];
  estado: MaterialPrivado["estado"];
  destino: MaterialPrivado["destino"];
  fonte: string;
  tamanho_bytes: number | null;
  paginas: number | null;
  hash_sha256: string | null;
  observacao: string;
  atualizado_em: string;
};

async function autenticacao(): Promise<{ supabase: SupabaseClient; userId: string }> {
  const { getSupabaseAnon } = await import("@/infra/supabase/client");
  const supabase = getSupabaseAnon();
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session?.user) throw new Error("Entre na sua conta para acessar o catalogo privado.");
  return { supabase, userId: data.session.user.id };
}

function mapear(registro: Registro): MaterialPrivado {
  return {
    id: registro.id,
    titulo: registro.titulo,
    tipoArquivo: registro.tipo_arquivo,
    origem: registro.origem,
    disciplina: registro.disciplina,
    tema: registro.tema,
    subtema: registro.subtema,
    semestre: registro.semestre,
    prioridade: registro.prioridade,
    estado: registro.estado,
    destino: registro.destino,
    fonte: registro.fonte,
    tamanhoBytes: registro.tamanho_bytes,
    paginas: registro.paginas,
    hashSha256: registro.hash_sha256,
    observacao: registro.observacao,
    atualizadoEm: registro.atualizado_em,
  };
}

export async function carregarMateriaisPrivados(): Promise<MaterialPrivado[]> {
  const { supabase, userId } = await autenticacao();
  const registros: Registro[] = [];
  const tamanhoPagina = 500;
  let inicio = 0;
  let total: number | null = null;

  do {
    const { data, error, count } = await supabase
      .from("material_privado_usuario")
      .select("id,titulo,tipo_arquivo,origem,disciplina,tema,subtema,semestre,prioridade,estado,destino,fonte,tamanho_bytes,paginas,hash_sha256,observacao,atualizado_em", { count: "exact" })
      .eq("owner_id", userId)
      .order("atualizado_em", { ascending: false })
      .order("id", { ascending: true })
      .range(inicio, inicio + tamanhoPagina - 1);
    if (error) throw new Error(`Nao foi possivel carregar o catalogo privado: ${error.message}`);
    const pagina = (data ?? []) as Registro[];
    registros.push(...pagina);
    total ??= count;
    inicio += pagina.length;
    if (!pagina.length || (total !== null && inicio >= total)) break;
  } while (true);

  return registros.map(mapear);
}
