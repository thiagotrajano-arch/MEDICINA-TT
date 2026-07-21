import type { ReactNode } from "react";

/**
 * Biblioteca de figuras médicas — diagramas ORIGINAIS em SVG.
 *
 * Por que SVG desenhado aqui, e não fotos da internet:
 *  - imagens clínicas da web quase sempre têm direitos autorais;
 *  - URLs externas quebram e violam a CSP de um site estático;
 *  - SVG é leve, escala sem perder qualidade e acompanha o tema claro/escuro
 *    automaticamente (usa as CSS vars do design system).
 *
 * Cada figura é ancorada a uma seção específica de um resumo via
 * `BlocoConteudo.figura` — a imagem aparece exatamente onde ajuda a entender,
 * nunca numa galeria solta.
 */

/**
 * Uma figura é de um de dois tipos:
 *
 *  - **diagrama** (`render`): SVG desenhado aqui. Sem direitos autorais, leve,
 *    acompanha o tema. Ideal para fluxogramas, comparativos e esquemas.
 *  - **imagem real** (`imagem`): fotografia/exame de verdade (raio-X, TC, RM,
 *    lesão de pele, lâmina). Serve para o que um desenho não ensina —
 *    reconhecer o achado como ele aparece na prova e no plantão.
 *
 * Toda imagem real EXIGE procedência e licença explícitas, e o crédito é
 * renderizado junto da figura. Sem licença verificável, a imagem não entra:
 * preferimos um diagrama honesto a uma foto de origem duvidosa.
 */
export interface Figura {
  id: string;
  titulo: string;
  legenda: string;
  /** Diagrama SVG. Mutuamente exclusivo com `imagem`. */
  render?: () => ReactNode;
  /** Imagem real com procedência. Mutuamente exclusivo com `render`. */
  imagem?: ImagemReal;
}

export interface ImagemReal {
  /** Caminho servido pelo próprio site (`/img/...`). Nunca hotlink: o arquivo
   *  é baixado para `public/img/` para não depender de terceiros nem consumir
   *  banda alheia. */
  src: string;
  /** Texto alternativo descritivo — acessibilidade e SEO. */
  alt: string;
  /** Ex.: "Wikimedia Commons", "CDC PHIL", "Radiopaedia". */
  fonte: string;
  /** Ex.: "Domínio público", "CC BY 4.0", "CC BY-SA 3.0". */
  licenca: string;
  /** Autor/atribuição exigida pela licença. */
  autor?: string;
  /** Página de origem, para verificação e crédito. */
  url?: string;
}

// ── helpers de estilo (usam os tokens do tema) ──────────────────
const C = {
  accent: "var(--accent)",
  text: "var(--text)",
  muted: "var(--text-muted)",
  faint: "var(--text-faint)",
  surface: "var(--surface)",
  surface2: "var(--surface-2)",
  border: "var(--border-strong)",
  danger: "var(--danger)",
  gold: "var(--gold)",
};

const label = (extra?: object) => ({
  fontSize: 11,
  fill: C.muted,
  fontWeight: 600,
  ...extra,
});

// ═══════════════════════════════════════════════════════════════
// GO — DPP × Placenta prévia
// ═══════════════════════════════════════════════════════════════
function UteroEsquematico({ x }: { x: number }) {
  return (
    <path
      d={`M${x + 60} 30 C ${x + 105} 30, ${x + 118} 80, ${x + 110} 125
          C ${x + 104} 162, ${x + 88} 182, ${x + 72} 190
          L ${x + 72} 210 L ${x + 48} 210 L ${x + 48} 190
          C ${x + 32} 182, ${x + 16} 162, ${x + 10} 125
          C ${x + 2} 80, ${x + 15} 30, ${x + 60} 30 Z`}
      fill={C.surface2}
      stroke={C.border}
      strokeWidth="2"
    />
  );
}

