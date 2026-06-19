"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

/**
 * Hero principal con soporte para video HD en bucle (poster como fallback).
 * Para activar el video, coloca /public/videos/hero.mp4 (ver README).
 * Respeta prefers-reduced-motion para las animaciones de entrada.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-ink">
      {/* Capa de video / poster */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        poster="/images/hero-poster.svg"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      {/* Veladura para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/80" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center text-ivory">
        <motion.span
          {...fade(0)}
          className="mb-5 inline-block text-xs uppercase tracking-[0.35em] text-gold-soft"
        >
          Diseño · Oro · Plata
        </motion.span>
        <motion.h1
          {...fade(0.1)}
          className="font-display text-4xl leading-tight sm:text-6xl"
        >
          Piezas que se vuelven{" "}
          <span className="text-gold-gradient">historia</span>
        </motion.h1>
        <motion.p
          {...fade(0.2)}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-stone-2 sm:text-lg"
        >
          Joyería personalizada en oro y plata: anillos de compromiso, esclavas
          grabadas, cadenas, dijes y servicio de taller. Hecho a tu medida.
        </motion.p>
        <motion.div
          {...fade(0.3)}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <ButtonLink href="/catalogo" variant="primary">
            Explorar catálogo
          </ButtonLink>
          <WhatsAppButton variant="outline" className="!border-ivory/40 !text-ivory hover:!border-gold hover:!text-gold-soft" />
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ivory/60">
        <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
