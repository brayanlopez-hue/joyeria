import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, COOKIE_OPTS, getAdminToken } from "@/lib/admin-auth";

// Simple in-memory rate limiter: max 5 attempts per IP per 15 min
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_ATTEMPTS) return false;
  entry.count++;
  return true;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera 15 minutos." },
      { status: 429 },
    );
  }

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
