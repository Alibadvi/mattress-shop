"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SigninPage() {
  return (
    <main className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">ورود</h1>
      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4 border">
        <Input type="email" placeholder="ایمیل" />
        <Input type="password" placeholder="رمز عبور" />
        <Button className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition">ورود</Button>
      </div>
      <p className="text-center mt-4 text-gray-600">حساب ندارید؟ <a href="/signup" className="text-gray-800 font-semibold hover:underline">ثبت‌نام</a></p>
    </main>
  );
}
