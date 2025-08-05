"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store";
import { RootState } from "@/store";
import { clearCart } from "@/store/slices/cartSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function CheckoutPage() {
  const cart = useAppSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    province: "",
    city: "",
    address: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.firstName || !form.lastName || !form.phone || !form.province || !form.city || !form.address) {
      toast.error("لطفاً تمام فیلدهای اجباری را پر کنید.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast.success("✅ سفارش ثبت شد! در حال انتقال به درگاه پرداخت...");
      dispatch(clearCart());
      router.push("https://www.zarinpal.com/"); // Simulated redirect
    }, 1500);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-gray-800 to-gray-600 text-transparent bg-clip-text">
        تکمیل سفارش
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 🛒 Order Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">سفارش شما</h2>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between py-3 border-b last:border-0">
                <span className="text-gray-700">{item.name} × {item.quantity}</span>
                <span className="font-bold text-gray-900">{(item.price * item.quantity).toLocaleString()} تومان</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">سبد خرید شما خالی است.</p>
          )}
          <div className="flex justify-between mt-4 text-lg font-bold text-gray-900">
            <span>مجموع:</span>
            <span className="bg-gray-800 text-white px-3 py-1 rounded-lg shadow-md">
              {totalPrice.toLocaleString()} تومان
            </span>
          </div>
        </div>

        {/* 📝 Customer Info Form */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">اطلاعات شما</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="نام" name="firstName" value={form.firstName} onChange={handleChange} required />
            <Input placeholder="نام خانوادگی" name="lastName" value={form.lastName} onChange={handleChange} required />
            <Input placeholder="شماره موبایل" name="phone" value={form.phone} onChange={handleChange} required />
            <Input placeholder="استان" name="province" value={form.province} onChange={handleChange} required />
            <Input placeholder="شهر" name="city" value={form.city} onChange={handleChange} required />
          </div>
          <Input placeholder="آدرس کامل" name="address" value={form.address} onChange={handleChange} required className="mt-4" />
          <Textarea placeholder="یادداشت سفارش (اختیاری)" name="note" value={form.note} onChange={handleChange} className="mt-4" />

          <Button
            onClick={handleSubmit}
            className="w-full mt-6 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
            disabled={loading || cart.length === 0}
          >
            {loading ? "در حال انتقال..." : "ثبت و پرداخت"}
          </Button>
        </div>
      </div>
    </main>
  );
}
