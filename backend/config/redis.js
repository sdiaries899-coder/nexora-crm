import IORedis from "ioredis";
import { logger } from "../utils/logger.js";

let redis = null;

/**
 * @desc Initialize Redis safely
 */
export const initRedis = async () => {
  try {
    if (!process.env.REDIS_URL) {
      logger.warn("Redis URL not provided, skipping Redis");
      return null;
    }

    const client = new IORedis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 2,
      enableReadyCheck: true,
      retryStrategy: (times) => {
        if (times > 3) return null;
        return Math.min(times * 1000, 3000);
      },
    });

    client.on("connect", () => {
      logger.info("Redis connected");
    });

    client.on("error", (err) => {
      logger.error("Redis error", err.message);
    });

    // test connection
    await client.ping();

    redis = client;
    return redis;
  } catch (err) {
    logger.warn("Redis not available, continuing without Redis");
    redis = null;
    return null;
  }
};

export default redis;