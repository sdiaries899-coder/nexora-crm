import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding started...");

  /**
   * 🔐 Create Admin User
   */
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@crm.com" },
    update: {},
    create: {
      email: "admin@crm.com",
      password: hashedPassword,
      role: "ADMIN",
      isVerified: true,
    },
  });

  /**
   * 🧱 Create Default Stages
   */
  const stages = [
    { name: "New", order: 1 },
    { name: "Contacted", order: 2 },
    { name: "Proposal", order: 3 },
    { name: "Negotiation", order: 4 },
    { name: "Closed Won", order: 5 },
    { name: "Closed Lost", order: 6 },
  ];

  for (const stage of stages) {
    await prisma.stage.upsert({
      where: { order: stage.order },
      update: {},
      create: stage,
    });
  }

  /**
   * 🏢 Sample Companies
   */
  const companies = [
    "Acme Corp",
    "Tech Solutions",
    "Global Industries",
  ];

  for (const name of companies) {
    await prisma.company.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("✅ Seeding completed successfully");
}

main()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });