import prisma from "../config/db.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/token.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { sendOTPService } from "./otp.service.js";
import AppError from "../utils/AppError.js";
import { logger } from "../utils/logger.js";
import { serviceHandler } from "../utils/serviceHandler.js";

/**
 * @desc Register User + OTP
 */
export const registerUser = serviceHandler(async ({ email, password }) => {
  logger.info("Register attempt", { email });

  if (!email || !password) {
    throw new AppError("Email and password required", 400);
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    logger.warn("User already exists", { email });
    throw new AppError("User already exists", 400);
  }

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      isVerified: false,
      role: "USER",
    },
  });

  await sendOTPService(email);

  logger.info("User registered", { userId: user.id });

  return {
    id:user.id,
    email:user.email,
    role:user.role,
    isVerified:user.isVerified,
  };


});

/**
 * @desc Login User + OTP check
 */
export const loginUser = serviceHandler(async ({ email, password }) => {
  logger.info("Login attempt", { email });

  if (!email || !password) {
    throw new AppError("Email and password required", 400);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    logger.warn("Login failed - user not found", { email });
    throw new AppError("Invalid credentials", 401);
  }

  const match = await comparePassword(password, user.password);
  if (!match) {
    logger.warn("Login failed - wrong password", { email });
    throw new AppError("Invalid credentials", 401);
  }
  await sendOTPService(email);
  logger.info("Login OTP send", {
    userId:user.id,
  });

  return{
    email:user.email,
    otpRequired:true,

  };

  // ///
  // if (!user.isVerified) {
  //   await sendOTPService(email);
  //   logger.warn("Login blocked - not verified", { email });
  //   throw new AppError("Email not verified. OTP sent.", 403);
  // }

  // const payload = { id: user.id, role: user.role };

  // const accessToken = generateAccessToken(payload);
  // const refreshToken = generateRefreshToken(payload);

  // await prisma.user.update({
  //   where: { id: user.id },
  //   data: { refreshToken },
  // });

  // logger.info("Login success", { userId: user.id });

  // return { accessToken, refreshToken, user };
});
///
/**
 * @desc Refresh Token
 */
export const refreshUserToken = serviceHandler(async (token) => {
  if (!token) throw new AppError("Refresh token missing", 401);

  const decoded = verifyRefreshToken(token);

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!user || user.refreshToken !== token) {
    throw new AppError("Invalid refresh token", 401);
  }

  const payload = { id: user.id, role: user.role };

  const accessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: newRefreshToken },
  });

  logger.info("Token refreshed", { userId: user.id });

  return { accessToken, refreshToken: newRefreshToken };
});

/**
 * @desc Logout User
 */
export const logoutUser = serviceHandler(async (token) => {
  if (!token) return;

  const decoded = verifyRefreshToken(token);

  await prisma.user.update({
    where: { id: decoded.id },
    data: { refreshToken: null },
  });

  logger.info("User logged out", { userId: decoded.id });
});

/**
 * @desc Get Current User
 */
export const getMeService = serviceHandler(async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
      isVerified: true,
      createdAt: true,
    },
  });

  if (!user) throw new AppError("User not found", 404);

  return user;
});

/**
 * @desc Change Password + invalidate refresh token
 */
export const changePasswordService = serviceHandler(
  async ({ userId, oldPassword, newPassword }) => {
    if (!oldPassword || !newPassword) {
      throw new AppError("Old and new password required", 400);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new AppError("User not found", 404);

    const isMatch = await comparePassword(oldPassword, user.password);

    if (!isMatch) {
      logger.warn("Password change failed", { userId });
      throw new AppError("Invalid old password", 400);
    }

    const hashed = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashed,
        refreshToken: null, // invalidate sessions
      },
    });

    logger.info("Password changed", { userId });

    return true;
  }
);