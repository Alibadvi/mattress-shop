import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  if (categories.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">New Product</h1>
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-900 rounded p-4">
          No categories yet. Create one first →{" "}
          <Link href="/admin/categories" className="underline">Categories</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">New Product</h1>
      <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
