import React, { useEffect } from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Trainers from "./pages/Trainers";
import TrainerDetails from "./pages/TrainerDetails";
import Memberships from "./pages/Memberships";
import MembershipDetail from "./pages/MembershipDetail";
import Profile from "./pages/Profile";
import { login } from "./reducers/authSlice";
import { useDispatch } from "react-redux";
import AddMembership from "./pages/AddMembership";
import AddTrainer from "./pages/AddTrainer";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    if (token && id) {
      // here you can also fetch user details from backend if needed
      dispatch(login({ user: { id, role }, token }));
    }
  }, [dispatch]);


  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trainers" element={<Trainers/>} />
        <Route path="/trainer/:id" element={<TrainerDetails/>} />
        <Route path="/memberships" element={<Memberships/>} />
        <Route path="/membership/:id" element={<MembershipDetail/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/addmembership" element={<AddMembership/>} />
        <Route path="/addtrainers" element={<AddTrainer/>} />

      </Routes>

      <Footer />

      {/* ✅ Toast container should be outside Routes */}
      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
}

export default App;
