"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Images, Layers3, Search } from "lucide-react";
import { DISCIPLINAS } from "@/content/taxonomy";
import { cn } from "@/lib/cn";

export interface FiguraIndice {
  id: string;
  titulo: string;
  legenda: string;
  tipo: "imagem" | "diagrama";
  licenca: string;
}

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
  "inf-sarampo-exantema-real": { subtemaId: "inf--doencas-exantematicas--sarampo-rubeola-escarlatina-e-kawasaki", rotulo: "Doenças exantemáticas" },
  "go-mola-hidatiforme-us-real": { subtemaId: "go--hemorragias-da-gestacao--primeira-metade-abortamento-ectopica-mola", rotulo: "Hemorragias da 1ª metade" },
  "go-colo-uterino-colposcopia-real": { subtemaId: "go--oncologia-ginecologica--cancer-de-colo-uterino", rotulo: "Câncer de colo uterino" },
  "go-cancer-mama-mamografia-real": { subtemaId: "go--mastologia--cancer-de-mama", rotulo: "Câncer de mama" },
  "go-ectopica-us-real": { subtemaId: "go--hemorragias-da-gestacao--primeira-metade-abortamento-ectopica-mola", rotulo: "Gravidez ectópica" },
  "go-mioma-us-real": { subtemaId: "go--miomatose-e-adenomiose--miomatose-uterina", rotulo: "Miomatose uterina" },
  "ped-ictericia-rn-real": { subtemaId: "ped--neonatologia--ictericia-neonatal", rotulo: "Icterícia neonatal" },
  "ped-bronquiolite-rx-real": { subtemaId: "ped--infeccoes-respiratorias-na-infancia--bronquiolite", rotulo: "Bronquiolite" },
  "ped-kawasaki-real": { subtemaId: "inf--doencas-exantematicas--sarampo-rubeola-escarlatina-e-kawasaki", rotulo: "Doença de Kawasaki" },
  "inf-sifilis-condiloma-real": { subtemaId: "inf--infeccoes-sexualmente-transmissiveis--sifilis", rotulo: "Sífilis" },
  "inf-leptospirose-real": { subtemaId: "inf--zoonoses-e-doencas-emergentes--leptospirose-fases-e-manejo", rotulo: "Leptospirose" },
  "cir-colecistite-us-real": { subtemaId: "cir--abdome-agudo--colecistite-e-colangite", rotulo: "Colecistite" },
  // Neuropsiquiatria autoral: as figuras também aparecem dentro do resumo.
  "psiq-exame-mental-map": { subtemaId: "psiq--entrevista-e-psicopatologia--anamnese-e-exame-do-estado-mental", rotulo: "Exame do estado mental" },
  "psiq-hipnosedativos-seguranca-map": { subtemaId: "psiq--sono-e-hipnosedativos--insonia-e-uso-seguro", rotulo: "Insônia e hipnosedativos" },
  "neuro-demencias-algoritmo-map": { subtemaId: "neuro--amnesias-e-sindromes-demenciais--diagnostico-e-conduta", rotulo: "Síndromes demenciais" },
  "neuro-localizacao-clinica-map": { subtemaId: "neuro--neuroanatomia-clinica--localizacao-neurologica", rotulo: "Localização neurológica" },
  // Imagens reais: cada vínculo leva a um resumo clínico existente.
  "inf-exantemas-padrao-temporal": { subtemaId: "inf--doencas-exantematicas--sarampo-rubeola-escarlatina-e-kawasaki", rotulo: "Exantemas infecciosos" },
  "inf-sarampo-koplik-real": { subtemaId: "inf--doencas-exantematicas--sarampo-rubeola-escarlatina-e-kawasaki", rotulo: "Sarampo" },
  "inf-tb-cavitaria-real": { subtemaId: "inf--tuberculose--diagnostico-e-tratamento", rotulo: "Tuberculose" },
  "ped-crupe-rx-real": { subtemaId: "ped--infeccoes-respiratorias-na-infancia--crupe-laringotraqueobronquite", rotulo: "Crupe" },
  "ped-epiglotite-rx-real": { subtemaId: "ped--infeccoes-respiratorias-na-infancia--crupe-laringotraqueobronquite", rotulo: "Crupe e epiglotite" },
  "cir-pneumotorax-real": { subtemaId: "pneumo--pneumotorax-espontaneo-e-hipertensivo--diagnostico-e-conduta", rotulo: "Pneumotórax" },
  "cir-apendicite-tc-real": { subtemaId: "cir--abdome-agudo--apendicite-aguda", rotulo: "Apendicite" },
  "cir-obstrucao-intestinal-real": { subtemaId: "cir--obstrucao-intestinal--mecanica-vs-funcional", rotulo: "Obstrução intestinal" },
  "mfc-pe-diabetico-real": { subtemaId: "mfc--manejo-de-cronicos--diabetes-mellitus-tipo-2", rotulo: "Pé diabético" },
  "clm-baqueteamento-digital-real": { subtemaId: "pneumo--pneumonia-adquirida-na-comunidade-pac--diagnostico-e-conduta", rotulo: "Baqueteamento digital" },
  "clm-cianose-labios-real": { subtemaId: "pneumo--pneumonia-adquirida-na-comunidade-pac--diagnostico-e-conduta", rotulo: "Cianose e hipóxia" },
  "reu-gota-tofos-real": { subtemaId: "reumato--artrites--artrite-reumatoide", rotulo: "Gota tofácea" },
  "inf-escabiose-real": { subtemaId: "derma--dermatoses-inflamatorias--geral", rotulo: "Escabiose" },
  "ped-maos-pes-boca-real": { subtemaId: "inf--doencas-exantematicas--sarampo-rubeola-escarlatina-e-kawasaki", rotulo: "Exantemas da infância" },
  "go-sop-us-real": { subtemaId: "go--disturbios-endocrino-menstruais--sindrome-dos-ovarios-policisticos", rotulo: "Síndrome dos ovários policísticos" },
  "ped-intussuscepcao-us-real": { subtemaId: "ped--gastroenterologia--constipacao-intestinal", rotulo: "Abdome agudo pediátrico" },
  "ped-piloro-us-real": { subtemaId: "ped--gastroenterologia--refluxo-gastroesofagico", rotulo: "Ultrassom abdominal pediátrico" },
  "inf-candidiase-oral-real": { subtemaId: "inf--hiv-aids--infeccoes-oportunistas", rotulo: "Candidíase oral" },
  "inf-zoster-real": { subtemaId: "inf--hiv-aids--infeccoes-oportunistas", rotulo: "Herpes-zóster" },
  "inf-caxumba-real": { subtemaId: "inf--doencas-exantematicas--sarampo-rubeola-escarlatina-e-kawasaki", rotulo: "Caxumba" },
  "inf-hanseniase-real": { subtemaId: "derma--dermatoses-inflamatorias--geral", rotulo: "Hanseníase" },
  "clm-hsa-tc-real": { subtemaId: "neuro--avc-hemorragico-hsa-e-hemorragia-intraparenquimatosa--diagnostico-e-conduta", rotulo: "Hemorragia subaracnoidea" },
  "clm-avch-tc-real": { subtemaId: "neuro--avc-hemorragico-hsa-e-hemorragia-intraparenquimatosa--diagnostico-e-conduta", rotulo: "AVC hemorrágico" },
  "clm-derrame-pleural-rx-real": { subtemaId: "pneumo--derrame-pleural--diagnostico-e-conduta", rotulo: "Derrame pleural" },
  "clm-tep-angio-real": { subtemaId: "pneumo--tromboembolismo-pulmonar-tep--diagnostico-e-conduta", rotulo: "Tromboembolismo pulmonar" },
  "clm-retino-diabetica-real": { subtemaId: "endocrino--diabetes-mellitus--geral", rotulo: "Retinopatia diabética" },
  "clm-retino-hipertensiva-real": { subtemaId: "cardio--hipertensao-secundaria--diagnostico-e-conduta", rotulo: "Retinopatia hipertensiva" },
  "clm-acantose-real": { subtemaId: "endocrino--diabetes-mellitus--geral", rotulo: "Acantose nigricans" },
  "reu-ar-maos-rx-real": { subtemaId: "reumato--artrites--artrite-reumatoide", rotulo: "Artrite reumatoide" },
  "reu-oa-joelho-rx-real": { subtemaId: "reumato--artrites--osteoartrite", rotulo: "Osteoartrite" },
  "ort-fratura-colles-rx-real": { subtemaId: "cir--trauma--atls-atendimento-inicial", rotulo: "Trauma e fratura" },
  "derm-melanoma-real": { subtemaId: "derma--neoplasias-cutaneas--cbc-cec-e-melanoma", rotulo: "Melanoma" },
  "derm-psoriase-real": { subtemaId: "derma--dermatoses-inflamatorias--geral", rotulo: "Psoríase" },
  "go-cisto-ovariano-us-real": { subtemaId: "go--disturbios-endocrino-menstruais--sindrome-dos-ovarios-policisticos", rotulo: "Imagem ovariana" },
  "inf-dengue-laco-real": { subtemaId: "inf--arboviroses--dengue-classificacao-e-manejo", rotulo: "Dengue" },
  "cir-volvo-sigmoide-rx-real": { subtemaId: "cir--obstrucao-intestinal--mecanica-vs-funcional", rotulo: "Vólvulo e obstrução" },
  "cir-pneumoperitonio-rx-real": { subtemaId: "cir--abdome-agudo--abordagem-do-abdome-agudo", rotulo: "Pneumoperitônio" },
  "clm-ic-rx-real": { subtemaId: "cardio--insuficiencia-cardiaca-icfer-e-icfep--diagnostico-e-conduta", rotulo: "Insuficiência cardíaca" },
  "clm-cardiomegalia-rx-real": { subtemaId: "cardio--insuficiencia-cardiaca-icfer-e-icfep--diagnostico-e-conduta", rotulo: "Cardiomegalia" },
  "inf-meningococcemia-purpura-real": { subtemaId: "inf--meningites--bacteriana-vs-viral", rotulo: "Doença meningocócica" },
  "inf-erisipela-real": { subtemaId: "derma--piodermites--diagnostico-e-conduta", rotulo: "Erisipela" },
  "cir-isquemia-mesenterica-tc-real": { subtemaId: "cir--abdome-agudo--abordagem-do-abdome-agudo", rotulo: "Isquemia mesentérica" },
  "endocrino-bocio-real": { subtemaId: "endocrino--nodulo-e-cancer-de-tireoide--diagnostico-e-conduta", rotulo: "Bócio e nódulo tireoidiano" },
  "clm-ictericia-escleral-real": { subtemaId: "gastro--hepatites-virais--diagnostico-e-conduta", rotulo: "Icterícia" },
  "clm-avc-isquemico-tc-real": { subtemaId: "neuro--avc-isquemico--diagnostico-e-conduta", rotulo: "AVC isquêmico" },
  "clm-fibrilacao-atrial-ecg-real": { subtemaId: "cardio--fibrilacao-atrial-bradiarritmias-e-leitura-de-ecg--diagnostico-e-conduta", rotulo: "Fibrilação atrial" },
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
  itens: FiguraIndice[];
}

