import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteConfig, categories, mainNav } from "@/lib/site";

/** Íconos de marca (lucide ya no incluye logos de redes sociales). */
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 9h3l.5-3H14V4.2c0-.9.3-1.5 1.6-1.5H17V.1C16.6.1 15.6 0 14.4 0 11.9 0 10.2 1.5 10.2 4.1V6H7.5v3h2.7v8H14V9Z" />
    </svg>
  );
}

/** Pie de página con navegación, categorías y datos de contacto. */
export function Footer() {
  return (
    <footer className="mt-24 border-t border-graphite/40 bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-display text-xl">
            Joyería <span className="text-gold-gradient font-semibold">Diamante</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-2">
            {siteConfig.tagline}. Diseño, personalización y taller con garantía de
            metales.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-graphite p-2 text-stone-2 transition-colors hover:border-gold hover:text-gold"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-full border border-graphite p-2 text-stone-2 transition-colors hover:border-gold hover:text-gold"
            >
              <FacebookIcon size={18} />
            </a>
          </div>
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
              <a href={`tel:${siteConfig.whatsapp}`} className="hover:text-cream">
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
