import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FaEdit, FaTrash, FaStar, FaDumbbell, FaClock, FaRupeeSign } from "react-icons/fa";

const MembershipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [membership, setMembership] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    durationInMonths: "",
    price: "",
    description: "",
  });

  const { isLoggedIn } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Fetch membership details
  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/membership/${id}`);
        setMembership(res.data);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch membership");
      }
    };
    fetchMembership();
  }, [id]);

  // Handle delete
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this membership?")) {
      try {
        await axios.delete(`http://localhost:5000/api/membership/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Membership deleted successfully");
        navigate("/memberships");
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to delete membership");
      }
    }
  };

  // Start editing
  const handleUpdateClick = () => {
    setIsEditing(true);
    setEditData({
      name: membership.name,
      durationInMonths: membership.durationInMonths,
      price: membership.price,
      description: membership.description,
    });
  };

  // Cancel editing
  const handleCancel = () => setIsEditing(false);

  // Save updates
  const handleSave = async () => {
    try {
      const updatedData = { ...membership, ...editData };

      const res = await axios.put(
        `http://localhost:5000/api/membership/update/${id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMembership(res.data.membership);

      // Sync editData to avoid input disappearing
      setEditData({
        name: res.data.name,
        durationInMonths: res.data.durationInMonths,
        price: res.data.price,
        description: res.data.description,
      });

      toast.success("Membership updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update membership");
    }
  };

  if (!membership) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-900 to-black py-10 relative overflow-hidden">
      {/* Floating Dumbbells */}
      <FaDumbbell className="absolute top-10 left-10 text-white opacity-10 text-6xl animate-bounce-slow" />
      <FaDumbbell className="absolute top-1/4 right-10 text-red-600 opacity-10 text-6xl animate-bounce-slower" />

      <div className="container mx-auto px-4 max-w-2xl bg-gray-900 text-white rounded-xl shadow-2xl p-8 relative">
        {isEditing ? (
          <>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Name:</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full border rounded p-2 bg-gray-800 text-white mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Duration (months):</label>
              <input
                type="number"
                value={editData.durationInMonths}
                onChange={(e) =>
                  setEditData({ ...editData, durationInMonths: e.target.value })
                }
                className="w-full border rounded p-2 bg-gray-800 text-white mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Price (₹):</label>
              <input
                type="number"
                value={editData.price}
                onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                className="w-full border rounded p-2 bg-gray-800 text-white mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Description:</label>
              <textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                className="w-full border rounded p-2 bg-gray-800 text-white mt-1"
                rows="4"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition"
              >
                <FaEdit /> Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <FaStar /> {membership.name}
            </h1>

            <p className="text-gray-300 mb-2 flex items-center gap-2">
              <FaClock /> Duration: {membership.durationInMonths}{" "}
              {membership.durationInMonths > 1 ? "months" : "month"}
            </p>

            <p className="text-gray-300 mb-2 flex items-center gap-2">
              <FaRupeeSign /> Price: {membership.price}
            </p>

            <p className="text-gray-300 mb-4">{membership.description}</p>

            {isLoggedIn && role === "admin" && (
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={handleUpdateClick}
                  className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition shadow-lg flex items-center justify-center"
                  title="Edit Membership"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-3 bg-red-600 rounded-full hover:bg-red-700 transition shadow-lg flex items-center justify-center"
                  title="Delete Membership"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MembershipDetail;
