const express = require("express");
const { registerUser, loginUser, getUserByIdController } = require("../controllers/userController");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:id",verifyToken,getUserByIdController)



module.exports = router;
  