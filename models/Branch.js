const mongoose = require("mongoose");
const { Schema } = mongoose;

const BranchSchema = new Schema(
  {
    compRegister: { type: String, required: true },
    branchCode: { type: String, required: true },
    branchName: { type: String, required: true },
    branchCurr: { type: String, required: true },
    branchCountry: { type: String, required: true },
    branchAddr: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Branch", BranchSchema);
