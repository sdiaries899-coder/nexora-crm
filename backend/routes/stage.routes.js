import express from "express";
import {
  addStage,
  fetchStages,
} from "../controllers/stage.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/stages
 * @desc    Create stage (Protected)
 */
router.post("/", protect, addStage);

/**
 * @route   GET /api/stages
 * @desc    Get all stages (Protected)
 */
router.get("/", protect, fetchStages);

export default router;