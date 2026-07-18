import { getSupabaseAnon } from "@/infra/supabase/client";
import { CASOS } from "@/content/casos";
import type {
  BlocoConteudo,
  CasoClinico,
  ConteudoSubtema,
  Dificuldade,
  Disciplina,
  EstiloQuestao,
  GrupoDisciplina,
  Questao,
  Subtema,
  Tema,
} from "@/domain/content/types";
import type {
  ContentRepository,
  QuestaoFiltro,
  SearchHit,
  Stats,
  SubtemaLocalizado,
} from "@/application/ports/content-repository";

/**
 * SupabaseContentRepository — reads the knowledge tree from Postgres (Supabase).
 *
 * Mirrors StaticContentRepository's contract exactly. Content is read from the
 * append-only versioning model: the *current* version of each resumo
 * (resumo_versao.is_atual) and its ordered blocos_conteudo. The user's original
 * material is never overwritten — only newer versions are added.
 */
export class SupabaseContentRepository implements ContentRepository {
  private db = getSupabaseAnon();

  async getDisciplinas(): Promise<Disciplina[]> {
    const { data, error } = await this.db
      .from("disciplina")
      .select(
        "id, slug, nome, grupo, marca, omed, ordem, tema:tema(id, slug, nome, disciplina_id, ordem, subtema:subtema(id, slug, nome, tema_id, dificuldade, tem_conteudo, alto_rendimento, ordem))"
      )
      .order("ordem", { ascending: true });
    if (error) throw error;
    return (data ?? []).map(mapDisciplina);
  }

  async getGrupos(): Promise<GrupoDisciplina[]> {
    const disciplinas = await this.getDisciplinas();
    const ordem: GrupoDisciplina[] = [
      "Materno-Infantil",
      "Clínica Médica",
      "Cirurgia",
      "Psiquiatria & Diagnóstico",
      "Ciências Básicas",
      "Saúde Coletiva & Emergência",
    ];
    const presentes = new Set(disciplinas.map((d) => d.grupo));
    return ordem.filter((g) => presentes.has(g));
  }

  async getDisciplina(slug: string): Promise<Disciplina | undefined> {
    return (await this.getDisciplinas()).find((d) => d.slug === slug);
  }

  async getDisciplinaById(id: string): Promise<Disciplina | undefined> {
    return (await this.getDisciplinas()).find((d) => d.id === id);
  }

  async getSubtemaById(id: string): Promise<SubtemaLocalizado | undefined> {
    for (const disciplina of await this.getDisciplinas()) {
      for (const tema of disciplina.temas) {
        const subtema = tema.subtemas.find((s) => s.id === id);
        if (subtema) return { subtema, tema, disciplina };
      }
    }
    return undefined;
  }

  async getConteudo(subtemaId: string): Promise<ConteudoSubtema | undefined> {
    const { data, error } = await this.db
      .from("resumo_versao")
      .select(
        "id, origem, criado_em, referencias, titulo, resumo:resumo!inner(subtema_id), bloco:bloco_conteudo(secao, corpo_mdx, ordem, figura)"
      )
      .eq("is_atual", true)
      .eq("resumo.subtema_id", subtemaId)
      .maybeSingle();
    if (error) throw error;
    if (!data) return undefined;

    const blocos: BlocoConteudo[] = ((data.bloco as BlocoRow[]) ?? [])
      .sort((a, b) => a.ordem - b.ordem)
      .map((b) => ({
        secao: b.secao,
        corpo: b.corpo_mdx,
        // Várias figuras são gravadas separadas por vírgula (ver seed).
        figura: b.figura
          ? b.figura.includes(",")
            ? b.figura.split(",").map((f) => f.trim()).filter(Boolean)
            : b.figura
          : undefined,
      }));

    return {
      subtemaId,
      titulo: data.titulo ?? "",
      atualizadoEm: (data.criado_em ?? "").slice(0, 10),
      origem: data.origem as ConteudoSubtema["origem"],
      blocos,
      referencias: data.referencias ?? [],
    };
  }

  async getQuestoes(filtro?: QuestaoFiltro): Promise<Questao[]> {
    let query = this.db
      .from("questao")
      .select(
        "id, subtema_id, disciplina_id, enunciado, estilo, dificuldade, tags, fonte, alternativa:alternativa(letra, texto, correta, comentario, ordem)"
      );
    if (filtro?.disciplinaId) query = query.eq("disciplina_id", filtro.disciplinaId);
    if (filtro?.subtemaId) query = query.eq("subtema_id", filtro.subtemaId);
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map(mapQuestao);
  }

