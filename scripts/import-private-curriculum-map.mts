/**
 * Valida e importa o mapa curricular granular privado.
 *
 * O manifesto deve ficar fora do Git. Sem --apply, nenhuma conexão ou gravação
 * é feita. A importação é aditiva e preserva estado, dificuldade e revisões.
 *
 * Uso:
 *   npm exec -- tsx scripts/import-private-curriculum-map.mts --manifest <arquivo.json>
 *   npm exec -- tsx scripts/import-private-curriculum-map.mts --manifest <arquivo.json> --apply
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { loadEnv } from "./load-env.mjs";
import { getSupabaseAdmin } from "../src/infra/supabase/client";
import { DISCIPLINAS } from "../src/content/taxonomy";
import { CONTEUDOS } from "../src/content/conteudos";
import { QUESTOES } from "../src/content/questoes";

loadEnv();

type Evidencia = "confirmado" | "parcial" | "ausente";
type Categoria = "bbpm" | "hcpm" | "aps" | "cirurgia" | "urgencia" | "outro";
type Situacao = "planejada" | "cursando" | "concluida" | "revisar";
type TipoModulo = "modulo" | "aula" | "tutoria" | "pratica" | "conferencia" | "osce" | "eixo";
type PrioridadeOmed = "alta" | "media" | "baixa" | "nao_classificado";
type TipoRecursoPrivado = "caso" | "mapa" | "midia" | "material_privado";
type EstadoRecurso = "sugerido" | "confirmado" | "rejeitado";

type RecursoManifesto = {
  type: TipoRecursoPrivado;
  id: string;
  state?: EstadoRecurso;
};

type SubtemaManifesto = {
  order: number;
  title: string;
  objective?: string;
  publicDisciplineId?: string;
  publicSubthemeId?: string;
  evidenceStatus: Evidencia;
  omedPriority?: PrioridadeOmed;
  imageModalities?: string[];
  questionSources?: string[];
  /** Vínculos privados explícitos; nunca inferir IDs de mídia/material por texto. */
  resources?: RecursoManifesto[];
};

type ModuloManifesto = {
  order: number;
  type: TipoModulo;
  title: string;
  evidenceStatus: Evidencia;
  sourceLocation?: string;
  topics: SubtemaManifesto[];
};

type ComponenteManifesto = {
  code: string;
  name: string;
  period?: number | null;
  category: Categoria;
  status?: Situacao;
  evidenceStatus: Evidencia;
  sourceLabel?: string;
  note?: string;
  modules: ModuloManifesto[];
};

type Manifesto = {
  schemaVersion: 1;
  visibility: "private";
  publicRepositoryAllowed: false;
  generatedAt: string;
  components: ComponenteManifesto[];
};

const aplicar = process.argv.includes("--apply");
const indiceManifesto = process.argv.indexOf("--manifest");
const manifestoArg = indiceManifesto >= 0 ? process.argv[indiceManifesto + 1] : null;
if (!manifestoArg) throw new Error("Informe --manifest com o mapa curricular privado.");

const arquivo = path.resolve(manifestoArg);
const manifesto = JSON.parse(readFileSync(arquivo, "utf8")) as Manifesto;
const categorias = new Set<Categoria>(["bbpm", "hcpm", "aps", "cirurgia", "urgencia", "outro"]);
const situacoes = new Set<Situacao>(["planejada", "cursando", "concluida", "revisar"]);
const evidencias = new Set<Evidencia>(["confirmado", "parcial", "ausente"]);
const tipos = new Set<TipoModulo>(["modulo", "aula", "tutoria", "pratica", "conferencia", "osce", "eixo"]);
const prioridades = new Set<PrioridadeOmed>(["alta", "media", "baixa", "nao_classificado"]);
const tiposRecursoPrivado = new Set<TipoRecursoPrivado>(["caso", "mapa", "midia", "material_privado"]);
const estadosRecurso = new Set<EstadoRecurso>(["sugerido", "confirmado", "rejeitado"]);
const subtemasPublicos = new Map(DISCIPLINAS.flatMap((disciplina) => disciplina.temas.flatMap((tema) => tema.subtemas.map((subtema) => [subtema.id, disciplina.id] as const))));
const questoesPorSubtema = new Map<string, number>();
for (const questao of QUESTOES) questoesPorSubtema.set(questao.subtemaId, (questoesPorSubtema.get(questao.subtemaId) ?? 0) + 1);

