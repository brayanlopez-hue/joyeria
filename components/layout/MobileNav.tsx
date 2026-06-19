"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { mainNav, categories, siteConfig } from "@/lib/site";

/**
 * Menú móvil a pantalla completa (mobile-first). Limpio, con la navegación
 * principal y acceso directo a las categorías del catálogo.
 */
export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] bg-ivory md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <div className="flex items-center justify-between border-b border-stone-1 px-5 py-4">
            <span className="font-display text-lg text-ink">
              Joyería <span className="text-gold-gradient font-semibold">Diamante</span>
            </span>
            <button
              onClick={onClose}
              aria-label="Cerrar menú"
              className="rounded-full p-2 text-ink transition-colors hover:bg-stone-1"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col px-5 py-6">
            {mainNav.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i + 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block border-b border-stone-1/70 py-4 font-display text-2xl text-ink"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <p className="mt-8 mb-3 text-xs uppercase tracking-[0.2em] text-stone-3">
              Categorías
            </p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/catalogo/${c.slug}`}
                  onClick={onClose}
                  className="rounded-lg border border-stone-1 px-3 py-3 text-sm text-graphite transition-colors hover:border-gold hover:text-gold-deep"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </nav>

          <div className="mt-auto px-5 py-6 text-sm text-stone-3">
            <a href={`tel:${siteConfig.whatsapp}`} className="block">
              {siteConfig.phoneDisplay}
            </a>
            <p>{siteConfig.address}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