  /**
   * Casos clínicos ainda vivem no código, não no banco: o schema atual
   * (caso_clinico/caso_secao) não modela as etapas com pergunta→resposta que a
   * tela usa. Servir daqui mantém os dois backends equivalentes; quando o
   * schema acompanhar, só esta implementação muda.
   */
  async getCasos(filtro?: { disciplinaId?: string }): Promise<CasoClinico[]> {
    return filtro?.disciplinaId
      ? CASOS.filter((c) => c.disciplinaId === filtro.disciplinaId)
      : CASOS;
  }

  async getCaso(id: string): Promise<CasoClinico | undefined> {
    return CASOS.find((c) => c.id === id);
  }

  async getStats(): Promise<Stats> {
    const disciplinas = await this.getDisciplinas();
    const temas = disciplinas.flatMap((d) => d.temas);
    const subtemas = temas.flatMap((t) => t.subtemas);
    const { count: questoes } = await this.db
      .from("questao")
      .select("id", { count: "exact", head: true });
    return {
      disciplinas: disciplinas.length,
      disciplinasOmed: disciplinas.filter((d) => d.omed).length,
      temas: temas.length,
      subtemas: subtemas.length,
      subtemasComConteudo: subtemas.filter((s) => s.temConteudo).length,
      questoes: questoes ?? 0,
      casos: CASOS.length,
    };
  }

  async search(query: string): Promise<SearchHit[]> {
    const q = query.trim();
    if (q.length < 2) return [];
    // Postgres full-text + trigram search is exposed via an RPC (see migration).
    const { data, error } = await this.db.rpc("search_conteudo", { termo: q });
    if (error) throw error;
    return (data ?? []) as SearchHit[];
  }
}

// ── row → domain mappers ────────────────────────────────────

interface SubtemaRow {
  id: string;
  slug: string;
  nome: string;
  tema_id: string;
  dificuldade: string;
  tem_conteudo: boolean;
  alto_rendimento: boolean;
  ordem: number;
}
interface TemaRow {
  id: string;
  slug: string;
  nome: string;
  disciplina_id: string;
  ordem: number;
  subtema: SubtemaRow[];
}
interface DisciplinaRow {
  id: string;
  slug: string;
  nome: string;
  grupo: string;
  marca: string;
  omed: boolean;
  ordem: number;
  tema: TemaRow[];
}
interface BlocoRow {
  secao: string;
  corpo_mdx: string;
  ordem: number;
  figura: string | null;
}
interface AlternativaRow {
  letra: string;
  texto: string;
  correta: boolean;
  comentario: string;
  ordem: number;
}
interface QuestaoRow {
  id: string;
  subtema_id: string;
  disciplina_id: string;
  enunciado: string;
  estilo: string;
  dificuldade: string;
  tags: string[] | null;
  fonte: string | null;
  alternativa: AlternativaRow[];
}

function mapSubtema(r: SubtemaRow): Subtema {
  return {
    id: r.id,
    slug: r.slug,
    nome: r.nome,
    temaId: r.tema_id,
    dificuldade: r.dificuldade as Dificuldade,
    temConteudo: r.tem_conteudo,
    altoRendimento: r.alto_rendimento,
  };
}
function mapTema(r: TemaRow): Tema {
  return {
    id: r.id,
    slug: r.slug,
    nome: r.nome,
    disciplinaId: r.disciplina_id,
    subtemas: (r.subtema ?? [])
      .sort((a, b) => a.ordem - b.ordem)
      .map(mapSubtema),
  };
}
function mapDisciplina(r: DisciplinaRow): Disciplina {
  return {
    id: r.id,
    slug: r.slug,
    nome: r.nome,
    grupo: r.grupo as GrupoDisciplina,
    marca: r.marca,
    omed: r.omed,
    temas: (r.tema ?? []).sort((a, b) => a.ordem - b.ordem).map(mapTema),
  };
}
function mapQuestao(r: QuestaoRow): Questao {
  return {
    id: r.id,
    subtemaId: r.subtema_id,
    disciplinaId: r.disciplina_id,
    enunciado: r.enunciado,
    estilo: r.estilo as EstiloQuestao,
    dificuldade: r.dificuldade as Dificuldade,
    tags: r.tags ?? [],
    fonte: r.fonte ?? undefined,
    alternativas: (r.alternativa ?? [])
      .sort((a, b) => a.ordem - b.ordem)
      .map((a) => ({
        letra: a.letra,
        texto: a.texto,
        correta: a.correta,
        comentario: a.comentario,
      })),
  };
}
