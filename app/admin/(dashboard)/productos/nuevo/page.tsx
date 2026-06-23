import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NuevoProductoPage() {
  return (
    <div>
      <Link
        href="/admin"
        className="mb-6 flex items-center gap-1 text-sm text-[#8d8d86] hover:text-[#0e0e10]"
      >
        <ChevronLeft size={16} /> Volver a productos
      </Link>
      <h1 className="mb-6 text-xl font-semibold text-[#0e0e10]">
        Nuevo producto
      </h1>
      <ProductForm mode="create" />
    </div>
  );
}
