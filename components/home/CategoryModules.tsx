import Link from "next/link";
import Image from "next/image";
import { Wrench } from "lucide-react";
import { categories } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

// Foto real representativa de cada categoría (las mejores del catálogo).
const categoryCover: Record<string, string> = {
  anillos: "/images/products/photo-anillo-compromiso-solitario-oro.jpg",
  pulseras: "/images/products/photo-esclava-nombre-plata.jpg",
  cadenas: "/images/products/photo-cadena-italiana-oro.jpg",
  dijes: "/images/products/photo-dije-cristo-oro.jpg",
};

/** Módulos de acceso rápido a categorías + Taller (mapa del sitio). */
export function CategoryModules() {
  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Catálogo"
            title="Explora por categoría"
            description="Cada pieza puede personalizarse en oro o plata. Encuentra el estilo que buscas o pídelo a tu medida."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
            <Link
              key={c.slug}
              href={`/catalogo/${c.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-stone-1 bg-cream transition-all duration-300 hover:border-gold/50 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={categoryCover[c.slug]}
                  alt={c.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent transition-opacity duration-300 group-hover:from-ink/90" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-display text-xl text-ivory">
                  {c.name}
                  <span className="ml-2 inline-block text-gold-soft opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </h3>
                <p className="mt-0.5 line-clamp-1 text-xs text-stone-2">{c.blurb}</p>
              </div>
            </Link>
            </Reveal>
          ))}

          {/* Módulo de Taller (servicio, no categoría) */}
          <Reveal delay={0.32} className="grid">
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
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
