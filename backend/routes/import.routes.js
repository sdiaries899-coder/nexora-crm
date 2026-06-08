import express from "express";
import { importData } from "../controllers/import.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/import
 * @desc    Import Excel file (Protected)
 */
router.post("/", protect, upload.single("file"), importData);

export default router;