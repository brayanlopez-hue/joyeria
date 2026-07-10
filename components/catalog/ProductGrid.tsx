import { Gem } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

/** Cuadrícula responsiva de productos con estado vacío. */
export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-stone-2 bg-cream/40 px-6 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-white text-gold-deep">
          <Gem size={24} />
        </span>
        <p className="mt-5 font-display text-xl text-ink">
          No hay piezas con este filtro
        </p>
        <p className="mt-2 max-w-sm text-sm text-graphite/75">
          Pero no te preocupes: diseñamos cualquier pieza a tu medida, en el metal
          que prefieras. Cuéntanos qué buscas.
        </p>
        <div className="mt-6">
          <WhatsAppButton label="Pedir diseño a medida" />
        </div>
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
