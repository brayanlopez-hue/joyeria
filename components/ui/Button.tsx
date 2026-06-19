import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "dark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-ink hover:bg-gold-deep hover:text-ivory shadow-[0_8px_24px_-10px_rgba(201,162,75,0.7)]",
  outline:
    "border border-graphite/40 text-graphite hover:border-gold hover:text-gold-deep",
  dark: "bg-ink text-ivory hover:bg-graphite",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

/** Botón con estilo de enlace interno (Next Link). */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

/** Botón con estilo de enlace externo (<a>), p.ej. WhatsApp. */
export function ButtonAnchor({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
