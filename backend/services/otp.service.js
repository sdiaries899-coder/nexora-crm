import prisma from "../config/db.js";
import { sendEmail } from "./email.service.js";
import AppError from "../utils/AppError.js";
import { logger } from "../utils/logger.js";
import { OTP_EXPIRY_MINUTES } from "../utils/constants.js";
import { serviceHandler } from "../utils/serviceHandler.js";

/**
 * @desc Generate 6-digit OTP
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * @desc Send OTP
 */
export const sendOTPService = serviceHandler(async (email) => {
  if (!email) throw new AppError("Email is required", 400);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError("User not found", 404);

  const otp = generateOTP();

  await prisma.otp.upsert({
    where: { email },
    update: {
      code: otp,
      expiresAt: new Date(
        Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
      ),
    },
    create: {
      email,
      code: otp,
      expiresAt: new Date(
        Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
      ),
    },
  });

  await sendEmail({
    to: email,
    subject: "Your OTP Code",
    html: `<h2>Your OTP is ${otp}</h2><p>Valid for ${OTP_EXPIRY_MINUTES} minutes</p>`,
  });

  logger.info("OTP sent", { email });

  return true;
});

/**
 * @desc Verify OTP
 */
export const verifyOTPService = serviceHandler(async (email, otp) => {
  if (!email || !otp) {
    throw new AppError("Email and OTP required", 400);
  }

  const record = await prisma.otp.findUnique({
    where: { email },
  });

  if (!record) throw new AppError("OTP not found", 404);
  if (record.code !== otp) throw new AppError("Invalid OTP", 400);
  if (new Date() > record.expiresAt) {
    throw new AppError("OTP expired", 400);
  }

  await prisma.user.update({
    where: { email },
    data: { isVerified: true },
  });

  await prisma.otp.delete({
    where: { email },
  });

  logger.info("OTP verified", { email });

  return true;
});