/** Íconos de marca de redes sociales (lucide ya no incluye logos sociales). */

export function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 9h3l.5-3H14V4.2c0-.9.3-1.5 1.6-1.5H17V.1C16.6.1 15.6 0 14.4 0 11.9 0 10.2 1.5 10.2 4.1V6H7.5v3h2.7v8H14V9Z" />
    </svg>
  );
}
