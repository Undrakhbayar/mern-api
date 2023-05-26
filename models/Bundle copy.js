const mongoose = require("mongoose");

const bundleSchema = new mongoose.Schema(
  {
    mailBagNumber: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bundle", bundleSchema);
