import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { MetalBadge } from "@/components/ui/MetalBadge";

/** Formatea un precio en MXN. */
function formatPrice(value: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Tarjeta de producto para la cuadrícula del catálogo y secciones destacadas.
 * Imagen con lazy loading y zoom sutil en hover.
 */
export function ProductCard({ product }: { product: Product }) {
  const cover = product.images[0];
  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-1 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-card)]"
    >
      <div className="relative aspect-square overflow-hidden bg-cream">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        {product.engraving && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 text-[10px] uppercase tracking-wider text-gold-soft backdrop-blur">
            Personalizable
          </span>
        )}
      </div>

      {/* Filete dorado que se revela en hover */}
      <span className="block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-gold via-gold-soft to-transparent transition-transform duration-500 group-hover:scale-x-100" />

      <div className="flex flex-1 flex-col p-4">
        <MetalBadge metal={product.metal} purity={product.purity} />
        <h3 className="mt-2 font-display text-lg leading-snug text-ink">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-graphite/70">{product.excerpt}</p>
        <div className="mt-3 flex items-center justify-between">
          {product.priceFrom != null && (
            <span className="text-sm text-graphite">
              <span className="text-xs text-stone-3">Desde </span>
              <span className="font-medium text-ink">
                {formatPrice(product.priceFrom)}
              </span>
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-sm font-medium text-gold-deep transition-colors group-hover:text-gold">
            Ver pieza
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
