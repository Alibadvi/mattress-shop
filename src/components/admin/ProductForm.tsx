"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Category = { id: number; name: string };
type ProductPayload = {
  name: string;
  slug: string;
  priceTomans: number | string;
  image: string;
  rating?: number | string;
  inStock: boolean;
  description?: string;
  categoryId: number | string;
};

export default function ProductForm({ initial, categories }: { initial?: any; categories: Category[] }) {
  const router = useRouter();
  const [data, setData] = useState<ProductPayload>(
    initial ?? { name: "", slug: "", priceTomans: "", image: "", rating: 4.5, inStock: true, description: "", categoryId: categories[0]?.id ?? "" }
  );
  const editing = Boolean(initial?.id);

  useEffect(() => {
    if (initial) setData((d) => ({ ...d, ...initial }));
  }, [initial]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/products/${initial.id}` : "/api/products";
    const res = await fetch(url, { method, body: JSON.stringify(data) });
    if (!res.ok) {
      alert("Save failed");
      return;
    }
    router.push("/admin/products");
  };

  const remove = async () => {
    if (!editing) return;
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${initial.id}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/products");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="Name" className="border rounded px-3 py-2" />
        <input value={data.slug} onChange={(e) => setData({ ...data, slug: e.target.value })} placeholder="Slug (unique)" className="border rounded px-3 py-2" />
        <input type="number" value={data.priceTomans} onChange={(e) => setData({ ...data, priceTomans: e.target.value })} placeholder="Price (Toman)" className="border rounded px-3 py-2" />
        <input value={data.image} onChange={(e) => setData({ ...data, image: e.target.value })} placeholder="Image URL" className="border rounded px-3 py-2" />
        <input type="number" step="0.1" value={data.rating as number} onChange={(e) => setData({ ...data, rating: e.target.value })} placeholder="Rating" className="border rounded px-3 py-2" />
        <select value={data.categoryId} onChange={(e) => setData({ ...data, categoryId: e.target.value })} className="border rounded px-3 py-2">
          {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
        </select>
      </div>
      <textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} rows={4} placeholder="Description" className="w-full border rounded px-3 py-2" />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={data.inStock} onChange={(e) => setData({ ...data, inStock: e.target.checked })} />
        In stock
      </label>

      <div className="flex gap-2">
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">{editing ? "Update" : "Create"}</button>
        {editing && (
          <button type="button" onClick={remove} className="border border-red-300 text-red-600 px-4 py-2 rounded">Delete</button>
        )}
      </div>
    </form>
  );
}
