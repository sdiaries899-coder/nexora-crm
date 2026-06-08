import express from "express";
import {
  addComment,
  fetchComments,
} from "../controllers/comment.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/comments/:cardId
 * @desc    Add comment (USER / ADMIN)
 */
router.post(
  "/:cardId",
  protect,
  authorize("USER", "ADMIN"),
  addComment
);

/**
 * @route   GET /api/comments/:cardId
 * @desc    Get comments (USER / ADMIN)
 */
router.get(
  "/:cardId",
  protect,
  authorize("USER", "ADMIN"),
  fetchComments
);

export default router;