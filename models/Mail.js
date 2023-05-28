const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema(
  {
    houseSeq: {
      type: String,
      required: false,
    },
    prgsStatusCd: {
      type: String,
      default: "10",
      required: false,
    },
    mailId: {
      type: String,
      required: false,
    },
    mailBagNumber: {
      type: String,
      required: false,
    },
    blNo: {
      type: String,
      required: false,
    },
    reportType: {
      type: String,
      required: false,
    },
    riskType: {
      type: String,
      required: false,
    },
    netWgt: {
      type: Number,
      required: false,
    },
    mailWgt: {
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
    transportType: {
      type: String,
      required: false,
    },
    transportTypeNm: {
      type: String,
      required: false,
    },
    isDiplomat: {
      type: String,
      required: false,
      default: "N",
    },
    hsCode: {
      type: String,
      required: false,
    },
    goodsNm: {
      type: String,
      required: false,
    },
    shipperCntryCd: {
      type: String,
      required: false,
    },
    shipperCntryNm: {
      type: String,
      required: false,
    },
    shipperNatinality: {
      type: String,
      required: false,
    },
    shipperNatinalityNm: {
      type: String,
      required: false,
    },
    shipperNm: {
      type: String,
      required: false,
    },
    shipperReg: {
      type: String,
      required: false,
    },
    shipperAddr: {
      type: String,
      required: false,
    },
    shipperTel: {
      type: String,
      required: false,
    },
    shipperEmail: {
      type: String,
      required: false,
    },
    consigneeCntryCd: {
      type: String,
      required: false,
    },
    consigneeCntryNm: {
      type: String,
      required: false,
    },
    consigneeNatinality: {
      type: String,
      required: false,
    },
    consigneeNatinalityNm: {
      type: String,
      required: false,
    },
    consigneeNm: {
      type: String,
      required: false,
    },
    consigneeReg: {
      type: String,
      required: false,
    },
    consigneeAddr: {
      type: String,
      required: false,
    },
    consigneeTel: {
      type: String,
      required: false,
    },
    consigneeEmail: {
      type: String,
      required: false,
    },
    compName: {
      type: String,
      required: false,
    },
    compRegister: {
      type: String,
      required: false,
    },
    compAddr: {
      type: String,
      required: false,
    },
    compTel: {
      type: String,
      required: false,
    },
    mailDate: {
      type: String,
      required: false,
    },
    area: {
      type: String,
      required: false,
    },
    areaNm: {
      type: String,
      required: false,
    },
    branch: {
      type: String,
      required: false,
    },
    branchNm: {
      type: String,
      required: false,
    },
    consigneePayYn: {
      type: String,
      required: false,
    },
    mailType: {
      type: String,
      required: false,
    },
    mailTypeNm: {
      type: String,
      required: false,
    },
    serviceType: {
      type: String,
      required: false,
    },
    serviceTypeNm: {
      type: String,
      required: false,
    },
    mainPrice: {
      type: Number,
      required: false,
    },
    regPrice: {
      type: Number,
      required: false,
    },
    addPrice: {
      type: Number,
      required: false,
    },
    tax: {
      type: Number,
      required: false,
    },
    addWgtPrice: {
      type: Number,
      required: false,
    },
    sumPrice: {
      type: Number,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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

module.exports = mongoose.model("Mail", mailSchema);
