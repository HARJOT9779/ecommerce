const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route Example (only logged-in users can access)
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: `Welcome user ${req.user.id}`, role: req.user.role });
});

// Role-Based Route (only admin can access)
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin! You have full access." });
});

router.get("/trainer", verifyToken,authorizeRoles("trainer"), (req,res)=>{
    res.json({ message : "Welcome Trainer"})
})

module.exports = router;
