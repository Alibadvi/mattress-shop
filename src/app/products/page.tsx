import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Shop Mattresses | Mattress Shop",
  description: "Browse our premium range of mattresses for comfort and quality.",
};

const products = [
  {
    id: 1,
    name: "Orthopedic Memory Foam Mattress",
    price: 1200,
    image: "/images/mattress-1.jpg",
    hoverImage: "/images/mattress-1-hover.jpg",
    discount: 15,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Luxury Hybrid Spring Mattress",
    price: 1500,
    image: "/images/mattress-2.jpg",
    hoverImage: "/images/mattress-2-hover.jpg",
    discount: 20,
    rating: 4.8,
  },
];

export default function ProductsPage() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight">Our Mattresses</h1>
        <Button variant="outline" className="flex items-center gap-2">
          Sort by <ChevronDown size={18} />
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group border rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
          >
            {/* Product Image */}
            <div className="relative w-full h-64 overflow-hidden rounded-xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:opacity-0 transition-opacity duration-300"
              />
              <Image
                src={product.hoverImage}
                alt={product.name}
                fill
                className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              {product.discount > 0 && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Info */}
            <div className="mt-4 text-center space-y-2">
              <h2 className="text-lg font-semibold line-clamp-2">{product.name}</h2>
              <p className="text-xl font-bold text-green-600">${product.price}</p>
              <p className="text-sm text-gray-500">⭐ {product.rating} / 5</p>
              <Button className="w-full mt-3">Add to Cart</Button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
