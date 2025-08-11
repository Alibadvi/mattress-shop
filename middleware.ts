import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE = "admin_session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin/login") || pathname.startsWith("/_next")) return NextResponse.next();

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(COOKIE)?.value;
    if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));
    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.ADMIN_JWT_SECRET), { algorithms: ["HS256"] });
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
  return NextResponse.next();
}
export const config = { matcher: ["/admin", "/admin/:path*"] };
