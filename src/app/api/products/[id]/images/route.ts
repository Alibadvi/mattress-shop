import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const productId = Number(params.id);
  const form = await req.formData();
  const file = form.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }

  const typed = file as File;
  const contentType = typed.type || "application/octet-stream";
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(contentType)) {
    return NextResponse.json({ error: "Unsupported format" }, { status: 415 });
  }

  const arrayBuf = await typed.arrayBuffer();
  const buf = Buffer.from(arrayBuf);
  if (buf.byteLength > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Max 5MB" }, { status: 413 });
  }

  // If no images exist, make this primary
  const count = await prisma.productImage.count({ where: { productId } });

  const img = await prisma.productImage.create({
    data: {
      productId,
      data: buf,
      contentType,
      filename: typed.name || "upload",
      size: buf.byteLength,
      isPrimary: count === 0, // first becomes cover
    },
    select: { id: true, isPrimary: true },
  });

  return NextResponse.json(img, { status: 201 });
}
