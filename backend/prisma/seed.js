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
    where: { email: "pt322947@gmail.com" },
    update: {
      role:"ADMIN",
      isVerified:true,
    },
    create: {
      email: "pt322947@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
      isVerified: true,
    },
  });

  /**
   * 🧱 Create Default Stages
   */
  const stages = [
  //   { name: "New", order: 1 },
  //   { name: "Contacted", order: 2 },
  //   { name: "Proposal", order: 3 },
  //   { name: "Negotiation", order: 4 },
  //   { name: "Closed Won", order: 5 },
  //   { name: "Closed Lost", order: 6 },
  // ];
    { name: "Pre-Lead", order: 1 },
    { name: "Lead Generated", order: 2 },
    { name: "Rejected Lead", order: 3 },
    { name: "Pre-Warm Prospect", order: 4 },
    { name: "Warm Prospect", order: 5 },
    { name: "Meeting Completed", order: 6 },
    { name: "Enquiry Received", order: 7 },
    { name: "Hot Opportunity", order: 8 },

    { name: "Enquiry Processing", order: 9 },
    { name: "Quotation Sent", order: 10 },
    { name: "Purchase Order Received", order: 11 },
    { name: "Dispatch In Progress", order: 12 },
    { name: "Challan Generated", order: 13 },
    { name: "Invoice Generated", order: 14 },
    { name: "Delivery Completed", order: 15 },
    { name: "MTC Shared", order: 16 },
    { name: "Order Successfully Closed", order: 17 },
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