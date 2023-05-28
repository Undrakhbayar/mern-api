const mongoose = require("mongoose");

const BundleItemSchema = new mongoose.Schema(
  {
    bundleNo: {
      type: String,
      required: true,
    },
    mailId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Mail",
    },
    bundleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Bundle",
    },
    mailNo: {
      type: String,
      required: true,
    },
    wgt: {
      type: Number,
      required: true,
    },
    riskType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Will add createdAt and updatedAt fields
  }
);

const BundleItem = mongoose.model("BundleItem", BundleItemSchema);

module.exports = BundleItem;
