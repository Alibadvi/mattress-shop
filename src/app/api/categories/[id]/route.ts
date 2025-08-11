import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  await prisma.product.updateMany({ where: { categoryId: id }, data: { categoryId: null as any } }).catch(() => {});
  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const { name } = await req.json();
  const trimmed = String(name || "").trim();
  if (!trimmed) return NextResponse.json({ error: "Name required" }, { status: 400 });
  const updated = await prisma.category.update({ where: { id }, data: { name: trimmed } });
  return NextResponse.json(updated);
}
