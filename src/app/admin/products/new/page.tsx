// app/admin/products/new/page.tsx
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">New Product</h1>
      <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
