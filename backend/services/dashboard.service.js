import prisma from "../config/db.js";

/**
 * @desc Get Dashboard Stats
 */
export const getDashboardStatsService = async () => {
  const [
    totalUsers,
    totalCards,
    totalCompanies,
    totalComments,
    totalStages,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.card.count(),
    prisma.company.count(),
    prisma.comment.count(),
    prisma.stage.count(),
  ]);

  return {
    totalUsers,
    totalCards,
    totalCompanies,
    totalComments,
    totalStages,
  };
};