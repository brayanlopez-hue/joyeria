import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

/**
 * Cliente de Sanity. Solo se activa cuando las variables de entorno están
 * configuradas; mientras tanto el sitio funciona con los datos de ejemplo
 * (ver lib/catalog.ts). Esto permite desarrollar y desplegar el MVP sin
 * depender del CMS, y conectarlo después sin cambiar la UI.
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

export const isSanityConfigured = Boolean(projectId);

export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

/** Construye una URL optimizada (WebP, ancho dado) para un asset de Sanity. */
export function urlForImage(source: unknown, width = 1000): string | null {
  if (!builder || !source) return null;
  return builder.image(source as never).width(width).auto("format").url();
}
