import { ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";

const items = [
  {
    icon: ShieldCheck,
    title: "Garantía de metales",
    text: "Oro y plata certificados, con quilataje y ley garantizados en cada pieza.",
  },
  {
    icon: Sparkles,
    title: "Personalización",
    text: "Diseñamos a tu medida: grabados, nombres y figuras únicas para ti.",
  },
  {
    icon: Truck,
    title: "Envíos seguros",
    text: "Enviamos a todo el país con empaque discreto y seguimiento.",
  },
];

/** Sección de propuesta de valor (garantía, personalización, envíos). */
export function ValueProps() {
  return (
    <section className="border-y border-stone-1 bg-cream/60 py-16">
      <Container>
        <div className="grid gap-8 sm:grid-cols-3">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-white text-gold-deep">
                <Icon size={24} />
              </span>
              <h3 className="mt-4 font-display text-xl text-ink">{title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-graphite/75">
                {text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
