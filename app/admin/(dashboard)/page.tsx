export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { PencilLine, Plus, Star, Package } from "lucide-react";
import { readProducts } from "@/lib/admin-db";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { categories } from "@/lib/site";

const catName = Object.fromEntries(categories.map((c) => [c.slug, c.name]));

const METAL_BADGE: Record<string, string> = {
  oro: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  plata: "bg-slate-50 text-slate-600 ring-1 ring-slate-200",
};

export default function AdminPage() {
  const products = readProducts();
  const featured = products.filter((p) => p.featured).length;
  const oro = products.filter((p) => p.metal === "oro").length;
  const plata = products.filter((p) => p.metal === "plata").length;

  return (
    <div>
      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total productos", value: products.length, color: "text-[#c9a24b]" },
          { label: "Destacados", value: featured, color: "text-amber-500" },
          { label: "En oro", value: oro, color: "text-amber-600" },
          { label: "En plata", value: plata, color: "text-slate-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-[#e8e2d9] bg-white px-4 py-4 shadow-sm">
            <p className="text-xs text-[#8d8d86]">{s.label}</p>
            <p className={`mt-1 text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[#0e0e10]">Catálogo de productos</h1>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 rounded-xl bg-[#c9a24b] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b8913a]"
        >
          <Plus size={15} />
          Nuevo producto
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-[#e8e2d9] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#f0ece4] bg-[#faf8f3] text-left text-[11px] font-semibold uppercase tracking-wider text-[#8d8d86]">
                <th className="px-4 py-3">Foto</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="hidden px-4 py-3 sm:table-cell">Categoría</th>
                <th className="hidden px-4 py-3 md:table-cell">Metal</th>
                <th className="hidden px-4 py-3 lg:table-cell">Precio desde</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f7f4ef]">
              {products.map((p) => (
                <tr key={p.slug} className="transition-colors hover:bg-[#fdfcf9]">
                  <td className="px-4 py-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-[#e8e2d9] bg-[#f5f3ef]">
                      {p.images[0] && (
                        <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="44px" className="object-cover" />
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="font-medium text-[#0e0e10]">{p.name}</p>
                        <p className="text-xs text-[#8d8d86]">{p.slug}</p>
                      </div>
                      {p.featured && <Star size={12} className="shrink-0 fill-amber-400 text-amber-400" />}
                    </div>
                  </td>

                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span className="rounded-lg bg-[#f5f3ef] px-2.5 py-1 text-xs font-medium text-[#2a2a2e]">
                      {catName[p.category] ?? p.category}
                    </span>
                  </td>

                  <td className="hidden px-4 py-3 md:table-cell">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${METAL_BADGE[p.metal] ?? "bg-gray-50 text-gray-600"}`}>
                      {p.metal} {p.purity}
                    </span>
                  </td>

                  <td className="hidden px-4 py-3 text-sm font-medium text-[#2a2a2e] lg:table-cell">
                    {p.priceFrom ? `$${p.priceFrom.toLocaleString("es-MX")}` : <span className="text-[#ccc]">—</span>}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/productos/${p.slug}`}
                        className="flex items-center gap-1.5 rounded-lg border border-[#e8e2d9] px-3 py-1.5 text-xs font-medium text-[#2a2a2e] transition hover:border-[#c9a24b] hover:text-[#c9a24b]"
                      >
                        <PencilLine size={12} />
                        Editar
                      </Link>
                      <DeleteProductButton slug={p.slug} name={p.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="py-16 text-center">
            <Package size={40} className="mx-auto mb-3 text-[#e8e2d9]" />
            <p className="text-sm text-[#8d8d86]">No hay productos.</p>
            <Link href="/admin/productos/nuevo" className="mt-2 inline-block text-sm text-[#c9a24b] hover:underline">Crear el primero →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
