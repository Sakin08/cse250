/**
 * Admin middleware
 * Checks if the user is an admin
 */
const adminMiddleware = (req, res, next) => {
  // Check if user exists and is an admin
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Access denied. Admin privileges required.'
    });
  }
  next();
};

module.exports = adminMiddleware;