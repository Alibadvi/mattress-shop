import { notFound } from "next/navigation";

export default function ProductDetail({ params }: { params: { productId: string } }) {
  const { productId } = params;

  // For now, just static check:
  if (productId !== "1") return notFound();

  return (
    <section className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Orthopedic Memory Foam Mattress</h1>
      <p className="text-lg text-gray-700 mb-6">
        A premium orthopedic mattress with memory foam support.
      </p>
    </section>
  );
}
