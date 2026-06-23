import "server-only";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import type { Product } from "./types";
import { products as seedProducts } from "./data/products";

const DB_PATH = join(process.cwd(), "data", "products.json");

export function readProducts(): Product[] {
  if (!existsSync(DB_PATH)) return [...seedProducts];
  try {
    return JSON.parse(readFileSync(DB_PATH, "utf-8")) as Product[];
  } catch {
    return [...seedProducts];
  }
}

export function writeProducts(products: Product[]): void {
  const dir = join(process.cwd(), "data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(DB_PATH, JSON.stringify(products, null, 2), "utf-8");
}

export function initDbIfNeeded(): void {
  if (!existsSync(DB_PATH)) writeProducts([...seedProducts]);
}
