import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readProducts, writeProducts } from "@/lib/admin-db";
import type { Product } from "@/lib/types";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  return NextResponse.json(await readProducts());
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const product = (await req.json()) as Product;
  const products = await readProducts();

  if (products.some((p) => p.slug === product.slug)) {
    return NextResponse.json({ error: "Ya existe un producto con ese slug" }, { status: 400 });
  }

  products.push({ ...product, _id: `local-${Date.now()}` });
  await writeProducts(products);
  revalidatePath("/admin");
  revalidatePath("/catalogo", "layout");
  revalidatePath(`/producto/${product.slug}`);
  revalidatePath("/");

  return NextResponse.json({ ok: true, slug: product.slug });
}
