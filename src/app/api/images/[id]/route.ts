// app/api/images/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const imageId = Number(params.id);
  if (isNaN(imageId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const image = await prisma.productImage.findUnique({
    where: { id: imageId },
  });

  if (!image || !image.data) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  return new NextResponse(image.data, {
    headers: {
      "Content-Type": image.contentType || "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
