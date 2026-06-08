import express from "express";
import {
  addCard,
  fetchCards,
  moveCard,
} from "../controllers/card.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/cards
 * @desc    Create card (USER / ADMIN)
 */
router.post(
  "/",
  protect,
  authorize("USER", "ADMIN"),
  addCard
);

/**
 * @route   GET /api/cards
 * @desc    Get cards (USER / ADMIN)
 */
router.get(
  "/",
  protect,
  authorize("USER", "ADMIN"),
  fetchCards
);

/**
 * @route   PATCH /api/cards/:id/stage
 * @desc    Move card (USER / ADMIN)
 */
router.patch(
  "/:id/stage",
  protect,
  authorize("USER", "ADMIN"),
  moveCard
);

export default router;