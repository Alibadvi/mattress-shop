import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cats = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(cats);
}

export async function POST(req: Request) {
  const { name } = await req.json();
  const trimmed = String(name || "").trim();
  if (!trimmed) return NextResponse.json({ error: "Name required" }, { status: 400 });

  const created = await prisma.category.create({ data: { name: trimmed } });
  return NextResponse.json(created, { status: 201 });
}
