import type { Metadata } from "next";
import { Flame, Ruler, ShieldCheck, Camera, MessageCircle, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RepairUploadForm } from "@/components/forms/RepairUploadForm";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

export const metadata: Metadata = {
  title: "Taller y Composturas",
  description:
    "Servicio de taller de Joyería Diamante: soldadura de pulseras y cadenas rotas, y ajuste de tallas de anillos (agrandar o achicar). Sube la foto de tu pieza y cotiza.",
};

const servicios = [
  {
    icon: Flame,
    title: "Soldadura",
    text: "Reparamos pulseras y cadenas rotas con soldadura profesional, respetando el acabado original de la pieza.",
  },
  {
    icon: Ruler,
    title: "Ajuste de tallas",
    text: "Agrandamos o achicamos anillos para que queden a tu medida exacta, sin dañar el diseño.",
  },
  {
    icon: ShieldCheck,
    title: "Mantenimiento",
    text: "Pulido, limpieza y revisión de engastes para que tus joyas luzcan como nuevas.",
  },
];

const pasos = [
  { icon: Camera, text: "Toma una foto clara de tu pieza." },
  { icon: MessageCircle, text: "Cuéntanos qué necesitas y envía el formulario." },
  { icon: Wrench, text: "Te enviamos la cotización y agendamos la reparación." },
];

export default function TallerPage() {
  return (
    <div className="pt-28 pb-10">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Servicios"
          title="Taller y Composturas"
          description="Devolvemos la vida a tus piezas favoritas. Soldadura, ajuste de tallas y mantenimiento con la misma calidad de nuestra joyería."
        />

        {/* Servicios */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {servicios.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-stone-1 bg-white p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold-deep">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 font-display text-xl text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-graphite/75">{text}</p>
            </div>
          ))}
        </div>

        {/* Cómo funciona + formulario */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-ink">¿Cómo funciona?</h2>
            <span className="gold-rule my-5" />
            <ol className="space-y-5">
              {pasos.map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold-deep">
                    <Icon size={18} />
                  </span>
                  <p className="pt-1.5 text-graphite/85">{text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-2xl bg-cream/60 p-6">
              <p className="text-sm text-graphite/80">
                ¿Prefieres escribirnos directo? También puedes contactarnos por
                WhatsApp para una atención inmediata.
              </p>
              <div className="mt-4">
                <WhatsAppButton
                  message="Hola, necesito información sobre el servicio de taller (compostura/ajuste de talla)."
                  label="Escribir al taller"
                  variant="dark"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink">Solicita tu cotización</h2>
            <span className="gold-rule my-5" />
            <RepairUploadForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
