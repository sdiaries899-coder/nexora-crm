/**
 * @desc Environment check
 */
const isProd = process.env.NODE_ENV === "production";

/**
 * @desc Base cookie options
 */
const baseOptions = {
  httpOnly: true,
  sameSite: isProd ? "none" : "lax",
  secure: isProd,
};

/**
 * @desc Set Auth Cookies
 */
export const setAuthCookies = (res, accessToken, refreshToken) => {
  if (accessToken) {
    res.cookie("accessToken", accessToken, {
      ...baseOptions,
      maxAge: 15 * 60 * 1000, // 15 min
    });
  }

  if (refreshToken) {
    res.cookie("refreshToken", refreshToken, {
      ...baseOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
};

/**
 * @desc Clear Auth Cookies
 */
export const clearAuthCookies = (res) => {
  res.clearCookie("accessToken", baseOptions);
  res.clearCookie("refreshToken", baseOptions);
};