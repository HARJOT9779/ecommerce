import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./MembershipSection.css";

const MembershipSectionDynamic = () => {
  const [memberships, setMemberships] = useState([]);

  // Fetch memberships from backend
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

  if (!memberships || memberships.length === 0) {
    return <p className="text-center text-white mt-10">No memberships found.</p>;
  }

  return (
    <section className="membership-section">
      <h2>Membership Plans</h2>
      <div className="membership-container">
        {memberships.map((membership) => (
          <Link
            to={`/membership/${membership._id}`}
            key={membership._id}
            className="membership-card-link"
          >
            <div className="membership-card">
              <div className="membership-card-inner">
                {/* Front */}
                <div className="membership-card-front">
                  <h3>{membership.name}</h3>
                  <p className="price">₹{membership.price}</p>
                  <p className="duration">
                    Duration: {membership.durationInMonths} {membership.durationInMonths > 1 ? "months" : "month"}
                  </p>
                </div>

                {/* Back */}
                <div className="membership-card-back">
                  <h3>{membership.name}</h3>
                  <ul>
                    {membership.features?.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <div
                    className="join-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      window.location.href = `/membership/${membership._id}`;
                    }}
                  >
                    Join Now
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

export default MembershipSectionDynamic;