export function MidiaClient({ figuras }: { figuras: FiguraIndice[] }) {
  const [q, setQ] = useState("");
  const [area, setArea] = useState<string>("todas");
  const [modalidade, setModalidade] = useState<"todas" | "imagem" | "diagrama">("todas");
  const [licenca, setLicenca] = useState("todas");
  const [limite, setLimite] = useState(12);

  const areas = useMemo(
    () => Array.from(new Set(figuras.map((f) => areaDe(f.id)))).sort(),
    [figuras]
  );
  const licencas = useMemo(
    () => Array.from(new Set(figuras.map((f) => f.licenca))).sort((a, b) => a.localeCompare(b, "pt-BR")),
    [figuras],
  );

  const filtradas = useMemo(() => {
    const termo = normalizar(q.trim());
    return figuras.filter((f) => {
      if (area !== "todas" && areaDe(f.id) !== area) return false;
      if (modalidade !== "todas" && f.tipo !== modalidade) return false;
      if (licenca !== "todas" && f.licenca !== licenca) return false;
      if (!termo) return true;
      return (
        normalizar(f.titulo).includes(termo) ||
        normalizar(f.legenda).includes(termo) ||
        normalizar(ONDE_APARECE[f.id]?.rotulo ?? "").includes(termo)
      );
    });
  }, [figuras, q, area, modalidade, licenca]);

  const renderizadas = filtradas.slice(0, limite);

  // Separa por tema/subtema (derivado da taxonomia via ONDE_APARECE) — figuras
  // ainda não ancoradas a um resumo ficam num grupo à parte, honestamente rotulado,
  // em vez de se misturarem soltas entre as organizadas.
  const grupos = useMemo(() => {
    const porTema = new Map<string, GrupoFiguras>();
    const semTema: FiguraIndice[] = [];
    for (const f of renderizadas) {
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
  }, [renderizadas]);

  return (
    <div className="legacy-page">
      <header className="legacy-hero">
      <p className="legacy-eyebrow">Acervo clínico contextualizado</p>
      <h1 className="mt-2 flex items-center gap-2 text-2xl font-bold tracking-tight text-text sm:text-3xl"><Images className="size-6 text-accent" /> Biblioteca visual</h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-6 text-text-muted">Diagramas originais dos resumos — fluxogramas, comparativos e esquemas. Cada um leva ao tema onde é usado.</p>
      <div className="legacy-statline"><span>{figuras.length} recursos visuais</span><span>{areas.length} áreas clínicas</span><span>{licencas.length} tipos de licença</span></div>
      </header>

      <div className="legacy-toolbar mt-5 flex flex-wrap gap-2 p-2" aria-label="Camadas de mídia">
        <Link href="/midia" className="rounded-lg bg-accent-soft px-3 py-2 text-sm font-semibold text-accent">Pública e licenciada</Link>
        <Link href="/minha-midia" className="rounded-lg px-3 py-2 text-sm font-semibold text-text-muted hover:bg-surface-2 hover:text-text">Minha mídia privada <span className="ml-1 text-[10px] text-text-faint">login</span></Link>
      </div>

      {/* busca + filtros */}
      <div className="legacy-toolbar mt-4 flex flex-col gap-3 p-3">
        <div className="flex h-10 flex-1 items-center gap-2.5 rounded-lg border border-border bg-surface px-3">
          <Search className="size-4 flex-none text-text-faint" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar figura…"
            className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-faint"
          />
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Filtrar por disciplina">
          <Chip label="Todas" ativo={area === "todas"} onClick={() => setArea("todas")} />
          {areas.map((a) => (
            <Chip key={a} label={a} ativo={area === a} onClick={() => setArea(a)} />
          ))}
        </div>
        <div className="grid gap-2 sm:grid-cols-2" aria-label="Filtrar mídia por tipo e licença">
          <label className="flex items-center gap-2 text-xs text-text-muted"><span>Tipo</span><select value={modalidade} onChange={(e) => { setModalidade(e.target.value as typeof modalidade); setLimite(12); }} className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text"><option value="todas">Todos</option><option value="imagem">Imagens clínicas</option><option value="diagrama">Diagramas autorais</option></select></label>
          <label className="flex items-center gap-2 text-xs text-text-muted"><span>Licença</span><select value={licenca} onChange={(e) => { setLicenca(e.target.value); setLimite(12); }} className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text"><option value="todas">Todas</option>{licencas.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        </div>
      </div>

      <p className="mt-4 text-xs text-text-faint">
        {filtradas.length} {filtradas.length === 1 ? "figura" : "figuras"}
        {grupos.length > 0 && ` · ${grupos.length} ${grupos.length === 1 ? "tema" : "temas"}`}
        {renderizadas.length < filtradas.length && " · carregamento progressivo"}
      </p>

      {/* Índice visual: a imagem só aparece dentro do subtema, junto do contexto clínico. */}
      {grupos.map((g) => (
        <section key={g.chave} className="mt-7 first:mt-5">
          <div className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <h2 className="text-[13px] font-bold uppercase tracking-wide text-text">{g.titulo}</h2>
            {g.subtitulo && <span className="text-xs text-text-faint">{g.subtitulo}</span>}
            <span className="text-xs text-text-faint">
              · {g.itens.length} {g.itens.length === 1 ? "figura" : "figuras"}
            </span>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {subtemasDoGrupo(g.itens).map((grupo) => (
              <SubtemaVisualCard key={grupo.subtemaId} {...grupo} />
            ))}
          </div>
        </section>
      ))}

      {filtradas.length === 0 && (
        <p className="legacy-empty mt-6 text-center">Nenhuma figura encontrada para “{q}”.</p>
      )}

      {renderizadas.length < filtradas.length && <button onClick={() => setLimite((n) => n + 12)} className="mx-auto mt-7 flex rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text-muted hover:border-accent hover:text-accent">Carregar mais imagens</button>}

      <p className="legacy-section mt-8 p-4 text-xs leading-relaxed text-text-muted">
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

function subtemasDoGrupo(figuras: FiguraIndice[]) {
  const grupos = new Map<string, { subtemaId: string; rotulo: string; figuras: FiguraIndice[] }>();
  for (const figura of figuras) {
    const onde = ONDE_APARECE[figura.id];
    const chave = onde?.subtemaId ?? `sem-vinculo:${figura.id}`;
    const grupo = grupos.get(chave) ?? {
      subtemaId: onde?.subtemaId ?? "",
      rotulo: onde?.rotulo ?? "Vínculo editorial pendente",
      figuras: [],
    };
    grupo.figuras.push(figura);
    grupos.set(chave, grupo);
  }
  return Array.from(grupos.values()).sort((a, b) => a.rotulo.localeCompare(b.rotulo, "pt-BR"));
}

function SubtemaVisualCard({ subtemaId, rotulo, figuras }: { subtemaId: string; rotulo: string; figuras: FiguraIndice[] }) {
  const imagens = figuras.filter((figura) => figura.tipo === "imagem").length;
  const diagramas = figuras.length - imagens;
  const resumo = figuras[0]?.legenda;
  return (
    <article className="legacy-card p-4">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
          <Layers3 className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-text">{rotulo}</h3>
          <p className="mt-1 text-xs text-text-faint">
            {figuras.length} {figuras.length === 1 ? "recurso visual" : "recursos visuais"}
            {imagens > 0 && ` · ${imagens} ${imagens === 1 ? "imagem clínica" : "imagens clínicas"}`}
            {diagramas > 0 && ` · ${diagramas} ${diagramas === 1 ? "diagrama" : "diagramas"}`}
          </p>
        </div>
      </div>
      {resumo && <p className="mt-3 line-clamp-3 text-sm leading-6 text-text-muted">{resumo}</p>}
      <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Conteúdo visual disponível">
        {figuras.slice(0, 3).map((figura) => <span key={figura.id} className="rounded-full border border-border bg-surface px-2 py-1 text-[11px] text-text-muted">{figura.titulo}</span>)}
        {figuras.length > 3 && <span className="px-1 py-1 text-[11px] text-text-faint">+{figuras.length - 3}</span>}
      </div>
      {subtemaId ? <Link href={`/estudar/${encodeURIComponent(subtemaId)}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline">Abrir subtema e ver imagens <ArrowRight className="size-4" /></Link> : <p className="mt-4 text-xs font-semibold text-text-faint">Imagem preservada, aguardando vínculo a um resumo específico.</p>}
    </article>
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
