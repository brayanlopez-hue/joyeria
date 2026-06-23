import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, COOKIE_OPTS, getAdminToken } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const { user, password } = await req.json();

  if (
    user !== process.env.ADMIN_USER ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json(
      { error: "Usuario o contraseña incorrectos" },
      { status: 401 },
    );
  }

  const token = getAdminToken();
  if (!token) {
    return NextResponse.json(
      { error: "ADMIN_TOKEN no configurado en .env.local" },
      { status: 500 },
    );
  }

  const jar = await cookies();
  jar.set(COOKIE_NAME, token, COOKIE_OPTS);

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
  return NextResponse.json({ ok: true });
}