function texto(valor: string | undefined, maximo: number, rotulo: string, obrigatorio = false): string {
  const limpo = (valor ?? "").trim();
  if (obrigatorio && !limpo) throw new Error(`${rotulo} vazio.`);
  if (limpo.length > maximo) throw new Error(`${rotulo} excede ${maximo} caracteres.`);
  return limpo;
}

function validar(): { modulos: number; subtemas: number; links: number; lacunas: number; resumosDisponiveis: number; bancosDisponiveis: number; recursosPrivadosDeclarados: number } {
  if (manifesto.schemaVersion !== 1 || manifesto.visibility !== "private" || manifesto.publicRepositoryAllowed !== false) {
    throw new Error("O manifesto deve ser schemaVersion 1, privado e proibido no repositório público.");
  }
  if (!Array.isArray(manifesto.components) || !manifesto.components.length) throw new Error("Nenhum componente curricular encontrado.");
  const codigos = new Set<string>();
  let modulos = 0;
  let subtemas = 0;
  let links = 0;
  let lacunas = 0;
  let resumosDisponiveis = 0;
  let bancosDisponiveis = 0;
  let recursosPrivadosDeclarados = 0;
  for (const componente of manifesto.components) {
    const codigo = texto(componente.code, 64, "Código", true);
    texto(componente.name, 180, `Nome de ${codigo}`, true);
    if (codigos.has(codigo)) throw new Error(`Componente duplicado: ${codigo}.`);
    codigos.add(codigo);
    if (!categorias.has(componente.category) || !situacoes.has(componente.status ?? "concluida") || !evidencias.has(componente.evidenceStatus)) throw new Error(`Classificação inválida em ${codigo}.`);
    if (componente.period != null && (!Number.isInteger(componente.period) || componente.period < 1 || componente.period > 12)) throw new Error(`Período inválido em ${codigo}.`);
    texto(componente.sourceLabel, 240, `Fonte de ${codigo}`);
    texto(componente.note, 2000, `Observação de ${codigo}`);
    const chavesModulo = new Set<string>();
    for (const modulo of componente.modules) {
      modulos += 1;
      if (!Number.isInteger(modulo.order) || modulo.order < 1 || modulo.order > 500) throw new Error(`Ordem de módulo inválida em ${codigo}.`);
      if (!tipos.has(modulo.type) || !evidencias.has(modulo.evidenceStatus)) throw new Error(`Módulo inválido em ${codigo}.`);
      const tituloModulo = texto(modulo.title, 240, `Módulo de ${codigo}`, true);
      const chaveModulo = `${modulo.order}|${tituloModulo}`;
      if (chavesModulo.has(chaveModulo)) throw new Error(`Módulo duplicado em ${codigo}: ${tituloModulo}.`);
      chavesModulo.add(chaveModulo);
      texto(modulo.sourceLocation, 500, `Localização de ${codigo}`);
      const chavesTopico = new Set<string>();
      for (const topico of modulo.topics) {
        subtemas += 1;
        if (!Number.isInteger(topico.order) || topico.order < 1 || topico.order > 1000) throw new Error(`Ordem de subtema inválida em ${codigo}.`);
        const titulo = texto(topico.title, 300, `Subtema de ${codigo}`, true);
        const chave = `${topico.order}|${titulo}`;
        if (chavesTopico.has(chave)) throw new Error(`Subtema duplicado em ${codigo}/${tituloModulo}: ${titulo}.`);
        chavesTopico.add(chave);
        texto(topico.objective, 1200, `Objetivo de ${titulo}`);
        texto(topico.publicDisciplineId, 160, `Disciplina pública de ${titulo}`);
        texto(topico.publicSubthemeId, 180, `Subtema público de ${titulo}`);
        if (!evidencias.has(topico.evidenceStatus) || !prioridades.has(topico.omedPriority ?? "nao_classificado")) throw new Error(`Classificação inválida no subtema ${titulo}.`);
        const chavesRecurso = new Set<string>();
        for (const recurso of topico.resources ?? []) {
          if (!tiposRecursoPrivado.has(recurso.type) || !estadosRecurso.has(recurso.state ?? "sugerido")) throw new Error(`Recurso privado inválido em ${codigo}/${titulo}.`);
          const recursoId = texto(recurso.id, 240, `ID do recurso de ${titulo}`, true);
          const chaveRecurso = `${recurso.type}|${recursoId}`;
          if (chavesRecurso.has(chaveRecurso)) throw new Error(`Recurso privado duplicado em ${codigo}/${titulo}.`);
          chavesRecurso.add(chaveRecurso);
          recursosPrivadosDeclarados += 1;
        }
        if (topico.publicSubthemeId) {
          if (!topico.publicDisciplineId) throw new Error(`Subtema público sem disciplina em ${codigo}/${titulo}.`);
          const disciplinaReal = subtemasPublicos.get(topico.publicSubthemeId);
          if (!disciplinaReal) throw new Error(`Subtema público inexistente em ${codigo}/${titulo}: ${topico.publicSubthemeId}.`);
          if (disciplinaReal !== topico.publicDisciplineId) throw new Error(`Disciplina pública incompatível em ${codigo}/${titulo}: esperado ${disciplinaReal}.`);
          links += 1;
          if (CONTEUDOS[topico.publicSubthemeId]) resumosDisponiveis += 1;
          if ((questoesPorSubtema.get(topico.publicSubthemeId) ?? 0) > 0) bancosDisponiveis += 1;
        } else {
          if (topico.publicDisciplineId) throw new Error(`Disciplina pública sem subtema em ${codigo}/${titulo}.`);
          lacunas += 1;
        }
      }
    }
  }
  return { modulos, subtemas, links, lacunas, resumosDisponiveis, bancosDisponiveis, recursosPrivadosDeclarados };
}

