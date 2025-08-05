"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { addToCart } from "@/store/slices/cartSlice";
import { loadProductById } from "@/store/slices/productsSlice";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ProductCard from "@/components/ProductCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ZoomImage = dynamic(() => import("react-zoom-image-hover"), { ssr: false });

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { selected: product, list: products } = useAppSelector((s) => s.products);

  useEffect(() => {
    if (id) dispatch(loadProductById(Number(id)));
  }, [dispatch, id]);

  if (!product)
    return <div className="p-10 text-center text-red-500 text-lg">⚠️ محصول یافت نشد.</div>;

  const handleAddToCart = () => {
    dispatch(addToCart({ id: product.id.toString(), name: product.name, price: product.price, image: product.image, quantity: 1 }));
    toast.success(`✅ ${product.name} به سبد خرید اضافه شد!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Zoom */}
        <div className="relative w-full h-[500px] border rounded-lg shadow bg-gray-100 cursor-crosshair flex items-center justify-center">
          <ZoomImage src={product.image} zoomSrc={product.image} zoomScale={2.5} zoomLensSize={200} zoomLensBorder="2px solid #4f46e5" zoomLensBorderRadius="50%" />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-primary text-3xl font-semibold mb-6">{product.price.toLocaleString()} تومان</p>

          <div className="flex gap-4 mb-8">
            <button onClick={handleAddToCart} className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary/90 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" /> افزودن به سبد خرید
            </button>
            <button onClick={handleBuyNow} className="bg-black text-white px-6 py-3 rounded-lg shadow hover:bg-gray-800">
              خرید فوری
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">محصولات مرتبط</h2>
        <Swiper dir="rtl" modules={[Autoplay]} autoplay={{ delay: 2500 }} loop spaceBetween={20} slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}>
          {products.filter((p) => p.id !== product.id).slice(0, 6).map((p) => (
            <SwiperSlide key={p.id}><ProductCard product={p} /></SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 w-full flex justify-center">سوالات متداول</h2>
        <Accordion type="single" collapsible className="w-full shadow-lg overflow-hidden">
          {[{ q: "آیا ارسال رایگان است؟", a: "بله، برای سفارش‌های بالای ۱ میلیون تومان ارسال رایگان است." },
            { q: "آیا امکان بازگشت کالا وجود دارد؟", a: "بله، شما می‌توانید تا ۷ روز کالا را بازگردانید." },
            { q: "آیا این محصول دارای گارانتی است؟", a: "بله، این محصول دارای گارانتی ۱۰ ساله معتبر می‌باشد." }]
            .map((faq, i) => (
              <AccordionItem key={i} value={`q${i}`} className="border-b border-gray-500">
                <AccordionTrigger className="px-4 py-4 text-lg font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="px-4 pb-4">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </section>
    </main>
  );
}
