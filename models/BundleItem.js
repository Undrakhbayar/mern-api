const mongoose = require("mongoose");

const BundleItemSchema = new mongoose.Schema(
  {
    bundleNo: {
      type: String,
      required: true,
    },
    mailId: {
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
