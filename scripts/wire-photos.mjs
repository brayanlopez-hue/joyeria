// Cablea las fotos reales descargadas (public/images/products/photo-<slug>.jpg)
// dentro de data/products.json. Conserva imágenes .webp subidas por el usuario.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dbPath = join(root, "data", "products.json");
const imgDir = join(root, "public", "images", "products");

const products = JSON.parse(readFileSync(dbPath, "utf-8"));
let wired = 0;
const noPhoto = [];

for (const p of products) {
  const photoFile = `photo-${p.slug}.jpg`;
  if (existsSync(join(imgDir, photoFile))) {
    const main = { src: `/images/products/${photoFile}`, alt: p.name };
    // Conservar fotos .webp reales subidas por el usuario como vistas extra.
    const extras = (p.images ?? []).filter(
      (im) => typeof im.src === "string" && im.src.endsWith(".webp")
    );
    p.images = [main, ...extras];
    wired++;
  } else {
    noPhoto.push(p.slug);
  }
}

writeFileSync(dbPath, JSON.stringify(products, null, 2) + "\n", "utf-8");
console.log(`Cableadas: ${wired}/${products.length}`);
console.log(`Sin foto (placeholder SVG): ${noPhoto.join(", ") || "ninguna"}`);
