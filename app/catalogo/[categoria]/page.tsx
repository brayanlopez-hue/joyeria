import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory, type Metal } from "@/lib/site";
import { getProductsByCategory } from "@/lib/catalog";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FilterBar } from "@/components/catalog/FilterBar";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { RingSizeGuide } from "@/components/catalog/RingSizeGuide";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

type Params = { categoria: string };
type Search = { metal?: string; sub?: string };

/** Pre-genera las rutas de categoría en build. */
export function generateStaticParams(): Params[] {
  return categories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const cat = getCategory(categoria);
  if (!cat) return {};
  return {
    title: cat.name,
    description: `${cat.name} en oro y plata — ${cat.blurb} Cotiza tu pieza personalizada en Joyería Diamante.`,
  };
}

export default async function CategoriaPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { categoria } = await params;
  const { metal: metalParam, sub } = await searchParams;

  const cat = getCategory(categoria);
  if (!cat) notFound();

  const metal = (metalParam === "oro" || metalParam === "plata"
    ? metalParam
    : undefined) as Metal | undefined;
  const activeSub = cat.subcategories.some((s) => s.slug === sub) ? sub : undefined;

  const products = await getProductsByCategory(cat.slug, {
    metal,
    subcategory: activeSub,
  });

  const basePath = `/catalogo/${cat.slug}`;

  return (
    <div className="pt-28 pb-10">
      <Container>
        <nav className="mb-4 text-sm text-stone-3" aria-label="Ruta">
          <a href="/catalogo" className="hover:text-gold-deep">
            Catálogo
          </a>{" "}
          / <span className="text-graphite">{cat.name}</span>
        </nav>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="Catálogo"
            title={cat.name}
            description={cat.blurb}
          />
          {/* Guía de tallas interactiva solo para anillos */}
          {cat.slug === "anillos" && <RingSizeGuide />}
        </div>

        <div className="mt-8">
          <FilterBar
            basePath={basePath}
            metal={metal}
            activeSub={activeSub}
            subcategories={cat.subcategories}
          />
        </div>

        <p className="mt-6 text-sm text-stone-3">
          {products.length} {products.length === 1 ? "pieza" : "piezas"}
        </p>

        <div className="mt-4">
          <ProductGrid products={products} />
        </div>

        {/* CTA contextual a WhatsApp */}
        <div className="mt-14 flex flex-col items-center gap-3 rounded-2xl border border-stone-1 bg-cream/50 p-8 text-center">
          <p className="font-display text-xl text-ink">
            ¿No encuentras exactamente lo que buscas?
          </p>
          <p className="max-w-md text-sm text-graphite/75">
            Diseñamos {cat.name.toLowerCase()} a tu medida. Cuéntanos tu idea.
          </p>
          <WhatsAppButton context={{ categorySlug: cat.slug, subcategorySlug: activeSub }} />
        </div>
      </Container>
    </div>
  );
}
