const trainerService = require("../services/trainerService");

// Admin creates trainer
const createTrainerController = async (req, res) => {
  try {
    const trainer = await trainerService.createTrainer(req.body);
    res.status(201).json({ message: "Trainer created successfully", trainer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Public - get all trainers
const getAllTrainersController = async (req, res) => {
  try {
    const trainers = await trainerService.getAllTrainers();
    res.status(200).json({ trainers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Public - get trainer by ID
const getTrainerByIdController = async (req, res) => {
  try {
    const trainer = await trainerService.getTrainerById(req.params.id);
    res.status(200).json({ trainer });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Admin updates trainer
const updateTrainerController = async (req, res) => {
  try {
    const trainer = await trainerService.updateTrainer(req.params.id, req.body);
    res.status(200).json({ message: "Trainer updated", trainer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Admin deletes trainer
const deleteTrainerController = async (req, res) => {
  try {
    await trainerService.deleteTrainer(req.params.id);
    res.status(200).json({ message: "Trainer deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { createTrainerController, getAllTrainersController, getTrainerByIdController, updateTrainerController, deleteTrainerController };
