import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p>© 2025 Smart Gym. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <FaFacebook className="hover:text-green-400 cursor-pointer" />
          <FaInstagram className="hover:text-green-400 cursor-pointer" />
          <FaTwitter className="hover:text-green-400 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
