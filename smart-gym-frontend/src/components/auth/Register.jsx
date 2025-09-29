import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        formData
      );
      toast.success("✅ User Registered Successfully!");

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 relative overflow-hidden">
      {/* Floating Gym Emojis */}
      <span className="absolute top-5 left-10 text-white opacity-20 text-6xl animate-bounce-slow">
        💪
      </span>
      <span className="absolute bottom-10 right-5 text-red-500 opacity-20 text-6xl animate-bounce-slow">
        🏋️
      </span>

      <form
        onSubmit={handleRegister}
        className="bg-gray-800 text-white p-10 rounded-3xl shadow-2xl w-full max-w-lg relative overflow-hidden space-y-6"
      >
        <ToastContainer />
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        {/* Step Indicators */}
        <div className="flex justify-center mb-6 gap-3">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-4 h-4 rounded-full transition ${
                step === s ? "bg-red-500" : "bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-4">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              className="w-full p-4 rounded-xl bg-gray-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-red-500 transition"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-4 rounded-xl bg-gray-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-red-500 transition"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-4 rounded-xl bg-gray-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-red-500 transition"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Step 2: Contact & Security */}
        {step === 2 && (
          <div className="space-y-4">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-4 rounded-xl bg-gray-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-red-500 transition"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-4 rounded-xl bg-gray-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-red-500 transition"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <select
              name="gender"
              className="w-full p-4 rounded-xl bg-gray-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-red-500 transition"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}

        {/* Step 3: Physical Stats */}
        {step === 3 && (
          <div className="space-y-4">
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="w-full p-4 rounded-xl bg-gray-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-red-500 transition"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              className="w-full p-4 rounded-xl bg-gray-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-red-500 transition"
              value={formData.height}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              className="w-full p-4 rounded-xl bg-gray-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-red-500 transition"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-6 py-2 bg-gray-600 rounded-xl hover:bg-gray-500 transition"
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-red-500 rounded-xl hover:bg-red-600 transition ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 rounded-xl hover:bg-green-600 transition ml-auto"
            >
              Sign Up
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
