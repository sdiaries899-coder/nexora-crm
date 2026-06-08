import prisma from "../config/db.js";
import AppError from "../utils/AppError.js";
import { logger } from "../utils/logger.js";
import { serviceHandler } from "../utils/serviceHandler.js";

/**
 * @desc Create Comment
 */
export const createCommentService = serviceHandler(
  async ({ text, cardId, userId }) => {
    if (!text || !cardId || !userId) {
      throw new AppError("Required fields missing", 400);
    }

    logger.info("Create comment request", { cardId, userId });

    const card = await prisma.card.findUnique({
      where: { id: cardId },
    });
    if (!card) throw new AppError("Invalid cardId", 404);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new AppError("Invalid userId", 404);

    const comment = await prisma.comment.create({
      data: {
        text,
        cardId,
        userId,
      },
    });

    logger.info("Comment created", { commentId: comment.id });

    return comment;
  }
);

/**
 * @desc Get Comments by Card
 */
export const getCommentsByCardService = serviceHandler(
  async (cardId) => {
    if (!cardId) throw new AppError("CardId is required", 400);

    const card = await prisma.card.findUnique({
      where: { id: cardId },
    });
    if (!card) throw new AppError("Card not found", 404);

    const comments = await prisma.comment.findMany({
      where: { cardId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, email: true },
        },
      },
    });

    return comments;
  }
);