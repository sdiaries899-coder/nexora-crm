import { verifyAccessToken } from "../utils/token.js";

/**
 * @desc Protect routes using JWT (cookie-based)
 */
export const protect = (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token",
      });
    }

    const decoded = verifyAccessToken(token);

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid or expired token",
    });
  }
};