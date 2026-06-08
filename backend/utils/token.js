import jwt from "jsonwebtoken";

/**
 * @desc Generate Access Token
 */
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

/**
 * @desc Generate Refresh Token
 */
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

/**
 * @desc Verify Access Token
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch {
    throw new Error("Invalid or expired access token");
  }
};

/**
 * @desc Verify Refresh Token
 */
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch {
    throw new Error("Invalid or expired refresh token");
  }
};