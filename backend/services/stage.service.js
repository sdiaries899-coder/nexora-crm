import prisma from "../config/db.js";

/**
 * @desc Create Stage
 */
export const createStageService = async ({ name, order }) => {
  if (!name || order === undefined) {
    throw new Error("Stage name and order are required");
  }

  // Optional: prevent duplicate order
  const exists = await prisma.stage.findFirst({
    where: { order },
  });

  if (exists) {
    throw new Error("Stage order already exists");
  }

  const stage = await prisma.stage.create({
    data: {
      name,
      order,
    },
  });

  return stage;
};

/**
 * @desc Get All Stages (ordered)
 */
export const getStagesService = async () => {
  const stages = await prisma.stage.findMany({
    orderBy: { order: "asc" },
  });

  return stages;
};