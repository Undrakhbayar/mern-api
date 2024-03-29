const mongoose = require("mongoose");

const bundleSchema = new mongoose.Schema(
  {
    bundleNo: {
      type: String,
      required: true,
    },
    bundleBranch: {
      type: String,
      required: true,
    },
    bundleWgt: {
      type: Number,
      required: true,
    },
    bundleDate: {
      type: String, // Please note, you might want to use a Date type here, depending on your use case.
      required: true,
    },
    bundleType: {
      type: String,
      required: true,
    },
    innerNo: {
      type: String, // This field is not required by default
    },
    sumWgt: {
      type: Number,
      required: true,
    },
    sumCnt: {
      type: Number,
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

const Bundle = mongoose.model("Bundle", bundleSchema);

module.exports = Bundle;
