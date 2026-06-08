import API from "./api";

/**
 * @desc Get Dashboard Data
 */
export const getDashboard = async () => {
  const res = await API.get("/dashboard");
  return res.data;
};