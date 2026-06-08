import { asyncHandler } from "../middleware/async.middleware.js";
import { sendSuccess } from "../utils/response.js";
import {
  createStageService,
  getStagesService,
} from "../services/stage.service.js";

/**
 * @desc Create Stage
 * @route POST /api/stages
 */
export const addStage = asyncHandler(async (req, res) => {
  const { name, order } = req.body;

  if (!name || order === undefined) {
    throw new Error("Stage name and order are required");
  }

  const stage = await createStageService({
    name,
    order: Number(order),
  });

  return sendSuccess(res, "Stage created successfully", stage);
});

/**
 * @desc Get All Stages
 * @route GET /api/stages
 */
export const fetchStages = asyncHandler(async (req, res) => {
  const stages = await getStagesService();

  return sendSuccess(res, "Stages fetched successfully", stages);
});