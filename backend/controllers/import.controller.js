import { asyncHandler } from "../middleware/async.middleware.js";
import { sendSuccess } from "../utils/response.js";
import { importExcelService } from "../services/import.service.js";

/**
 * @desc Import Excel Data
 * @route POST /api/import
 */
export const importData = asyncHandler(async (req, res) => {
  const result = await importExcelService(req.file, req.user.id);

  return sendSuccess(res, "Data imported successfully", result);
});