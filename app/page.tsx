import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { CategoryModules } from "@/components/home/CategoryModules";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { JsonLd, organizationLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationLd()} />
      <Hero />
      <ValueProps />
      <CategoryModules />
      <FeaturedProducts />

      {/* CTA de cierre */}
      <section className="bg-ink py-20 text-center text-ivory">
        <Container>
          <h2 className="font-display text-3xl sm:text-4xl">
            ¿Tienes una idea en mente?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-stone-2">
            Cuéntanos qué pieza imaginas y la diseñamos contigo. Cotización sin
            compromiso por WhatsApp.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppButton label="Hablar con un asesor" />
          </div>
        </Container>
      </section>
    </>
  );
}
