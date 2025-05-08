const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    NamaUser: {
      type: String,
      required: true,
      unique: true, // This creates a unique index
    },
    Password: {
      type: String,
      required: false, // Not required during migration for existing users
    },
    Role: {
      type: String,
      enum: ["admin", "user", "owner"], // Restrict possible values
      default: "user",
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

// Add compound index for common queries with explicit name
userSchema.index({ NamaUser: 1, Role: 1 }, { name: "NamaUser_Role_index" });

// Modified password comparison method to handle both hashed and plain text passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  // If the password looks like a bcrypt hash (starts with $2a$ or $2b$)
  if (
    this.Password &&
    (this.Password.startsWith("$2a$") || this.Password.startsWith("$2b$"))
  ) {
    // Compare using bcrypt
    return await bcrypt.compare(candidatePassword, this.Password);
  } else {
    // For legacy plain text passwords, do a direct comparison
    return this.Password === candidatePassword;
  }
};

// Only hash new passwords if they don't look like they're already hashed
userSchema.pre("save", async function (next) {
  // Only hash the password if it's been modified and doesn't look like a bcrypt hash
  if (!this.isModified("Password")) return next();

  // Check if it's already a bcrypt hash (starts with $2a$ or $2b$)
  if (
    this.Password &&
    (this.Password.startsWith("$2a$") || this.Password.startsWith("$2b$"))
  ) {
    return next(); // Already hashed, skip
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
