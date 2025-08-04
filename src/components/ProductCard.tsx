"use client";
import { ShoppingCart, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAppDispatch } from "@/store";
import { addToCart } from "@/store/slices/cartSlice";
import { toast } from "sonner";

type Product = {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
    toast.success(`✅ ${product.name} added to cart!`);
  };


  return (
    <div
      className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </Link>

        {/* Hover Overlay: Quick View */}
        <div
          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Link href={`/products/${product.id}`}>
            <button className="bg-white text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-700 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Quick View
            </button>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg line-clamp-2 cursor-pointer hover:text-primary transition whitespace-nowrap">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mt-1">⭐ {product.rating}</p>
        <p className="text-primary font-bold text-lg mt-2">${product.price}</p>

        {/* ✅ Add to Cart Button (always visible) */}
        <button
          onClick={handleAddToCart}
          className="mt-4 flex items-center justify-center gap-2 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-700 transition w-full"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>

    </div>
  );
}
