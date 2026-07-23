"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Images, ExternalLink } from "lucide-react";
import { FIGURAS, type Figura } from "@/components/figuras/registry";
import { DISCIPLINAS } from "@/content/taxonomy";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

/** Onde cada figura é usada — permite ir da imagem para o estudo. */
const ONDE_APARECE: Record<string, { subtemaId: string; rotulo: string } | undefined> = {
  "go-dpp-vs-pp": { subtemaId: "go--hemorragias-da-gestacao--segunda-metade-dpp-placenta-previa", rotulo: "Hemorragias da 2ª metade" },
  "go-pre-eclampsia-fisiopato": { subtemaId: "go--sindromes-hipertensivas-da-gestacao--pre-eclampsia-e-eclampsia", rotulo: "Pré-eclâmpsia e eclâmpsia" },
  "inf-tb-primaria-vs-pos": { subtemaId: "inf--tuberculose--diagnostico-e-tratamento", rotulo: "Tuberculose" },
  "inf-liquor": { subtemaId: "inf--meningites--bacteriana-vs-viral", rotulo: "Meningites" },
  "inf-sifilis-estagios": { subtemaId: "inf--infeccoes-sexualmente-transmissiveis--sifilis", rotulo: "Sífilis" },
  "inf-dengue-fases": { subtemaId: "inf--arboviroses--dengue-classificacao-e-manejo", rotulo: "Dengue" },
  "ped-planos-desidratacao": { subtemaId: "ped--emergencias-pediatricas--desidratacao-e-reidratacao", rotulo: "Desidratação" },
  "ped-crupe-vs-epiglotite": { subtemaId: "ped--infeccoes-respiratorias-na-infancia--crupe-laringotraqueobronquite", rotulo: "Crupe" },
  "ped-zonas-kramer": { subtemaId: "ped--neonatologia--ictericia-neonatal", rotulo: "Icterícia neonatal" },
  "mfc-tabela-2x2": { subtemaId: "mfc--epidemiologia--testes-diagnosticos-sensibilidade-e-especificidade", rotulo: "Testes diagnósticos" },
  "cir-vias-biliares-mirizzi": { subtemaId: "cir--abdome-agudo--colecistite-e-colangite", rotulo: "Colecistite e colangite" },
  // imagens reais
  "inf-tb-miliar-rx-real": { subtemaId: "inf--tuberculose--diagnostico-e-tratamento", rotulo: "Tuberculose" },
  "inf-pneumonia-consolidacao-real": { subtemaId: "inf--pneumonias--pneumonia-adquirida-na-comunidade", rotulo: "Pneumonia (PAC)" },
  "inf-sifilis-cancro-real": { subtemaId: "inf--infeccoes-sexualmente-transmissiveis--sifilis", rotulo: "Sífilis" },
  "inf-sifilis-secundaria-real": { subtemaId: "inf--infeccoes-sexualmente-transmissiveis--sifilis", rotulo: "Sífilis" },
  "inf-sarampo-exantema-real": { subtemaId: "inf--doencas-exantematicas--exantemas-da-infancia", rotulo: "Doenças exantemáticas" },
  "go-mola-hidatiforme-us-real": { subtemaId: "go--hemorragias-da-gestacao--primeira-metade-abortamento-ectopica-mola", rotulo: "Hemorragias da 1ª metade" },
  "go-colo-uterino-colposcopia-real": { subtemaId: "go--oncologia-ginecologica--cancer-de-colo-uterino", rotulo: "Câncer de colo uterino" },
  "go-cancer-mama-mamografia-real": { subtemaId: "go--mastologia--cancer-de-mama", rotulo: "Câncer de mama" },
  "go-ectopica-us-real": { subtemaId: "go--hemorragias-da-gestacao--primeira-metade-abortamento-ectopica-mola", rotulo: "Gravidez ectópica" },
  "go-mioma-us-real": { subtemaId: "go--miomatose-e-adenomiose--miomatose-uterina", rotulo: "Miomatose uterina" },
  "ped-ictericia-rn-real": { subtemaId: "ped--neonatologia--ictericia-neonatal", rotulo: "Icterícia neonatal" },
  "ped-bronquiolite-rx-real": { subtemaId: "ped--infeccoes-respiratorias-na-infancia--bronquiolite", rotulo: "Bronquiolite" },
  "ped-kawasaki-real": { subtemaId: "inf--doencas-exantematicas--exantemas-da-infancia", rotulo: "Doença de Kawasaki" },
  "inf-sifilis-condiloma-real": { subtemaId: "inf--infeccoes-sexualmente-transmissiveis--sifilis", rotulo: "Sífilis" },
  "inf-leptospirose-real": { subtemaId: "inf--zoonoses-e-doencas-emergentes--leptospirose-fases-e-manejo", rotulo: "Leptospirose" },
  "cir-colecistite-us-real": { subtemaId: "cir--abdome-agudo--colecistite-e-colangite", rotulo: "Colecistite" },
};

