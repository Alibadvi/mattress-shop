import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "admin_session";
const ALG = "HS256";

function getSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error("ADMIN_JWT_SECRET is missing");
  return new TextEncoder().encode(secret);
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await new SignJWT({ email: admin.email })
      .setProtectedHeader({ alg: ALG })
      .setExpirationTime("1d")
      .sign(getSecret());

    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
