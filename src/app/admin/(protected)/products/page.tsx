import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ProductDeleteButton from "@/components/admin/ProductDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsList() {
  const items = await prisma.product.findMany({
    include: {
      category: true,
      images: { take: 1, orderBy: [{ isPrimary: "desc" }, { id: "asc" }] }, // primary or first
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Products</h1>
        <Link href="/admin/products/new" className="bg-black text-white rounded px-3 py-2 text-sm">New Product</Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-2 border-b">Image</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Price (Toman)</th>
              <th className="px-4 py-2 border-b">Stock</th>
              <th className="px-4 py-2 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  {p.images[0] ? (
                    // thumb served from db
                    <img src={`/api/images/${p.images[0].id}`} alt={p.name} className="h-10 w-10 object-cover rounded" />
                  ) : (
                    <div className="h-10 w-10 bg-gray-200 rounded" />
                  )}
                </td>
                <td className="px-4 py-2 border-b">{p.name}</td>
                <td className="px-4 py-2 border-b">{p.category?.name ?? "-"}</td>
                <td className="px-4 py-2 border-b">{p.price.toLocaleString()}</td>
                <td className="px-4 py-2 border-b">{p.stock > 0 ? "In stock" : "Out of stock"}</td>
                <td className="px-4 py-2 border-b text-right">
                  <Link href={`/admin/products/${p.id}`} className="text-blue-600 hover:underline mx-4">Edit</Link>
                  <ProductDeleteButton id={p.id} name={p.name} />
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>No products yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
