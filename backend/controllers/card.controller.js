import { asyncHandler } from "../middleware/async.middleware.js";
import { sendSuccess } from "../utils/response.js";
import {
  createCardService,
  getCardsService,
  updateCardStageService,
} from "../services/card.service.js";

/**
 * @desc Create Card
 * @route POST /api/cards
 */
export const addCard = asyncHandler(async (req, res) => {
  const { title, description, stageId } = req.body;

  if (!title || !stageId) {
    throw new Error("Title and stageId are required");
  }

  const card = await createCardService({
    title,
    description,
    stageId,
    userId: req.user.id,
  });

  return sendSuccess(res, "Card created successfully", card);
});

/**
 * @desc Get Cards (with optional pagination)
 * @route GET /api/cards
 */
export const fetchCards = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const data = await getCardsService({
    page: Number(page),
    limit: Number(limit),
  });

  return sendSuccess(res, "Cards fetched successfully", data);
});

/**
 * @desc Move Card (Update Stage)
 * @route PATCH /api/cards/:id/stage
 */
export const moveCard = asyncHandler(async (req, res) => {
  const { stageId } = req.body;

  if (!stageId) {
    throw new Error("StageId is required");
  }

  const card = await updateCardStageService(req.params.id, stageId);

  return sendSuccess(res, "Card moved successfully", card);
});