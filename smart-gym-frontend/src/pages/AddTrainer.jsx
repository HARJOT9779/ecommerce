import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser, FaPhone, FaDumbbell, FaHeartbeat } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import AOS from "aos";
import "aos/dist/aos.css";

const AddTrainer = () => {
  const [trainer, setTrainer] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    gender: "male",
    age: "",
    height: "",
    weight: "",
    specialization: "",
    experience: "",
    availableSlots: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainer({ ...trainer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...trainer,
        availableSlots: trainer.availableSlots
          ? trainer.availableSlots.split(",").map((slot) => slot.trim())
          : [],
      };

      await axios.post("http://localhost:5000/api/trainers/create", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      toast.success("Trainer added successfully!");
      setTrainer({
        fullname: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        gender: "male",
        age: "",
        height: "",
        weight: "",
        specialization: "",
        experience: "",
        availableSlots: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add trainer.");
    }
  };

  // Initialize AOS animations
  React.useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-red-900 to-black relative py-16 px-4">
      {/* Floating icons */}
      <FaDumbbell className="absolute top-10 left-5 text-white opacity-20 text-6xl animate-bounce-slow" />
      <GiWeightLiftingUp className="absolute top-1/4 right-10 text-white opacity-20 text-6xl animate-bounce-slower" />
      <FaHeartbeat className="absolute bottom-32 right-5 text-red-600 opacity-20 text-5xl animate-bounce-slower" />

      <div className="max-w-3xl mx-auto bg-gradient-to-br from-red-900 via-black to-gray-800 rounded-3xl shadow-2xl p-8">
        <h2
          className="text-3xl md:text-4xl font-extrabold text-center text-red-500 mb-8 drop-shadow-lg"
          data-aos="fade-down"
        >
          Add Trainer
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-up">
          {[
            { name: "fullname", placeholder: "Full Name", type: "text" },
            { name: "username", placeholder: "Username", type: "text" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "phone", placeholder: "Phone Number", type: "text" },
            { name: "password", placeholder: "Password", type: "password" },
            { name: "age", placeholder: "Age", type: "number" },
            { name: "height", placeholder: "Height (cm)", type: "number" },
            { name: "weight", placeholder: "Weight (kg)", type: "number" },
            { name: "specialization", placeholder: "Specialization", type: "text" },
            { name: "experience", placeholder: "Experience (yrs)", type: "number" },
            { name: "availableSlots", placeholder: "Available Slots (comma separated)", type: "text" },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={trainer[field.name]}
              onChange={handleChange}
              className="w-full p-3 rounded-2xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
              required={field.name !== "specialization" && field.name !== "availableSlots"}
            />
          ))}

          {/* Gender select */}
          <select
            name="gender"
            value={trainer.gender}
            onChange={handleChange}
            className="w-full p-3 rounded-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="col-span-1 md:col-span-2 w-full bg-red-500 hover:bg-red-600 transition-all duration-300 py-3 rounded-2xl font-semibold text-lg"
          >
            Add Trainer
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddTrainer;
