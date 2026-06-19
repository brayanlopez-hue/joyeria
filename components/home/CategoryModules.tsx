import Link from "next/link";
import Image from "next/image";
import { Wrench } from "lucide-react";
import { categories } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const imgBase: Record<string, string> = {
  anillos: "anillo",
  pulseras: "pulsera",
  cadenas: "cadena",
  dijes: "dije",
};

/** Módulos de acceso rápido a categorías + Taller (mapa del sitio). */
export function CategoryModules() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Catálogo"
          title="Explora por categoría"
          description="Cada pieza puede personalizarse en oro o plata. Encuentra el estilo que buscas o pídelo a tu medida."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/catalogo/${c.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-stone-1 bg-cream"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={`/images/products/${imgBase[c.slug]}-oro.svg`}
                  alt={c.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-display text-xl text-ivory">{c.name}</h3>
                <p className="mt-0.5 line-clamp-1 text-xs text-stone-2">{c.blurb}</p>
              </div>
            </Link>
          ))}

          {/* Módulo de Taller (servicio, no categoría) */}
          <Link
            href="/taller"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-ink p-5 text-ivory transition-colors hover:bg-graphite"
          >
            <Wrench className="text-gold" size={28} />
            <div>
              <h3 className="font-display text-xl">Taller</h3>
              <p className="mt-0.5 text-xs text-stone-2">
                Composturas, soldadura y ajuste de tallas.
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-gold transition-colors group-hover:text-gold-soft">
                Cotizar reparación →
              </span>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
