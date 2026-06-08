import { Worker } from "bullmq";
import redis from "../config/redis.js";
import nodemailer from "nodemailer";
import { logger } from "../utils/logger.js";

if (!redis) {
  logger.warn("Worker not started (Redis not available)");
} else {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const worker = new Worker(
    "emailQueue",
    async (job) => {
      const { to, subject, html } = job.data;

      await transporter.sendMail({
        from: `"OneCRM" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
      });
    },
    { connection: redis }
  );

  worker.on("completed", (job) => {
    logger.info("Email sent", { jobId: job.id });
  });

  worker.on("failed", (job, err) => {
    logger.error("Email failed", {
      jobId: job?.id,
      error: err.message,
    });
  });

  logger.info("Email Worker started");
}