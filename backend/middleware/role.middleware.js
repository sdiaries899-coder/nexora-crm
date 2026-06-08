/**
 * @desc Role-based authorization middleware
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized - No role found",
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden - Access denied",
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Authorization error",
      });
    }
  };
};