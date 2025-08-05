"use client";
import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { products as mockProducts } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 30000000]); // ✅ Tomans
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  const perPage = 8;
  const categories = ["تشک طبی", "تشک فنری", "تشک مموری فوم"]; // Example

  // ✅ Filtering logic
  const filteredProducts = useMemo(() => {
    return mockProducts
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => p.price * 50000 >= priceRange[0] && p.price * 50000 <= priceRange[1])
      .filter((p) => (category ? p.category === category : true))
      .sort((a, b) => {
        if (sort === "price-low") return a.price - b.price;
        if (sort === "price-high") return b.price - a.price;
        return 0;
      });
  }, [search, priceRange, category, sort]);

  const paginatedProducts = filteredProducts.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.max(3, Math.ceil(filteredProducts.length / perPage)); // ✅ Always show 3 bullets minimum

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">🛒 فروشگاه تشک</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">
        {/* Product Grid */}
        <div>
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">❌ محصولی یافت نشد.</p>
          )}

          {/* ✅ Pagination (Always visible) */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={page === i + 1 ? "default" : "outline"}
                onClick={() => setPage(i + 1)}
                disabled={i + 1 > Math.ceil(filteredProducts.length / perPage)} // Disable empty pages
                className={`w-10 h-10 rounded-full ${i + 1 > Math.ceil(filteredProducts.length / perPage)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                  }`}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>

        {/* Sidebar Filters (Modern Dark Design) */}
        <aside className="bg-gray-800 text-white rounded-xl shadow-xl p-4 border border-gray-700 h-fit sticky top-6">
          <h2 className="text-lg font-semibold mb-4 text-center">🔎 فیلترها</h2>
          <Accordion type="multiple" className="space-y-2">
            {/* Search */}
            <AccordionItem value="search" className="border-b border-gray-700">
              <AccordionTrigger className="text-white text-md">جستجو</AccordionTrigger>
              <AccordionContent>
                <Input
                  placeholder="نام محصول..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </AccordionContent>
            </AccordionItem>

            {/* Price */}
            <AccordionItem value="price" className="border-b border-gray-700">
              <AccordionTrigger className="text-white text-md">قیمت (تومان)</AccordionTrigger>
              <AccordionContent>
                <Slider
                  value={priceRange}
                  min={0}
                  max={30000000}
                  step={500000}
                  onValueChange={(val) => setPriceRange(val)}
                  className="mt-2"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span>{priceRange[0].toLocaleString()} تومان</span>
                  <span>{priceRange[1].toLocaleString()} تومان</span>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Category */}
            <AccordionItem value="category" className="border-b border-gray-700">
              <AccordionTrigger className="text-white text-md">دسته‌بندی</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  <li>
                    <button
                      className={`w-full text-left px-2 py-1 rounded ${category === "" ? "bg-primary text-white" : "hover:bg-gray-700"
                        }`}
                      onClick={() => setCategory("")}
                    >
                      همه
                    </button>
                  </li>
                  {categories.map((c) => (
                    <li key={c}>
                      <button
                        className={`w-full text-left px-2 py-1 rounded ${category === c ? "bg-primary text-white" : "hover:bg-gray-700"
                          }`}
                        onClick={() => setCategory(c)}
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Sorting */}
            <AccordionItem value="sort" className="border-b border-gray-700">
              <AccordionTrigger className="text-white text-md">مرتب‌سازی</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  <li>
                    <button
                      className={`w-full text-left px-2 py-1 rounded ${sort === "latest" ? "bg-primary text-white" : "hover:bg-gray-700"
                        }`}
                      onClick={() => setSort("latest")}
                    >
                      جدیدترین
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-2 py-1 rounded ${sort === "price-low" ? "bg-primary text-white" : "hover:bg-gray-700"
                        }`}
                      onClick={() => setSort("price-low")}
                    >
                      ارزان‌ترین
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-2 py-1 rounded ${sort === "price-high" ? "bg-primary text-white" : "hover:bg-gray-700"
                        }`}
                      onClick={() => setSort("price-high")}
                    >
                      گران‌ترین
                    </button>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>
      </div>
    </main>
  );
}
