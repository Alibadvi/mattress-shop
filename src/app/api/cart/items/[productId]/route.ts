import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrSetCartSession } from "@/lib/cart-session";

export async function DELETE(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  const sessionId = getOrSetCartSession();
  const productId = Number(params.productId);
  if (Number.isNaN(productId)) return NextResponse.json({ error: "Bad id" }, { status: 400 });

  const cart = await prisma.cart.findFirst({ where: { sessionId, status: "active" } });
  if (!cart) return NextResponse.json({ ok: true, items: [] });

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id, productId } });

  // return updated items
  const refreshed = await prisma.cart.findUnique({
    where: { id: cart.id },
    include: { items: { include: { product: { include: { images: true } } } } },
  });

  return NextResponse.json({
    id: refreshed?.id,
    items: (refreshed?.items || []).map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
      priceAtAdd: i.priceAtAdd,
      name: i.product.name,
      price: i.product.price,
      image: i.product.images.find((x) => x.isPrimary)?.id
        ? `/api/images/${i.product.images.find((x) => x.isPrimary)!.id}`
        : "/placeholder.png",
    })),
  });
}
