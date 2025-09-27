const express = require("express");
const router = express.Router();
const {
  createMembership,
  getAllMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership,
} = require("../controllers/memberShipController");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");

// Admin-only routes
router.post("/create", verifyToken, authorizeRoles("admin"), createMembership);
router.put("/update/:id", verifyToken, authorizeRoles("admin"), updateMembership);
router.delete("/delete/:id", verifyToken, authorizeRoles("admin"), deleteMembership);

// Public routes
router.get("/all", getAllMemberships);
router.get("/:id", getMembershipById);

module.exports = router;
