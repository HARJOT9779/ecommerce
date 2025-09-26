const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // secure password
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    age: {
      type: Number,
    },
    height: {
      type: Number, // in cm
    },
    weight: {
      type: Number, // in kg
    },
    membershipType: {
      type: String,
      enum: ["basic", "standard", "premium"],
      default: "basic",
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ["user", "admin", "trainer"],
      default: "user",
    },
    profileImage: {
      type: String, // will store Cloudinary URL or local path
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
