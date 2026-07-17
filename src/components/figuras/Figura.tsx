import { getFigura } from "./registry";

/**
 * Renderiza a figura ancorada a uma seção do resumo.
 * Silenciosamente não renderiza nada se o id não existir — assim um resumo
 * nunca quebra por referenciar uma figura que ainda não foi desenhada.
 */
export function Figura({ id }: { id: string }) {
  const figura = getFigura(id);
  if (!figura) return null;

  return (
    <figure className="my-4 overflow-hidden rounded-xl border border-border bg-surface-2">
      <div className="border-b border-border px-4 py-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
          Figura · {figura.titulo}
        </span>
      </div>
      <div className="overflow-x-auto px-3 py-4">
        <div className="min-w-[340px]">{figura.render()}</div>
      </div>
      <figcaption className="border-t border-border px-4 py-2.5 text-[12.5px] leading-snug text-text-muted">
        {figura.legenda}
      </figcaption>
    </figure>
  );
}
