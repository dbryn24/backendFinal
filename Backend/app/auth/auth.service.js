const jwt = require("jsonwebtoken");
const User = require("../user/user.model");
const { JWT_SECRET } = require("./auth.middleware");

// Login service
const login = async (username, password) => {
  // Find user by username (NamaUser in the model)
  const user = await User.findOne({ NamaUser: username });

  // If user doesn't exist
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // If password field doesn't exist
  if (!user.Password) {
    throw new Error("Password not set for this user");
  }

  // Check password - the comparePassword method now handles both hashed and plain text
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Create JWT payload
  const payload = {
    user: {
      id: user.id,
      username: user.NamaUser,
      role: user.Role || "user", // Default to user if role not set
    },
  };

  // Generate token
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

  return {
    token,
    user: {
      id: user.id,
      username: user.NamaUser,
      role: user.Role || "user", // Default to user if role not set
    },
  };
};

// Register service with role handling
const register = async (userData) => {
  const { NamaUser, Password, Role = "user" } = userData;

  // Check if user already exists
  let user = await User.findOne({ NamaUser });
  if (user) {
    throw new Error("User already exists");
  }

  // Create new user
  user = new User({
    NamaUser,
    Password,
    Role, // Use the provided role or the default
  });

  await user.save();

  // Create JWT payload
  const payload = {
    user: {
      id: user.id,
      username: user.NamaUser,
      role: user.Role,
    },
  };

  // Generate token
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

  return {
    token,
    user: {
      id: user.id,
      username: user.NamaUser,
      role: user.Role,
    },
  };
};

module.exports = {
  login,
  register,
};
