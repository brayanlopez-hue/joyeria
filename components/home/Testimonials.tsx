import { Star, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    name: "Mariana Gutiérrez",
    city: "CDMX",
    rating: 5,
    text: "Me hicieron mi anillo de compromiso exactamente como lo imaginé. Me mandaron fotos del avance durante el proceso y quedó perfecto. ¡Mi prometido lloró cuando lo vio!",
    product: "Anillo de compromiso en oro",
  },
  {
    name: "Carlos Mendoza",
    city: "Edo. de México",
    rating: 5,
    text: "Llevé una pulsera rota que era de mi abuela y la restauraron perfecta, mejor que nueva. El precio fue muy justo, el trato excelente y la entrega rapidísima.",
    product: "Compostura de pulsera",
  },
  {
    name: "Sofía Ramírez",
    city: "CDMX",
    rating: 5,
    text: "Pedí una esclava grabada con el nombre de mi hija recién nacida. La calidad del oro es impresionante y el grabado quedó muy elegante. Sin duda volvería.",
    product: "Esclava grabada en oro",
  },
];

export function Testimonials() {
  return (
    <section className="bg-ink py-20 text-ivory">
      <Container>
        <SectionHeading
          eyebrow="Clientes felices"
          title="Lo que dicen nuestros clientes"
          description="Cada pieza lleva detrás una historia. Esto es lo que nos comparten quienes confían en nosotros."
          light
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              {/* Comillas decorativas */}
              <Quote
                size={28}
                className="absolute right-5 top-5 text-gold/20"
                aria-hidden
              />

              {/* Estrellas */}
              <div className="flex gap-1" aria-label={`${t.rating} de 5 estrellas`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-gold text-gold"
                    aria-hidden
                  />
                ))}
              </div>

              {/* Texto */}
              <p className="flex-1 text-sm leading-relaxed text-stone-2">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Producto */}
              <span className="inline-block rounded-full border border-gold/25 px-3 py-1 text-xs text-gold-soft">
                {t.product}
              </span>

              {/* Autor */}
              <div className="flex items-center gap-3 border-t border-white/8 pt-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold/40 to-gold/20 text-sm font-semibold text-gold-soft">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-ivory">{t.name}</p>
                  <p className="text-xs text-stone-3">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
