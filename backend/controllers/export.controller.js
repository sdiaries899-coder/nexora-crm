import { asyncHandler } from "../middleware/async.middleware.js";
import { exportExcelService } from "../services/export.service.js";

/**
 * @desc Export Data to Excel
 * @route GET /api/export
 */
export const exportData = asyncHandler(async (req, res) => {
  const filePath = await exportExcelService();

  return res.download(filePath, "crm_data.xlsx");
});