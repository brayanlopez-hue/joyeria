import Link from "next/link";
import { METALS, type Metal, type Subcategory } from "@/lib/site";

/** Construye una URL con los parámetros dados (omite los vacíos). */
function buildHref(base: string, params: Record<string, string | undefined>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) sp.set(k, v);
  const qs = sp.toString();
  return qs ? `${base}?${qs}` : base;
}

/** Agrupa subcategorías por su campo `group`, preservando el orden de declaración. */
function groupSubcategories(subs: Subcategory[]): [string, Subcategory[]][] {
  const map = new Map<string, Subcategory[]>();
  for (const s of subs) {
    const g = s.group ?? "";
    if (!map.has(g)) map.set(g, []);
    map.get(g)!.push(s);
  }
  return [...map.entries()];
}

const chipBase =
  "shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors whitespace-nowrap";
const chipActive = "border-gold bg-gold/10 text-gold-deep font-medium";
const chipIdle = "border-stone-1 text-graphite hover:border-gold/60";

/**
 * Filtros del catálogo por metal (Oro/Plata) y, opcionalmente, subcategoría.
 * Las subcategorías pueden mostrarse agrupadas (campo `group`) — ej. Cadenas
 * en "Ocasiones Especiales" / "Estilos Clásicos". El filtrado siempre es por slug.
 * Server component: usa enlaces con query params (compartible y SEO-friendly).
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
  const hasGroups = subcategories?.some((s) => s.group) ?? false;

  function SubChip({ s }: { s: Subcategory }) {
    return (
      <Link
        href={buildHref(basePath, { metal, sub: s.slug })}
        className={`${chipBase} ${activeSub === s.slug ? chipActive : chipIdle}`}
      >
        {s.name}
      </Link>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filtro por metal — deslizable en móvil, envuelve en escritorio */}
      <div className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        <span className="mr-1 shrink-0 text-xs uppercase tracking-wider text-stone-3">
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
        <div className="space-y-3">
          <div className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            <span className="mr-1 shrink-0 text-xs uppercase tracking-wider text-stone-3">
              Tipo
            </span>
            <Link
              href={buildHref(basePath, { metal })}
              className={`${chipBase} ${!activeSub ? chipActive : chipIdle}`}
            >
              Todas
            </Link>
            {/* Sin grupos: lista plana junto a "Todas" */}
            {!hasGroups && subcategories.map((s) => <SubChip key={s.slug} s={s} />)}
          </div>

          {/* Con grupos: un sub-encabezado por grupo */}
          {hasGroups &&
            groupSubcategories(subcategories).map(([group, subs]) => (
              <div key={group} className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
                <span className="mr-1 shrink-0 text-[11px] uppercase tracking-wider text-gold-deep/80">
                  {group}
                </span>
                {subs.map((s) => (
                  <SubChip key={s.slug} s={s} />
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
