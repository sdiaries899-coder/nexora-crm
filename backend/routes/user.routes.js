import express from "express";
import {
  fetchUsers,
  fetchUserById,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * @route   GET /api/users
 * @desc    Get all users (Admin only)
 */
router.get("/", protect, authorize("ADMIN"), fetchUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get single user
 */
router.get("/:id", protect, fetchUserById);

export default router;