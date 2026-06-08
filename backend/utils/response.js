/**
 * @desc Standard Success Response
 */
export const sendSuccess = (res, message = "Success", data = null) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

/**
 * @desc Standard Error Response
 */
export const sendError = (
  res,
  message = "Error",
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};