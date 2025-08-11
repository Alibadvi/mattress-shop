// src/app/admin/(protected)/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import AdminSidebar from "@/components/admin/AdminSidebar";

const COOKIE = "admin_session";

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) redirect("/admin/login");

  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.ADMIN_JWT_SECRET),
      { algorithms: ["HS256"] }
    );
  } catch {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen grid grid-cols-12">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r border-gray-200 p-4">
        <AdminSidebar />
      </aside>
      <main className="col-span-12 md:col-span-9 lg:col-span-10 p-6">
        {children}
      </main>
    </div>
  );
}
