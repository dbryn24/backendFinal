const jwt = require("jsonwebtoken");

// JWT Secret - should be in environment variables for production
const JWT_SECRET = "your-super-secret-key-change-in-production";

// Middleware to verify the JWT token
const authenticate = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = {
  authenticate,
  JWT_SECRET,
};
