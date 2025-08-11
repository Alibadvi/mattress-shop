import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const img = await prisma.productImage.findUnique({ where: { id } });
  if (!img) return new Response("Not found", { status: 404 });

  return new Response(img.data, {
    status: 200,
    headers: {
      "Content-Type": img.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition": `inline; filename="${encodeURIComponent(img.filename)}"`,
    },
  });
}
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  // Need productId to possibly promote another image to primary
  const current = await prisma.productImage.findUnique({ where: { id }, select: { productId: true, isPrimary: true } });
  if (!current) return NextResponse.json({ ok: true });

  await prisma.productImage.delete({ where: { id } });

  if (current.isPrimary) {
    const next = await prisma.productImage.findFirst({
      where: { productId: current.productId },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      select: { id: true },
    });
    if (next) {
      await prisma.productImage.update({ where: { id: next.id }, data: { isPrimary: true } });
    }
  }

  return NextResponse.json({ ok: true });
}