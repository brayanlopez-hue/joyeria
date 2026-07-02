import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { readProducts } from "@/lib/admin-db";
import { ProductForm } from "@/components/admin/ProductForm";

type Params = { slug: string };

export default async function EditProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = (await readProducts()).find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <div>
      <Link
        href="/admin"
        className="mb-6 flex items-center gap-1 text-sm text-[#8d8d86] hover:text-[#0e0e10]"
      >
        <ChevronLeft size={16} /> Volver a productos
      </Link>
      <h1 className="mb-6 text-xl font-semibold text-[#0e0e10]">
        Editar: {product.name}
      </h1>
      <ProductForm initial={product} mode="edit" />
    </div>
  );
}
