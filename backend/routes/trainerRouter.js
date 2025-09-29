    const express = require("express");
    const router = express.Router();
    const trainerController = require("../controllers/trainerController");
    const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");

    // ===== ADMIN ROUTES =====

    // Create a new trainer (Admin only)
    router.post(
    "/create",
    verifyToken,
    authorizeRoles("admin"),
    trainerController.createTrainerController
    );

    // Update a trainer by ID (Admin only)
    router.put(
    "/update/:id",
    verifyToken,
    authorizeRoles("admin"),
    trainerController.updateTrainerController
    );

    // Delete a trainer by ID (Admin only)
    router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("admin"),
    trainerController.deleteTrainerController
    );

    // ===== PUBLIC ROUTES =====

    // Get all trainers
    router.get("/all", trainerController.getAllTrainersController);

    // Get trainer by ID
    router.get("/:id", trainerController.getTrainerByIdController);

    module.exports = router;
