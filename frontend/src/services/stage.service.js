import API from "./api";

/**
 * @desc Get All Stages
 */
export const getStages = async () => {
  const res = await API.get("/stages");
  return res.data;
};

/**
 * @desc Create Stage
 */
export const createStage = async (data) => {
  const res = await API.post("/stages", data);
  return res.data;
};