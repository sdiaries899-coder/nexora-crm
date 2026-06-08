/**
 * @desc Async wrapper to handle errors centrally
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      // ensure statusCode exists
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
  };
};