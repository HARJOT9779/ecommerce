import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import HeroImage from "../assets/anastase-maragos-4dlhin0ghOk-unsplash.jpg";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
    AOS.refresh();
  }, []);

  return (
    <section
      className="h-screen relative flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      {/* Content */}
      <div className="relative text-center text-white px-6 sm:px-10 max-w-4xl">
        <h1
          data-aos="fade-down"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          Transform Your Body Today
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="300"
          className="text-base sm:text-lg md:text-xl mb-8"
        >
          Join Burn Square Gym and achieve your fitness goals with certified
          trainers and modern equipment.
        </p>

        <div
          data-aos="fade-up"
          data-aos-delay="600"
          className="flex justify-center gap-6 flex-wrap"
        >
          <Link
            to="/register"
            className="bg-lime-600 hover:bg-lime-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Join Now
          </Link>
          <Link
            to="/trainers"
            className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            View Trainers
          </Link>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-10 w-full text-center animate-bounce">
        <span className="text-3xl sm:text-4xl text-white">&#8595;</span>
      </div>

      {/* Fade Bottom */}
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default Hero;
