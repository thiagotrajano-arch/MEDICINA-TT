"use client";

import { useEffect } from "react";
import { RefreshCw, TriangleAlert } from "lucide-react";
import { registrarErro } from "@/lib/monitor";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { registrarErro("app-boundary", error.message, { tipo: "boundary", codigo: error.digest }); }, [error]);
  return (
    <div className="product-page max-w-xl text-center" role="alert">
      <TriangleAlert className="mx-auto size-9 text-danger" />
      <h1 className="mt-4 text-xl font-bold text-text">Não foi possível carregar esta área</h1>
      <p className="mt-2 text-sm leading-6 text-text-muted">Seu progresso local foi preservado. Tente novamente ou volte ao início.</p>
      <button onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-contrast"><RefreshCw className="size-4" /> Tentar novamente</button>
    </div>
  );
}
