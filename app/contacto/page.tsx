import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos. Visítanos en nuestra tienda física o escríbenos. Joyería Diamante — piezas personalizadas en oro y plata.",
};

export default function ContactoPage() {
  return (
    <div className="pt-28 pb-10">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Contacto"
          title="Hablemos de tu pieza"
          description="Estamos para ayudarte a crear o reparar tus joyas. Escríbenos o visítanos en tienda."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Datos + mapa */}
          <div className="space-y-6">
            <ul className="space-y-4">
              <InfoItem icon={<MapPin size={20} />} label="Dirección">
                {siteConfig.address}
              </InfoItem>
              <InfoItem icon={<Phone size={20} />} label="Teléfono / WhatsApp">
                <a href={`tel:${siteConfig.whatsapp}`} className="hover:text-gold-deep">
                  {siteConfig.phoneDisplay}
                </a>
              </InfoItem>
              <InfoItem icon={<Mail size={20} />} label="Correo">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-gold-deep"
                >
                  {siteConfig.email}
                </a>
              </InfoItem>
              <InfoItem icon={<Clock size={20} />} label="Horario">
                Lun a Sáb · 10:00 – 19:00
              </InfoItem>
            </ul>

            <MapEmbed />
          </div>

          {/* Formulario */}
          <div>
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold-deep">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider text-stone-3">{label}</p>
        <p className="text-graphite">{children}</p>
      </div>
    </li>
  );
}
