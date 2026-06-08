import dotenv from "dotenv";
import { validateEnv } from "./config/env.js";
import { initRedis } from "./config/redis.js";

// load env
dotenv.config();

/**
 * Start Worker
 */
const startWorker = async () => {
  validateEnv(); // ✅ ensure env is correct
  await initRedis(); // ✅ ensure redis init

  // import worker AFTER redis init
  await import("./queues/worker.js");

  console.log("🚀 Email Worker Running...");
};

startWorker();