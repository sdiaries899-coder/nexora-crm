import express from "express";
import { fetchDashboard } from "../controllers/dashboard.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @route   GET /api/dashboard
 * @desc    Get dashboard stats (Protected)
 */
router.get("/", protect, fetchDashboard);

export default router;