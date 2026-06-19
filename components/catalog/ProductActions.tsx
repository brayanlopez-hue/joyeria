"use client";

import { useState } from "react";
import { ENGRAVING_MAX_CHARS, type Metal } from "@/lib/site";
import { whatsappHref, contextualMessage } from "@/lib/whatsapp";

/** Ícono WhatsApp. */
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden>
      <path d="M16.04 4c-6.6 0-11.96 5.36-11.96 11.96 0 2.11.55 4.17 1.6 5.99L4 28l6.2-1.62a11.9 11.9 0 0 0 5.84 1.49h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.5-8.46A11.86 11.86 0 0 0 16.04 4Zm5.46 14.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

const FONTS = [
  { key: "serif", label: "Clásica", css: "var(--font-serif)" },
  { key: "script", label: "Cursiva", css: "'Segoe Script', 'Brush Script MT', cursive" },
] as const;

/**
 * Acciones del producto: módulo de grabado en vivo (esclavas con nombre) +
 * CTA a WhatsApp que incluye el nombre grabado y el contexto del producto.
 */
export function ProductActions({
  productName,
  metal,
  engraving,
}: {
  productName: string;
  metal: Metal;
  engraving?: boolean;
}) {
  const [name, setName] = useState("");
  const [font, setFont] = useState<(typeof FONTS)[number]["key"]>("serif");

  const fontCss = FONTS.find((f) => f.key === font)!.css;
  const plate =
    metal === "oro"
      ? "from-[#f0dca0] via-[#d8b762] to-[#a07e2e] text-[#5b4413]"
      : "from-[#eef0f2] via-[#c6cace] to-[#8a8f97] text-[#3a3d42]";

  const href = whatsappHref(
    contextualMessage({
      productName,
      metal: metal === "oro" ? "Oro" : "Plata",
      engraving: engraving && name.trim() ? name.trim() : undefined,
    }),
  );

  return (
    <div className="space-y-6">
      {engraving && (
        <div className="rounded-2xl border border-stone-1 bg-white p-5">
          <label
            htmlFor="engraving"
            className="flex items-center justify-between text-sm font-medium text-ink"
          >
            <span>Personaliza tu grabado</span>
            <span className="text-xs text-stone-3">
              {name.length}/{ENGRAVING_MAX_CHARS}
            </span>
          </label>

          <input
            id="engraving"
            type="text"
            value={name}
            maxLength={ENGRAVING_MAX_CHARS}
            onChange={(e) => setName(e.target.value)}
            placeholder="Escribe el nombre…"
            className="mt-2 w-full rounded-lg border border-stone-2 bg-ivory px-4 py-2.5 text-graphite outline-none transition-colors focus:border-gold"
          />

          {/* Selector de tipografía */}
          <div className="mt-3 flex gap-2">
            {FONTS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFont(f.key)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  font === f.key
                    ? "border-gold bg-gold/10 text-gold-deep"
                    : "border-stone-1 text-graphite hover:border-gold/50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Previsualización en placa metálica */}
          <div
            className={`mt-4 flex min-h-[84px] items-center justify-center rounded-xl bg-gradient-to-br px-4 py-5 shadow-inner ${plate}`}
          >
            <span
              className="truncate text-3xl"
              style={{ fontFamily: fontCss }}
              aria-live="polite"
            >
              {name.trim() || "Tu nombre"}
            </span>
          </div>
          <p className="mt-2 text-xs text-stone-3">
            Vista previa aproximada. El grabado final se confirma en taller.
          </p>
        </div>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-medium text-white shadow-[0_8px_24px_-8px_rgba(37,211,102,0.7)] transition-transform hover:scale-[1.02]"
      >
        <WhatsAppIcon />
        Cotizar por WhatsApp
      </a>
    </div>
  );
}
