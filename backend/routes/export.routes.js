import express from "express";
import { exportData } from "../controllers/export.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @route   GET /api/export
 * @desc    Export data to Excel (Protected)
 */
router.get("/", protect, exportData);

export default router;