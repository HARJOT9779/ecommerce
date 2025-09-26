const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// REGISTER SERVICE
const registerUserService = async (userData) => {
  const { fullname, username, email, phone, password, gender, age, height, weight, membershipType, role } = userData;

  // Check if user exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }, { phone }] });
  if (existingUser) throw new Error("User with this email/username/phone already exists");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Allowed roles
  const allowedRoles = ["user", "trainer", "admin"];
  let roleToSave = "user"; // default

  if (role && allowedRoles.includes(role)) {
    roleToSave = role;
  }

  // Create user
  const newUser = await User.create({
    fullname,
    username,
    email,
    phone,
    password: hashedPassword,
    gender,
    age,
    height,
    weight,
    membershipType,
    role: roleToSave
  });

  return newUser;
};

// LOGIN SERVICE
const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // Generate JWT
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
};

module.exports = { registerUserService, loginUserService };
