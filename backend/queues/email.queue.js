import { Queue } from "bullmq";
import redis from "../config/redis.js";
import { logger } from "../utils/logger.js";

let emailQueue = null;

/**
 * @desc Initialize Email Queue safely
 */
if (redis) {
  emailQueue = new Queue("emailQueue", {
    connection: redis,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  });

  logger.info("Email queue initialized");
} else {
  logger.warn("Email queue disabled (Redis not available)");
}

export { emailQueue };