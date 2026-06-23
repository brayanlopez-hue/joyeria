import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // La página de login no requiere sesión
  if (pathname === "/admin/login") return NextResponse.next();

  const token = req.cookies.get("admin_session")?.value;
  const adminToken = process.env.ADMIN_TOKEN ?? "";

  if (!adminToken || token !== adminToken) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
