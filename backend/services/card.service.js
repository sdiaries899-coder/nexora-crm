import prisma from "../config/db.js";
import AppError from "../utils/AppError.js";
import { logger } from "../utils/logger.js";
import { serviceHandler } from "../utils/serviceHandler.js";

/**
 * @desc Create Card
 */
export const createCardService = serviceHandler(
  async ({ title, description, stageId, userId }) => {
    if (!title || !stageId || !userId) {
      throw new AppError("Required fields missing", 400);
    }

    logger.info("Create card request", { userId, stageId });

    const stage = await prisma.stage.findUnique({
      where: { id: stageId },
    });
    if (!stage) throw new AppError("Invalid stageId", 404);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new AppError("Invalid userId", 404);

    const card = await prisma.card.create({
      data: {
        title,
        description,
        stageId,
        userId,
      },
    });

    logger.info("Card created", { cardId: card.id });

    return card;
  }
);

/**
 * @desc Get Cards with Pagination
 */
export const getCardsService = serviceHandler(
  async ({ page = 1, limit = 10 }) => {
    const skip = (page - 1) * limit;

    const [cards, total] = await Promise.all([
      prisma.card.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          stage: true,
          user: {
            select: { id: true, email: true },
          },
        },
      }),
      prisma.card.count(),
    ]);

    return {
      data: cards,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
);

/**
 * @desc Update Card Stage
 */
export const updateCardStageService = serviceHandler(
  async (cardId, stageId) => {
    if (!cardId || !stageId) {
      throw new AppError("CardId and stageId required", 400);
    }

    const card = await prisma.card.findUnique({
      where: { id: cardId },
    });
    if (!card) throw new AppError("Card not found", 404);

    const stage = await prisma.stage.findUnique({
      where: { id: stageId },
    });
    if (!stage) throw new AppError("Invalid stageId", 404);

    const updated = await prisma.card.update({
      where: { id: cardId },
      data: { stageId },
    });

    logger.info("Card moved", { cardId, stageId });

    return updated;
  }
);