import { prisma } from "../src/lib/prisma";

async function main() {
  // Ensure at least one category exists
  let category = await prisma.category.findFirst();
  if (!category) {
    category = await prisma.category.create({ data: { name: "تشک طبی" } });
  }

  // Add sample products
  await prisma.product.createMany({
    data: [
      {
        name: "تشک طبی رویال",
        description: "تشک طبی با فوم حافظه‌دار برای راحتی بیشتر",
        price: 8000000,
        image: "/images/mattress1.jpg",
        stock: 10,
        categoryId: category.id,
      },
      {
        name: "تشک فنری نرم",
        description: "تشک فنری با راحتی متوسط و کیفیت بالا",
        price: 6500000,
        image: "/images/mattress2.jpg",
        stock: 15,
        categoryId: category.id,
      },
    ],
  });

  console.log("✅ Seed completed!");
}

main().finally(() => prisma.$disconnect());
