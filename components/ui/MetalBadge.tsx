import type { Metal } from "@/lib/site";

/** Etiqueta visual del metal con su pureza. */
export function MetalBadge({ metal, purity }: { metal: Metal; purity?: string }) {
  const styles =
    metal === "oro"
      ? "border-gold/40 bg-gold/10 text-gold-deep"
      : "border-silver-deep/40 bg-silver/15 text-silver-deep";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider ${styles}`}
    >
      {metal === "oro" ? "Oro" : "Plata"}
      {purity ? ` · ${purity}` : ""}
    </span>
  );
}
