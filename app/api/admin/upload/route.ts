import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, extname } from "path";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "Sin archivo" }, { status: 400 });
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Archivo muy grande (máx 5 MB)" }, { status: 400 });
  }

  const ext = extname(file.name).toLowerCase() || ".jpg";
  if (!ALLOWED.has(ext)) {
    return NextResponse.json({ error: "Formato no permitido (jpg, png, webp, avif)" }, { status: 400 });
  }

  // Validar magic bytes del archivo (no confiar solo en la extensión)
  const peek = Buffer.from(await file.slice(0, 12).arrayBuffer());
  const isJpeg = peek[0] === 0xff && peek[1] === 0xd8;
  const isPng = peek[0] === 0x89 && peek[1] === 0x50;
  const isWebp = peek[8] === 0x57 && peek[9] === 0x45 && peek[10] === 0x42 && peek[11] === 0x50;
  const isAvif = peek[4] === 0x66 && peek[5] === 0x74 && peek[6] === 0x79 && peek[7] === 0x70;
  if (!isJpeg && !isPng && !isWebp && !isAvif) {
    return NextResponse.json({ error: "El archivo no es una imagen válida" }, { status: 400 });
  }

  const safeName = `${Date.now()}${ext}`;
  const dir = join(process.cwd(), "public", "images", "products");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  writeFileSync(join(dir, safeName), buffer);

  return NextResponse.json({ url: `/images/products/${safeName}` });
}
