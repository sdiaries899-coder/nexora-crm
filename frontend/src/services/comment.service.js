import API from "./api";

/**
 * @desc Get comments by card
 */
export const getComments = async (cardId) => {
  const res = await API.get(`/comments/${cardId}`);
  return res.data;
};

/**
 * @desc Add comment to card
 */
export const addComment = async (cardId, data) => {
  const res = await API.post(`/comments/${cardId}`, data);
  return res.data;
};