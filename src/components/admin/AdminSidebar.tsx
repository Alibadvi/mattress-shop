// src/components/admin/AdminSidebar.tsx
'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={`block rounded px-3 py-2 text-sm ${
        active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );
}

export default function AdminSidebar() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold mb-2">Admin</h2>
      <nav className="space-y-2 text-sm flex-1">
        <NavLink href="/admin" label="Dashboard" />
        <NavLink href="/admin/products" label="Products" />
        <NavLink href="/admin/products/new" label="New Product" />
        <NavLink href="/admin/categories" label="Categories" />
      </nav>
      <button
        onClick={logout}
        className="text-red-600 text-sm hover:underline mt-4 self-start"
      >
        Logout
      </button>
    </div>
  );
}
