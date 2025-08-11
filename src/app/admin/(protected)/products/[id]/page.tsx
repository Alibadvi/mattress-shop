import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

export default async function EditProduct({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = Number(id);

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: { select: { id: true, isPrimary: true }, orderBy: { id: "desc" } },
      },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) return notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Edit Product</h1>
      <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4">
        <ProductForm
          initial={product}
          categories={categories}
          images={product.images}
        />
      </div>
    </div>
  );
}
