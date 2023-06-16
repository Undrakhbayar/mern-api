const mongoose = require("mongoose");
const { Schema } = mongoose;

const BranchSchema = new Schema(
  {
    compRegister: { type: String, required: true },
    branchCode: { type: String, required: true },
    branchName: { type: String, required: true },
    branchCurr: { type: Object, required: true },
    branchCountry: { type: Object, required: true },
    branchAddr: { type: String, required: true },
    deleted: { type: Boolean, required: true, default: false },
    created_user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    updated_user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Branch", BranchSchema);
