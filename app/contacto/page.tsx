import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteConfig, phoneTel } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "Contacto y Personalización",
  description:
    "¿Sueñas con una pieza única? Diseñamos joyería en oro y plata desde cero. Escríbenos por WhatsApp, llena el formulario o visítanos en tienda.",
};

export default function ContactoPage() {
  return (
    <div className="pt-28 pb-10">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Contacto y Personalización"
          title="Diseñemos tu pieza ideal"
          description="¿Tienes una idea en mente? Creamos joyas personalizadas desde cero, además de cotizar piezas del catálogo y composturas. Cuéntanos qué imaginas."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Datos + redes + mapa */}
          <div className="space-y-6">
            <ul className="space-y-4">
              <InfoItem icon={<MapPin size={20} />} label="Dirección">
                {siteConfig.address}
              </InfoItem>
              <InfoItem icon={<Phone size={20} />} label="Teléfono / WhatsApp">
                <a href={`tel:${phoneTel}`} className="hover:text-gold-deep">
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

            {/* Canales directos */}
            <div className="flex flex-col gap-3">
              <WhatsAppButton
                message="Hola, me gustaría platicar sobre una pieza personalizada / diseño desde cero."
                label="Escríbenos por WhatsApp"
                className="w-full"
              />
              <div className="flex items-center gap-3">
                {/* Instagram destacado ('es vital' para joyería) */}
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-5 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
                >
                  <InstagramIcon size={20} />
                  Síguenos {siteConfig.social.instagramHandle}
                </a>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-2 text-graphite transition-colors hover:border-gold hover:text-gold-deep"
                >
                  <FacebookIcon size={20} />
                </a>
              </div>
            </div>

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
