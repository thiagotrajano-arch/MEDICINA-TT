import { getFigura } from "./registry";
import { asset } from "@/lib/asset";

/**
 * Renderiza a figura ancorada a uma seção do resumo — diagrama SVG ou imagem
 * real. Silenciosamente não renderiza nada se o id não existir, para que um
 * resumo nunca quebre por referenciar figura ainda não desenhada.
 */
/** Renderiza uma ou várias figuras ancoradas à mesma seção. */
export function Figuras({ ids }: { ids: string | string[] }) {
  const lista = Array.isArray(ids) ? ids : [ids];
  return (
    <>
      {lista.map((id) => (
        <Figura key={id} id={id} />
      ))}
    </>
  );
}

export function Figura({ id }: { id: string }) {
  const figura = getFigura(id);
  if (!figura) return null;

  const { imagem } = figura;

  return (
    <figure className="my-4 overflow-hidden rounded-xl border border-border bg-surface-2">
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
          Figura · {figura.titulo}
        </span>
        {imagem && (
          <span className="flex-none rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold text-text-faint">
            imagem real
          </span>
        )}
      </div>

      {imagem ? (
        <div className="bg-black/[0.03] px-3 py-4 dark:bg-white/[0.02]">
          {/* Imagem servida do próprio site (public/img). `unoptimized` não é
              necessário: o build estático já exporta os arquivos como estão. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(imagem.src)}
            alt={imagem.alt}
            loading="lazy"
            className="mx-auto max-h-[420px] w-auto max-w-full rounded-lg"
          />
        </div>
      ) : (
        <div className="overflow-x-auto px-3 py-4">
          <div className="min-w-[340px]">{figura.render?.()}</div>
        </div>
      )}

      <figcaption className="border-t border-border px-4 py-2.5 text-[12.5px] leading-snug text-text-muted">
        {figura.legenda}
        {imagem && (
          <span className="mt-1.5 block text-[11px] text-text-faint">
            Fonte: {imagem.autor ? `${imagem.autor} · ` : ""}
            {imagem.url ? (
              <a
                href={imagem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted hover:text-accent"
              >
                {imagem.fonte}
              </a>
            ) : (
              imagem.fonte
            )}{" "}
            — {imagem.licenca}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
