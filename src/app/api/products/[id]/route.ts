import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const data = {
    name: String(body.name ?? "").trim(),
    description: String(body.description ?? "").trim(),
    price: Number(body.price),
    stock: Number(body.stock),
    categoryId: Number(body.categoryId),
  };

  if (!data.name || !data.price || !data.categoryId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const updated = await prisma.product.update({
    where: { id: Number(id) },
    data,
  });

  return NextResponse.json({ id: updated.id }); // <-- client needs this
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.product.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
