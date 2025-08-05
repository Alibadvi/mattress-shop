// src/lib/api/products.ts

export async function fetchProducts(categoryId?: number) {
  const res = await fetch(
    categoryId ? `/api/products?categoryId=${categoryId}` : "/api/products"
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductById(id: number) {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}
