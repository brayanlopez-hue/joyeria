import { Container } from "@/components/ui/Container";

const items = [
  { value: "100%", label: "Oro y plata certificados" },
  { value: "A tu medida", label: "Diseño personalizado" },
  { value: "Composturas", label: "Reparación y ajuste de talla" },
  { value: "Centro Histórico", label: "CDMX · atención directa" },
];

/**
 * Franja de señales de confianza, justo debajo del hero.
 * Refuerza credibilidad sin ocupar mucho espacio (valores reales del negocio).
 */
export function TrustStrip() {
  return (
    <section className="border-b border-stone-1">
      <Container>
        <div className="grid grid-cols-2 divide-x divide-stone-1/70 py-6 sm:grid-cols-4 sm:divide-x">
          {items.map((it, i) => (
            <div
              key={it.label}
              className={`flex flex-col items-center px-3 py-3 text-center sm:py-1 ${
                i >= 2 ? "border-t border-stone-1/70 sm:border-t-0" : ""
              }`}
            >
              <span className="font-display text-lg text-gold-deep sm:text-xl">
                {it.value}
              </span>
              <span className="mt-1 text-[11px] uppercase tracking-wider text-stone-3 sm:text-xs">
                {it.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
