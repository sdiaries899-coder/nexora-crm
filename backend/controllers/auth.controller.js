import { asyncHandler } from "../middleware/async.middleware.js";
import {
  registerUser,
  loginUser,
  refreshUserToken,
  logoutUser,
  getMeService,
  changePasswordService,
} from "../services/auth.service.js";
import { setAuthCookies, clearAuthCookies } from "../utils/cookies.js";
import { sendSuccess } from "../utils/response.js";

/**
 * @desc Register
 */
export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  return sendSuccess(res, "Registered successfully", {
    id: user.id,
    email: user.email,
    role:user.role,
    isVerified:user.isVerified,

  });
});

/**
 * @desc Login
 */
export const login = asyncHandler(async (req, res) => {
  const data = await loginUser(req.body);
  return sendSuccess(res,"OTP send to email",data);

});
//   const { accessToken, refreshToken, user } = await loginUser(
//     req.body
//   );

//   setAuthCookies(res, accessToken, refreshToken);

//   return sendSuccess(res, "Login successful", {
//     id: user.id,
//     email: user.email,
//     role: user.role,
//   });
// });

/**
 * @desc Refresh Token
 */
export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;

  const { accessToken, refreshToken: newToken } =
    await refreshUserToken(token);

  setAuthCookies(res, accessToken, newToken);

  return sendSuccess(res, "Token refreshed");
});

/**
 * @desc Logout
 */
export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;

  await logoutUser(token);
  clearAuthCookies(res);

  return sendSuccess(res, "Logged out successfully");
});

/**
 * @desc Get Me
 */
export const me = asyncHandler(async (req, res) => {
  const user = await getMeService(req.user.id);

  return sendSuccess(res, "User fetched", user);
});

/**
 * @desc Change Password
 */
export const changePassword = asyncHandler(async (req, res) => {
  await changePasswordService({
    userId: req.user.id,
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword,
  });

  clearAuthCookies(res); // force re-login

  return sendSuccess(res, "Password changed successfully");
});