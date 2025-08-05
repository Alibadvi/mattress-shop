"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/api/products";

const ProductPreview = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data.slice(0, 6))) // only first 6
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center py-10 text-gray-500">در حال بارگذاری محصولات...</p>;
  }

  if (!products.length) {
    return <p className="text-center py-10 text-gray-500">❌ هیچ محصولی یافت نشد.</p>;
  }

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">پرفروش‌ترین‌ها</h2>
      <Swiper
        dir="rtl"
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        speed={800}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="max-w-7xl mx-auto"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductPreview;
