import { asyncHandler } from "../middleware/async.middleware.js";
import { sendSuccess } from "../utils/response.js";
import { getDashboardStatsService } from "../services/dashboard.service.js";

/**
 * @desc Get Dashboard Stats
 * @route GET /api/dashboard
 */
export const fetchDashboard = asyncHandler(async (req, res) => {
  const stats = await getDashboardStatsService();

  return sendSuccess(res, "Dashboard data fetched successfully", stats);
});