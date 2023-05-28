const mongoose = require("mongoose");

const OuterSchema = new mongoose.Schema(
  {
    outerBranch: {
      type: String,
      required: true,
    },
    outerNo: {
      type: String,
      required: true,
    },
    outerDate: {
      type: String, // Please note, you might want to use a Date type here, depending on your use case.
      required: true,
    },
    blNo: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true, // Will add createdAt and updatedAt fields
  }
);

const Outer = mongoose.model("Outer", OuterSchema);

module.exports = Outer;
