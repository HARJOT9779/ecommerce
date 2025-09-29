import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser, FaPhone, FaDumbbell, FaHeartbeat } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/trainers/all");
      setTrainers(res.data.trainers || []);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch trainers");
    }
  };

  if (!trainers || trainers.length === 0) {
    return <p className="text-center text-white mt-10">No trainers found.</p>;
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-red-900 to-black relative py-16 overflow-hidden">
      {/* Floating Icons */}
      <FaDumbbell className="absolute top-10 left-5 text-white opacity-20 text-6xl animate-bounce-slow" />
      <GiWeightLiftingUp className="absolute top-1/4 right-10 text-white opacity-20 text-6xl animate-bounce-slower" />
      <FaHeartbeat className="absolute bottom-32 right-5 text-red-600 opacity-20 text-5xl animate-bounce-slower" />

      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-red-500 mb-12 drop-shadow-lg">
        Meet Our Trainers
      </h1>

      <div className="container mx-auto px-4 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {trainers.map((trainer, idx) => (
          <Link
            to={`/trainer/${trainer._id}`}
            key={trainer._id}
            data-aos="fade-up"
            data-aos-delay={idx * 150}
          >
            <div className="bg-gradient-to-br from-red-900 via-black to-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:scale-105 hover:shadow-lg hover:shadow-red-600 w-full max-w-xs mx-auto">
              
              {/* Avatar */}
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mb-4 text-3xl text-black flex-shrink-0">
                <FaUser />
              </div>

              {/* Name */}
              <h2 className="text-xl font-bold text-white mb-2 text-center break-words">
                {trainer.fullname}
              </h2>

              {/* Specialization */}
              <p className="text-red-400 font-semibold mb-1 text-center break-words">
                {trainer.specialization}
              </p>

              {/* Experience */}
              <p className="text-yellow-300 mb-1 text-center break-words">
                {trainer.experience} yrs experience
              </p>

              {/* Phone */}
              <p className="text-gray-200 text-sm flex items-center justify-center gap-2 break-words text-center">
                <FaPhone /> {trainer.phone}
              </p>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Trainers;
