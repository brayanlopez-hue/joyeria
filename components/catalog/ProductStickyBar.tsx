"use client";

import { whatsappHref, contextualMessage } from "@/lib/whatsapp";
import type { Metal } from "@/lib/site";

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden>
      <path d="M16.04 4c-6.6 0-11.96 5.36-11.96 11.96 0 2.11.55 4.17 1.6 5.99L4 28l6.2-1.62a11.9 11.9 0 0 0 5.84 1.49h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.5-8.46A11.86 11.86 0 0 0 16.04 4Zm5.46 14.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

/**
 * Barra de cotización fija al pie en móvil (detalle de producto).
 * Solo visible en móvil (lg:hidden); en escritorio el CTA principal basta.
 * Mantiene el botón de cotizar siempre a la vista mientras se lee la ficha.
 */
export function ProductStickyBar({
  productName,
  metal,
  priceLabel,
}: {
  productName: string;
  metal: Metal;
  priceLabel?: string;
}) {
  const href = whatsappHref(
    contextualMessage({
      productName,
      metal: metal === "oro" ? "Oro" : "Plata",
    }),
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-1 bg-ivory/95 px-4 py-3 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        {priceLabel && (
          <div className="shrink-0 leading-tight">
            <span className="block text-[10px] uppercase tracking-wider text-stone-3">
              Desde
            </span>
            <span className="font-display text-lg text-ink">{priceLabel}</span>
          </div>
        )}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-medium text-white shadow-[0_8px_24px_-8px_rgba(37,211,102,0.7)]"
        >
          <WhatsAppIcon />
          Cotizar por WhatsApp
        </a>
      </div>
    </div>
  );
}
