const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// ==========================
// CREATE TRAINER (Admin)
// ==========================
const createTrainer = async (data) => {
  const { fullname, username, email, phone, password, gender, age, height, weight, specialization, experience, availableSlots } = data;

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }, { phone }] });
  if (existingUser) throw new Error("User with this email/username/phone already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newTrainer = await User.create({
    fullname,
    username,
    email,
    phone,
    password: hashedPassword,
    gender,
    age,
    height,
    weight,
    role: "trainer",
    specialization,
    experience,
    availableSlots: availableSlots || [],
  });

  return newTrainer;
};

// ==========================
// GET ALL TRAINERS (Public)
// ==========================
const getAllTrainers = async () => {
  return await User.find({ role: "trainer" }).select("-password");
};

// ==========================
// GET TRAINER BY ID (Public)
// ==========================
const getTrainerById = async (id) => {
  const trainer = await User.findById(id).select("-password");
  if (!trainer || trainer.role !== "trainer") throw new Error("Trainer not found");
  return trainer;
};

// ==========================
// UPDATE TRAINER (Admin)
// ==========================
const updateTrainer = async (id, data) => {
  const trainer = await User.findById(id);
  if (!trainer || trainer.role !== "trainer") throw new Error("Trainer not found");

  // Update fields
  const fields = ["fullname","username","email","phone","password","gender","age","height","weight","specialization","experience","availableSlots"];
  for (let field of fields) {
    if (data[field]) {
      if (field === "password") trainer.password = await bcrypt.hash(data.password, 10);
      else trainer[field] = data[field];
    }
  }

  await trainer.save();
  return trainer;
};

// ==========================
// DELETE TRAINER (Admin)
// ==========================
const deleteTrainer = async (id) => {
  const trainer = await User.findById(id);
  if (!trainer || trainer.role !== "trainer") throw new Error("Trainer not found");
  await User.findByIdAndDelete(id);
  return true;
};

module.exports = { createTrainer, getAllTrainers, getTrainerById, updateTrainer, deleteTrainer };
