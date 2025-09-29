const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // adjust path if needed

// ==========================
// REGISTER SERVICE
// ==========================
const registerUserService = async (userData) => {
  const {
    fullname,
    username,
    email,
    phone,
    password,
    gender,
    age,
    height,
    weight,
    role,
  } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }, { phone }],
  });
  if (existingUser) {
    throw new Error("User with this email/username/phone already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);


  // Create new user
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
    role: role,
  });

  return newUser;
};

// ==========================
// LOGIN SERVICE
// ==========================
const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  // Validate password
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

// =========================
// user by id 
// =========================


const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};


module.exports = {
  registerUserService,
  loginUserService,
  getUserById
};
