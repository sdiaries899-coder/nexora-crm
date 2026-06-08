import API from "./api";

/**
 * @desc Get Cards (with pagination)
 */
export const getCards = async (params = {}) => {
  const res = await API.get("/cards", { params });
  return res.data;
};

/**
 * @desc Create Card
 */
export const createCard = async (data) => {
  const res = await API.post("/cards", data);
  return res.data;
};

/**
 * @desc Move Card (update stage)
 */
export const moveCard = async (cardId, stageId) => {
  const res = await API.patch(`/cards/${cardId}/stage`, {
    stageId,
  });
  return res.data;
};