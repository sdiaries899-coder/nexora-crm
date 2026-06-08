import prisma from "../config/db.js";
import AppError from "../utils/AppError.js";
import { logger } from "../utils/logger.js";
import { serviceHandler } from "../utils/serviceHandler.js";

/**
 * @desc Reject Card
 */
export const rejectCardService = serviceHandler(
  async ({ cardId, reason, userId }) => {
    if (!cardId || !reason || !userId) {
      throw new AppError("Required fields missing", 400);
    }

    logger.info("Reject card request", { cardId, userId });

    const card = await prisma.card.findUnique({
      where: { id: cardId },
    });
    if (!card) throw new AppError("Invalid cardId", 404);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new AppError("Invalid userId", 404);

    const rejected = await prisma.rejectedCard.create({
      data: {
        cardId,
        reason,
        userId,
      },
    });

    logger.info("Card rejected", { rejectionId: rejected.id });

    return rejected;
  }
);

/**
 * @desc Get All Rejected Cards
 */
export const getRejectedCardsService = serviceHandler(
  async () => {
    const data = await prisma.rejectedCard.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, email: true },
        },
        card: {
          select: { id: true, title: true },
        },
      },
    });

    return data;
  }
);