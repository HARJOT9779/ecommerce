import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMars,
  FaVenus,
  FaGenderless,
  FaDumbbell,
  FaClock,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const TrainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    specialization: "",
    experience: "",
    availableSlots: [],
  });

  const { isLoggedIn} = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/trainers/${id}`);
        setTrainer(res.data.trainer);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch trainer");
      }
    };
    fetchTrainer();
  }, [id]);
  
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this trainer?")) {
      try {
        await axios.delete(`http://localhost:5000/api/trainers/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Trainer deleted successfully");
        navigate("/trainers");
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to delete trainer");
      }
    }
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
    setEditData({
      fullname: trainer.fullname,
      username: trainer.username,
      email: trainer.email,
      phone: trainer.phone,
      gender: trainer.gender,
      age: trainer.age,
      height: trainer.height,
      weight: trainer.weight,
      specialization: trainer.specialization,
      experience: trainer.experience,
      availableSlots: trainer.availableSlots,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/trainers/update/${id}`,
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTrainer(res.data.trainer);
      toast.success("Trainer updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update trainer");
    }
  };

  if (!trainer) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-black relative py-10 overflow-hidden">
      {/* Floating Gym Icons */}
      <FaDumbbell className="absolute top-10 left-10 text-white opacity-10 text-6xl animate-bounce-slow" />
      <FaDumbbell className="absolute top-1/4 right-10 text-red-600 opacity-10 text-6xl animate-bounce-slower" />
      <FaDumbbell className="absolute bottom-32 left-20 text-white opacity-10 text-5xl animate-bounce-slower" />

      <div className="container mx-auto px-4 max-w-3xl bg-gray-900 rounded-lg shadow-xl p-6 relative z-10">
        {isEditing ? (
          <>
            {Object.keys(editData).map((field) => (
              <div className="mb-4" key={field}>
                <label className="block font-semibold text-white capitalize">
                  {field}:
                </label>
                {field === "availableSlots" ? (
                  <textarea
                    value={editData.availableSlots.join(", ")}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        availableSlots: e.target.value.split(","),
                      })
                    }
                    className="w-full border rounded p-2 mt-1 bg-gray-800 text-white"
                    rows="3"
                  />
                ) : (
                  <input
                    type="text"
                    value={editData[field]}
                    onChange={(e) =>
                      setEditData({ ...editData, [field]: e.target.value })
                    }
                    className="w-full border rounded p-2 mt-1 bg-gray-800 text-white"
                  />
                )}
              </div>
            ))}

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4 text-white flex items-center gap-2">
              <FaUser /> {trainer.fullname}
            </h1>
            <p className="text-gray-300 mb-1 flex items-center gap-2">
              <span className="font-semibold">Username:</span> {trainer.username}
            </p>
            <p className="text-gray-300 mb-1 flex items-center gap-2">
              <FaEnvelope /> {trainer.email}
            </p>
            <p className="text-gray-300 mb-1 flex items-center gap-2">
              <FaPhone /> {trainer.phone}
            </p>
            <p className="text-gray-300 mb-1 flex items-center gap-2">
              {trainer.gender === "male" ? (
                <FaMars />
              ) : trainer.gender === "female" ? (
                <FaVenus />
              ) : (
                <FaGenderless />
              )}{" "}
              {trainer.gender}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold">Age:</span> {trainer.age}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold">Height:</span> {trainer.height} cm
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold">Weight:</span> {trainer.weight} kg
            </p>
            <p className="text-gray-300 mb-1 flex items-center gap-2">
              <FaDumbbell /> {trainer.specialization} ({trainer.experience} yrs)
            </p>
            <div className="mt-2">
              <span className="font-semibold mb-1 flex items-center gap-2 text-gray-300">
                <FaClock /> Available Slots:
              </span>
              <ul className="list-disc list-inside max-h-32 overflow-y-auto break-words text-gray-300">
                {trainer.availableSlots.map((slot, index) => (
                  <li key={index} className="truncate">
                    {slot}
                  </li>
                ))}
              </ul>
            </div>

            {isLoggedIn && role === "admin" && (
              <div className="flex justify-end gap-4 mt-6 text-white">
                <FaEdit
                  onClick={handleUpdateClick}
                  className="text-2xl cursor-pointer hover:text-green-500 transition"
                  title="Edit"
                />
                <FaTrash
                  onClick={handleDelete}
                  className="text-2xl cursor-pointer hover:text-red-500 transition"
                  title="Delete"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TrainerDetails;
