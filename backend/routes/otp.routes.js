import express from "express";
import {
  sendOtpController,
  verifyOtpController,
} from "../controllers/otp.controller.js";

import { validate } from "../middleware/validate.middleware.js";
import Joi from "joi";

const router = express.Router();

/**
 * Validation Schemas
 */
const sendOtpSchema = Joi.object({
  email: Joi.string().email().required(),
});

const verifyOtpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required(),
});

/**
 * @route   POST /api/otp/send
 */
router.post("/send", validate(sendOtpSchema), sendOtpController);

/**
 * @route   POST /api/otp/verify
 */
router.post("/verify", validate(verifyOtpSchema), verifyOtpController);

export default router;