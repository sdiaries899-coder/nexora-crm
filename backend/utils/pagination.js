/**
 * @desc Calculate pagination params
 */
export const getPagination = ({ page = 1, limit = 10 }) => {
  const currentPage = Math.max(1, Number(page) || 1);
  const perPage = Math.max(1, Number(limit) || 10);

  const skip = (currentPage - 1) * perPage;

  return {
    skip,
    take: perPage,
    page: currentPage,
    limit: perPage,
  };
};

/**
 * @desc Format paginated response
 */
export const getPagingData = ({ data, total, page, limit }) => {
  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};