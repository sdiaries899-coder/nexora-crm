import { logger } from "./logger.js";
import AppError from "./AppError.js";

/**
 * @desc Wrap services with standardized try/catch + logging
 */
export const serviceHandler = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (err) {
      // log full error
      logger.error("Service Error", {
        message: err.message,
        stack: err.stack,
      });

      // preserve known errors
      if (err instanceof AppError) {
        throw err;
      }

      // fallback unknown errors
      throw new AppError("Internal Server Error", 500);
    }
  };
};