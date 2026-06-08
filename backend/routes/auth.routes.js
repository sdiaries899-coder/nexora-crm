import express from "express";
import {
  register,
  login,
  refreshToken,
  logout,
  me,
  changePassword,
} from "../controllers/auth.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";
import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 */
router.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  register
);

/**
 * @route   POST /api/auth/login
 */
router.post(
  "/login",
  authLimiter,
  validate(loginSchema),
  login
);

/**
 * @route   POST /api/auth/refresh
 */
router.post("/refresh", refreshToken);

/**
 * @route   POST /api/auth/logout
 */
router.post("/logout", protect, logout);

/**
 * @route   GET /api/auth/me
 */
router.get("/me", protect, me);

/**
 * @route   POST /api/auth/change-password
 */
router.post("/change-password", protect, changePassword);

export default router;