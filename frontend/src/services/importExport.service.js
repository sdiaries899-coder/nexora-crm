import API from "./api";

/**
 * @desc Import Excel File
 */
export const importData = async (formData) => {
  const res = await API.post("/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

/**
 * @desc Export Excel File
 */
export const exportData = async () => {
  const res = await API.get("/export", {
    responseType: "blob",
  });

  return res.data;
};