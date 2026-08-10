"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";

export function FiguraImagemClient({ src, alt }: { src: string; alt: string }) {
  const [aberta, setAberta] = useState(false);
  const fecharRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberta) return;
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    fecharRef.current?.focus();
    const aoTeclado = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setAberta(false);
    };
    window.addEventListener("keydown", aoTeclado);
    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", aoTeclado);
    };
  }, [aberta]);

  return (
    <>
      <button
        type="button"
        onClick={() => setAberta(true)}
        className="group relative mx-auto block cursor-zoom-in rounded-lg focus-visible:outline-offset-4"
        aria-label={`Ampliar figura: ${alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" decoding="async" className="max-h-[420px] w-auto max-w-full rounded-lg" />
        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold text-white opacity-90 transition-opacity group-hover:opacity-100">
          <Maximize2 className="size-3" /> ampliar
        </span>
      </button>

      {aberta && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Figura ampliada: ${alt}`}
          className="fixed inset-0 z-[80] grid place-items-center bg-[#04101b]/92 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setAberta(false)}
        >
          <button
            ref={fecharRef}
            type="button"
            onClick={() => setAberta(false)}
            aria-label="Fechar figura ampliada"
            className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/22"
          >
            <X className="size-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-[92vh] max-w-[96vw] object-contain"
            onClick={(evento) => evento.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
