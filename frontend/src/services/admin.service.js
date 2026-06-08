import API from "./api";

/**
 * @desc Get Admin Stats
 */
export const getAdminStats = async () => {
  const res = await API.get("/admin/stats");
  return res.data;
};

/**
 * @desc Update User Role
 */
export const updateUserRole = async (userId, role) => {
  const res = await API.patch(`/admin/user/${userId}`, {
    role,
  });
  return res.data;
};