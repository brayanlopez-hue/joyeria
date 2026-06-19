import Link from "next/link";

/** Wordmark de la marca: serif + acento dorado y un pequeño diamante. */
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
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        aria-hidden
        className="text-gold transition-transform duration-300 group-hover:rotate-12"
      >
        <path
          d="M12 2 L20 9 L12 22 L4 9 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M4 9 H20 M12 2 L9 9 L12 22 M12 2 L15 9 L12 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.7"
        />
      </svg>
      <span
        className={`font-display text-lg tracking-wide ${light ? "text-ivory" : "text-ink"}`}
      >
        Joyería <span className="text-gold-gradient font-semibold">Diamante</span>
      </span>
    </Link>
  );
}
