import { asyncHandler } from "../middleware/async.middleware.js";
import { sendSuccess } from "../utils/response.js";
import { getUsersService, getUserByIdService } from "../services/user.service.js";

/**
 * @desc Get All Users (Admin)
 * @route GET /api/users
 */
export const fetchUsers = asyncHandler(async (req, res) => {
  const users = await getUsersService();

  return sendSuccess(res, "Users fetched successfully", users);
});

/**
 * @desc Get Single User
 * @route GET /api/users/:id
 */
export const fetchUserById = asyncHandler(async (req, res) => {
  const user = await getUserByIdService(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return sendSuccess(res, "User fetched successfully", user);
});