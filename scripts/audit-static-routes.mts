const base = (process.env.SITE_BASE_URL ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const routes = ["/", "/questoes/", "/biblioteca/", "/mapas-mentais/", "/meu-curso/", "/agenda/", "/minha-midia/", "/semestres/"];
const proibidos = [/Application error/i, /Unhandled Runtime Error/i, /Internal Server Error/i, /22102004/i, /material_privado_usuario/i];

function textoSemTags(valor: string): string {
  return valor.replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/\s+/g, " ").trim();
}

function idsDuplicados(html: string): string[] {
  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/gi)].map((item) => item[1]);
  return [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
}

let falhas = 0;
for (const route of routes) {
  try {
    const resposta = await fetch(`${base}${route}`, { signal: AbortSignal.timeout(30_000) });
    const html = await resposta.text();
    const erros = proibidos.filter((padrao) => padrao.test(html)).map((padrao) => padrao.source);
    const imagensSemAlt = [...html.matchAll(/<img\b[^>]*>/gi)].filter((item) => !/\salt\s*=\s*["'][^"']*["']/i.test(item[0])).length;
    const h1 = (html.match(/<h1\b/gi) ?? []).length;
    const botoesSemNome = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)].filter((item) => {
      const attrs = item[1];
      return !/\b(aria-label|title)\s*=/.test(attrs) && !textoSemTags(item[2]);
    }).length;
    const duplicados = idsDuplicados(html);
    const rotaAutenticada = ["/meu-curso/", "/agenda/", "/minha-midia/"].includes(route);
    const h1Valido = h1 === 1 || (rotaAutenticada && h1 === 0);
    const status = resposta.ok && !erros.length && imagensSemAlt === 0 && botoesSemNome === 0 && duplicados.length === 0 && h1Valido ? "PASS" : "FAIL";
    if (status === "FAIL") falhas += 1;
    console.log(`${status} ${route} status=${resposta.status} bytes=${html.length} h1=${h1} imgSemAlt=${imagensSemAlt} botoesSemNome=${botoesSemNome} idsDuplicados=${duplicados.length} erros=${erros.length}`);
  } catch (erro) {
    falhas += 1;
    console.log(`FAIL ${route} indisponivel=${erro instanceof Error ? erro.message : "erro desconhecido"}`);
  }
}

if (falhas) process.exitCode = 1;
