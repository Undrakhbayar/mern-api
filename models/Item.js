const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    goodsNm: {
      type: String,
      required: false,
    },
    netWgt: {
      type: Number,
      required: false,
    },
    wgt: {
      type: Number,
      required: false,
    },
    wgtUnit: {
      type: String,
      default: "KG",
    },
    qty: {
      type: Number,
      required: false,
    },
    qtyUnit: {
      type: String,
      default: "U",
    },
    dangGoodsCode: {
      type: String,
      required: false,
    },
    transFare: {
      type: Number,
      required: false,
    },
    transFareCurr: {
      type: String,
      default: "USD",
    },
    price1: {
      type: Number,
      required: false,
    },
    price1Curr: {
      type: String,
      default: "USD",
    },
    price2: {
      type: Number,
      required: false,
    },
    price2Curr: {
      type: String,
      required: false,
    },
    price3: {
      type: Number,
      required: false,
    },
    price3Curr: {
      type: String,
      required: false,
    },
    price4: {
      type: Number,
      required: false,
    },
    price4Curr: {
      type: String,
      required: false,
    },
    price5: {
      type: Number,
      required: false,
    },
    price5Curr: {
      type: String,
      required: false,
    },
    hsCode: {
      type: String,
      required: false,
    },
    ecommerceType: {
      type: String,
      required: false,
    },
    ecommerceLink: {
      type: String,
      required: false,
    },
    packageeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Packagee",
    },
    delYn: {
      type: String,
      required: true,
      default: "N",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
