import prisma from "../config/db.js";

/**
 * @desc Get all users (for admin)
 */
export const getUsersService = async () => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      role: true,
      isVerified: true,
      createdAt: true,
    },
  });

  return users;
};

/**
 * @desc Get single user by ID
 */
export const getUserByIdService = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
      isVerified: true,
      createdAt: true,
    },
  });

  return user;
};