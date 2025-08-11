import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const img = await prisma.productImage.findUnique({ where: { id }, select: { productId: true } });
  if (!img) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.$transaction([
    prisma.productImage.updateMany({ where: { productId: img.productId, isPrimary: true }, data: { isPrimary: false } }),
    prisma.productImage.update({ where: { id }, data: { isPrimary: true } }),
  ]);

  return NextResponse.json({ ok: true });
}
