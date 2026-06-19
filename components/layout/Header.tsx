"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { mainNav } from "@/lib/site";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

/**
 * Header sticky con navegación de escritorio y botón hamburguesa en móvil.
 * Gana fondo sólido + sombra al hacer scroll (transparente sobre el hero).
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparente con texto claro solo sobre el hero oscuro del home.
  const overHero = pathname === "/" && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          overHero
            ? "border-b border-transparent bg-transparent"
            : "border-b border-stone-1/80 bg-ivory/90 backdrop-blur-md shadow-[0_2px_20px_-12px_rgba(14,14,16,0.3)]"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Logo light={overHero} />

          <nav className="hidden items-center gap-8 md:flex">
            {mainNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              const idle = overHero ? "text-ivory/85" : "text-graphite";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm tracking-wide transition-colors hover:text-gold-soft ${
                    active ? "text-gold-soft" : idle
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className={`rounded-full p-2 transition-colors md:hidden ${
              overHero ? "text-ivory hover:bg-ivory/10" : "text-ink hover:bg-stone-1/60"
            }`}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}
