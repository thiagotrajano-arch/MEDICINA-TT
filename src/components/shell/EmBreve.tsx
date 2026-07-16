import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function EmBreve({
  titulo,
  descricao,
  fase,
}: {
  titulo: string;
  descricao: string;
  fase: string;
}) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16 text-center sm:py-24">
      <span className="inline-block rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-faint">
        {fase}
      </span>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-text sm:text-3xl">{titulo}</h1>
      <p className="mx-auto mt-2 max-w-lg text-[15px] text-text-muted">{descricao}</p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
      >
        <ArrowLeft className="size-4" /> Voltar ao dashboard
      </Link>
    </div>
  );
}
