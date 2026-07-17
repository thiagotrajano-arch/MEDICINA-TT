"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Images, ExternalLink } from "lucide-react";
import { FIGURAS } from "@/components/figuras/registry";
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
};

const AREA: Record<string, string> = {
  go: "Ginecologia & Obstetrícia",
  ped: "Pediatria",
  inf: "Infectologia",
  cir: "Cirurgia",
  mfc: "MFC",
};

function areaDe(id: string): string {
  return AREA[id.split("-")[0]] ?? "Geral";
}

function normalizar(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
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
      </p>

      {/* galeria */}
      <div className="mt-3 grid gap-4 lg:grid-cols-2">
        {filtradas.map((f) => {
          const onde = ONDE_APARECE[f.id];
          return (
            <figure key={f.id} className="overflow-hidden rounded-xl border border-border bg-surface-2">
              <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent">{f.titulo}</span>
                <span className="flex-none rounded-full bg-surface px-2 py-0.5 text-[10px] font-medium text-text-faint">
                  {areaDe(f.id)}
                </span>
              </div>
              <div className="overflow-x-auto px-3 py-4">
                <div className="min-w-[340px]">{f.render()}</div>
              </div>
              <figcaption className="border-t border-border px-4 py-2.5 text-[12.5px] leading-snug text-text-muted">
                {f.legenda}
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
        })}
      </div>

      {filtradas.length === 0 && (
        <p className="mt-12 text-center text-sm text-text-faint">Nenhuma figura encontrada para “{q}”.</p>
      )}

      <p className="mt-10 rounded-xl border border-border bg-surface-2 p-4 text-xs leading-relaxed text-text-muted">
        <strong className="text-text">Sobre as imagens:</strong> são diagramas desenhados
        originalmente para esta plataforma — livres de direitos autorais, leves e
        acompanham o tema claro/escuro. Fotografias clínicas reais (radiografias,
        dermatoscopia, lâminas) entram quando forem <strong className="text-text">suas</strong> ou
        de fonte com licença aberta, respeitando os direitos autorais.
      </p>
    </div>
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
