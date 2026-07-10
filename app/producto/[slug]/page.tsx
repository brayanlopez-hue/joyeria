import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategory } from "@/lib/site";
import {
  getAllProductSlugs,
  getProductBySlug,
  getProductsByCategory,
} from "@/lib/catalog";
import { Container } from "@/components/ui/Container";
import { MetalBadge } from "@/components/ui/MetalBadge";
import { ProductGallery } from "@/components/catalog/ProductGallery";
import { ProductActions } from "@/components/catalog/ProductActions";
import { ProductCard } from "@/components/catalog/ProductCard";
import { JsonLd, productLd } from "@/components/seo/JsonLd";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.excerpt,
    openGraph: {
      title: product.name,
      description: product.excerpt,
      images: [{ url: product.images[0].src }],
    },
  };
}

function formatPrice(value: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const cat = getCategory(product.category);
  const sub = cat?.subcategories.find((s) => s.slug === product.subcategory);
  const engravingEnabled = product.engraving ?? sub?.engraving ?? false;

  const related = (await getProductsByCategory(product.category))
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="pt-28 pb-10">
      <JsonLd data={productLd(product)} />
      <Container>
        {/* Ruta */}
        <nav className="mb-6 text-sm text-stone-3" aria-label="Ruta">
          <Link href="/catalogo" className="hover:text-gold-deep">
            Catálogo
          </Link>{" "}
          /{" "}
          {cat && (
            <>
              <Link
                href={`/catalogo/${cat.slug}`}
                className="hover:text-gold-deep"
              >
                {cat.name}
              </Link>{" "}
              /{" "}
            </>
          )}
          <span className="text-graphite">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Galería */}
          <ProductGallery images={product.images} />

          {/* Información */}
          <div>
            <MetalBadge metal={product.metal} purity={product.purity} />
            <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              {product.name}
            </h1>
            {product.priceFrom != null && (
              <p className="mt-3 text-lg text-graphite">
                <span className="text-sm text-stone-3">Desde </span>
                <span className="font-medium text-ink">
                  {formatPrice(product.priceFrom)}
                </span>
              </p>
            )}
            <span className="gold-rule my-6" />
            <p className="leading-relaxed text-graphite/85">{product.description}</p>

            <div className="mt-4 text-sm text-stone-3">
              {sub && (
                <p>
                  Categoría:{" "}
                  <Link
                    href={`/catalogo/${product.category}?sub=${sub.slug}`}
                    className="text-gold-deep hover:underline"
                  >
                    {cat?.name} · {sub.name}
                  </Link>
                </p>
              )}
            </div>

            <div className="mt-8">
              <ProductActions
                productName={product.name}
                metal={product.metal}
                engraving={engravingEnabled}
              />
            </div>

            <p className="mt-4 text-center text-xs text-stone-3">
              Cotización sin compromiso por WhatsApp.
            </p>
          </div>
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl text-ink">También te puede gustar</h2>
            <span className="gold-rule my-5" />
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
