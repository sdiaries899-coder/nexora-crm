import prisma from "../config/db.js";
import XLSX from "xlsx";
import fs from "fs";
import AppError from "../utils/AppError.js";
import { logger } from "../utils/logger.js";
import { serviceHandler } from "../utils/serviceHandler.js";

/**
 * @desc Import Excel Data (validated + user-linked)
 */
export const importExcelService = serviceHandler(
  async (file, userId) => {
    if (!file) throw new AppError("File is required", 400);
    if (!userId) throw new AppError("Unauthorized", 401);

    logger.info("Import started", { userId });

    try {
      const workbook = XLSX.readFile(file.path);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);

      let created = 0;
      let skipped = 0;

      for (const row of rows) {
        if (!row.title || !row.stageId) {
          skipped++;
          continue;
        }

        const stage = await prisma.stage.findUnique({
          where: { id: row.stageId },
        });

        if (!stage) {
          skipped++;
          continue;
        }

        await prisma.card.create({
          data: {
            title: row.title,
            description: row.description || "",
            stageId: row.stageId,
            userId,
          },
        });

        created++;
      }

      fs.unlinkSync(file.path);

      logger.info("Import completed", {
        created,
        skipped,
        total: rows.length,
      });

      return {
        imported: created,
        skipped,
        total: rows.length,
      };
    } catch (err) {
      if (file?.path) fs.unlinkSync(file.path);

      logger.error("Import failed", { error: err.message });

      throw new AppError("Import failed", 500);
    }
  }
);