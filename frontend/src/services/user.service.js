import API from "./api";

/**
 * @desc Get All Users
 */
export const getUsers = async () => {
  const res = await API.get("/users");
  return res.data;
};

/**
 * @desc Get Single User
 */
export const getUserById = async (id) => {
  const res = await API.get(`/users/${id}`);
  return res.data;
};