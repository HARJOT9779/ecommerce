const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    gender: { type: String, enum: ["male", "female", "other"] },
    age: { type: Number },
    height: { type: Number },
    weight: { type: Number },
    joinDate: { type: Date, default: Date.now },

    // Role
    role: { type: String, enum: ["user", "trainer", "admin"], default: "user" },

    // Trainer-specific fields
    specialization: { type: String }, // optional for user
    experience: { type: Number }, // years, optional for user
    availableSlots: [{ type: String }], // optional for user

  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
