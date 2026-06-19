"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Ruler, X } from "lucide-react";

/**
 * Tabla de tallas (referencia). Diámetro interior en mm ↔ talla MX / US.
 * Valores aproximados para orientar al cliente antes de cotizar.
 */
const SIZES = [
  { mx: 4, us: 4, diameter: 14.8 },
  { mx: 5, us: 5, diameter: 15.6 },
  { mx: 6, us: 6, diameter: 16.5 },
  { mx: 7, us: 7, diameter: 17.3 },
  { mx: 8, us: 8, diameter: 18.1 },
  { mx: 9, us: 9, diameter: 18.9 },
  { mx: 10, us: 10, diameter: 19.8 },
  { mx: 11, us: 11, diameter: 20.6 },
  { mx: 12, us: 12, diameter: 21.4 },
];

/** Botón + modal de guía de tallas interactiva. */
export function RingSizeGuide() {
  const [open, setOpen] = useState(false);
  const [diameter, setDiameter] = useState(17.3);

  // Talla más cercana al diámetro elegido.
  const closest = useMemo(() => {
    return SIZES.reduce((best, s) =>
      Math.abs(s.diameter - diameter) < Math.abs(best.diameter - diameter) ? s : best,
    );
  }, [diameter]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-sm text-gold-deep transition-colors hover:bg-gold/10"
      >
        <Ruler size={16} />
        Guía de tallas
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Guía de tallas de anillos"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-ivory p-6 sm:rounded-3xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-display text-2xl text-ink">Guía de tallas</h2>
                  <p className="mt-1 text-sm text-graphite/70">
                    Encuentra tu talla midiendo el diámetro interior de un anillo
                    que ya uses.
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  className="rounded-full p-2 text-graphite hover:bg-stone-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Calculadora interactiva */}
              <div className="mt-6 rounded-2xl border border-stone-1 bg-white p-5">
                <label className="flex items-center justify-between text-sm text-graphite">
                  <span>Diámetro interior</span>
                  <span className="font-medium text-ink">
                    {diameter.toFixed(1)} mm
                  </span>
                </label>
                <input
                  type="range"
                  min={14.8}
                  max={21.4}
                  step={0.1}
                  value={diameter}
                  onChange={(e) => setDiameter(parseFloat(e.target.value))}
                  className="mt-3 w-full accent-[var(--color-gold)]"
                  aria-label="Diámetro interior en milímetros"
                />
                <p className="mt-4 text-center text-sm text-graphite">
                  Tu talla aproximada es{" "}
                  <span className="font-display text-2xl text-gold-deep">
                    {closest.mx}
                  </span>{" "}
                  <span className="text-stone-3">(MX) · {closest.us} (US)</span>
                </p>
              </div>

              {/* Tabla de referencia */}
              <table className="mt-6 w-full border-collapse text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-stone-3">
                    <th className="py-2">Talla MX</th>
                    <th className="py-2">Talla US</th>
                    <th className="py-2 text-right">Diámetro (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZES.map((s) => (
                    <tr
                      key={s.mx}
                      className={`border-t border-stone-1 ${
                        s.mx === closest.mx ? "bg-gold/10 font-medium text-gold-deep" : "text-graphite"
                      }`}
                    >
                      <td className="py-2">{s.mx}</td>
                      <td className="py-2">{s.us}</td>
                      <td className="py-2 text-right">{s.diameter.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="mt-4 text-xs text-stone-3">
                * Valores de referencia. Para una medición exacta visítanos o
                escríbenos por WhatsApp.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
