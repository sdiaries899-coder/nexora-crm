import API from "./api";

/**
 * @desc Reject Card
 */
export const rejectCard = async (cardId, data) => {
  const res = await API.post(`/rejections/${cardId}`, data);
  return res.data;
};

/**
 * @desc Get All Rejected Cards
 */
export const getRejectedCards = async () => {
  const res = await API.get("/rejections");
  return res.data;
};