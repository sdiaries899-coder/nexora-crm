import { logger } from "../utils/logger.js";

/**
 * @desc Global Error Handler
 */
export const errorHandler = (err, req, res, next) => {
  // log error
  logger.error(err.message, {
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
  });
};