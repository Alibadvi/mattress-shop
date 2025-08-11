"use client";

import { useState } from "react";

type Category = { id: number; name: string };

export default function CategoriesClient({ initial }: { initial: Category[] }) {
  const [cats, setCats] = useState<Category[]>(initial);
  const [name, setName] = useState("");

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) return alert("Failed to add category");
    const c = (await res.json()) as Category;
    setCats((prev) => [...prev, c].sort((a, b) => a.name.localeCompare(b.name)));
    setName("");
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this category?")) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (!res.ok) return alert("Delete failed");
    setCats((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Categories</h1>

      <form onSubmit={add} className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          className="border rounded px-3 py-2"
        />
        <button className="bg-black text-white rounded px-3 py-2">Add</button>
      </form>

      <div className="bg-white border rounded-md shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cats.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{c.name}</td>
                <td className="px-4 py-2 border-b text-right">
                  <button onClick={() => remove(c.id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {cats.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={2}>
                  No categories yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
