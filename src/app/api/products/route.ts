import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: Fetch all products (with optional category filtering)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");

  const products = await prisma.product.findMany({
    where: categoryId ? { categoryId: Number(categoryId) } : {},
    include: { category: true, filters: true, reviews: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

// POST: Create new product
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        stock: data.stock,
        categoryId: data.categoryId,
        filters: {
          create: data.filters || [], // Optional: size/firmness/material
        },
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
