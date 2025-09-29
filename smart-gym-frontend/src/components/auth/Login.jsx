import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        formData
      );

      dispatch(
        login({
          user: response.data.user,
          token: response.data.token,
          role:response.data.user.role,
        })
      );

      // Save token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("id", response.data.user.id);

      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-red-900 to-gray-900">
      <form
        className="bg-gray-800 text-white p-10 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden"
        onSubmit={handleLogin}
      >
        {/* Floating Dumbbell Icon */}
        <span className="absolute -top-5 -left-5 text-red-500 opacity-20 text-6xl animate-bounce-slow">
          💪
        </span>

        <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-4 mb-5 rounded-xl bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-4 mb-5 rounded-xl bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button className="w-full bg-red-600 py-3 rounded-xl hover:bg-red-700 transition font-bold text-lg">
          Login
        </button>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <span
            className="text-red-500 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
