import express from "express";
import {
  rejectCard,
  fetchRejectedCards,
} from "../controllers/rejection.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/rejections/:cardId
 * @desc    Reject a card (Protected)
 */
router.post("/:cardId", protect, rejectCard);

/**
 * @route   GET /api/rejections
 * @desc    Get all rejected cards (Protected)
 */
router.get("/", protect, fetchRejectedCards);

export default router;