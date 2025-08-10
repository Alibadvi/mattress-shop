import bcrypt from "bcrypt"; // ✅ Use same lib as in login route
import { prisma } from "../src/lib/prisma";

async function main() {
  // --- Seed admin ---
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@shop.com";
  const adminPass = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPass, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {}, // No password change on seed
    create: { email: adminEmail, name: "Admin", passwordHash },
  });

  console.log(`✅ Admin user ready: ${adminEmail} / ${adminPass}`);

  // --- Ensure a category exists ---
  const category = await prisma.category.upsert({
    where: { name: "تشک طبی" },
    update: {},
    create: { name: "تشک طبی" },
  });

  // --- Add sample products ---
  await prisma.product.createMany({
    data: [
      {
        name: "تشک طبی رویال",
        description: "تشک طبی با فوم حافظه‌دار برای راحتی بیشتر",
        price: 8_000_000,
        image: "/images/mattress1.jpg",
        stock: 10,
        categoryId: category.id,
      },
      {
        name: "تشک فنری نرم",
        description: "تشک فنری با راحتی متوسط و کیفیت بالا",
        price: 6_500_000,
        image: "/images/mattress2.jpg",
        stock: 15,
        categoryId: category.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Products and category seeded!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
