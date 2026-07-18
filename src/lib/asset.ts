/**
 * Monta o caminho de um arquivo estático de `public/`.
 *
 * Necessário porque o Next aplica o `basePath` automaticamente apenas a
 * `next/link` e `next/image` — uma `<img src>` ou `fetch` comum ficaria
 * apontando para a raiz do domínio e quebraria no GitHub Pages, onde o site
 * vive sob `/MEDICINA-TT`.
 *
 * Uso: `asset("img/clinicas/tb-miliar-rx.jpg")` (sem barra inicial).
 */
export function asset(caminho: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}/${caminho.replace(/^\/+/, "")}`;
}
