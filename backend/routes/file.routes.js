import express from "express";
import { uploadFile } from "../controllers/file.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/files/upload
 * @desc    Upload file (Protected)
 */
router.post("/upload", protect, upload.single("file"), uploadFile);

export default router;