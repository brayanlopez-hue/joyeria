import "server-only";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import type { Product } from "./types";
import { products as seedProducts } from "./data/products";

/**
 * Base de datos de productos.
 * - En producción (Vercel): lee/escribe un JSON en Vercel Blob, que sí persiste.
 *   El filesystem de Vercel es efímero: escribir ahí pierde los datos en cada
 *   deploy o cold start.
 * - En desarrollo local (sin BLOB_READ_WRITE_TOKEN): usa data/products.json.
 * - Fallback de lectura: data/products.json empaquetado en el repo → seed.
 */

const DB_PATH = join(process.cwd(), "data", "products.json");
const BLOB_KEY = "db/products.json";

const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

async function readFromBlob(): Promise<Product[] | null> {
  const { list } = await import("@vercel/blob");
  const { blobs } = await list({ prefix: BLOB_KEY, limit: 1 });
  const hit = blobs.find((b) => b.pathname === BLOB_KEY);
  if (!hit) return null;
  // Cache-buster: el CDN de Blob cachea por URL completa; así leemos siempre lo último.
  const res = await fetch(`${hit.url}?v=${hit.uploadedAt ? new Date(hit.uploadedAt).getTime() : Date.now()}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return (await res.json()) as Product[];
}

function readFromDisk(): Product[] {
  if (!existsSync(DB_PATH)) return [...seedProducts];
  try {
    return JSON.parse(readFileSync(DB_PATH, "utf-8")) as Product[];
  } catch {
    return [...seedProducts];
  }
}

export async function readProducts(): Promise<Product[]> {
  if (useBlob()) {
    try {
      const fromBlob = await readFromBlob();
      if (fromBlob) return fromBlob;
    } catch {
      // Blob no disponible: caer al archivo del repo
    }
  }
  return readFromDisk();
}

export async function writeProducts(products: Product[]): Promise<void> {
  if (useBlob()) {
    const { put } = await import("@vercel/blob");
    await put(BLOB_KEY, JSON.stringify(products, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60,
    });
    return;
  }
  const dir = join(process.cwd(), "data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(DB_PATH, JSON.stringify(products, null, 2), "utf-8");
}
