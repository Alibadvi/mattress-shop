// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"; // needed for Buffer/File handling

export async function GET() {
  const items = await prisma.product.findMany({
    include: { images: { where: { isPrimary: true }, select: { id: true }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  const shaped = items.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    stock: p.stock,
    imageUrl: p.images[0] ? `/api/images/${p.images[0].id}` : "/placeholder.png",
  }));

  return NextResponse.json(shaped);
}

export async function POST(req: Request) {
  const ctype = req.headers.get("content-type") || "";

  // ---- MULTIPART CREATE (product + images in one go) ----
  if (ctype.includes("multipart/form-data")) {
    const form = await req.formData();

    const name = String(form.get("name") ?? "").trim();
    const description = String(form.get("description") ?? "").trim();
    const price = Number(form.get("price"));
    const stock = Number(form.get("stock"));
    const categoryId = Number(form.get("categoryId"));

    if (!name || !categoryId || Number.isNaN(price) || Number.isNaN(stock)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: { name, description, price, stock, categoryId },
      select: { id: true },
    });

    const files = form.getAll("files").filter(f => f && typeof f !== "string") as File[];
    const allowed = ["image/jpeg", "image/png", "image/webp"];

    let makePrimary = true;
    for (const file of files) {
      const type = file.type || "application/octet-stream";
      if (!allowed.includes(type)) continue;

      const buf = Buffer.from(await file.arrayBuffer());
      if (buf.byteLength > 5 * 1024 * 1024) continue; // skip >5MB

      await prisma.productImage.create({
        data: {
          productId: product.id,
          data: buf,
          contentType: type,
          filename: file.name || "upload",
          size: buf.byteLength,
          isPrimary: makePrimary,
        },
      });
      makePrimary = false;
    }

    return NextResponse.json({ id: product.id }, { status: 201 });
  }

  // ---- JSON CREATE (no images) ----
  try {
    const body = await req.json();
    const data = {
      name: String(body.name ?? "").trim(),
      description: String(body.description ?? "").trim(),
      price: Number(body.price),
      stock: Number(body.stock),
      categoryId: Number(body.categoryId),
    };

    if (!data.name || !data.categoryId || Number.isNaN(data.price) || Number.isNaN(data.stock)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const created = await prisma.product.create({ data, select: { id: true } });
    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch (e) {
    console.error("POST /api/products failed", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
