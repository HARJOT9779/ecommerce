import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaDumbbell, FaFire, FaStar } from "react-icons/fa";

const Memberships = () => {
  const [memberships, setMemberships] = useState([]);

  const fetchMemberships = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/membership/all");
      setMemberships(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch memberships");
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  return (
    <div className="min-h-screen bg-black relative py-10 overflow-hidden">
      {/* Floating Dumbbells */}
      <FaDumbbell className="absolute top-10 left-10 text-white opacity-10 text-6xl animate-bounce-slow" />
      <FaDumbbell className="absolute top-1/4 right-10 text-red-600 opacity-10 text-6xl animate-bounce-slower" />
      <FaDumbbell className="absolute bottom-32 left-20 text-white opacity-10 text-5xl animate-bounce-slower" />

      <h1 className="text-4xl font-bold text-center text-white mb-12">Membership Plans</h1>

      <div className="container mx-auto px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {memberships.map((membership) => (
          <Link to={`/membership/${membership._id}`} key={membership._id}>
            <div className="bg-gray-900 text-white rounded-xl shadow-lg p-6 flex flex-col items-start hover:shadow-red-600 transition duration-300 transform hover:-translate-y-1 hover:scale-105 w-full max-w-xs mx-auto cursor-pointer relative">
              
              {/* Popular Badge */}
              {membership.isPopular && (
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <FaStar /> Popular
                </div>
              )}

              {/* Membership Name */}
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <FaFire /> {membership.name}
              </h2>

              {/* Duration */}
              <p className="text-gray-300 mb-2">
                Duration: {membership.durationInMonths} {membership.durationInMonths > 1 ? "months" : "month"}
              </p>

              {/* Price */}
              <p className="text-gray-300 mb-4 text-lg font-semibold">Price: ₹{membership.price}</p>

              {/* Dummy Features */}
              <ul className="list-disc list-inside mb-4 text-gray-400">
                {membership.features?.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              {/* Join Now Button */}
              <div className="mt-auto">
                <button className="bg-red-600 px-4 py-2 rounded-lg shadow hover:bg-red-700 transition flex items-center gap-2">
                  <FaDumbbell /> Join Now
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Memberships;
