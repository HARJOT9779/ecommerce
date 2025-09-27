const Membership = require("../models/memberShipModel");

const createMembershipService = async (data) => {
  return await Membership.create(data);
};

const getAllMembershipsService = async () => {
  return await Membership.find();
};

const getMembershipByIdService = async (id) => {
  return await Membership.findById(id);
};

const updateMembershipService = async (id, data) => {
  return await Membership.findByIdAndUpdate(id, data, { new: true });
};

const deleteMembershipService = async (id) => {
  return await Membership.findByIdAndDelete(id);
};

module.exports = {
  createMembershipService,
  getAllMembershipsService,
  getMembershipByIdService,
  updateMembershipService,
  deleteMembershipService,
};
