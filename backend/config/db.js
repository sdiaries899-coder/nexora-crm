import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error", "warn"],
});

/**
 * @desc Connect DB
 */
export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database connection failed", err.message);
    process.exit(1);
  }
};

export default prisma;