// app/admin/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = "/admin/login"; // you can use headers().get('x-pathname') if needed
  if (pathname.includes("/admin/login")) {
    return <>{children}</>; // No auth check for login page
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;

  if (!token) redirect("/admin/login");

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return <>{children}</>;
  } catch {
    redirect("/admin/login");
  }
}
