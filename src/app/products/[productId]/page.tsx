"use client";
import { useParams, useRouter } from "next/navigation";
import { products } from "@/lib/products";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/store";
import { addToCart } from "@/store/slices/cartSlice";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const product = products.find((p) => p.id === Number(productId));
  if (!product) return <div className="p-10 text-center text-red-500 text-lg">⚠️ Product not found.</div>;

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

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="space-y-4">
        <Image src={product.image} alt={product.name} width={600} height={600} className="rounded-lg shadow w-full object-cover" />
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-500 mt-2">⭐ {product.rating} / 5</p>
        <p className="text-primary text-2xl font-semibold mt-4">${product.price}</p>

        <div className="mt-6 flex gap-3">
          <button onClick={handleAddToCart} className="bg-primary text-white px-6 py-3 rounded-md flex items-center gap-2 hover:bg-primary/90">
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>
          <button onClick={handleBuyNow} className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800">
            Buy Now
          </button>
        </div>

        {/* Features */}
        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-2">Key Features:</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>High-density memory foam</li>
            <li>10-year warranty</li>
            <li>Free shipping & returns</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
