import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrSetCartSession } from "@/lib/cart-session";

const imageUrl = (id?: number | null) => (id ? `/api/images/${id}` : "/placeholder.png");

export async function POST(req: Request) {
  const sessionId = getOrSetCartSession();
  const { productId, quantity } = (await req.json()) as { productId: number; quantity: number };

  const cart = await prisma.cart.upsert({
    where: { sessionId },
    update: {},
    create: { sessionId },
  });

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { images: { where: { isPrimary: true }, take: 1 } },
  });
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId } },
    update: { quantity },
    create: { cartId: cart.id, productId, quantity, priceAtAdd: Number(product.price) },
  });

  const refreshed = await prisma.cart.findUnique({
    where: { id: cart.id },
    include: { items: { include: { product: { include: { images: { where: { isPrimary: true }, take: 1 } } } } } },
  });

  return NextResponse.json({
    id: refreshed!.id,
    items: refreshed!.items.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
      priceAtAdd: i.priceAtAdd,
      name: i.product.name,
      price: i.product.price,
      image: imageUrl(i.product.images[0]?.id),
    })),
  });
}
