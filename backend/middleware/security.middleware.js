import helmet from "helmet";
import cors from "cors";

/**
 * @desc Security Middleware Setup
 */
export const securityMiddleware = (app) => {
  // Helmet for secure headers
  app.use(helmet());

  // CORS config
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );
};