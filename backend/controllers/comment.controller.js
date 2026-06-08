import { asyncHandler } from "../middleware/async.middleware.js";
import { sendSuccess } from "../utils/response.js";
import {
  createCommentService,
  getCommentsByCardService,
} from "../services/comment.service.js";

/**
 * @desc Add Comment
 * @route POST /api/comments/:cardId
 */
export const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { cardId } = req.params;

  if (!text) {
    throw new Error("Comment text is required");
  }

  const comment = await createCommentService({
    text,
    cardId,
    userId: req.user.id,
  });

  return sendSuccess(res, "Comment added successfully", comment);
});

/**
 * @desc Get Comments by Card
 * @route GET /api/comments/:cardId
 */
export const fetchComments = asyncHandler(async (req, res) => {
  const { cardId } = req.params;

  const comments = await getCommentsByCardService(cardId);

  return sendSuccess(res, "Comments fetched successfully", comments);
});