// src/app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

const COOKIE = "admin_session";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const admin = await prisma.adminUser.findUnique({ where: { email } }); // ✅ correct model
  if (!admin) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = await new SignJWT({ email: admin.email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(new TextEncoder().encode(process.env.ADMIN_JWT_SECRET));

  const res = NextResponse.json({ success: true });
  res.cookies.set({
    name: COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: false, // true in prod
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return res;
}
