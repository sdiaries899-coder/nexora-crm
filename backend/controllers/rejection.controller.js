import { asyncHandler } from "../middleware/async.middleware.js";
import { sendSuccess } from "../utils/response.js";
import {
  rejectCardService,
  getRejectedCardsService,
} from "../services/rejection.service.js";

/**
 * @desc Reject Card
 * @route POST /api/rejections/:cardId
 */
export const rejectCard = asyncHandler(async (req, res) => {
  const { reason } = req.body;
  const { cardId } = req.params;

  if (!reason) {
    throw new Error("Rejection reason is required");
  }

  const data = await rejectCardService({
    cardId,
    reason,
    userId: req.user.id,
  });

  return sendSuccess(res, "Card rejected successfully", data);
});

/**
 * @desc Get Rejected Cards
 * @route GET /api/rejections
 */
export const fetchRejectedCards = asyncHandler(async (req, res) => {
  const data = await getRejectedCardsService();

  return sendSuccess(res, "Rejected cards fetched successfully", data);
});