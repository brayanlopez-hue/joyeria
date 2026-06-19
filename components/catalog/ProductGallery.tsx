"use client";

import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ZoomIn } from "lucide-react";
import type { ProductImage } from "@/lib/types";

/**
 * Galería de producto con:
 *  - gestos swipe en móvil (Embla Carousel)
 *  - zoom HD al hacer clic/tap (react-medium-image-zoom)
 *  - miniaturas sincronizadas
 */
export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: images.length > 1 });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (i: number) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi],
  );

  return (
    <div>
      {/* Carrusel principal */}
      <div className="relative overflow-hidden rounded-2xl border border-stone-1 bg-cream">
        <div ref={emblaRef}>
          <div className="flex">
            {images.map((img, i) => (
              <div key={i} className="relative min-w-0 flex-[0_0_100%]">
                <div className="relative aspect-square">
                  <Zoom zoomMargin={24}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={900}
                      height={900}
                      priority={i === 0}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="h-full w-full object-cover"
                    />
                  </Zoom>
                </div>
              </div>
            ))}
          </div>
        </div>
        <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-ink/70 px-3 py-1 text-xs text-ivory backdrop-blur">
          <ZoomIn size={14} /> Toca para ampliar
        </span>
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`relative h-16 w-16 overflow-hidden rounded-lg border transition-colors ${
                selected === i ? "border-gold" : "border-stone-1 hover:border-gold/50"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
