import Link from "next/link";
import { METALS, type Metal, type Subcategory } from "@/lib/site";

/** Construye una URL con los parámetros dados (omite los vacíos). */
function buildHref(base: string, params: Record<string, string | undefined>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) sp.set(k, v);
  const qs = sp.toString();
  return qs ? `${base}?${qs}` : base;
}

const chipBase =
  "rounded-full border px-4 py-1.5 text-sm transition-colors whitespace-nowrap";
const chipActive = "border-gold bg-gold/10 text-gold-deep font-medium";
const chipIdle = "border-stone-1 text-graphite hover:border-gold/60";

/**
 * Filtros del catálogo por metal (Oro/Plata) y, opcionalmente, subcategoría.
 * Server component: usa enlaces con query params para que el filtrado sea
 * compartible y amigable con SEO (sin JS).
 */
export function FilterBar({
  basePath,
  metal,
  activeSub,
  subcategories,
}: {
  basePath: string;
  metal?: Metal;
  activeSub?: string;
  subcategories?: Subcategory[];
}) {
  return (
    <div className="space-y-4">
      {/* Filtro por metal */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs uppercase tracking-wider text-stone-3">
          Metal
        </span>
        <Link
          href={buildHref(basePath, { sub: activeSub })}
          className={`${chipBase} ${!metal ? chipActive : chipIdle}`}
        >
          Todos
        </Link>
        {METALS.map((m) => (
          <Link
            key={m.value}
            href={buildHref(basePath, { metal: m.value, sub: activeSub })}
            className={`${chipBase} ${metal === m.value ? chipActive : chipIdle}`}
          >
            {m.label}
          </Link>
        ))}
      </div>

      {/* Filtro por subcategoría */}
      {subcategories && subcategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="mr-1 text-xs uppercase tracking-wider text-stone-3">
            Tipo
          </span>
          <Link
            href={buildHref(basePath, { metal })}
            className={`${chipBase} ${!activeSub ? chipActive : chipIdle}`}
          >
            Todas
          </Link>
          {subcategories.map((s) => (
            <Link
              key={s.slug}
              href={buildHref(basePath, { metal, sub: s.slug })}
              className={`${chipBase} ${activeSub === s.slug ? chipActive : chipIdle}`}
            >
              {s.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
