"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <main className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">ثبت‌نام</h1>
      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4 border">
        <Input placeholder="نام" />
        <Input placeholder="نام خانوادگی" />
        <Input type="email" placeholder="ایمیل" />
        <Input type="password" placeholder="رمز عبور" />
        <Button className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition">ثبت‌نام</Button>
      </div>
      <p className="text-center mt-4 text-gray-600">قبلاً حساب دارید؟ <a href="/signin" className="text-gray-800 font-semibold hover:underline">ورود</a></p>
    </main>
  );
}