async function descobrirOwner(db: ReturnType<typeof getSupabaseAdmin>): Promise<string> {
  const { data, error } = await db.from("curso_disciplina_usuario").select("owner_id").limit(1000);
  if (error) throw new Error(`Conta privada: ${error.message}`);
  const owners = [...new Set((data ?? []).map((item) => item.owner_id as string).filter(Boolean))];
  if (owners.length !== 1) throw new Error("Não foi possível identificar uma única conta proprietária.");
  return owners[0];
}

async function main(): Promise<void> {
  const totais = validar();
  if (!aplicar) {
    console.log(JSON.stringify({ aplicar: false, componentes: manifesto.components.length, ...totais, mensagem: "Manifesto válido; nenhuma gravação realizada." }, null, 2));
    return;
  }

  const db = getSupabaseAdmin();
  const owner = await descobrirOwner(db);
  const agora = new Date().toISOString();
  let recursos = 0;

  for (const componente of manifesto.components) {
    const { data: componenteRemoto, error: componenteErro } = await db.from("curriculo_componente_usuario").upsert({
      owner_id: owner,
      codigo: componente.code.trim(),
      nome: componente.name.trim(),
      periodo: componente.period ?? null,
      categoria: componente.category,
      situacao: componente.status ?? "concluida",
      evidencia_status: componente.evidenceStatus,
      fonte_rotulo: (componente.sourceLabel ?? "").trim(),
      observacao: (componente.note ?? "").trim(),
      atualizado_em: agora,
    }, { onConflict: "owner_id,codigo" }).select("id").single();
    if (componenteErro) throw new Error(`Componente ${componente.code}: ${componenteErro.message}`);

    for (const modulo of componente.modules) {
      const { data: moduloRemoto, error: moduloErro } = await db.from("curriculo_modulo_usuario").upsert({
        owner_id: owner,
        componente_id: componenteRemoto.id,
        ordem: modulo.order,
        tipo: modulo.type,
        titulo: modulo.title.trim(),
        evidencia_status: modulo.evidenceStatus,
        fonte_localizacao: (modulo.sourceLocation ?? "").trim(),
        atualizado_em: agora,
      }, { onConflict: "owner_id,componente_id,ordem,titulo" }).select("id").single();
      if (moduloErro) throw new Error(`Módulo ${componente.code}/${modulo.title}: ${moduloErro.message}`);

      for (const topico of modulo.topics) {
        const { data: topicoRemoto, error: topicoErro } = await db.from("curriculo_subtema_usuario").upsert({
          owner_id: owner,
          modulo_id: moduloRemoto.id,
          ordem: topico.order,
          titulo: topico.title.trim(),
          objetivo: (topico.objective ?? "").trim(),
          disciplina_publica_id: (topico.publicDisciplineId ?? "").trim(),
          subtema_publico_id: (topico.publicSubthemeId ?? "").trim(),
          evidencia_status: topico.evidenceStatus,
          prioridade_omed: topico.omedPriority ?? "nao_classificado",
          modalidades_imagem: topico.imageModalities ?? [],
          fontes_questoes: topico.questionSources ?? [],
          atualizado_em: agora,
        }, { onConflict: "owner_id,modulo_id,ordem,titulo" }).select("id").single();
        if (topicoErro) throw new Error(`Subtema ${componente.code}/${topico.title}: ${topicoErro.message}`);

        const vinculos: Array<{ owner_id: string; subtema_id: string; recurso_tipo: "resumo" | "questao" | TipoRecursoPrivado; recurso_id: string; estado: EstadoRecurso; atualizado_em: string }> = [];
        if (topico.publicSubthemeId) {
          const subtemaPublicoId = topico.publicSubthemeId.trim();
          if (!subtemaPublicoId) throw new Error(`Subtema público vazio em ${componente.code}/${topico.title}.`);
          const tiposDisponiveis: Array<"resumo" | "questao"> = [];
          if (CONTEUDOS[subtemaPublicoId]) tiposDisponiveis.push("resumo");
          if ((questoesPorSubtema.get(subtemaPublicoId) ?? 0) > 0) tiposDisponiveis.push("questao");
          vinculos.push(...tiposDisponiveis.map((tipo) => ({
            owner_id: owner,
            subtema_id: topicoRemoto.id,
            recurso_tipo: tipo,
            recurso_id: subtemaPublicoId,
            estado: "sugerido" as const,
            atualizado_em: agora,
          })));
        }
        vinculos.push(...(topico.resources ?? []).map((recurso) => ({
          owner_id: owner,
          subtema_id: topicoRemoto.id,
          recurso_tipo: recurso.type,
          recurso_id: recurso.id.trim(),
          estado: recurso.state ?? "sugerido",
          atualizado_em: agora,
        })));
        if (vinculos.length) {
          const { error: recursoErro } = await db.from("curriculo_recurso_usuario").upsert(vinculos, { onConflict: "owner_id,subtema_id,recurso_tipo,recurso_id" });
          if (recursoErro) throw new Error(`Vínculo ${componente.code}/${topico.title}: ${recursoErro.message}`);
          recursos += vinculos.length;
        }
      }
    }
  }

  console.log(JSON.stringify({ aplicar: true, componentes: manifesto.components.length, ...totais, recursos, dadosPessoaisExpostos: false, progressoPreservado: true }, null, 2));
}

main().catch((erro) => {
  console.error(`[curriculo-granular] ${erro instanceof Error ? erro.message : String(erro)}`);
  process.exitCode = 1;
});
