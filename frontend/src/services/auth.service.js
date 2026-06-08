import API from "./api";

/**
 * @desc Register User
 */
export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

/**
 * @desc Login User
 */
export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

/**
 * @desc Logout User
 */
export const logoutUser = async () => {
  const res = await API.post("/auth/logout");
  return res.data;
};

/**
 * @desc Get Current User
 */
export const getMe = async () => {
  const res = await API.get("/auth/me");
  return res.data;
};

/**
 * @desc Refresh Token (optional manual call)
 */
export const refreshToken = async () => {
  const res = await API.post("/auth/refresh");
  return res.data;
};