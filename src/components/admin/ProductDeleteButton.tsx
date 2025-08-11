// src/components/admin/ProductDeleteButton.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export default function ProductDeleteButton({
  id,
  name,
}: { id: number; name?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleDelete = async () => {
    if (!confirm(`Delete "${name ?? "this product"}"? This cannot be undone.`)) return;

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Product deleted");
      // If you're on the edit page, go back to list. On the list, just refresh.
      if (pathname?.startsWith("/admin/products/")) {
        router.replace("/admin/products");
      } else {
        router.refresh();
      }
    } else {
      const text = await res.text();
      toast.error(text || "Delete failed");
      console.error(text);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="border border-red-300 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-50"
    >
      Delete
    </button>
  );
}
