import { getFeaturedProducts } from "@/lib/catalog";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

/** Piezas destacadas en el home. */
export async function FeaturedProducts() {
  const products = await getFeaturedProducts(8);
  if (products.length === 0) return null;

  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Selección"
            title="Piezas destacadas"
            description="Una muestra de nuestro trabajo. Todas las piezas se cotizan de forma personalizada."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p._id} delay={(i % 4) * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/catalogo" variant="outline">
              Ver todo el catálogo
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
