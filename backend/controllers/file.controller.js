import { asyncHandler } from "../middleware/async.middleware.js";
import { sendSuccess } from "../utils/response.js";
import { uploadFileService } from "../services/file.service.js";

/**
 * @desc Upload File
 * @route POST /api/files/upload
 */
export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new Error("File is required");
  }

  const fileUrl = await uploadFileService(req.file);

  return sendSuccess(res, "File uploaded successfully", {
    url: fileUrl,
  });
});