"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // ✅ Import Autoplay module
import "swiper/css";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const ProductPreview = () => {
    return (
        <section className="py-12 px-6">
            <h2 className="text-3xl font-bold text-center mb-8">پرفروش‌ترین‌ها</h2>
            <Swiper
                dir="rtl"
                modules={[Autoplay]} // ✅ Register Autoplay
                spaceBetween={20}
                slidesPerView={1}
                loop={true} // ✅ Enable infinite loop
                autoplay={{
                    delay: 2500, // time between slides (ms)
                    disableOnInteraction: false, // keeps autoplay running after user interaction
                }}
                speed={800} // ✅ Smooth transition speed (ms)
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
                className="max-w-7xl mx-auto"
            >
                {products.slice(0, 6).map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default ProductPreview;