function DppVsPlacentaPrevia() {
  return (
    <svg viewBox="0 0 420 250" role="img" aria-label="Comparação entre descolamento prematuro de placenta e placenta prévia">
      {/* ── DPP ── */}
      <UteroEsquematico x={20} />
      {/* placenta normalmente inserida no fundo */}
      <path d="M45 46 C 70 34, 110 34, 135 50 L 130 66 C 108 52, 72 52, 50 62 Z" fill={C.accent} opacity="0.85" />
      {/* hematoma retroplacentário */}
      <path d="M50 62 C 72 52, 108 52, 130 66 C 122 84, 66 84, 50 62 Z" fill={C.danger} />
      <text x="80" y="20" textAnchor="middle" style={label({ fill: C.text, fontSize: 12, fontWeight: 800 })}>DPP</text>
      <text x="152" y="60" style={label({ fill: C.danger, fontSize: 10 })}>hematoma</text>
      <text x="152" y="72" style={label({ fill: C.danger, fontSize: 10 })}>retroplacentário</text>
      {/* sangue escuro, pouco */}
      <path d="M74 210 q 6 14 2 26" stroke="#6b1f1f" strokeWidth="4" fill="none" strokeLinecap="round" />
      <text x="86" y="240" style={label({ fontSize: 10 })}>sangue escuro, pouco</text>
      <text x="30" y="236" style={label({ fill: C.danger, fontSize: 10, fontWeight: 800 })}>DOR +</text>
      <text x="30" y="248" style={label({ fill: C.danger, fontSize: 10, fontWeight: 800 })}>HIPERTONIA</text>

      {/* ── Placenta prévia ── */}
      <UteroEsquematico x={240} />
      {/* placenta recobrindo o orifício interno */}
      <path d="M272 168 C 292 150, 328 150, 348 168 L 348 186 C 326 172, 294 172, 272 186 Z" fill={C.accent} opacity="0.85" />
      <text x="300" y="20" textAnchor="middle" style={label({ fill: C.text, fontSize: 12, fontWeight: 800 })}>PLACENTA PRÉVIA</text>
      <text x="360" y="170" style={label({ fill: C.accent, fontSize: 10 })}>recobre o</text>
      <text x="360" y="182" style={label({ fill: C.accent, fontSize: 10 })}>orifício interno</text>
      {/* sangue vivo, abundante */}
      <path d="M294 210 q 8 16 4 28" stroke="#d92b2b" strokeWidth="7" fill="none" strokeLinecap="round" />
      <text x="306" y="240" style={label({ fontSize: 10 })}>sangue vivo, abundante</text>
      <text x="250" y="236" style={label({ fill: C.accent, fontSize: 10, fontWeight: 800 })}>INDOLOR</text>
      <text x="250" y="248" style={label({ fill: C.accent, fontSize: 10, fontWeight: 800 })}>TÔNUS NORMAL</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// Infecto — TB primária × pós-primária
// ═══════════════════════════════════════════════════════════════
function PulmoesEsquematicos({ x }: { x: number }) {
  return (
    <>
      <path
        d={`M${x + 55} 34 C ${x + 30} 40, ${x + 18} 90, ${x + 22} 140 C ${x + 25} 168, ${x + 42} 172, ${x + 52} 156 C ${x + 58} 140, ${x + 58} 70, ${x + 55} 34 Z`}
        fill={C.surface2} stroke={C.border} strokeWidth="2"
      />
      <path
        d={`M${x + 73} 34 C ${x + 98} 40, ${x + 110} 90, ${x + 106} 140 C ${x + 103} 168, ${x + 86} 172, ${x + 76} 156 C ${x + 70} 140, ${x + 70} 70, ${x + 73} 34 Z`}
        fill={C.surface2} stroke={C.border} strokeWidth="2"
      />
      {/* traqueia */}
      <line x1={x + 64} y1="24" x2={x + 64} y2="60" stroke={C.border} strokeWidth="3" />
    </>
  );
}

function TbPrimariaVsPosPrimaria() {
  return (
    <svg viewBox="0 0 420 230" role="img" aria-label="Tuberculose primária versus pós-primária">
      {/* primária */}
      <PulmoesEsquematicos x={20} />
      {/* foco de Ghon periférico */}
      <circle cx="42" cy="112" r="7" fill={C.gold} />
      {/* linfonodo hilar */}
      <circle cx="76" cy="86" r="8" fill={C.gold} opacity="0.7" />
      <line x1="49" y1="108" x2="70" y2="90" stroke={C.gold} strokeWidth="2" strokeDasharray="3 2" />
      <text x="84" y="14" textAnchor="middle" style={label({ fill: C.text, fontSize: 12, fontWeight: 800 })}>TB PRIMÁRIA</text>
      <text x="10" y="196" style={label({ fill: C.gold, fontSize: 10, fontWeight: 700 })}>foco de Ghon (periférico)</text>
      <text x="10" y="209" style={label({ fill: C.gold, fontSize: 10, fontWeight: 700 })}>+ linfonodo hilar</text>
      <text x="10" y="222" style={label({ fontSize: 10 })}>= complexo de Ranke · criança</text>

      {/* pós-primária */}
      <PulmoesEsquematicos x={240} />
      {/* cavitação apical */}
      <circle cx="262" cy="58" r="12" fill="none" stroke={C.danger} strokeWidth="3" />
      <circle cx="262" cy="58" r="12" fill={C.surface} />
      <circle cx="262" cy="58" r="12" fill="none" stroke={C.danger} strokeWidth="3" />
      <circle cx="298" cy="54" r="8" fill="none" stroke={C.danger} strokeWidth="2.5" />
      <text x="304" y="14" textAnchor="middle" style={label({ fill: C.text, fontSize: 12, fontWeight: 800 })}>TB PÓS-PRIMÁRIA</text>
      <text x="230" y="196" style={label({ fill: C.danger, fontSize: 10, fontWeight: 700 })}>CAVITAÇÃO em ápice /</text>
      <text x="230" y="209" style={label({ fill: C.danger, fontSize: 10, fontWeight: 700 })}>segmento apical do lobo inferior</text>
      <text x="230" y="222" style={label({ fontSize: 10 })}>= reativação · adulto (achado clássico)</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// Infecto — Líquor nas meningites
// ═══════════════════════════════════════════════════════════════
function LiquorMeningites() {
  const rows = [
    { l: "Aspecto", b: "Turvo/purulento", v: "Límpido", t: "Límpido/xantocrômico" },
    { l: "Células", b: "> 1000 · PMN", v: "< 500 · linfomono", t: "50–500 · linfomono" },
    { l: "Proteína", b: "↑↑ (> 100)", v: "normal / ↑ leve", t: "↑ (50–200)" },
    { l: "Glicose", b: "↓↓ (< 40% glicemia)", v: "normal", t: "↓" },
  ];
  const colX = [110, 218, 326];
  const heads = [
    { t: "BACTERIANA", c: C.danger },
    { t: "VIRAL", c: C.accent },
    { t: "TUBERCULOSA", c: C.gold },
  ];

  return (
    <svg viewBox="0 0 430 190" role="img" aria-label="Interpretação do líquor nas meningites">
      {heads.map((h, i) => (
        <g key={h.t}>
          <rect x={colX[i] - 52} y={8} width={104} height={22} rx={6} fill={h.c} opacity="0.15" />
          <text x={colX[i]} y={23} textAnchor="middle" style={label({ fill: h.c, fontSize: 10, fontWeight: 800 })}>{h.t}</text>
        </g>
      ))}
      {rows.map((r, i) => {
        const y = 52 + i * 33;
        return (
          <g key={r.l}>
            {i % 2 === 0 && <rect x={6} y={y - 15} width={418} height={30} rx={5} fill={C.surface2} />}
            <text x={12} y={y + 4} style={label({ fill: C.text, fontSize: 11, fontWeight: 800 })}>{r.l}</text>
            <text x={colX[0]} y={y + 4} textAnchor="middle" style={label({ fontSize: 10 })}>{r.b}</text>
            <text x={colX[1]} y={y + 4} textAnchor="middle" style={label({ fontSize: 10 })}>{r.v}</text>
            <text x={colX[2]} y={y + 4} textAnchor="middle" style={label({ fontSize: 10 })}>{r.t}</text>
          </g>
        );
      })}
      <text x={12} y={182} style={label({ fill: C.faint, fontSize: 9.5 })}>
        Glicose baixa = consumo bacteriano/TB · PMN = polimorfonucleares
      </text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// Infecto — Curva da dengue (fases)
// ═══════════════════════════════════════════════════════════════
function DengueFases() {
  return (
    <svg viewBox="0 0 430 220" role="img" aria-label="Fases da dengue: febril, crítica e de recuperação">
      {/* faixa da fase crítica */}
      <rect x={168} y={20} width={104} height={132} fill={C.danger} opacity="0.1" />
      <text x={220} y={34} textAnchor="middle" style={label({ fill: C.danger, fontSize: 10, fontWeight: 800 })}>FASE CRÍTICA</text>
      <text x={220} y={46} textAnchor="middle" style={label({ fill: C.danger, fontSize: 9 })}>extravasamento · 24–48h</text>

      {/* eixos */}
      <line x1={40} y1={152} x2={410} y2={152} stroke={C.border} strokeWidth="1.5" />
      <line x1={40} y1={20} x2={40} y2={152} stroke={C.border} strokeWidth="1.5" />

      {/* curva da febre */}
      <path d="M52 60 L 100 52 L 150 56 L 180 68 L 210 128 L 260 140 L 330 142 L 400 143"
        fill="none" stroke={C.gold} strokeWidth="3" strokeLinecap="round" />
      <text x={96} y={44} style={label({ fill: C.gold, fontSize: 10, fontWeight: 800 })}>febre</text>

      {/* hematócrito */}
      <path d="M52 132 L 120 132 L 170 130 L 200 108 L 225 74 L 250 92 L 300 126 L 400 131"
        fill="none" stroke={C.danger} strokeWidth="3" strokeLinecap="round" strokeDasharray="6 3" />
      <text x={244} y={68} style={label({ fill: C.danger, fontSize: 10, fontWeight: 800 })}>hematócrito ↑</text>

      {/* plaquetas */}
      <path d="M52 74 L 120 80 L 170 96 L 210 128 L 240 136 L 290 116 L 400 84"
        fill="none" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" />
      <text x={330} y={78} style={label({ fill: C.accent, fontSize: 10, fontWeight: 800 })}>plaquetas</text>

      {/* seta da defervescência */}
      <line x1={196} y1={100} x2={196} y2={150} stroke={C.text} strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx={196} cy={98} r={4} fill={C.text} />
      <text x={196} y={172} textAnchor="middle" style={label({ fill: C.text, fontSize: 10, fontWeight: 800 })}>⚠ a febre CAI aqui</text>
      <text x={196} y={185} textAnchor="middle" style={label({ fontSize: 9.5 })}>não é melhora — é o início do risco</text>

      {/* dias */}
      {["D1", "D3", "D5", "D7", "D9"].map((d, i) => (
        <text key={d} x={60 + i * 85} y={166} textAnchor="middle" style={label({ fill: C.faint, fontSize: 9 })}>{d}</text>
      ))}
      <text x={92} y={210} textAnchor="middle" style={label({ fontSize: 10, fontWeight: 700 })}>FEBRIL</text>
      <text x={330} y={210} textAnchor="middle" style={label({ fontSize: 10, fontWeight: 700 })}>RECUPERAÇÃO</text>
      <text x={330} y={200} textAnchor="middle" style={label({ fill: C.faint, fontSize: 9 })}>(reduzir volume)</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// Pediatria — Planos A/B/C de desidratação
// ═══════════════════════════════════════════════════════════════
function PlanosDesidratacao() {
  const planos = [
    {
      t: "PLANO A", c: C.accent, sub: "SEM desidratação",
      l1: "Alerta · olhos normais", l2: "prega desfaz rápido",
      cond: "Domicílio · SRO após cada evacuação + zinco",
    },
    {
      t: "PLANO B", c: C.gold, sub: "ALGUM grau",
      l1: "Irritado · olhos fundos · sedento", l2: "prega desfaz devagar",
      cond: "Unidade · SRO 50–100 mL/kg em 4–6h (TRO supervisionada)",
    },
    {
      t: "PLANO C", c: C.danger, sub: "GRAVE / choque",
      l1: "Letárgico · não bebe · TEC > 3s", l2: "prega desfaz muito devagar (> 2s)",
      cond: "EV · cristaloide 20 mL/kg em bolus, repetir até 3×",
    },
  ];
  return (
    <svg viewBox="0 0 430 250" role="img" aria-label="Planos A, B e C de reidratação do Ministério da Saúde">
      {planos.map((p, i) => {
        const y = 10 + i * 80;
        return (
          <g key={p.t}>
            <rect x={8} y={y} width={414} height={70} rx={10} fill={p.c} opacity="0.08" />
            <rect x={8} y={y} width={5} height={70} rx={2.5} fill={p.c} />
            <text x={22} y={y + 20} style={label({ fill: p.c, fontSize: 12, fontWeight: 800 })}>{p.t}</text>
            <text x={86} y={y + 20} style={label({ fill: C.text, fontSize: 10.5, fontWeight: 700 })}>{p.sub}</text>
            <text x={22} y={y + 37} style={label({ fontSize: 10 })}>{p.l1}</text>
            <text x={22} y={y + 50} style={label({ fontSize: 10 })}>{p.l2}</text>
            <text x={22} y={y + 64} style={label({ fill: p.c, fontSize: 10, fontWeight: 700 })}>{p.cond}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// Pediatria — Crupe × Epiglotite (via aérea)
// ═══════════════════════════════════════════════════════════════
function CrupeVsEpiglotite() {
  return (
    <svg viewBox="0 0 420 230" role="img" aria-label="Crupe versus epiglotite: local da obstrução na via aérea">
      {/* CRUPE */}
      <text x="105" y="18" textAnchor="middle" style={label({ fill: C.text, fontSize: 12, fontWeight: 800 })}>CRUPE</text>
      <path d="M80 30 L 80 70 Q 80 84, 92 84 L 92 200 L 118 200 L 118 84 Q 130 84, 130 70 L 130 30"
        fill={C.surface2} stroke={C.border} strokeWidth="2" />
      {/* epiglote normal */}
      <path d="M84 40 q 21 -8 42 0" stroke={C.border} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* edema subglótico */}
      <path d="M92 96 q 13 10 26 0 L 118 118 q -13 -10 -26 0 Z" fill={C.danger} opacity="0.75" />
      <text x="140" y="106" style={label({ fill: C.danger, fontSize: 10, fontWeight: 800 })}>edema SUBGLÓTICO</text>
      <text x="140" y="118" style={label({ fontSize: 9.5 })}>(abaixo das cordas)</text>
      <text x="20" y="218" style={label({ fill: C.text, fontSize: 10, fontWeight: 700 })}>Tosse ladrante · rouquidão · pouco toxemiado</text>

      {/* divisor */}
      <line x1="215" y1="26" x2="215" y2="205" stroke={C.border} strokeWidth="1" strokeDasharray="4 4" />

      {/* EPIGLOTITE */}
      <text x="310" y="18" textAnchor="middle" style={label({ fill: C.text, fontSize: 12, fontWeight: 800 })}>EPIGLOTITE</text>
      <path d="M285 30 L 285 70 Q 285 84, 297 84 L 297 200 L 323 200 L 323 84 Q 335 84, 335 70 L 335 30"
        fill={C.surface2} stroke={C.border} strokeWidth="2" />
      {/* epiglote edemaciada — "polegar" */}
      <path d="M288 44 q 22 -22 44 0 q -22 12 -44 0 Z" fill={C.danger} />
      <text x="344" y="44" style={label({ fill: C.danger, fontSize: 10, fontWeight: 800 })}>epiglote</text>
      <text x="344" y="56" style={label({ fill: C.danger, fontSize: 10, fontWeight: 800 })}>edemaciada</text>
      <text x="344" y="68" style={label({ fontSize: 9 })}>(sinal do polegar)</text>
      <text x="228" y="218" style={label({ fill: C.danger, fontSize: 10, fontWeight: 700 })}>TOXEMIADO · sialorreia · tripé · sem tosse</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// Pediatria — Zonas de Kramer
// ═══════════════════════════════════════════════════════════════
function ZonasKramer() {
  const zonas = [
    { z: "1", y: 42, bt: "~6 mg/dL", d: "cabeça e pescoço" },
    { z: "2", y: 78, bt: "~9 mg/dL", d: "até o umbigo" },
    { z: "3", y: 112, bt: "~12 mg/dL", d: "até os joelhos" },
    { z: "4", y: 146, bt: "~15 mg/dL", d: "braços e pernas" },
    { z: "5", y: 176, bt: "> 18 mg/dL", d: "palmas e plantas" },
  ];
  return (
    <svg viewBox="0 0 420 215" role="img" aria-label="Zonas de Kramer para progressão craniocaudal da icterícia neonatal">
      {/* corpo do RN, estilizado */}
      <g transform="translate(40,0)">
        <circle cx="60" cy="34" r="20" fill={C.gold} opacity="0.85" />
        <rect x="40" y="54" width="40" height="60" rx="10" fill={C.gold} opacity="0.6" />
        <rect x="22" y="58" width="16" height="52" rx="8" fill={C.gold} opacity="0.4" />
        <rect x="82" y="58" width="16" height="52" rx="8" fill={C.gold} opacity="0.4" />
        <rect x="44" y="114" width="14" height="62" rx="7" fill={C.gold} opacity="0.3" />
        <rect x="62" y="114" width="14" height="62" rx="7" fill={C.gold} opacity="0.3" />
        <ellipse cx="51" cy="184" rx="9" ry="6" fill={C.gold} opacity="0.2" />
        <ellipse cx="69" cy="184" rx="9" ry="6" fill={C.gold} opacity="0.2" />
        {/* linhas divisórias */}
        {[54, 92, 122, 158, 178].map((y) => (
          <line key={y} x1="14" y1={y} x2="108" y2={y} stroke={C.border} strokeWidth="1" strokeDasharray="3 3" />
        ))}
      </g>
      {zonas.map((z) => (
        <g key={z.z}>
          <circle cx={182} cy={z.y - 4} r={9} fill={C.gold} opacity="0.25" />
          <text x={182} y={z.y} textAnchor="middle" style={label({ fill: C.gold, fontSize: 10, fontWeight: 800 })}>{z.z}</text>
          <text x={200} y={z.y} style={label({ fill: C.text, fontSize: 10.5, fontWeight: 700 })}>{z.bt}</text>
          <text x={266} y={z.y} style={label({ fontSize: 10 })}>{z.d}</text>
        </g>
      ))}
      <text x={14} y={208} style={label({ fill: C.faint, fontSize: 9.5 })}>
        Progressão craniocaudal — estimativa VISUAL e imprecisa: a decisão é pela bilirrubina no nomograma de Bhutani.
      </text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// GO — Fisiopatologia da pré-eclâmpsia
// ═══════════════════════════════════════════════════════════════
function PreEclampsiaFisiopato() {
  return (
    <svg viewBox="0 0 430 210" role="img" aria-label="Falha da segunda onda de invasão trofoblástica na pré-eclâmpsia">
      {/* NORMAL */}
      <text x="106" y="16" textAnchor="middle" style={label({ fill: C.accent, fontSize: 11, fontWeight: 800 })}>GESTAÇÃO NORMAL</text>
      <path d="M40 34 C 60 60, 60 90, 42 120 L 62 128 C 96 116, 150 118, 176 126"
        fill="none" stroke={C.accent} strokeWidth="14" strokeLinecap="round" opacity="0.35" />
      <text x="30" y="150" style={label({ fill: C.accent, fontSize: 10, fontWeight: 700 })}>2ª onda de invasão OK</text>
      <text x="30" y="163" style={label({ fontSize: 9.5 })}>arteríola dilatada, baixa resistência</text>
      <text x="30" y="176" style={label({ fontSize: 9.5 })}>→ perfusão placentária adequada</text>

      {/* divisor */}
      <line x1="212" y1="26" x2="212" y2="186" stroke={C.border} strokeWidth="1" strokeDasharray="4 4" />

      {/* PRÉ-ECLÂMPSIA */}
      <text x="322" y="16" textAnchor="middle" style={label({ fill: C.danger, fontSize: 11, fontWeight: 800 })}>PRÉ-ECLÂMPSIA</text>
      <path d="M250 34 C 270 60, 270 90, 252 120 L 272 128 C 306 116, 360 118, 386 126"
        fill="none" stroke={C.danger} strokeWidth="5" strokeLinecap="round" opacity="0.8" />
      <text x="240" y="150" style={label({ fill: C.danger, fontSize: 10, fontWeight: 700 })}>FALHA da 2ª onda</text>
      <text x="240" y="163" style={label({ fontSize: 9.5 })}>vaso estreito, ALTA resistência</text>
      <text x="240" y="176" style={label({ fontSize: 9.5 })}>→ hipoperfusão → ↑sFlt-1 / ↓PlGF</text>

      {/* cascata */}
      <rect x={8} y={190} width={414} height={16} rx={8} fill={C.danger} opacity="0.1" />
      <text x={215} y={202} textAnchor="middle" style={label({ fill: C.danger, fontSize: 9.5, fontWeight: 800 })}>
        disfunção endotelial sistêmica → HAS · proteinúria (endoteliose) · plaquetopenia · lesão hepática
      </text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// Infecto — Sífilis: linha do tempo
// ═══════════════════════════════════════════════════════════════
function SifilisEstagios() {
  const fases = [
    { x: 46, t: "PRIMÁRIA", q: "cancro duro", s: "indolor · some sozinho", c: C.accent },
    { x: 158, t: "SECUNDÁRIA", q: "exantema", s: "palmas e plantas", c: C.gold },
    { x: 268, t: "LATENTE", q: "assintomática", s: "só sorologia", c: C.faint },
    { x: 376, t: "TERCIÁRIA", q: "goma · aortite", s: "tabes · Argyll-R.", c: C.danger },
  ];
  return (
    <svg viewBox="0 0 430 170" role="img" aria-label="Estágios da sífilis ao longo do tempo">
      <line x1={20} y1={70} x2={412} y2={70} stroke={C.border} strokeWidth="2" />
      {fases.map((f) => (
        <g key={f.t}>
          <circle cx={f.x} cy={70} r={8} fill={f.c} />
          <text x={f.x} y={44} textAnchor="middle" style={label({ fill: f.c, fontSize: 10, fontWeight: 800 })}>{f.t}</text>
          <text x={f.x} y={92} textAnchor="middle" style={label({ fill: C.text, fontSize: 10, fontWeight: 700 })}>{f.q}</text>
          <text x={f.x} y={104} textAnchor="middle" style={label({ fontSize: 9 })}>{f.s}</text>
        </g>
      ))}
      <text x={100} y={26} textAnchor="middle" style={label({ fill: C.faint, fontSize: 9 })}>3–8 sem</text>
      <text x={212} y={26} textAnchor="middle" style={label({ fill: C.faint, fontSize: 9 })}>6–8 sem</text>
      <text x={322} y={26} textAnchor="middle" style={label({ fill: C.faint, fontSize: 9 })}>anos</text>

      {/* tratamento */}
      <rect x={20} y={122} width={224} height={18} rx={9} fill={C.accent} opacity="0.12" />
      <text x={132} y={135} textAnchor="middle" style={label({ fill: C.accent, fontSize: 9.5, fontWeight: 800 })}>
        Penicilina benzatina 2,4 mi · DOSE ÚNICA
      </text>
      <rect x={252} y={122} width={160} height={18} rx={9} fill={C.danger} opacity="0.12" />
      <text x={332} y={135} textAnchor="middle" style={label({ fill: C.danger, fontSize: 9.5, fontWeight: 800 })}>
        3 doses semanais
      </text>
      <text x={215} y={158} textAnchor="middle" style={label({ fill: C.faint, fontSize: 9 })}>
        Latente recente (&lt; 1 ano) segue a regra da dose única · Neurossífilis: cristalina EV, em qualquer fase
      </text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// MFC — Tabela 2×2 e as fórmulas
// ═══════════════════════════════════════════════════════════════
function Tabela2x2() {
  return (
    <svg viewBox="0 0 430 220" role="img" aria-label="Tabela 2x2 de acurácia diagnóstica">
      <text x={150} y={20} textAnchor="middle" style={label({ fill: C.text, fontSize: 11, fontWeight: 800 })}>DOENTE</text>
      <text x={244} y={20} textAnchor="middle" style={label({ fill: C.text, fontSize: 11, fontWeight: 800 })}>NÃO DOENTE</text>

      <text x={16} y={62} style={label({ fill: C.text, fontSize: 11, fontWeight: 800 })}>Teste +</text>
      <text x={16} y={122} style={label({ fill: C.text, fontSize: 11, fontWeight: 800 })}>Teste −</text>

      {/* células */}
      <rect x={100} y={32} width={100} height={48} rx={8} fill={C.accent} opacity="0.18" />
      <text x={150} y={54} textAnchor="middle" style={label({ fill: C.accent, fontSize: 16, fontWeight: 800 })}>a</text>
      <text x={150} y={70} textAnchor="middle" style={label({ fill: C.accent, fontSize: 8.5 })}>verdadeiro +</text>

      <rect x={204} y={32} width={100} height={48} rx={8} fill={C.danger} opacity="0.14" />
      <text x={254} y={54} textAnchor="middle" style={label({ fill: C.danger, fontSize: 16, fontWeight: 800 })}>b</text>
      <text x={254} y={70} textAnchor="middle" style={label({ fill: C.danger, fontSize: 8.5 })}>FALSO +</text>

      <rect x={100} y={90} width={100} height={48} rx={8} fill={C.danger} opacity="0.14" />
      <text x={150} y={112} textAnchor="middle" style={label({ fill: C.danger, fontSize: 16, fontWeight: 800 })}>c</text>
      <text x={150} y={128} textAnchor="middle" style={label({ fill: C.danger, fontSize: 8.5 })}>FALSO −</text>

      <rect x={204} y={90} width={100} height={48} rx={8} fill={C.accent} opacity="0.18" />
      <text x={254} y={112} textAnchor="middle" style={label({ fill: C.accent, fontSize: 16, fontWeight: 800 })}>d</text>
      <text x={254} y={128} textAnchor="middle" style={label({ fill: C.accent, fontSize: 8.5 })}>verdadeiro −</text>

      {/* setas verticais = S e E */}
      <line x1={150} y1={148} x2={150} y2={162} stroke={C.accent} strokeWidth="1.5" />
      <text x={150} y={175} textAnchor="middle" style={label({ fill: C.accent, fontSize: 9.5, fontWeight: 800 })}>Sens = a/(a+c)</text>
      <line x1={254} y1={148} x2={254} y2={162} stroke={C.accent} strokeWidth="1.5" />
      <text x={254} y={175} textAnchor="middle" style={label({ fill: C.accent, fontSize: 9.5, fontWeight: 800 })}>Espec = d/(b+d)</text>

      {/* setas horizontais = VPP e VPN */}
      <line x1={310} y1={56} x2={324} y2={56} stroke={C.gold} strokeWidth="1.5" />
      <text x={330} y={53} style={label({ fill: C.gold, fontSize: 9.5, fontWeight: 800 })}>VPP = a/(a+b)</text>
      <text x={330} y={65} style={label({ fill: C.faint, fontSize: 8 })}>muda c/ prevalência</text>
      <line x1={310} y1={114} x2={324} y2={114} stroke={C.gold} strokeWidth="1.5" />
      <text x={330} y={111} style={label({ fill: C.gold, fontSize: 9.5, fontWeight: 800 })}>VPN = d/(c+d)</text>
      <text x={330} y={123} style={label({ fill: C.faint, fontSize: 8 })}>muda c/ prevalência</text>

      <text x={16} y={196} style={label({ fill: C.accent, fontSize: 9.5, fontWeight: 800 })}>VERTICAL (↓) = propriedade do teste — não muda com a prevalência</text>
      <text x={16} y={210} style={label({ fill: C.gold, fontSize: 9.5, fontWeight: 800 })}>HORIZONTAL (→) = valor preditivo — MUDA com a prevalência</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// Cirurgia — Vias biliares e a síndrome de Mirizzi
// ═══════════════════════════════════════════════════════════════
function ViasBiliares() {
  return (
    <svg viewBox="0 0 420 220" role="img" aria-label="Anatomia das vias biliares e síndrome de Mirizzi">
      {/* fígado estilizado */}
      <path d="M30 26 C 120 12, 210 18, 240 40 C 210 62, 120 66, 30 54 Z" fill={C.surface2} stroke={C.border} strokeWidth="1.5" />
      <text x={60} y={44} style={label({ fill: C.faint, fontSize: 10, fontWeight: 700 })}>fígado</text>

      {/* ductos hepáticos */}
      <line x1={110} y1={54} x2={140} y2={86} stroke={C.gold} strokeWidth="4" strokeLinecap="round" />
      <line x1={180} y1={54} x2={150} y2={86} stroke={C.gold} strokeWidth="4" strokeLinecap="round" />
      {/* hepático comum */}
      <line x1={145} y1={86} x2={145} y2={124} stroke={C.gold} strokeWidth="5" strokeLinecap="round" />
      <text x={156} y={104} style={label({ fill: C.gold, fontSize: 9.5, fontWeight: 700 })}>hepático comum</text>

      {/* vesícula */}
      <path d="M74 108 C 56 116, 52 146, 70 160 C 88 172, 108 160, 106 138 C 105 124, 92 112, 74 108 Z"
        fill={C.accent} opacity="0.25" stroke={C.accent} strokeWidth="2" />
      <text x={54} y={180} style={label({ fill: C.accent, fontSize: 9.5, fontWeight: 700 })}>vesícula</text>

      {/* ducto cístico */}
      <path d="M104 126 Q 126 118, 145 116" stroke={C.gold} strokeWidth="4" fill="none" strokeLinecap="round" />
      <text x={104} y={110} style={label({ fill: C.gold, fontSize: 9, fontWeight: 700 })}>cístico</text>

      {/* cálculo impactado — Mirizzi */}
      <circle cx={116} cy={122} r={9} fill={C.danger} />
      <path d="M132 118 L 143 118" stroke={C.danger} strokeWidth="2" markerEnd="url(#arrowRed)" />
      <defs>
        <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
        </marker>
      </defs>
      <text x={196} y={130} style={label({ fill: C.danger, fontSize: 10, fontWeight: 800 })}>MIRIZZI</text>
      <text x={196} y={142} style={label({ fill: C.danger, fontSize: 9 })}>cálculo impactado no infundíbulo/cístico</text>
      <text x={196} y={153} style={label({ fill: C.danger, fontSize: 9 })}>comprime o hepático comum POR FORA</text>
      <text x={196} y={164} style={label({ fill: C.danger, fontSize: 9 })}>→ icterícia SEM cálculo no colédoco</text>

      {/* colédoco */}
      <line x1={145} y1={124} x2={145} y2={186} stroke={C.gold} strokeWidth="5" strokeLinecap="round" />
      <text x={100} y={196} style={label({ fill: C.gold, fontSize: 9.5, fontWeight: 700 })}>colédoco</text>
      {/* duodeno */}
      <path d="M120 194 Q 145 210, 176 196" stroke={C.border} strokeWidth="6" fill="none" strokeLinecap="round" />
      <text x={182} y={200} style={label({ fill: C.faint, fontSize: 9 })}>duodeno</text>

      <text x={196} y={182} style={label({ fill: C.faint, fontSize: 9 })}>⚠ risco de lesão iatrogênica na colecistectomia</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// Infectologia — padrão temporal febre × exantema
// ═══════════════════════════════════════════════════════════════
function ExantemasPadraoTemporal() {
  return (
    <svg viewBox="0 0 430 210" role="img" aria-label="Padrão temporal entre febre e exantema: sarampo × exantema súbito">
      {/* eixo de dias comum */}
      {["D1", "D2", "D3", "D4", "D5"].map((d, i) => (
        <text key={d} x={100 + i * 66} y={200} textAnchor="middle" style={label({ fill: C.faint, fontSize: 9 })}>{d}</text>
      ))}

      {/* SARAMPO — febre persiste durante o exantema */}
      <text x={20} y={26} style={label({ fill: C.text, fontSize: 11, fontWeight: 800 })}>Sarampo</text>
      <rect x={68} y={16} width={330} height={18} rx={4} fill={C.gold} opacity="0.28" />
      <text x={233} y={29} textAnchor="middle" style={label({ fill: C.gold, fontSize: 9.5, fontWeight: 800 })}>febre — persiste durante todo o exantema</text>

      <circle cx={100} cy={54} r={4} fill={C.accent} />
      <text x={110} y={58} style={label({ fill: C.accent, fontSize: 9.5, fontWeight: 800 })}>Koplik (patognomônico, precede)</text>

      <rect x={166} y={68} width={232} height={16} rx={4} fill={C.danger} opacity="0.22" />
      <text x={282} y={80} textAnchor="middle" style={label({ fill: C.danger, fontSize: 9.5, fontWeight: 800 })}>exantema céfalo-caudal (D3–D5) — SOBRE a febre</text>

      {/* separador */}
      <line x1={20} y1={104} x2={410} y2={104} stroke={C.border} strokeWidth="1" strokeDasharray="3 3" />

      {/* EXANTEMA SÚBITO — febre cede e ENTÃO surge exantema */}
      <text x={20} y={128} style={label({ fill: C.text, fontSize: 11, fontWeight: 800 })}>Exantema</text>
      <text x={20} y={140} style={label({ fill: C.text, fontSize: 11, fontWeight: 800 })}>súbito</text>
      <rect x={68} y={116} width={166} height={18} rx={4} fill={C.gold} opacity="0.28" />
      <text x={151} y={129} textAnchor="middle" style={label({ fill: C.gold, fontSize: 9.5, fontWeight: 800 })}>febre alta 3–4d</text>

      <line x1={234} y1={110} x2={234} y2={182} stroke={C.text} strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx={234} cy={108} r={4} fill={C.text} />

      <rect x={234} y={116} width={164} height={18} rx={4} fill={C.danger} opacity="0.22" />
      <text x={316} y={129} textAnchor="middle" style={label({ fill: C.danger, fontSize: 9.5, fontWeight: 800 })}>exantema — criança melhora ao surgir</text>

      <text x={234} y={162} textAnchor="middle" style={label({ fill: C.text, fontSize: 10, fontWeight: 800 })}>a febre CAI</text>
      <text x={234} y={175} textAnchor="middle" style={label({ fontSize: 9 })}>exatamente quando o exantema aparece</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// Registry
// ═══════════════════════════════════════════════════════════════
export const FIGURAS: Record<string, Figura> = {
  "go-dpp-vs-pp": {
    id: "go-dpp-vs-pp",
    titulo: "DPP × Placenta prévia",
    legenda:
      "No DPP a placenta está normalmente inserida e descola, formando hematoma retroplacentário — dor e hipertonia, com pouco sangue escuro visível. Na placenta prévia a placenta recobre o orifício interno — sangramento vivo e abundante, mas indolor e com útero de tônus normal.",
    render: () => <DppVsPlacentaPrevia />,
  },
  "inf-tb-primaria-vs-pos": {
    id: "inf-tb-primaria-vs-pos",
    titulo: "TB primária × pós-primária",
    legenda:
      "A primoinfecção forma o foco de Ghon periférico + linfonodo hilar (complexo de Ranke), típico da criança. A reativação cavita em ápice ou segmento apical do lobo inferior — o achado mais cobrado em prova.",
    render: () => <TbPrimariaVsPosPrimaria />,
  },
  "inf-liquor": {
    id: "inf-liquor",
    titulo: "Líquor nas meningites",
    legenda:
      "A glicose baixa é a chave: bactérias e BK consomem glicose, o vírus não. Bacteriana = turvo, PMN, proteína alta, glicose muito baixa.",
    render: () => <LiquorMeningites />,
  },
  "inf-dengue-fases": {
    id: "inf-dengue-fases",
    titulo: "Fases da dengue",
    legenda:
      "A armadilha central: a fase crítica começa QUANDO A FEBRE CAI (3º–6º dia). É aí que o plasma extravasa — hematócrito sobe, plaquetas caem. Defervescência não é melhora.",
    render: () => <DengueFases />,
  },
  "ped-planos-desidratacao": {
    id: "ped-planos-desidratacao",
    titulo: "Planos A, B e C",
    legenda:
      "Turgor cutâneo e estado neurológico são os parâmetros mais fidedignos para classificar. O plano decorre direto da classificação.",
    render: () => <PlanosDesidratacao />,
  },
  "ped-crupe-vs-epiglotite": {
    id: "ped-crupe-vs-epiglotite",
    titulo: "Crupe × Epiglotite",
    legenda:
      "O crupe edemacia ABAIXO das cordas (subglótico) — tosse ladrante, criança pouco toxemiada. A epiglotite edemacia ACIMA — sem tosse, toxemiada, sialorreia e posição em tripé. A diferença central é a toxemia.",
    render: () => <CrupeVsEpiglotite />,
  },
  "ped-zonas-kramer": {
    id: "ped-zonas-kramer",
    titulo: "Zonas de Kramer",
    legenda:
      "A icterícia progride da cabeça para os pés. Serve como triagem grosseira — a decisão de fototerapia é sempre pela bilirrubina plotada no nomograma de Bhutani por hora de vida.",
    render: () => <ZonasKramer />,
  },
  "go-pre-eclampsia-fisiopato": {
    id: "go-pre-eclampsia-fisiopato",
    titulo: "Falha da 2ª onda de invasão trofoblástica",
    legenda:
      "Tudo na pré-eclâmpsia sai daqui: a arteríola espiralada não remodela, permanece de alta resistência → hipoperfusão placentária → desequilíbrio angiogênico (↑sFlt-1, ↓PlGF) → disfunção endotelial materna sistêmica.",
    render: () => <PreEclampsiaFisiopato />,
  },
  "inf-sifilis-estagios": {
    id: "inf-sifilis-estagios",
    titulo: "Estágios da sífilis",
    legenda:
      "O cancro duro some sozinho — o desaparecimento não é cura. A divisão latente recente (< 1 ano) × tardia é o que define dose única versus 3 doses semanais.",
    render: () => <SifilisEstagios />,
  },
  "mfc-tabela-2x2": {
    id: "mfc-tabela-2x2",
    titulo: "Tabela 2×2 — a origem de todas as fórmulas",
    legenda:
      "Leia na VERTICAL para sensibilidade e especificidade (propriedades do teste, estáveis). Leia na HORIZONTAL para VPP e VPN (dependem da prevalência). Essa é a distinção mais cobrada do tema.",
    render: () => <Tabela2x2 />,
  },
  "cir-vias-biliares-mirizzi": {
    id: "cir-vias-biliares-mirizzi",
    titulo: "Vias biliares e síndrome de Mirizzi",
    legenda:
      "Mirizzi é compressão EXTRÍNSECA do hepático comum por cálculo impactado no infundíbulo/cístico — dá icterícia obstrutiva sem cálculo dentro do colédoco, e aumenta o risco de lesão de via biliar na cirurgia.",
    render: () => <ViasBiliares />,
  },
  "inf-exantemas-padrao-temporal": {
    id: "inf-exantemas-padrao-temporal",
    titulo: "Padrão temporal febre × exantema",
    legenda:
      "O detalhe que mais cai: no sarampo a febre PERSISTE durante o exantema; no exantema súbito a febre CAI exatamente quando o exantema surge — a criança melhora ao exantemar.",
    render: () => <ExantemasPadraoTemporal />,
  },

  // ═════════════════════════════════════════════════════════════
  // IMAGENS REAIS — todas com licença verificada na origem.
  // Arquivos baixados para /public/img/clinicas (nunca hotlink).
  // ═════════════════════════════════════════════════════════════
  "inf-tb-miliar-rx-real": {
    id: "inf-tb-miliar-rx-real",
    titulo: "TB miliar — radiografia de tórax",
    legenda:
      "Micronódulos difusos e bilaterais de 1–3 mm, distribuídos por todos os campos — o padrão em \"grãos de milho\" da disseminação hematogênica. Compare com a cavitação apical da forma pós-primária: são apresentações radiológicas completamente distintas do mesmo bacilo.",
    imagem: {
      src: "img/clinicas/tb-miliar-rx.jpg",
      alt: "Radiografia de tórax mostrando padrão miliar: micronódulos difusos bilaterais em todos os campos pulmonares",
      fonte: "Wikimedia Commons",
      licenca: "CC BY 4.0",
      autor: "Herreros B, Plaza I, García R, Chichón M, Guerrero C, et al.",
      url: "https://commons.wikimedia.org/wiki/File:Chest_radiograph_of_miliary_tuberculosis_1.jpg",
    },
  },
  "inf-pneumonia-consolidacao-real": {
    id: "inf-pneumonia-consolidacao-real",
    titulo: "Pneumonia — consolidação lobar",
    legenda:
      "Consolidação homogênea ocupando um lobo, com broncograma aéreo: o ar permanece nos brônquios enquanto o alvéolo se enche de exsudato. É o padrão da PAC típica (pneumocócica) — o oposto do infiltrado intersticial difuso da atípica.",
    imagem: {
      src: "img/clinicas/pneumonia-consolidacao.jpg",
      alt: "Radiografia e tomografia de tórax mostrando consolidação lobar em pneumonia grave",
      fonte: "Wikimedia Commons (Emerging Infectious Diseases, CDC)",
      licenca: "Domínio público",
      autor: "Grottola A, Forghieri F, Meacci M, et al.",
      url: "https://commons.wikimedia.org/wiki/File:Severe_Pneumonia_Caused_by_Legionella_pneumophila_Serogroup_11,_Italy.jpg",
    },
  },
  "inf-sifilis-cancro-real": {
    id: "inf-sifilis-cancro-real",
    titulo: "Cancro duro — sífilis primária",
    legenda:
      "Úlcera de base limpa, bordos endurecidos e bem delimitados, caracteristicamente INDOLOR. É essa ausência de dor que a separa do cancro mole (H. ducreyi), doloroso e de fundo sujo. Some sozinho em 3–8 semanas — e o desaparecimento não significa cura.",
    imagem: {
      src: "img/clinicas/sifilis-cancro-duro.jpg",
      alt: "Lesão ulcerada de bordos endurecidos e base limpa em haste peniana, característica do cancro duro da sífilis primária",
      fonte: "CDC PHIL via Wikimedia Commons",
      licenca: "Domínio público",
      autor: "CDC / M. Rein",
      url: "https://commons.wikimedia.org/wiki/File:Chancres_on_the_penile_shaft_due_to_a_primary_syphilitic_infection_caused_by_Treponema_pallidum_6803_lores.jpg",
    },
  },
  "inf-sifilis-secundaria-real": {
    id: "inf-sifilis-secundaria-real",
    titulo: "Sífilis secundária — exantema papuloescamoso",
    legenda:
      "Lesões papuloescamosas disseminadas da fase secundária, expressando a disseminação sistêmica do treponema. Quando acomete PALMAS e PLANTAS, é praticamente assinatura de sífilis — poucas dermatoses poupam tão pouco essas regiões.",
    imagem: {
      src: "img/clinicas/sifilis-secundaria-exantema.jpg",
      alt: "Exantema papuloescamoso disseminado no dorso, característico da sífilis secundária",
      fonte: "CDC PHIL via Wikimedia Commons",
      licenca: "Domínio público",
      url: "https://commons.wikimedia.org/wiki/File:Secondary_syphilitic_rash_Treponema_pallidum_6756_lores.jpg",
    },
  },
  "inf-sarampo-exantema-real": {
    id: "inf-sarampo-exantema-real",
    titulo: "Sarampo — exantema morbiliforme",
    legenda:
      "Exantema maculopapular avermelhado e confluente, no 3º dia de erupção. A progressão é craniocaudal (começa atrás das orelhas e na face) e — o ponto que mais cai — a FEBRE PERSISTE durante o exantema, ao contrário do exantema súbito.",
    imagem: {
      src: "img/clinicas/sarampo-exantema.jpg",
      alt: "Criança com exantema maculopapular avermelhado e confluente no dorso e nádegas, no terceiro dia de sarampo",
      fonte: "CDC PHIL via Wikimedia Commons",
      licenca: "Domínio público",
      url: "https://commons.wikimedia.org/wiki/File:Measles_rash_PHIL_4497_lores.jpg",
    },
  },
  "go-mola-hidatiforme-us-real": {
    id: "go-mola-hidatiforme-us-real",
    titulo: "Mola hidatiforme — ultrassonografia",
    legenda:
      "Padrão ecográfico em \"cacho de uvas\" / \"tempestade de neve\" — múltiplos ecos vesiculares dentro da cavidade uterina, sem saco gestacional ou embrião identificável, característico da mola completa.",
    imagem: {
      src: "img/clinicas/mola-hidatiforme-us.jpg",
      alt: "Ultrassonografia transvaginal mostrando padrão vesicular difuso intrauterino característico de mola hidatiforme",
      fonte: "Wikimedia Commons",
      licenca: "CC0",
      autor: "Mikael Häggström",
      url: "https://commons.wikimedia.org/wiki/File:Molar_pregnancy.jpg",
    },
  },
  "go-colo-uterino-colposcopia-real": {
    id: "go-colo-uterino-colposcopia-real",
    titulo: "Colo uterino — colposcopia com área acetobranca",
    legenda:
      "Área acetobranca no colo uterino após aplicação de ácido acético — achado colposcópico sugestivo de neoplasia intraepitelial cervical (NIC), indicação de biópsia dirigida.",
    imagem: {
      src: "img/clinicas/colo-uterino-colposcopia.gif",
      alt: "Colposcopia do colo uterino mostrando área esbranquiçada (acetobranca) após ácido acético",
      fonte: "Wikimedia Commons",
      licenca: "CC BY 4.0",
      autor: "Haeok Lee, Mary Sue Makin, Jasintha T Mtengezo e Address Malata",
      url: "https://commons.wikimedia.org/wiki/File:VIAPosCIN1.gif",
    },
  },
  "go-cancer-mama-mamografia-real": {
    id: "go-cancer-mama-mamografia-real",
    titulo: "Câncer de mama — mamografia",
    legenda:
      "Massa espiculada de alta densidade à mamografia — margens irregulares e espiculadas são o achado clássico de malignidade, em contraste com a margem circunscrita das lesões benignas.",
    imagem: {
      src: "img/clinicas/cancer-mama-mamografia.jpg",
      alt: "Mamografia mostrando massa espiculada de alta densidade, achado característico de carcinoma de mama",
      fonte: "Wikimedia Commons (National Cancer Institute / NIH)",
      licenca: "Domínio público",
      autor: "Dr. Dwight Kaufman, National Cancer Institute",
      url: "https://commons.wikimedia.org/wiki/File:Mammogram_with_obvious_cancer.jpg",
    },
  },
  "inf-sarampo-koplik-real": {
    id: "inf-sarampo-koplik-real",
    titulo: "Sarampo — manchas de Koplik",
    legenda:
      "Manchas de Koplik: pequenos pontos esbranquiçados sobre base eritematosa na mucosa jugal, patognomônicas de sarampo — surgem no pródromo, ANTES do exantema cutâneo, e são um achado precoce valioso para o diagnóstico.",
    imagem: {
      src: "img/clinicas/sarampo-koplik.jpg",
      alt: "Mucosa oral com manchas de Koplik — pontos esbranquiçados patognomônicos do sarampo",
      fonte: "Wikimedia Commons (CDC PHIL)",
      licenca: "Domínio público",
      autor: "CDC",
      url: "https://commons.wikimedia.org/wiki/File:Koplik_spots,_measles_6111_lores.jpg",
    },
  },
  "inf-tb-cavitaria-real": {
    id: "inf-tb-cavitaria-real",
    titulo: "Tuberculose pós-primária — cavitação em RX de tórax",
    legenda:
      "Cavitação em lobo superior — o achado clássico da TB pós-primária (reativação), tipicamente em ápices pulmonares. Compare com o padrão miliar (micronódulos difusos): são apresentações radiológicas distintas do mesmo bacilo, uma da reativação e outra da disseminação hematogênica.",
    imagem: {
      src: "img/clinicas/tb-cavitaria-rx.jpg",
      alt: "Radiografia de tórax mostrando cavitação em lobo superior, achado clássico de tuberculose pós-primária",
      fonte: "Wikimedia Commons",
      licenca: "CC BY-SA 2.0",
      autor: "Yale Rosen",
      url: "https://commons.wikimedia.org/wiki/File:Cavitary_tuberculosis.jpg",
    },
  },
  "ped-crupe-rx-real": {
    id: "ped-crupe-rx-real",
    titulo: "Crupe — radiografia cervical (sinal da torre)",
    legenda:
      "Estreitamento subglótico em coluna de ar, o \"sinal da torre de igreja\" (steeple sign), característico do crupe viral — reflete o edema logo abaixo das cordas vocais.",
    imagem: {
      src: "img/clinicas/crupe-sinal-torre.jpg",
      alt: "Radiografia cervical AP mostrando estreitamento subglótico em coluna, sinal da torre de igreja do crupe",
      fonte: "Wikimedia Commons",
      licenca: "CC BY-SA 3.0",
      autor: "Frank Gaillard",
      url: "https://commons.wikimedia.org/wiki/File:Croup_steeple_sign.jpg",
    },
  },
  "ped-epiglotite-rx-real": {
    id: "ped-epiglotite-rx-real",
    titulo: "Epiglotite — radiografia cervical (sinal do polegar)",
    legenda:
      "Epiglote edemaciada, espessada, projetando-se como um \"polegar\" na radiografia cervical lateral — o sinal do polegar (thumb sign), clássico da epiglotite aguda. Emergência: manipular a via aérea com extrema cautela.",
    imagem: {
      src: "img/clinicas/epiglotite-sinal-polegar.jpg",
      alt: "Radiografia cervical lateral mostrando epiglote edemaciada em formato de polegar, sinal clássico de epiglotite",
      fonte: "Wikimedia Commons",
      licenca: "CC0",
      autor: "Med Chaos",
      url: "https://commons.wikimedia.org/wiki/File:Epiglottitis.jpg",
    },
  },
  "cir-pneumotorax-real": {
    id: "cir-pneumotorax-real",
    titulo: "Pneumotórax — tomografia de tórax",
    legenda:
      "Ar livre no espaço pleural, colabando o parênquima pulmonar adjacente — achado que pode ser visto tanto em radiografia simples quanto em TC de tórax.",
    imagem: {
      src: "img/clinicas/pneumotorax-rx.jpg",
      alt: "Tomografia de tórax mostrando pneumotórax com colabamento pulmonar",
      fonte: "Wikimedia Commons",
      licenca: "CC BY-SA 2.5",
      autor: "Clinical Cases (Wikipedia)",
      url: "https://commons.wikimedia.org/wiki/File:Pneumothorax_CT.jpg",
    },
  },
  "cir-apendicite-tc-real": {
    id: "cir-apendicite-tc-real",
    titulo: "Apendicite aguda — tomografia computadorizada",
    legenda:
      "Apêndice espessado e distendido, com borramento da gordura periapendicular — achados tomográficos clássicos de apendicite aguda.",
    imagem: {
      src: "img/clinicas/apendicite-tc.jpg",
      alt: "Tomografia de abdome mostrando apêndice espessado e inflamado, achado de apendicite aguda",
      fonte: "Wikimedia Commons",
      licenca: "CC BY-SA 4.0",
      autor: "Cerevisae",
      url: "https://commons.wikimedia.org/wiki/File:CT_scan_of_the_abdomen_showing_acute_appendicitis.jpg",
    },
  },
  "cir-obstrucao-intestinal-real": {
    id: "cir-obstrucao-intestinal-real",
    titulo: "Obstrução intestinal — radiografia de abdome",
    legenda:
      "Alças intestinais dilatadas com múltiplos níveis hidroaéreos — o padrão radiográfico clássico da obstrução intestinal mecânica.",
    imagem: {
      src: "img/clinicas/obstrucao-intestinal-rx-niveis.jpg",
      alt: "Radiografia de abdome mostrando alças dilatadas e níveis hidroaéreos, achado de obstrução intestinal",
      fonte: "Wikimedia Commons",
      licenca: "CC BY-SA 4.0",
      autor: "Igboeze",
      url: "https://commons.wikimedia.org/wiki/File:1._Bowel-obstruction-x-ray.jpg",
    },
  },
  "mfc-pe-diabetico-real": {
    id: "mfc-pe-diabetico-real",
    titulo: "Pé diabético — úlcera neuropática",
    legenda:
      "Úlcera plantar em área de pressão, tipicamente indolor pela neuropatia periférica associada ao diabetes — reforça a importância do exame regular dos pés e da prevenção (calçados adequados, inspeção diária).",
    imagem: {
      src: "img/clinicas/pe-diabetico-ulcera.jpg",
      alt: "Pé com úlcera neuropática em região plantar, característica do pé diabético",
      fonte: "Wikimedia Commons",
      licenca: "CC BY 4.0",
      autor: "Mark A. Dreyer, DPM, FACFAS",
      url: "https://commons.wikimedia.org/wiki/File:Diabetic_Foot_Ulcer.jpg",
    },
  },
  "clm-baqueteamento-digital-real": {
    id: "clm-baqueteamento-digital-real",
    titulo: "Baqueteamento digital",
    legenda:
      "Aumento do ângulo entre a prega ungueal e a unha (perda do ângulo de Lovibond) com abaulamento da falange distal — sinal clássico associado a doenças pulmonares crônicas, cardiopatias cianóticas e outras condições sistêmicas.",
    imagem: {
      src: "img/clinicas/baqueteamento-digital.jpg",
      alt: "Dedos com baqueteamento digital, mostrando abaulamento característico da falange distal",
      fonte: "Wikimedia Commons",
      licenca: "CC BY-SA 4.0",
      autor: "Wesalius",
      url: "https://commons.wikimedia.org/wiki/File:Clubbing_fingers_2.jpg",
    },
  },
  "clm-cianose-labios-real": {
    id: "clm-cianose-labios-real",
    titulo: "Cianose central",
    legenda:
      "Coloração azulada de lábios e extremidades por dessaturação de oxi-hemoglobina — cianose central quando envolve mucosas (lábios, língua), sinal de hipoxemia significativa.",
    imagem: {
      src: "img/clinicas/cianose-labios.jpg",
      alt: "Lábios e extremidades com coloração azulada característica de cianose",
      fonte: "Wikimedia Commons",
      licenca: "CC BY-SA 4.0",
      autor: "Göttgens, Baks, Harteveld, Goossens & van Gammeren",
      url: "https://commons.wikimedia.org/wiki/File:Cyanotic_extremities_and_cyanotic_lip_discoloration.jpg",
    },
  },
  "reu-gota-tofos-real": {
    id: "reu-gota-tofos-real",
    titulo: "Gota — tofos gotosos",
    legenda:
      "Depósitos de cristais de urato (tofos) em mãos de paciente com gota crônica — achado tardio da doença não controlada, frequentemente periarticular.",
    imagem: {
      src: "img/clinicas/gota-tofos.jpg",
      alt: "Mão com tofos gotosos, depósitos de cristais de urato característicos de gota crônica",
      fonte: "Wikimedia Commons (Wellcome Collection)",
      licenca: "CC BY 4.0",
      autor: "Leonard Portal Mark",
      url: "https://commons.wikimedia.org/wiki/File:Right_hand_of_a_woman_suffering_from_chronic_gout_Wellcome_L0062320.jpg",
    },
  },
  "inf-escabiose-real": {
    id: "inf-escabiose-real",
    titulo: "Escabiose — lesões cutâneas",
    legenda:
      "Lesões papulares e escoriações por prurido intenso, tipicamente de piora noturna, em distribuição característica (interdígitos, punhos, região periumbilical) — escabiose (infestação por Sarcoptes scabiei).",
    imagem: {
      src: "img/clinicas/escabiose-lesoes.jpg",
      alt: "Pele com lesões papulares características de escabiose",
      fonte: "Wikimedia Commons",
      licenca: "CC BY-SA 2.0",
      autor: "Atlas of Medical Foreign Bodies",
      url: "https://commons.wikimedia.org/wiki/File:Skin_-_Scabies_(49415528603).jpg",
    },
  },
  "ped-maos-pes-boca-real": {
    id: "ped-maos-pes-boca-real",
    titulo: "Doença mão-pé-boca — exantema",
    legenda:
      "Vesículas e pápulas eritematosas em mãos, tipicamente associadas a lesões semelhantes em pés e mucosa oral — doença mão-pé-boca, geralmente por Coxsackievírus A16 ou Enterovírus 71.",
    imagem: {
      src: "img/clinicas/maos-pes-boca-lesoes.jpg",
      alt: "Mãos com vesículas e pápulas eritematosas características de doença mão-pé-boca",
      fonte: "Wikimedia Commons",
      licenca: "CC BY-SA 3.0",
      autor: "James Heilman, MD",
      url: "https://commons.wikimedia.org/wiki/File:Characteristic_rash_of_hand,_foot,_and_mouth_disease,_on_human_hands.jpg",
    },
  },
  "go-mioma-us-real": { id: "go-mioma-us-real", titulo: "Mioma uterino — ultrassonografia", legenda: "Massa miometrial compatível com leiomioma uterino à ultrassonografia.", imagem: { src: "img/clinicas/mioma-uterino-us.png", alt: "Ultrassonografia mostrando leiomioma uterino", fonte: "Wikimedia Commons", licenca: "CC BY-SA 3.0", autor: "Nevit Dilmen", url: "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_0112154645_1552050.png" } },
  "go-ectopica-us-real": { id: "go-ectopica-us-real", titulo: "Gravidez ectópica — ultrassonografia", legenda: "Imagem ultrassonográfica de gestação ectópica; deve ser interpretada em conjunto com β-hCG e avaliação clínica.", imagem: { src: "img/clinicas/gravidez-ectopica-us.jpg", alt: "Ultrassonografia de gravidez ectópica", fonte: "Wikimedia Commons", licenca: "Domínio público", autor: "X. Compagnion", url: "https://commons.wikimedia.org/wiki/File:Ectopic_pregnancy.JPG" } },
  "go-sop-us-real": { id: "go-sop-us-real", titulo: "Ovários policísticos — ultrassonografia", legenda: "Ultrassonografia pélvica com morfologia ovariana policística; isoladamente, o achado não estabelece o diagnóstico de SOP.", imagem: { src: "img/clinicas/sop-us-ovario.jpg", alt: "Ultrassonografia pélvica com morfologia ovariana policística", fonte: "Wikimedia Commons", licenca: "CC0", autor: "Anne Mousse", url: "https://commons.wikimedia.org/wiki/File:Echographie_pelvienne,_aplio_toshiba_ssa_700_5_2004_03.JPG" } },
  "ped-ictericia-rn-real": { id: "ped-ictericia-rn-real", titulo: "Icterícia neonatal", legenda: "Coloração amarelada da pele no recém-nascido, manifestação clínica da hiperbilirrubinemia.", imagem: { src: "img/clinicas/ictericia-kramer-rn.jpg", alt: "Recém-nascido com icterícia", fonte: "CDC via Wikimedia Commons", licenca: "Domínio público", autor: "Dr. Hudson", url: "https://commons.wikimedia.org/wiki/File:Jaundice_in_newborn.jpg" } },
  "ped-intussuscepcao-us-real": { id: "ped-intussuscepcao-us-real", titulo: "Intussuscepção — sinal do alvo", legenda: "Corte transversal ultrassonográfico com anéis concêntricos, o sinal do alvo da intussuscepção.", imagem: { src: "img/clinicas/intussuscepcao-us-alvo.jpg", alt: "Ultrassonografia com sinal do alvo em intussuscepção", fonte: "Wikimedia Commons", licenca: "CC BY-SA 3.0", autor: "Frank Gaillard", url: "https://commons.wikimedia.org/wiki/File:Intussusception_on_ultrasound.jpg" } },
  "ped-piloro-us-real": { id: "ped-piloro-us-real", titulo: "Estenose hipertrófica do piloro — ultrassonografia", legenda: "Espessamento e alongamento do canal pilórico à ultrassonografia.", imagem: { src: "img/clinicas/estenose-piloro-us.jpg", alt: "Ultrassonografia de estenose hipertrófica do piloro", fonte: "Wikimedia Commons", licenca: "CC BY-SA 4.0", autor: "Laughlin Dawes", url: "https://commons.wikimedia.org/wiki/File:PyloricStenosisUS.jpg" } },
  "ped-bronquiolite-rx-real": { id: "ped-bronquiolite-rx-real", titulo: "Bronquiolite — radiografia de tórax", legenda: "Hiperinsuflação pulmonar em radiografia pediátrica; o diagnóstico de bronquiolite permanece predominantemente clínico.", imagem: { src: "img/clinicas/bronquiolite-rx-hiperinsuflacao.jpg", alt: "Radiografia de tórax pediátrica com hiperinsuflação em bronquiolite", fonte: "Wikimedia Commons", licenca: "CC BY 2.0", autor: "Di Nardo et al.", url: "https://commons.wikimedia.org/wiki/File:Bronchiolitis_chest_X-ray.jpg" } },
  "ped-kawasaki-real": { id: "ped-kawasaki-real", titulo: "Doença de Kawasaki — achados clínicos", legenda: "Painel clínico com alterações mucocutâneas da doença de Kawasaki, incluindo língua em morango.", imagem: { src: "img/clinicas/kawasaki-lingua-morango.png", alt: "Achados mucocutâneos da doença de Kawasaki", fonte: "Wikimedia Commons", licenca: "CC BY-SA 4.0", autor: "Dong Soo Kim", url: "https://commons.wikimedia.org/wiki/File:Kawasaki.PNG" } },
  "inf-candidiase-oral-real": { id: "inf-candidiase-oral-real", titulo: "Candidíase oral", legenda: "Placas esbranquiçadas na língua compatíveis com candidíase oral, importante infecção oportunista em imunossupressão.", imagem: { src: "img/clinicas/candidiase-oral-hiv.jpg", alt: "Língua com placas de candidíase oral", fonte: "Wikimedia Commons", licenca: "CC BY-SA 3.0", autor: "James Heilman, MD", url: "https://commons.wikimedia.org/wiki/File:Human_tongue_infected_with_oral_candidiasis.jpg" } },
  "inf-zoster-real": { id: "inf-zoster-real", titulo: "Herpes-zóster — distribuição dermatomérica", legenda: "Erupção vesicular unilateral agrupada em trajeto dermatomérico, característica do herpes-zóster.", imagem: { src: "img/clinicas/herpes-zoster-dermatomo.jpg", alt: "Erupção cutânea dermatomérica de herpes-zóster", fonte: "Wikimedia Commons", licenca: "CC0", url: "https://commons.wikimedia.org/wiki/File:%E0%B0%AE%E0%B1%87%E0%B0%96%E0%B0%B2_%E0%B0%B5%E0%B0%BF%E0%B0%B8%E0%B0%B0%E0%B1%8D%E0%B0%AA%E0%B0%BF%E0%B0%A3%E0%B0%BF_(Herpes_Zoster).jpeg" } },
  "inf-caxumba-real": { id: "inf-caxumba-real", titulo: "Caxumba — parotidite", legenda: "Aumento de volume parotídeo associado à caxumba.", imagem: { src: "img/clinicas/caxumba-parotidite.jpg", alt: "Criança com aumento parotídeo por caxumba", fonte: "Wikimedia Commons", licenca: "CC BY-SA 3.0", autor: "Heinrich Weingaertner", url: "https://commons.wikimedia.org/wiki/File:Mumps.jpg" } },
  "inf-leptospirose-real": { id: "inf-leptospirose-real", titulo: "Leptospirose — sufusão conjuntival", legenda: "Sufusão conjuntival, achado clínico sugestivo de leptospirose no contexto epidemiológico apropriado.", imagem: { src: "img/clinicas/leptospirose-sufusao-conjuntival.jpg", alt: "Olhos com sufusão conjuntival em leptospirose", fonte: "Wikimedia Commons", licenca: "CC BY 4.0", autor: "Daniel Ostermayer", url: "https://commons.wikimedia.org/wiki/File:Conjunctival_suffusion_of_the_eyes_due_to_leptospirosis.jpg" } },
  "inf-hanseniase-real": { id: "inf-hanseniase-real", titulo: "Hanseníase — lesão cutânea", legenda: "Mácula hipocrômica sugestiva de hanseníase; a avaliação de sensibilidade é essencial no exame clínico.", imagem: { src: "img/clinicas/hanseniase-lesao-pele.jpg", alt: "Lesão cutânea hipocrômica em hanseníase", fonte: "Wikimedia Commons", licenca: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Lepre713.jpg" } },
  "inf-sifilis-condiloma-real": { id: "inf-sifilis-condiloma-real", titulo: "Sífilis secundária — condiloma lata", legenda: "Pápulas úmidas e elevadas em região perineal, manifestação altamente contagiosa da sífilis secundária. Imagem clínica explícita.", imagem: { src: "img/clinicas/condiloma-lata-sifilis.jpg", alt: "Condilomas planos perineais na sífilis secundária; imagem clínica explícita", fonte: "CDC via Wikimedia Commons", licenca: "Domínio público", autor: "CDC", url: "https://commons.wikimedia.org/wiki/File:Vaginal_syphilis_(disturbing_image).jpg" } },
  "cir-colecistite-us-real": { id: "cir-colecistite-us-real", titulo: "Colecistite — ultrassonografia", legenda: "Espessamento da parede da vesícula biliar, um dos achados ultrassonográficos avaliados na suspeita de colecistite.", imagem: { src: "img/clinicas/colecistite-us-murphy.png", alt: "Ultrassonografia mostrando espessamento da parede da vesícula", fonte: "Wikimedia Commons", licenca: "CC BY-SA 4.0", autor: "James Heilman, MD", url: "https://commons.wikimedia.org/wiki/File:MildGBWallthickening(3.5mm).png" } },
  "clm-hsa-tc-real": { id: "clm-hsa-tc-real", titulo: "Hemorragia subaracnóidea — tomografia", legenda: "Hiperdensidade nos espaços subaracnóideos à tomografia sem contraste.", imagem: { src: "img/clinicas/hemorragia-subaracnoidea-tc.jpg", alt: "Tomografia de crânio com hemorragia subaracnóidea", fonte: "Wikimedia Commons", licenca: "CC BY-SA 3.0", autor: "Lipothymia", url: "https://commons.wikimedia.org/wiki/File:Subarachnoid_haemorrhage.jpg" } },
  "clm-avch-tc-real": { id: "clm-avch-tc-real", titulo: "Hemorragia intracerebral — tomografia", legenda: "Hemorragia intraparenquimatosa com extensão intraventricular, hiperdensa na tomografia sem contraste.", imagem: { src: "img/clinicas/avc-hemorragico-tc.jpg", alt: "Tomografia com hemorragia intracerebral e intraventricular", fonte: "Wikimedia Commons", licenca: "Domínio público", autor: "Glitzy queen00", url: "https://commons.wikimedia.org/wiki/File:Intracerebral_hemorrage_(CT_scan).jpg" } },
  "clm-derrame-pleural-rx-real": { id: "clm-derrame-pleural-rx-real", titulo: "Derrame pleural — radiografia", legenda: "Radiografia em decúbito mostrando líquido livre na cavidade pleural direita.", imagem: { src: "img/clinicas/derrame-pleural-rx.jpg", alt: "Radiografia mostrando derrame pleural direito", fonte: "CDC via Wikimedia Commons", licenca: "Domínio público", autor: "CDC / InvictaHOG", url: "https://commons.wikimedia.org/wiki/File:Pleural_effusion.jpg" } },
  "clm-tep-angio-real": { id: "clm-tep-angio-real", titulo: "Tromboembolismo pulmonar — angioTC", legenda: "Falhas de enchimento em ramos das artérias pulmonares na angiotomografia.", imagem: { src: "img/clinicas/tep-angiotc.jpg", alt: "Angiotomografia com falhas de enchimento por embolia pulmonar", fonte: "Wikimedia Commons", licenca: "CC BY 2.0", autor: "Serra et al.", url: "https://commons.wikimedia.org/wiki/File:Pulmonary_embolism.jpg" } },
  "clm-retino-diabetica-real": { id: "clm-retino-diabetica-real", titulo: "Retinopatia diabética tratada — fundoscopia", legenda: "Fundo de olho após fotocoagulação panretiniana para retinopatia diabética; a imagem demonstra tratamento, não apenas microaneurismas iniciais.", imagem: { src: "img/clinicas/retinopatia-diabetica-fundo.jpg", alt: "Fundo de olho com marcas de fotocoagulação para retinopatia diabética", fonte: "NEI/NIH via Wikimedia Commons", licenca: "Domínio público", autor: "National Eye Institute", url: "https://commons.wikimedia.org/wiki/File:Fundus_photo_showing_scatter_laser_surgery_for_diabetic_retinopathy_EDA09.JPG" } },
  "clm-retino-hipertensiva-real": { id: "clm-retino-hipertensiva-real", titulo: "Retinopatia hipertensiva — fundoscopia", legenda: "Alterações vasculares retinianas associadas à hipertensão arterial.", imagem: { src: "img/clinicas/retinopatia-hipertensiva-fundo.jpg", alt: "Fundo de olho com retinopatia hipertensiva", fonte: "Wikimedia Commons", licenca: "CC BY 3.0", autor: "Frank Wood", url: "https://commons.wikimedia.org/wiki/File:Hypertensiveretinopathy.jpg" } },
  "clm-acantose-real": { id: "clm-acantose-real", titulo: "Acantose nigricans", legenda: "Hiperpigmentação e espessamento aveludado cervical associados com frequência à resistência à insulina.", imagem: { src: "img/clinicas/acantose-nigricans.jpg", alt: "Acantose nigricans na região cervical", fonte: "Wikimedia Commons", licenca: "CC BY-SA 4.0", autor: "Masryyy", url: "https://commons.wikimedia.org/wiki/File:Acanthious_nigricans_new_photo_for_diagnosis,_pigmentation_appears_in_neck_,arm,elbow,it_be_related_often_to_insulin_it_related_to_obesity_and_some_times_called_pseudonigricans.jpg" } },
  "reu-ar-maos-rx-real": { id: "reu-ar-maos-rx-real", titulo: "Artrite reumatoide — radiografia da mão", legenda: "Alterações erosivas e destrutivas avançadas em mão e punho por artrite reumatoide.", imagem: { src: "img/clinicas/artrite-reumatoide-rx-maos.jpg", alt: "Radiografia de mão com artrite reumatoide avançada", fonte: "Wikimedia Commons", licenca: "CC BY 3.0", autor: "Bernd Brägelmann / Martin Steinhoff", url: "https://commons.wikimedia.org/wiki/File:RheumatoideArthritisAP.jpg" } },
  "reu-oa-joelho-rx-real": { id: "reu-oa-joelho-rx-real", titulo: "Osteoartrite do joelho — radiografia", legenda: "Redução do espaço articular, osteófitos e esclerose subcondral na osteoartrite do joelho.", imagem: { src: "img/clinicas/osteoartrite-joelho-rx.jpg", alt: "Radiografia do joelho com osteoartrite", fonte: "Wikimedia Commons", licenca: "CC BY-SA 4.0", autor: "James Heilman, MD", url: "https://commons.wikimedia.org/wiki/File:Osteoarthritis_on_X-ray.jpg" } },
  "ort-fratura-colles-rx-real": { id: "ort-fratura-colles-rx-real", titulo: "Fratura de Colles — radiografia", legenda: "Fratura distal do rádio com desvio dorsal, acompanhada de fratura do estiloide ulnar.", imagem: { src: "img/clinicas/fratura-colles-rx.jpg", alt: "Radiografias de punho com fratura de Colles", fonte: "Wikimedia Commons", licenca: "CC BY-SA 3.0", autor: "Lucien Monfils", url: "https://commons.wikimedia.org/wiki/File:Collesfracture.jpg" } },
  "derm-melanoma-real": { id: "derm-melanoma-real", titulo: "Melanoma cutâneo", legenda: "Lesão pigmentada assimétrica e irregular; a avaliação clínica segue critérios como ABCDE e confirmação histopatológica.", imagem: { src: "img/clinicas/melanoma-lesao.jpg", alt: "Lesão cutânea pigmentada assimétrica compatível com melanoma", fonte: "NCI via Wikimedia Commons", licenca: "Domínio público", autor: "Kelly Nelson", url: "https://commons.wikimedia.org/wiki/File:Melanoma_(1).jpg" } },
  "derm-psoriase-real": { id: "derm-psoriase-real", titulo: "Psoríase em placas", legenda: "Placas eritematoescamosas bem delimitadas características da psoríase.", imagem: { src: "img/clinicas/psoriase-placas.jpg", alt: "Placas eritematoescamosas de psoríase no dorso", fonte: "Wikimedia Commons", licenca: "CC BY-SA 3.0", autor: "Marnanel", url: "https://commons.wikimedia.org/wiki/File:Psoriasis_on_back.jpg" } },
  "go-cisto-ovariano-us-real": { id: "go-cisto-ovariano-us-real", titulo: "Cisto ovariano simples — ultrassonografia", legenda: "Formação anecoica, unilocular e de paredes finas no ovário esquerdo, compatível com cisto simples.", imagem: { src: "img/clinicas/cisto-ovariano-us.png", alt: "Ultrassonografia transvaginal mostrando cisto simples no ovário esquerdo", fonte: "Wikimedia Commons", licenca: "CC BY-SA 3.0", autor: "James Heilman, MD", url: "https://commons.wikimedia.org/wiki/File:2cmleftovariancyst.png" } },
  "inf-dengue-laco-real": { id: "inf-dengue-laco-real", titulo: "Dengue — prova do laço positiva", legenda: "Petéquias após compressão pelo manguito, caracterizando prova do laço positiva; é um achado de fragilidade capilar, não diagnóstico isolado.", imagem: { src: "img/clinicas/dengue-prova-laco-petequias.gif", alt: "Antebraços com petéquias após prova do laço positiva", fonte: "CDC via Wikimedia Commons", licenca: "Domínio público", autor: "CDC", url: "https://commons.wikimedia.org/wiki/File:Positive-tourniquet-test.gif" } },
  "cir-volvo-sigmoide-rx-real": { id: "cir-volvo-sigmoide-rx-real", titulo: "Vôlvulo de sigmoide — sinal do grão de café", legenda: "Alça colônica muito distendida formando o sinal do grão de café na radiografia abdominal.", imagem: { src: "img/clinicas/volvo-sigmoide-rx-graodecafe.jpg", alt: "Radiografia de abdome com sinal do grão de café em vôlvulo de sigmoide", fonte: "Wikimedia Commons", licenca: "CC0", autor: "Mont4nha", url: "https://commons.wikimedia.org/wiki/File:Sigmoidvolvulus.jpg" } },
  "cir-pneumoperitonio-rx-real": { id: "cir-pneumoperitonio-rx-real", titulo: "Pneumoperitônio — radiografia", legenda: "Ar livre intraperitoneal demonstrado em radiografia de abdome em decúbito lateral esquerdo.", imagem: { src: "img/clinicas/pneumoperitonio-rx.jpg", alt: "Radiografia em decúbito lateral mostrando ar livre intraperitoneal", fonte: "Wikimedia Commons", licenca: "CC BY-SA 3.0", autor: "Hellerhoff", url: "https://commons.wikimedia.org/wiki/File:Freie_Luft_Linkseitenlage.jpg" } },
  "clm-ic-rx-real": { id: "clm-ic-rx-real", titulo: "Insuficiência cardíaca — radiografia de tórax", legenda: "Silhueta cardíaca aumentada e congestão pulmonar em paciente com insuficiência cardíaca associada à hipertensão crônica.", imagem: { src: "img/clinicas/insuficiencia-cardiaca-rx-congestao.png", alt: "Radiografia de tórax com cardiomegalia e congestão pulmonar", fonte: "CDC via Wikimedia Commons", licenca: "Domínio público", autor: "CDC", url: "https://commons.wikimedia.org/wiki/File:Congestive_heart_failure_x-ray.png" } },
  "clm-cardiomegalia-rx-real": { id: "clm-cardiomegalia-rx-real", titulo: "Cardiomegalia — radiografia de tórax", legenda: "Aumento da silhueta cardíaca em radiografia AP; a projeção deve ser considerada ao interpretar o tamanho cardíaco.", imagem: { src: "img/clinicas/insuficiencia-cardiaca-rx-congestao.png", alt: "Radiografia de tórax com aumento da silhueta cardíaca", fonte: "CDC via Wikimedia Commons", licenca: "Domínio público", autor: "CDC", url: "https://commons.wikimedia.org/wiki/File:Congestive_heart_failure_x-ray.png" } },
};

export function getFigura(id: string): Figura | undefined {
  return FIGURAS[id];
}
