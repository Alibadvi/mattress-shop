"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ShoppingCart, Info } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { addToCart } from "@/store/slices/cartSlice";
import { loadProductById } from "@/store/slices/productsSlice";
import { toast } from "sonner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ProductCard from "@/components/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { selected: product, list: products } = useAppSelector(
    (s) => s.products
  );

  useEffect(() => {
    if (productId) {
      dispatch(loadProductById(Number(productId)));
    }
  }, [dispatch, productId]);

  if (!product) {
    return (
      <div className="p-10 text-center text-red-500 text-lg">
        ⚠️ Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,                      // ← number (not toString)
      name: product.name,
      price: product.price,
      image: product.imageUrl || "/placeholder.png",
      quantity: 1,
    }))
    toast.success(`✅ ${product.name} added to cart!`)
  }


  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image + Gallery */}
        <div>
          {/* ✅ Fallback image, no broken ZoomImage */}
          <div className="relative w-full h-[500px] border rounded-xl shadow-lg bg-gray-50 flex items-center justify-center overflow-hidden">
            <img
              src={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Gallery thumbnails */}
          {product.gallery?.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.gallery.map((url: string, i: number) => (
                <img
                  key={i}
                  src={url}
                  alt={`${product.name}-${i}`}
                  className="w-20 h-20 object-cover rounded-md border cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {product.name}
          </h1>
          <p className="text-primary text-3xl font-semibold">
            {product.price.toLocaleString()} تومان
          </p>

          {/* Description */}
          {product.description && (
            <p className="text-gray-700 leading-relaxed border-t pt-4">
              {product.description}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" /> افزودن به سبد خرید
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-black text-white px-6 py-3 rounded-lg shadow hover:bg-gray-800"
            >
              خرید فوری
            </button>
          </div>

          {/* Extra Info */}
          <div className="flex items-center gap-2 text-gray-600 text-sm mt-6">
            <Info className="w-4 h-4" />
            <span>All mattresses include free delivery and 10-year warranty.</span>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <Swiper
          dir="rtl"
          modules={[Autoplay]}
          autoplay={{ delay: 2500 }}
          loop
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 6)
            .map((p) => (
              <SwiperSlide key={p.id}>
                <ProductCard product={p} />
              </SwiperSlide>
            ))}
        </Swiper>
      </section>

      {/* FAQ */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          FAQ
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full shadow-lg overflow-hidden rounded-lg"
        >
          {[
            { q: "Free shipping?", a: "Yes, on orders above 1M Toman." },
            { q: "Can I return?", a: "Yes, within 7 days." },
            { q: "Warranty?", a: "10 years valid warranty included." },
          ].map((faq, i) => (
            <AccordionItem
              key={i}
              value={`q${i}`}
              className="border-b border-gray-200"
            >
              <AccordionTrigger className="px-4 py-4 text-lg font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-gray-600">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}
