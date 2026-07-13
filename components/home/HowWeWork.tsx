import { MessageCircle, FileText, Hammer, Gem } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

const steps = [
  {
    icon: MessageCircle,
    title: "Cuéntanos tu idea",
    text: "Escríbenos por WhatsApp o visítanos. Puede ser una foto, un boceto o solo una idea.",
  },
  {
    icon: FileText,
    title: "Recibe tu cotización",
    text: "Te proponemos opciones de metal, quilataje y diseño con su precio, sin compromiso.",
  },
  {
    icon: Hammer,
    title: "Fabricamos tu pieza",
    text: "Nuestros maestros joyeros la elaboran a mano y te compartimos avances del proceso.",
  },
  {
    icon: Gem,
    title: "Estrena tu joya",
    text: "La recoges en el Centro Histórico, lista para presumir o regalar.",
  },
];

/** Proceso de compra en 4 pasos — da confianza a quien nunca ha mandado a hacer una joya. */
export function HowWeWork() {
  return (
    <section className="border-y border-stone-1 bg-cream/50 py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Proceso"
            title="Cómo trabajamos"
            description="Hacer una joya a tu medida es más fácil de lo que crees. Así funciona:"
          />
        </Reveal>

        <div className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Línea que conecta los pasos (solo escritorio) */}
          <span
            className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent lg:block"
            aria-hidden
          />
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.12} className="relative">
              <div className="flex flex-col items-center text-center">
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-ivory text-gold-deep shadow-[0_4px_16px_-6px_rgba(201,162,75,0.5)]">
                  <Icon size={22} />
                  <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gold font-display text-xs text-ink">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-4 font-display text-lg text-ink">{title}</h3>
                <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-graphite/75">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <WhatsAppButton label="Empezar mi pieza" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
