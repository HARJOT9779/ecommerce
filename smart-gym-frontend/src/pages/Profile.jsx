import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  const token = localStorage.getItem("token");
  let id = localStorage.getItem("id");
  if (id) id = id.replace(/"/g, "");

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  useEffect(() => {
    if (!id || !token) return;

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/profile/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserProfile(res.data.user);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch profile");
      }
    };

    fetchUserProfile();
  }, [id, token]);

  if (!userProfile)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-red-500 text-lg font-semibold animate-pulse">
          Loading profile...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-6">
      {/* Floating Gym Particles */}
      <span className="absolute top-10 left-5 text-white opacity-20 text-7xl animate-bounce-slow">
        🏋️
      </span>
      <span className="absolute top-1/4 right-10 text-red-500 opacity-30 text-6xl animate-bounce-slow">
        💪
      </span>
      <span className="absolute bottom-10 left-1/3 text-white opacity-10 text-8xl animate-spin-slow">
        🏃‍♂️
      </span>
      <span className="absolute top-1/2 left-1/2 text-red-600 opacity-20 text-7xl animate-bounce-slow">
        🏋️‍♂️
      </span>

      <div
        className="max-w-4xl w-full bg-gradient-to-tr from-black via-gray-900/80 to-black/80 border-red-500 border-2 rounded-3xl shadow-2xl p-8"
        data-aos="fade-up"
      >
        <h2 className="text-4xl font-bold mb-10 text-center text-red-500 tracking-wider">
          My Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Full Name", value: userProfile.fullname },
            { label: "Username", value: userProfile.username },
            { label: "Email", value: userProfile.email },
            { label: "Phone", value: userProfile.phone },
            { label: "Gender", value: userProfile.gender },
            { label: "Age", value: userProfile.age },
            { label: "Height (cm)", value: userProfile.height },
            { label: "Weight (kg)", value: userProfile.weight },
            {
              label: "Joined On",
              value: new Date(userProfile.joinDate).toLocaleDateString(),
            },
            { label: "Role", value: userProfile.role?.toUpperCase() },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-black/70 p-4 rounded-2xl border border-red-700 shadow-md hover:scale-105 transition-transform duration-300 flex flex-col"
            >
              <p className="text-red-500 font-bold uppercase tracking-wide text-sm mb-1">
                {item.label}
              </p>
              <p className="text-white font-medium break-words">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Trainer Details */}
        {userProfile.role === "trainer" && (
          <div className="mt-12">
            <h3 className="text-3xl font-semibold mb-6 text-center text-red-500 tracking-wider">
              Trainer Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/70 p-4 rounded-2xl border border-red-700 shadow-md hover:scale-105 transition-transform duration-300">
                <p className="text-red-500 font-bold uppercase tracking-wide text-sm mb-1">
                  Specialization
                </p>
                <p className="text-white font-medium">
                  {userProfile.specialization || "N/A"}
                </p>
              </div>
              <div className="bg-black/70 p-4 rounded-2xl border border-red-700 shadow-md hover:scale-105 transition-transform duration-300">
                <p className="text-red-500 font-bold uppercase tracking-wide text-sm mb-1">
                  Experience (yrs)
                </p>
                <p className="text-white font-medium">
                  {userProfile.experience || 0}
                </p>
              </div>
              <div className="md:col-span-2 bg-black/70 p-4 rounded-2xl border border-red-700 shadow-md hover:scale-105 transition-transform duration-300">
                <p className="text-red-500 font-bold uppercase tracking-wide text-sm mb-1">
                  Available Slots
                </p>
                <p className="text-white font-medium break-words">
                  {userProfile.availableSlots?.join(", ") || "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
