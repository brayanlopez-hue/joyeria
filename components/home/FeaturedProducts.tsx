import { getFeaturedProducts } from "@/lib/catalog";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/catalog/ProductCard";

/** Piezas destacadas en el home. */
export async function FeaturedProducts() {
  const products = await getFeaturedProducts(8);
  if (products.length === 0) return null;

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Selección"
          title="Piezas destacadas"
          description="Una muestra de nuestro trabajo. Todas las piezas se cotizan de forma personalizada."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/catalogo" variant="outline">
            Ver todo el catálogo
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
