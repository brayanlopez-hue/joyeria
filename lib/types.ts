import type { Metal } from "./site";

/**
 * Modelo de producto. La forma coincide con el schema de Sanity (sanity/schemas/product.ts)
 * para que migrar de los datos de ejemplo al CMS no requiera cambios en la UI.
 */
export interface ProductImage {
  /** URL de la imagen (placeholder local hoy; CDN de Sanity en producción). */
  src: string;
  alt: string;
}

export interface Product {
  _id: string;
  slug: string;
  name: string;
  /** Descripción corta para tarjetas. */
  excerpt: string;
  /** Descripción larga para la página de detalle. */
  description: string;
  metal: Metal;
  /** Quilataje (oro) o ley (plata), p.ej. "14k" o ".925". */
  purity: string;
  category: string; // slug de categoría
  subcategory: string; // slug de subcategoría
  images: ProductImage[];
  /** Precio de referencia (opcional; el sitio convierte a WhatsApp, no vende). */
  priceFrom?: number;
  /** Marca productos destacados para el home. */
  featured?: boolean;
  /** Permite grabado en vivo (heredado de la subcategoría, pero se puede forzar). */
  engraving?: boolean;
}
