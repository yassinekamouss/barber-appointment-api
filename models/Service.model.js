const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true, // duration in minutes
      default: 30,
    },
    price: {
      type: Number,
      required: true, // price in local currency
    },
  },
  {
    timestamps: true,
  }
);


const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;