import express from "express";
import {
  fetchAdminStats,
  updateUserRole,
} from "../controllers/admin.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * @route   GET /api/admin/stats
 * @desc    Get system stats (Admin only)
 */
router.get("/stats", protect, authorize("ADMIN"), fetchAdminStats);

/**
 * @route   PATCH /api/admin/user/:id
 * @desc    Update user role (Admin only)
 */
router.patch("/user/:id", protect, authorize("ADMIN"), updateUserRole);

export default router;