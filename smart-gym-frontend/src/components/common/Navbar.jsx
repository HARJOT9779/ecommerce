import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/authSlice";
import { FiUser, FiLogIn, FiUserPlus, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "@headlessui/react";
import "./NavbarEffects.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const role = localStorage.getItem("role")
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    navigate("/");
  };

  const linkHover = {
    whileHover: {
      y: -3,
      scale: 1.05,
      textShadow: "0px 0px 10px rgba(255,100,100,0.8)"
    },
    transition: { type: "spring", stiffness: 300 }
  };

  return (
    <nav className="bg-black text-white shadow-2xl sticky top-0 z-50 border-b border-red-700">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-white neon-logo transition-all duration-300 transform hover:scale-105"
        >
          <FiUserPlus size={28} className="text-red-500 animate-pulse" />
          Burn Square Gym
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 font-semibold uppercase tracking-wide">
          <motion.div {...linkHover}>
            <Link to="/" className="text-white hover:text-red-500 transition-all duration-300">
              Home
            </Link>
          </motion.div>
          <motion.div {...linkHover}>
            <Link to="/trainers" className="text-white hover:text-red-500 transition-all duration-300">
              Trainers
            </Link>
          </motion.div>
          <motion.div {...linkHover}>
            <Link to="/memberships" className="text-white hover:text-red-500 transition-all duration-300">
              Memberships
            </Link>
          </motion.div>
          {role ==="admin"&&(
            <>
          <motion.div {...linkHover}>
            <Link to="/addmembership" className="text-white hover:text-red-500 transition-all duration-300">
              Add Membership
            </Link>
          </motion.div>
          <motion.div {...linkHover}>
            <Link to="/addtrainers" className="text-white hover:text-red-500 transition-all duration-300">
              Add Trainers
            </Link>
          </motion.div>
          </>
          )}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform"
                onClick={() => navigate("/login")}
              >
                <FiLogIn /> Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded-lg font-semibold text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform"
                onClick={() => navigate("/register")}
              >
                <FiUserPlus /> Sign Up
              </motion.button>
            </>
          ) : (
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="flex items-center gap-2 text-white hover:text-red-500 transition-all duration-300 transform hover:scale-105">
                <FiUser size={28} />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-44 bg-gray-900 rounded-md shadow-2xl py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={`block px-4 py-2 text-sm text-white ${active ? "bg-red-600" : ""}`}
                    >
                      Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 text-sm text-white ${active ? "bg-red-500" : ""}`}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          )}
        </div>

        {/* Hamburger Button (Mobile) */}
        <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>
          {isOpen ? <FiX className="text-red-500 animate-pulse" /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="fixed top-0 left-0 h-screen w-64 bg-black/95 backdrop-blur-md z-40 p-6 flex flex-col gap-6 shadow-2xl"
          >
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-white text-lg font-semibold hover:text-red-500 transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white text-lg font-semibold hover:text-red-500 transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/trainers" onClick={toggleMenu}>
                Trainers
              </Link>
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white text-lg font-semibold hover:text-red-500 transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/memberships" onClick={toggleMenu}>
                Memberships
              </Link>
            </motion.div>

            {!isLoggedIn ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform"
                  onClick={() => {
                    navigate("/login");
                    toggleMenu();
                  }}
                >
                  <FiLogIn /> Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded-lg font-semibold text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform"
                  onClick={() => {
                    navigate("/register");
                    toggleMenu();
                  }}
                >
                  <FiUserPlus /> Sign Up
                </motion.button>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="block text-white text-lg font-semibold hover:text-red-500 transition-all duration-300 transform hover:scale-105"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full text-left text-white text-lg font-semibold hover:text-red-600 transition-all duration-300 transform hover:scale-105"
                >
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-40 z-30" onClick={toggleMenu} />}
    </nav>
  );
};

export default Navbar;
