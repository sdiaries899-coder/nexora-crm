import prisma from "../config/db.js";
import XLSX from "xlsx";
import fs from "fs";
import path from "path";
import AppError from "../utils/AppError.js";
import { logger } from "../utils/logger.js";
import { serviceHandler } from "../utils/serviceHandler.js";

/**
 * @desc Export Data to Excel with auto-cleanup
 */
export const exportExcelService = serviceHandler(async () => {
  logger.info("Export started");

  const cards = await prisma.card.findMany({
    include: {
      stage: true,
      user: {
        select: { email: true },
      },
    },
  });

  const formatted = cards.map((c) => ({
    Title: c.title,
    Description: c.description,
    Stage: c.stage?.name,
    User: c.user?.email,
    CreatedAt: c.createdAt,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formatted);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Cards");

  const dir = path.join(process.cwd(), "exports");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const fileName = `crm_${Date.now()}.xlsx`;
  const filePath = path.join(dir, fileName);

  XLSX.writeFile(workbook, filePath);

  logger.info("Export file created", { filePath });

  /**
   * 🧹 Auto cleanup after 30 seconds
   */
  setTimeout(() => {
    fs.unlink(filePath, (err) => {
      if (err) {
        logger.warn("Cleanup failed", { error: err.message });
      } else {
        logger.info("Export file cleaned", { filePath });
      }
    });
  }, 30000);

  return filePath;
});