import { prisma } from "@/lib/prisma";
import CategoriesClient from "./client";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return <CategoriesClient initial={categories} />;
}
