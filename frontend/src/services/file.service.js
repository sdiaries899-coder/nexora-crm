import API from "./api";

/**
 * @desc Upload File
 */
export const uploadFile = async (formData) => {
  const res = await API.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};