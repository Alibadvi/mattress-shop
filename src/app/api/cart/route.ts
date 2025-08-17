import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrSetCartSession } from "@/lib/cart-session";

const imageUrl = (id?: number | null) => (id ? `/api/images/${id}` : "/placeholder.png");

export async function GET() {
  const sessionId = getOrSetCartSession();

  const cart = await prisma.cart.findFirst({
    where: { sessionId, status: "active" },
    include: {
      items: {
        include: {
          product: { include: { images: { where: { isPrimary: true }, take: 1 } } },
        },
      },
    },
  });

  if (!cart) return NextResponse.json({ items: [] });

  return NextResponse.json({
    id: cart.id,
    items: cart.items.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
      priceAtAdd: i.priceAtAdd,
      name: i.product.name,
      price: i.product.price,
      image: imageUrl(i.product.images[0]?.id),
    })),
  });
}

export async function PUT(req: Request) {
  const sessionId = getOrSetCartSession();
  const body = (await req.json()) as { items: { productId: number; quantity: number }[] };

  // make sure cart exists
  const cart = await prisma.cart.upsert({
    where: { sessionId },
    update: {},
    create: { sessionId },
  });

  const keep = new Set<number>();

  for (const { productId, quantity } of body.items || []) {
    keep.add(productId);
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) continue;

    await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      update: { quantity },
      create: {
        cartId: cart.id,
        productId,
        quantity,
        priceAtAdd: Number(product.price),
      },
    });
  }

  // remove items not in payload
  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id, productId: { notIn: Array.from(keep) } },
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
