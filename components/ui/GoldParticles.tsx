import type { CSSProperties } from "react";

/**
 * Capa decorativa de destellos dorados: puntos que flotan hacia arriba
 * (gold-particle) y chispas romboides que parpadean (gold-spark).
 * Valores fijos (no aleatorios) para que SSR e hidratación coincidan.
 * Puro CSS — ver keyframes en globals.css; respeta prefers-reduced-motion.
 */

// [left %, top %, tamaño px, duración s, retraso s, opacidad]
const DRIFTERS: [number, number, number, number, number, number][] = [
  [8, 82, 3, 16, 0, 0.5],
  [18, 95, 2, 13, 2.5, 0.4],
  [29, 88, 4, 18, 5, 0.35],
  [41, 97, 2, 12, 1, 0.5],
  [53, 85, 3, 15, 7, 0.45],
  [64, 93, 2, 14, 3.5, 0.4],
  [75, 90, 4, 19, 6, 0.3],
  [86, 96, 2, 13, 0.5, 0.5],
  [93, 84, 3, 16, 4, 0.4],
];

// [left %, top %, tamaño px, duración s, retraso s]
const SPARKS: [number, number, number, number, number][] = [
  [12, 28, 5, 4.5, 0],
  [31, 14, 4, 5.5, 1.2],
  [48, 34, 6, 6, 2.8],
  [67, 18, 4, 5, 0.6],
  [83, 30, 5, 6.5, 3.4],
  [92, 12, 4, 4.8, 1.8],
];

export function GoldParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {DRIFTERS.map(([left, top, size, dur, delay, opacity], i) => (
        <span
          key={`d${i}`}
          className="gold-particle"
          style={
            {
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              "--p-duration": `${dur}s`,
              "--p-delay": `${delay}s`,
              "--p-opacity": opacity,
            } as CSSProperties
          }
        />
      ))}
      {SPARKS.map(([left, top, size, dur, delay], i) => (
        <span
          key={`s${i}`}
          className="gold-spark"
          style={
            {
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              "--p-duration": `${dur}s`,
              "--p-delay": `${delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
