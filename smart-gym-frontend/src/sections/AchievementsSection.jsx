import React, { useEffect, useState } from "react";
import "./AchievementsSection.css";
import AOS from "aos";
import "aos/dist/aos.css";

const stats = [
  { label: "Happy Members", value: 500 },
  { label: "Training Hours", value: 1200 },
  { label: "Certified Trainers", value: 50 },
  { label: "Awards Won", value: 10 },
];

const AchievementsSection = () => {
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prev) =>
        prev.map((count, idx) =>
          count < stats[idx].value ? count + Math.ceil(stats[idx].value / 100) : stats[idx].value
        )
      );
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="achievements-section">
      <h2 data-aos="fade-up">Our Achievements</h2>
      <div className="stats-container">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card" data-aos="fade-up" data-aos-delay={idx * 200}>
            <div className="stat-number">{counters[idx]}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AchievementsSection;
