import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ValueProps } from "@/components/home/ValueProps";
import { CategoryModules } from "@/components/home/CategoryModules";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Testimonials } from "@/components/home/Testimonials";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { JsonLd, organizationLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationLd()} />
      <Hero />
      <TrustStrip />
      <ValueProps />
      <CategoryModules />
      <FeaturedProducts />
      <Testimonials />

      {/* CTA de cierre */}
      <section className="relative overflow-hidden bg-charcoal py-24 text-center text-ivory">
        {/* Resplandor dorado central */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-full w-[900px] -translate-x-1/2 opacity-25"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(201,162,75,0.35), transparent 60%)",
          }}
        />
        <Container>
          <div className="relative">
            <span className="mx-auto mb-4 block h-1.5 w-1.5 rotate-45 border border-gold/70" />
            <h2 className="font-display text-3xl sm:text-4xl">
              ¿Tienes una idea en mente?
            </h2>
            <span className="gold-rule mx-auto my-6" />
            <p className="mx-auto max-w-xl text-stone-2">
              Cuéntanos qué pieza imaginas y la diseñamos contigo. Cotización sin
              compromiso por WhatsApp.
            </p>
            <div className="mt-9 flex justify-center">
              <WhatsAppButton label="Hablar con un asesor" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
