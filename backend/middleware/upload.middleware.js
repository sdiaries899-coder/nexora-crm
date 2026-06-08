import multer from "multer";
import path from "path";
import fs from "fs";
import { FILE_LIMIT_MB } from "../utils/constants.js";

/**
 * Ensure uploads directory exists
 */
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * Storage config
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const unique =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

/**
 * File filter
 */
const fileFilter = (req, file, cb) => {
  const allowed = [
    ".jpg",
    ".jpeg",
    ".png",
    ".pdf",
    ".xlsx",
    ".xls",
  ];

  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowed.includes(ext)) {
    return cb(new Error("Invalid file type"), false);
  }

  cb(null, true);
};

/**
 * Multer instance
 */
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: FILE_LIMIT_MB * 1024 * 1024,
  },
});