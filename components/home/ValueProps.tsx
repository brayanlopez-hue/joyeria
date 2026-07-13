import { ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const items = [
  {
    icon: ShieldCheck,
    title: "Garantía de autenticidad del metal",
    text: "Oro y plata certificados, con quilataje y ley garantizados en cada pieza.",
  },
  {
    icon: Sparkles,
    title: "Diseños personalizados",
    text: "Diseñamos a tu medida: grabados, nombres y figuras únicas para ti.",
  },
  {
    icon: Wrench,
    title: "Composturas y ajustes",
    text: "Reparamos, soldamos y ajustamos la talla de tus joyas para dejarlas como nuevas.",
  },
];

/** Sección "¿Por qué elegirnos?": garantía, personalización y composturas. */
export function ValueProps() {
  return (
    <section className="border-y border-stone-1 bg-cream/60 py-16">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Por qué elegirnos" title="¿Por qué elegirnos?" />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {items.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              key={title}
              delay={i * 0.1}
              className="group flex flex-col items-center rounded-2xl border border-stone-1 bg-white/70 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[var(--shadow-card)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-white text-gold-deep transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                <Icon size={24} />
              </span>
              <h3 className="mt-4 font-display text-xl text-ink">{title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-graphite/75">
                {text}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
