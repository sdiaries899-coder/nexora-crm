import { sendOTPService, verifyOTPService } from "../services/otp.service.js";
import { asyncHandler } from "../middleware/async.middleware.js";
import { sendSuccess } from "../utils/response.js";
import { setAuthCookies } from "../utils/cookies.js";


/**
 * @desc Send OTP
 * @route POST /api/otp/send
 */
export const sendOtpController = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new Error("Email is required");
  }

  await sendOTPService(email);

  return sendSuccess(res, "OTP sent successfully");
});

/**
 * @desc Verify OTP
 * @route POST /api/otp/verify
 */
export const verifyOtpController = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new Error("Email and OTP are required");
  }

  const {accessToken,refreshToken,user} =await verifyOTPService(email, otp);
  setAuthCookies(res,accessToken,refreshToken);
  

  return sendSuccess(res, "OTP verified successfully");
});