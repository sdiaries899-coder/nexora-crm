import dotenv from "dotenv";
import AppError from "../utils/AppError.js";

dotenv.config();

/**
 * @desc Required ENV variables
 */
const requiredEnv = [
  "PORT",
  "DATABASE_URL",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "EMAIL_USER",
  "EMAIL_PASS",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

/**
 * @desc Validate ENV
 */
export const validateEnv = () => {
  const missing = [];

  for (const key of requiredEnv) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new AppError(
      `Missing ENV variables: ${missing.join(", ")}`,
      500
    );
  }

  console.log("✅ ENV validated successfully");
};