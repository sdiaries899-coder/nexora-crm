import cloudinary from "../config/cloud.js";
import fs from "fs";

/**
 * @desc Upload File to Cloudinary
 */
export const uploadFileService = async (file) => {
  if (!file) {
    throw new Error("File is required");
  }

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "crm_uploads",
    });

    // delete local file after upload
    fs.unlinkSync(file.path);

    return result.secure_url;
  } catch (err) {
    if (file?.path) {
      fs.unlinkSync(file.path);
    }
    throw new Error("File upload failed");
  }
};