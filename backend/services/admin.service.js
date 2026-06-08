import prisma from "../config/db.js";

/**
 * @desc Get Admin Dashboard Stats
 */
export const getAdminStatsService = async () => {
  const [users, cards, companies, comments] = await Promise.all([
    prisma.user.count(),
    prisma.card.count(),
    prisma.company.count(),
    prisma.comment.count(),
  ]);

  return {
    totalUsers: users,
    totalCards: cards,
    totalCompanies: companies,
    totalComments: comments,
  };
};

/**
 * @desc Update User Role
 */
export const updateUserRoleService = async (userId, role) => {
  if (!userId || !role) {
    throw new Error("User ID and Role are required");
  }

  const validRoles = ["ADMIN", "USER"];
  if (!validRoles.includes(role)) {
    throw new Error("Invalid role");
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  return user;
};