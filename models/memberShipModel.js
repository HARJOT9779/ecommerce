const mongoose = require("mongoose");

const memberShipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    durationInMonths: {
      type: Number, // e.g. 1, 3, 6, 12
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Membership", memberShipSchema);
