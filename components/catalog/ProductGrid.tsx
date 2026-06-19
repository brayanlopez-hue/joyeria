import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

/** Cuadrícula responsiva de productos con estado vacío. */
export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-2 py-16 text-center">
        <p className="text-graphite/70">
          No hay piezas con estos filtros por ahora.
        </p>
        <p className="mt-1 text-sm text-stone-3">
          Prueba con otro metal o escríbenos por WhatsApp para un diseño a medida.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
