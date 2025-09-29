import React from "react";
import "./TestimonialsSection.css";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "John Doe",
    image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?fit=crop&w=400&q=80",
    feedback: "Burn Square Gym transformed my life! Great trainers and excellent equipment.",
    stars: 5,
    extra: "Member since 2022",
  },
  {
    name: "Jane Smith",
    image: "https://images.unsplash.com/photo-1594737625785-8c52c18485d6?fit=crop&w=400&q=80",
    feedback: "The personal training sessions are top-notch. Highly recommended!",
    stars: 4,
    extra: "Member since 2021",
  },
  {
    name: "Mike Johnson",
    image: "https://images.unsplash.com/photo-1599058917210-cc7450f5d7c6?fit=crop&w=400&q=80",
    feedback: "Amazing atmosphere and very motivating environment.",
    stars: 5,
    extra: "Member since 2023",
  },
  {
    name: "Emily Davis",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?fit=crop&w=400&q=80",
    feedback: "I love the group classes and the variety of equipment.",
    stars: 4,
    extra: "Member since 2022",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <h2>What Our Clients Say</h2>
      <div className="testimonials-container">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="testimonial-card">
            <div className="testimonial-card-inner">
              {/* Front */}
              <div className="testimonial-card-front">
                <img src={testimonial.image} alt={testimonial.name} />
                <h3>{testimonial.name}</h3>
                <p>{testimonial.feedback}</p>
                <div className="star-rating">
                  {Array.from({ length: testimonial.stars }, (_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>

              {/* Back */}
              <div className="testimonial-card-back">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.extra}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
