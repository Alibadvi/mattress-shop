import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function imgUrl(imageId: number) {
  return `/api/images/${imageId}`;
}

export async function GET(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  const id = Number(params.productId);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, images: true },
  });

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const price =
    typeof (product as any).price === "string"
      ? Number((product as any).price)
      : Number(product.price);

  const primary = product.images.find((i) => i.isPrimary) ?? product.images[0];

  const normalized = {
    id: product.id,
    name: product.name,
    description: product.description,
    price,
    stock: product.stock,
    categoryId: product.categoryId,
    category: product.category
      ? { id: product.category.id, name: product.category.name }
      : null,
    imageUrl: primary ? imgUrl(primary.id) : "/placeholder.png", // ✅ correct URL
    gallery: product.images.map((img) => imgUrl(img.id)),         // ✅ correct URLs
  };

  return NextResponse.json(normalized);
}
