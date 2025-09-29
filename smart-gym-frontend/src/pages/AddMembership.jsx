import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaGift, FaClock, FaDollarSign } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const AddMembership = () => {
  const [membership, setMembership] = useState({
    name: "",
    durationInMonths: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMembership({ ...membership, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/membership/create",
        membership,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Membership added successfully!");
      setMembership({ name: "", durationInMonths: "", price: "", description: "" });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add membership.");
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-red-900 to-black relative py-16 px-4">
      {/* Floating Icons */}
      <FaGift className="absolute top-10 left-5 text-white opacity-20 text-6xl animate-bounce-slow" />
      <FaClock className="absolute top-1/4 right-10 text-white opacity-20 text-6xl animate-bounce-slower" />
      <FaDollarSign className="absolute bottom-32 right-5 text-yellow-400 opacity-20 text-5xl animate-bounce-slower" />

      <div
        className="max-w-2xl mx-auto bg-gradient-to-br from-red-900 via-black to-gray-800 rounded-3xl shadow-2xl p-8"
        data-aos="fade-up"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-red-500 mb-8 drop-shadow-lg" data-aos="fade-down">
          Add Membership
        </h2>

        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Membership Name"
            value={membership.name}
            onChange={handleChange}
            className="w-full p-3 rounded-2xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
            required
          />
          <input
            type="number"
            name="durationInMonths"
            placeholder="Duration in Months"
            value={membership.durationInMonths}
            onChange={handleChange}
            className="w-full p-3 rounded-2xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={membership.price}
            onChange={handleChange}
            className="w-full p-3 rounded-2xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-all"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={membership.description}
            onChange={handleChange}
            className="w-full p-3 rounded-2xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
            rows={4}
          />

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 transition-all duration-300 py-3 rounded-2xl font-semibold text-lg"
          >
            Add Membership
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddMembership;
