import "server-only";
import type { Product } from "./types";
import type { Metal } from "./site";
import { products as sampleProducts } from "./data/products";
import { isSanityConfigured, sanityClient } from "./sanity.client";

/**
 * API de acceso al catálogo. Hoy lee de los datos de ejemplo; cuando Sanity
 * esté configurado (NEXT_PUBLIC_SANITY_PROJECT_ID) usará GROQ. Las firmas son
 * async para que el cambio no afecte a los componentes que las consumen.
 */

// Proyección GROQ equivalente al tipo Product (para cuando se conecte Sanity).
const PRODUCT_PROJECTION = `{
  "_id": _id,
  "slug": slug.current,
  name, excerpt, description, metal, purity,
  "category": category->slug.current,
  "subcategory": subcategory,
  "images": images[]{ "src": asset->url, "alt": coalesce(alt, ^.name) },
  priceFrom, featured, engraving
}`;

async function fetchFromSanity(filter: string): Promise<Product[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    `*[_type == "product" ${filter}] | order(featured desc, name asc) ${PRODUCT_PROJECTION}`,
  );
}

export async function getAllProducts(): Promise<Product[]> {
  if (isSanityConfigured) return fetchFromSanity("");
  return sampleProducts;
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.featured).slice(0, limit);
}

export async function getProductsByCategory(
  category: string,
  opts: { subcategory?: string; metal?: Metal } = {},
): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter(
    (p) =>
      p.category === category &&
      (!opts.subcategory || p.subcategory === opts.subcategory) &&
      (!opts.metal || p.metal === opts.metal),
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getAllProductSlugs(): Promise<string[]> {
  const all = await getAllProducts();
  return all.map((p) => p.slug);
}
