// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";
const ALG = "HS256";

function getSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error("ADMIN_JWT_SECRET is missing");
  return new TextEncoder().encode(secret);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Allow login page and static files
  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/assets")
  ) {
    return NextResponse.next();
  }

  // ✅ Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      await jwtVerify(token, getSecret(), { algorithms: [ALG] });
      return NextResponse.next();
    } catch (err) {
      console.error("JWT verify failed:", err);
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

// ✅ Make sure both `/admin` and `/admin/*` are matched
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
