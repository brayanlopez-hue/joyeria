import "server-only";
import { cookies } from "next/headers";

export const COOKIE_NAME = "admin_session";

export const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 días
};

export async function isAdminAuthenticated(): Promise<boolean> {
  const adminToken = process.env.ADMIN_TOKEN ?? "";
  if (!adminToken) return false;
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value === adminToken;
}

export function getAdminToken(): string {
  return process.env.ADMIN_TOKEN ?? "";
}
