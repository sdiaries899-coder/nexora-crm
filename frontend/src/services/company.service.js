import API from "./api";

/**
 * @desc Get All Companies
 */
export const getCompanies = async () => {
  const res = await API.get("/companies");
  return res.data;
};

/**
 * @desc Create Company
 */
export const createCompany = async (data) => {
  const res = await API.post("/companies", data);
  return res.data;
};