const AREA: Record<string, string> = {
  go: "Ginecologia & Obstetrícia",
  ped: "Pediatria",
  inf: "Infectologia",
  cir: "Cirurgia",
  mfc: "MFC",
  clm: "Clínica Médica",
  reu: "Reumatologia",
  ort: "Ortopedia",
  derm: "Dermatologia",
};

function areaDe(id: string): string {
  return AREA[id.split("-")[0]] ?? "Geral";
}

function normalizar(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/**
 * subtemaId -> tema/disciplina, derivado da taxonomia (fonte única de verdade —
 * nunca duplicar nome de tema à mão, para não dessincronizar se a taxonomia mudar).
 */
const TEMA_POR_SUBTEMA: Record<string, { disciplinaNome: string; temaId: string; temaNome: string }> = (() => {
  const mapa: Record<string, { disciplinaNome: string; temaId: string; temaNome: string }> = {};
  for (const disciplina of DISCIPLINAS) {
    for (const tema of disciplina.temas) {
      for (const subtema of tema.subtemas) {
        mapa[subtema.id] = { disciplinaNome: disciplina.nome, temaId: tema.id, temaNome: tema.nome };
      }
    }
  }
  return mapa;
})();

interface GrupoFiguras {
  chave: string;
  titulo: string;
  subtitulo?: string;
  itens: Figura[];
}

export function MidiaClient() {
  const [q, setQ] = useState("");
  const [area, setArea] = useState<string>("todas");

  const figuras = useMemo(() => Object.values(FIGURAS), []);
  const areas = useMemo(
    () => Array.from(new Set(figuras.map((f) => areaDe(f.id)))).sort(),
    [figuras]
  );

  const filtradas = useMemo(() => {
    const termo = normalizar(q.trim());
    return figuras.filter((f) => {
      if (area !== "todas" && areaDe(f.id) !== area) return false;
      if (!termo) return true;
      return (
        normalizar(f.titulo).includes(termo) ||
        normalizar(f.legenda).includes(termo) ||
        normalizar(ONDE_APARECE[f.id]?.rotulo ?? "").includes(termo)
      );
    });
  }, [figuras, q, area]);

  // Separa por tema/subtema (derivado da taxonomia via ONDE_APARECE) — figuras
  // ainda não ancoradas a um resumo ficam num grupo à parte, honestamente rotulado,
  // em vez de se misturarem soltas entre as organizadas.
  const grupos = useMemo(() => {
    const porTema = new Map<string, GrupoFiguras>();
    const semTema: Figura[] = [];
    for (const f of filtradas) {
      const onde = ONDE_APARECE[f.id];
      const info = onde ? TEMA_POR_SUBTEMA[onde.subtemaId] : undefined;
      if (!info) {
        semTema.push(f);
        continue;
      }
      const grupo = porTema.get(info.temaId) ?? {
        chave: info.temaId,
        titulo: info.temaNome,
        subtitulo: info.disciplinaNome,
        itens: [],
      };
      grupo.itens.push(f);
      porTema.set(info.temaId, grupo);
    }
    const ordenados = Array.from(porTema.values()).sort(
      (a, b) => a.subtitulo!.localeCompare(b.subtitulo!, "pt-BR") || a.titulo.localeCompare(b.titulo, "pt-BR")
    );
    if (semTema.length) {
      ordenados.push({
        chave: "__sem-tema__",
        titulo: "Ainda sem tema associado",
        subtitulo: "aguardando resumo correspondente",
        itens: semTema,
      });
    }
    return ordenados;
  }, [filtradas]);

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-text">
        <Images className="size-6 text-accent" /> Biblioteca visual
      </h1>
      <p className="mt-1.5 max-w-2xl text-[15px] text-text-muted">
        Diagramas originais dos resumos — fluxogramas, comparativos e esquemas.
        Cada um leva ao tema onde é usado.
      </p>

      {/* busca + filtros */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex h-10 flex-1 items-center gap-2.5 rounded-lg border border-border bg-surface px-3">
          <Search className="size-4 flex-none text-text-faint" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar figura…"
            className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-faint"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip label="Todas" ativo={area === "todas"} onClick={() => setArea("todas")} />
          {areas.map((a) => (
            <Chip key={a} label={a} ativo={area === a} onClick={() => setArea(a)} />
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-text-faint">
        {filtradas.length} {filtradas.length === 1 ? "figura" : "figuras"}
        {grupos.length > 0 && ` · ${grupos.length} ${grupos.length === 1 ? "tema" : "temas"}`}
      </p>

      {/* galeria, agrupada por tema/subtema — preserva os vínculos "Estudar X" de sempre */}
      {grupos.map((g) => (
        <section key={g.chave} className="mt-8 first:mt-5">
          <div className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <h2 className="text-[13px] font-bold uppercase tracking-wide text-text">{g.titulo}</h2>
            {g.subtitulo && <span className="text-xs text-text-faint">{g.subtitulo}</span>}
            <span className="text-xs text-text-faint">
              · {g.itens.length} {g.itens.length === 1 ? "figura" : "figuras"}
            </span>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {g.itens.map((f) => (
              <FiguraCard key={f.id} figura={f} onde={ONDE_APARECE[f.id]} />
            ))}
          </div>
        </section>
      ))}

      {filtradas.length === 0 && (
        <p className="mt-12 text-center text-sm text-text-faint">Nenhuma figura encontrada para “{q}”.</p>
      )}

      <p className="mt-10 rounded-xl border border-border bg-surface-2 p-4 text-xs leading-relaxed text-text-muted">
        <strong className="text-text">Sobre as imagens:</strong> os{" "}
        <strong className="text-text">diagramas</strong> são desenhados originalmente para esta
        plataforma — livres de direitos autorais e adaptados ao tema claro/escuro. As{" "}
        <strong className="text-text">imagens reais</strong> (radiografias, lesões, exames) vêm
        apenas de fontes com licença verificada — domínio público (CDC/PHIL) ou Creative
        Commons — baixadas para o próprio site, com fonte, autor e licença creditados em cada
        figura. Imagens <strong className="text-text">suas</strong> têm prioridade e podem ser
        adicionadas a qualquer momento.
      </p>
    </div>
  );
}

function FiguraCard({
  figura: f,
  onde,
}: {
  figura: Figura;
  onde: { subtemaId: string; rotulo: string } | undefined;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-surface-2">
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-accent">{f.titulo}</span>
        <span className="flex-none rounded-full bg-surface px-2 py-0.5 text-[10px] font-medium text-text-faint">
          {areaDe(f.id)}
        </span>
      </div>
      {f.imagem ? (
        <div className="bg-black/[0.03] px-3 py-4 dark:bg-white/[0.02]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(f.imagem.src)}
            alt={f.imagem.alt}
            loading="lazy"
            className="mx-auto max-h-[340px] w-auto max-w-full rounded-lg"
          />
        </div>
      ) : (
        <div className="overflow-x-auto px-3 py-4">
          <div className="min-w-[340px]">{f.render?.()}</div>
        </div>
      )}
      <figcaption className="border-t border-border px-4 py-2.5 text-[12.5px] leading-snug text-text-muted">
        {f.legenda}
        {f.imagem && (
          <span className="mt-1.5 block text-[11px] text-text-faint">
            Fonte: {f.imagem.autor ? `${f.imagem.autor} · ` : ""}
            {f.imagem.url ? (
              <a href={f.imagem.url} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted hover:text-accent">
                {f.imagem.fonte}
              </a>
            ) : (
              f.imagem.fonte
            )}{" "}
            — {f.imagem.licenca}
          </span>
        )}
        {onde && (
          <Link
            href={`/estudar/${encodeURIComponent(onde.subtemaId)}`}
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
          >
            Estudar {onde.rotulo} <ExternalLink className="size-3" />
          </Link>
        )}
      </figcaption>
    </figure>
  );
}

function Chip({ label, ativo, onClick }: { label: string; ativo: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
        ativo ? "border-accent bg-accent-soft text-accent" : "border-border bg-surface text-text-muted hover:border-border-strong"
      )}
    >
      {label}
    </button>
  );
}
