import type { Metadata } from "next";
import Link from "next/link";
import { categories, type Metal } from "@/lib/site";
import { getAllProducts } from "@/lib/catalog";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FilterBar } from "@/components/catalog/FilterBar";
import { ProductGrid } from "@/components/catalog/ProductGrid";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explora el catálogo de Joyería Diamante: anillos, pulseras y esclavas, cadenas y dijes en oro y plata. Personalización y cotización por WhatsApp.",
};

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ metal?: string }>;
}) {
  const { metal: metalParam } = await searchParams;
  const metal = (metalParam === "oro" || metalParam === "plata"
    ? metalParam
    : undefined) as Metal | undefined;

  const all = await getAllProducts();
  const products = metal ? all.filter((p) => p.metal === metal) : all;

  return (
    <div className="pt-28 pb-10">
      <Container>
        <SectionHeading
          as="h1"
          align="left"
          eyebrow="Catálogo"
          title="Nuestra colección"
          description="Cada pieza puede elaborarse en oro o plata y personalizarse a tu gusto."
        />

        {/* Acceso a categorías */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/catalogo/${c.slug}`}
              className="rounded-full border border-stone-1 px-4 py-1.5 text-sm text-graphite transition-colors hover:border-gold hover:text-gold-deep"
            >
              {c.name}
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <FilterBar basePath="/catalogo" metal={metal} />
        </div>

        <p className="mt-6 text-sm text-stone-3">
          {products.length} {products.length === 1 ? "pieza" : "piezas"}
        </p>

        <div className="mt-4">
          <ProductGrid products={products} />
        </div>
      </Container>
    </div>
  );
}
