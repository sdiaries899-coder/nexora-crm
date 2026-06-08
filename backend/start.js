import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import { initRedis } from "./config/redis.js";
import { validateEnv } from "./config/env.js";

import { securityMiddleware } from "./middleware/security.middleware.js";
import { apiLimiter } from "./middleware/rateLimit.middleware.js";
import { notFound } from "./middleware/notFound.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

/**
 * Routes
 */
import authRoutes from "./routes/auth.routes.js";
import otpRoutes from "./routes/otp.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import companyRoutes from "./routes/company.routes.js";
import stageRoutes from "./routes/stage.routes.js";
import cardRoutes from "./routes/card.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import fileRoutes from "./routes/file.routes.js";
import importRoutes from "./routes/import.routes.js";
import exportRoutes from "./routes/export.routes.js";
import rejectionRoutes from "./routes/rejection.routes.js";

dotenv.config();

const app = express();

/**
 * Security & Middleware
 */
securityMiddleware(app);
app.use(express.json());
app.use(cookieParser());
app.use(apiLimiter);

/**
 * Health Check
 */
app.get("/", (req, res) => {
  res.send("🚀 CRM API Running");
});

/**
 * API Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/stages", stageRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/import", importRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/rejections", rejectionRoutes);

/**
 * Error Handling
 */
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

/**
 * Start Server
 */
const startServer = async () => {
  validateEnv(); // ✅ env check

  await connectDB();
  await initRedis(); // ✅ safe Redis init

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();