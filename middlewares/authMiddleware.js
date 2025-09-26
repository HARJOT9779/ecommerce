const jwt = require("jsonwebtoken");

// Verify JWT
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer token"
    if (!token) return res.status(401).json({ message: "Access denied, token missing" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      req.user = decoded; // { id, role }
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Authentication failed", error: error.message });
  }
};

// Role-based authorization 
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You are not authorized for this action" });
    }
    next();
  };
};



module.exports = { verifyToken, authorizeRoles };
