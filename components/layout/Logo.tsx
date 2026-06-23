import Link from "next/link";
import Image from "next/image";

/** Wordmark de la marca con sello circular. */
export function Logo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Joyería Diamante — Inicio"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      {/* Sello circular — se oculta si el archivo no existe (fallback al ícono SVG) */}
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-[#c9a24b]/40 transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/images/logo-seal.jpg"
          alt="Sello Joyería Diamante"
          fill
          sizes="36px"
          className="object-cover"
          priority
        />
      </div>
      <span
        className={`font-display text-lg tracking-wide ${light ? "text-ivory" : "text-ink"}`}
      >
        Diamante <span className={`font-semibold ${light ? "text-[#c9a24b]" : "text-gold-gradient"}`}>López</span>
      </span>
    </Link>
  );
}
