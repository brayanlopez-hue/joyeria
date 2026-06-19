import { ButtonAnchor } from "@/components/ui/Button";
import { whatsappHref, contextualMessage, type QuoteContext } from "@/lib/whatsapp";

/** Ícono oficial simplificado de WhatsApp. */
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden>
      <path d="M16.04 4c-6.6 0-11.96 5.36-11.96 11.96 0 2.11.55 4.17 1.6 5.99L4 28l6.2-1.62a11.9 11.9 0 0 0 5.84 1.49h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.5-8.46A11.86 11.86 0 0 0 16.04 4Zm5.46 14.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

/**
 * CTA a WhatsApp con mensaje contextual (producto/categoría).
 * Server-safe: solo renderiza un enlace.
 */
export function WhatsAppButton({
  context,
  message,
  label = "Cotizar por WhatsApp",
  variant = "primary",
  className = "",
}: {
  context?: QuoteContext;
  /** Mensaje explícito; tiene prioridad sobre `context`. */
  message?: string;
  label?: string;
  variant?: "primary" | "outline" | "dark";
  className?: string;
}) {
  const href = whatsappHref(message ?? contextualMessage(context));
  return (
    <ButtonAnchor
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      className={className}
    >
      <WhatsAppIcon />
      {label}
    </ButtonAnchor>
  );
}
