import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: Product details by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
    include: { category: true, filters: true, reviews: true },
  });

  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(product);
}

// PATCH: Update product
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();

    const updated = await prisma.product.update({
      where: { id: Number(params.id) },
      data,
    });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE: Remove product
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.product.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ message: "Product deleted" });
}
