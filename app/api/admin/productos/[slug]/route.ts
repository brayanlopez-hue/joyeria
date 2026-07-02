import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readProducts, writeProducts } from "@/lib/admin-db";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_: Request, { params }: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { slug } = await params;
  const product = (await readProducts()).find((p) => p.slug === slug);
  if (!product) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { slug } = await params;
  const raw = await req.json();
  // Solo permitir campos conocidos para evitar prototype pollution
  const ALLOWED_KEYS = new Set([
    "name","excerpt","description","metal","purity","category",
    "subcategory","priceFrom","featured","engraving","images","slug",
  ]);
  const update = Object.fromEntries(
    Object.entries(raw).filter(([k]) => ALLOWED_KEYS.has(k))
  );
  const products = await readProducts();
  const idx = products.findIndex((p) => p.slug === slug);
  if (idx === -1) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  products[idx] = { ...products[idx], ...update };
  await writeProducts(products);
  revalidatePath("/admin");
  revalidatePath("/catalogo", "layout");
  revalidatePath(`/producto/${slug}`);
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { slug } = await params;
  const products = await readProducts();
  const filtered = products.filter((p) => p.slug !== slug);
  if (filtered.length === products.length) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
  await writeProducts(filtered);
  revalidatePath("/admin");
  revalidatePath("/catalogo", "layout");
  revalidatePath(`/producto/${slug}`);
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
