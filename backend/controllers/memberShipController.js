const {
  createMembershipService,
  getAllMembershipsService,
  getMembershipByIdService,
  updateMembershipService,
  deleteMembershipService,
} = require("../services/memberShipService");

// CREATE
const createMembership = async (req, res) => {
  try {
    const membership = await createMembershipService(req.body);
    res.status(201).json({ message: "Membership created", membership });
  } catch (error) {
    res.status(400).json({ message: "Error creating membership", error: error.message });
  }
};

// READ ALL
const getAllMemberships = async (req, res) => {
  try {
    const memberships = await getAllMembershipsService();
    res.status(200).json(memberships);
  } catch (error) {
    res.status(400).json({ message: "Error fetching memberships", error: error.message });
  }
};

// READ ONE
const getMembershipById = async (req, res) => {
  try {
    const membership = await getMembershipByIdService(req.params.id);
    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }
    res.status(200).json(membership);
  } catch (error) {
    res.status(400).json({ message: "Error fetching membership", error: error.message });
  }
};

// UPDATE
const updateMembership = async (req, res) => {
  try {
    const membership = await updateMembershipService(req.params.id, req.body);
    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }
    res.status(200).json({ message: "Membership updated", membership });
  } catch (error) {
    res.status(400).json({ message: "Error updating membership", error: error.message });
  }
};

// DELETE
const deleteMembership = async (req, res) => {
  try {
    const membership = await deleteMembershipService(req.params.id);
    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }
    res.status(200).json({ message: "Membership deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting membership", error: error.message });
  }
};

module.exports = {
  createMembership,
  getAllMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership,
};
