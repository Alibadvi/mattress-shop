"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Category = { id: number; name: string };
type ImageMeta = { id: number; isPrimary: boolean; filename?: string };
type Product = {
  id?: number;
  name: string;
  description: string;
  price: number | string;
  image?: string | null; // legacy, ignored
  stock: number | string;
  categoryId: number | string;
};

export default function ProductForm({
  initial,
  categories,
  images = [],
}: {
  initial?: Product;
  categories: Category[];
  images?: ImageMeta[];
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState<Product>(() => {
    const base: Product = {
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryId: categories[0]?.id ?? "",
    };
    return initial ? { ...base, ...initial } : base;
  });

  const [currentImages, setCurrentImages] = useState<ImageMeta[]>(images);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]); // for create flow
  const editing = Boolean(initial?.id);

  const hasCategories = useMemo(
    () => Array.isArray(categories) && categories.length > 0,
    [categories]
  );

  useEffect(() => {
    if (!editing && !data.categoryId && categories[0]) {
      setData((d) => ({ ...d, categoryId: categories[0]!.id }));
    }
  }, [categories, editing]); // eslint-disable-line

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);

    const base = {
      name: String(data.name ?? "").trim(),
      description: String(data.description ?? "").trim(),
      price: Number(data.price),
      stock: Number(data.stock),
      categoryId: Number(data.categoryId),
    };

    if (!base.name || !base.categoryId || Number.isNaN(base.price) || Number.isNaN(base.stock)) {
      toast.error("Name, price and category are required.");
      setSaving(false);
      return;
    }

    try {
      // CREATE with images -> multipart
      if (!editing && pendingFiles.length > 0) {
        const fd = new FormData();
        fd.append("name", base.name);
        fd.append("description", base.description);
        fd.append("price", String(base.price));
        fd.append("stock", String(base.stock));
        fd.append("categoryId", String(base.categoryId));
        for (const f of pendingFiles) fd.append("files", f);

        const res = await fetch("/api/products", { method: "POST", body: fd });
        if (!res.ok) throw new Error((await res.text()) || "Create failed");
        toast.success("Product created ✅");
        router.replace("/admin/products");
        router.refresh();
        return;
      }

      // CREATE without images -> JSON
      if (!editing) {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(base),
        });
        if (!res.ok) throw new Error((await res.text()) || "Create failed");
        toast.success("Product created ✅");
        router.replace("/admin/products");
        router.refresh();
        return;
      }

      // UPDATE (editing) -> JSON
      const res = await fetch(`/api/products/${initial!.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(base),
      });
      if (!res.ok) throw new Error((await res.text()) || "Update failed");
      toast.success("Product updated ✅");
      router.replace("/admin/products");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  // When EDITING, upload immediately; when CREATING, queue files.
  async function uploadFile(f: File) {
    if (!editing) {
      setPendingFiles((prev) => [...prev, f]);
      toast.info("Image queued. It’ll upload on create.");
      return;
    }
    const fd = new FormData();
    fd.append("file", f);
    const res = await fetch(`/api/products/${initial!.id}/images`, { method: "POST", body: fd });
    if (!res.ok) {
      const j = await res.json().catch(() => null);
      toast.error(j?.error || "Upload failed");
      return;
    }
    const img = await res.json();
    setCurrentImages((prev) => [{ id: img.id, isPrimary: img.isPrimary }, ...prev]);
    toast.success("Image uploaded ✅");
  }

  async function deleteImage(id: number) {
    if (!confirm("Delete this image?")) return;
    const res = await fetch(`/api/images/${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Delete failed");
      return;
    }
    setCurrentImages((prev) => prev.filter((i) => i.id !== id));
    toast.success("Image deleted");
  }

  async function makePrimary(id: number) {
    const res = await fetch(`/api/images/${id}/primary`, { method: "POST" });
    if (!res.ok) {
      toast.error("Could not set primary");
      return;
    }
    setCurrentImages((prev) => prev.map((i) => ({ ...i, isPrimary: i.id === id })));
    toast.success("Set as primary");
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* ==== FIELDS BLOCK (you had deleted this) ==== */}
      {!hasCategories && (
        <div className="rounded border border-amber-300 bg-amber-50 text-amber-900 p-3 text-sm">
          No categories found. Create one first in{" "}
          <a href="/admin/categories" className="underline">Categories</a>.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="border rounded px-3 py-2"
          placeholder="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          type="number"
          className="border rounded px-3 py-2"
          placeholder="Price (Toman)"
          value={data.price}
          onChange={(e) => setData({ ...data, price: e.target.value })}
        />

        <input
          type="number"
          className="border rounded px-3 py-2"
          placeholder="Stock qty"
          value={data.stock}
          onChange={(e) => setData({ ...data, stock: e.target.value })}
        />

        <select
          className="border rounded px-3 py-2"
          value={data.categoryId}
          onChange={(e) => setData({ ...data, categoryId: e.target.value })}
          disabled={!hasCategories}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <textarea
        className="w-full border rounded px-3 py-2"
        rows={4}
        placeholder="Description"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />

      {/* ==== IMAGES BLOCK ==== */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Images</label>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            files.forEach((f) => uploadFile(f));
            e.currentTarget.value = ""; // reset input
          }}
        />

        {!editing && pendingFiles.length > 0 && (
          <div className="text-xs text-gray-600">
            Queued images: {pendingFiles.length} (will upload on create)
          </div>
        )}

        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Preview queued images during CREATE */}
          {!editing &&
            pendingFiles.map((f, idx) => (
              <div key={`q-${idx}`} className="rounded border p-2 flex flex-col items-center gap-2">
                <img
                  src={URL.createObjectURL(f)}
                  alt=""
                  className="h-28 w-full object-cover rounded"
                />
                <span className="text-[10px] text-gray-600">Queued</span>
              </div>
            ))}

          {/* Existing images during EDIT */}
          {editing &&
            currentImages.map((i) => (
              <div key={i.id} className="rounded border p-2 flex flex-col items-center gap-2">
                <img
                  src={`/api/images/${i.id}`}
                  alt=""
                  className="h-28 w-full object-cover rounded"
                />
                <div className="flex gap-2">
                  {!i.isPrimary && (
                    <button
                      type="button"
                      onClick={() => makePrimary(i.id)}
                      className="text-xs px-2 py-1 rounded border"
                    >
                      Make primary
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => deleteImage(i.id)}
                    className="text-xs px-2 py-1 rounded border text-red-600"
                  >
                    Delete
                  </button>
                </div>
                {i.isPrimary && (
                  <span className="text-[10px] text-green-700">Primary</span>
                )}
              </div>
            ))}

          {editing && currentImages.length === 0 && (
            <div className="text-sm text-gray-500">No images yet.</div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className={`px-4 py-2 rounded text-white ${
            saving ? "bg-gray-400" : "bg-black hover:bg-gray-800"
          }`}
        >
          {saving ? "Saving..." : editing ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
