const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate a user via JWT.
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <TOKEN>"

  if (token == null) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    
    // Add the decoded user payload (e.g., { userId, role }) to the request
    req.user = user; 
    next();
  });
};

/**
 * Middleware to authorize a user based on their role.
 * @param {Array<string>} allowedRoles - Array of role names (e.g., ['Admin', 'Manager'])
 */
const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: 'Forbidden: No role attached to user' });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission' });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRole,
};