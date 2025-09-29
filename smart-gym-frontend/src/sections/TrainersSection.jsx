import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./TrainersSection.css";

const TrainersSectionDynamic = () => {
  const [trainers, setTrainers] = useState([]);

  // Fetch trainers from backend
  const fetchTrainers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/trainers/all");
      setTrainers(res.data.trainers);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch trainers");
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // If no data, show temporary fallback
  if (!trainers || trainers.length === 0) {
    return <p className="text-center text-white mt-10">No trainers found.</p>;
  }

  return (
    <section className="trainers-section">
      <h2>Meet Our Trainers</h2>
      <div className="trainers-container">
        {trainers.map((trainer) => (
          <Link
            to={`/trainer/${trainer._id}`}
            key={trainer._id}
            className="trainer-card-link"
          >
            <div className="trainer-card">
              <div className="trainer-card-inner">
                {/* Front */}
                <div className="trainer-card-front">
                  <img
                    src={
                      trainer.img ||
                      "https://via.placeholder.com/400x400?text=No+Image"
                    }
                    alt={trainer.fullname}
                  />
                  <h3>{trainer.fullname}</h3>
                  <p>{trainer.specialization}</p>
                </div>

                {/* Back */}
                <div className="trainer-card-back">
                  <div>
                    <h3>{trainer.fullname}</h3>
                    <p>
                      Experience: {trainer.experience} yrs
                      <br />
                      Phone: {trainer.phone}
                    </p>
                  </div>
                  <div
                    className="instagram-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigating to trainer page
                      if (trainer.instagram) {
                        window.open(trainer.instagram, "_blank");
                      }
                    }}
                  >
                    <FaInstagram />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrainersSectionDynamic;
