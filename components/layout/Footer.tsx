import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteConfig, categories, mainNav, phoneTel } from "@/lib/site";

/** Pie de página con navegación, categorías y datos de contacto. */
export function Footer() {
  return (
    <footer className="mt-24 border-t border-graphite/40 bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          {/* Sello circular en footer — luce bien sobre fondo oscuro */}
          <div className="mb-4 flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-[#c9a24b]/50">
              <Image
                src="/images/logo-seal.jpg"
                alt="Sello Joyería Diamante López"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <p className="font-display text-xl">
              Diamante <span className="text-gold-gradient font-semibold">López</span>
            </p>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-stone-2">
            {siteConfig.tagline}. Diseño, personalización y taller con garantía de
            metales.
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold">Navegación</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-stone-2 transition-colors hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold">Catálogo</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/catalogo/${c.slug}`}
                  className="text-stone-2 transition-colors hover:text-cream"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm text-stone-2">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>{siteConfig.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-gold" />
              <a href={`tel:${phoneTel}`} className="hover:text-cream">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-gold" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-cream">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-graphite/40 py-5">
        <p className="mx-auto max-w-7xl px-5 text-center text-xs text-stone-3 lg:px-8">
          © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
