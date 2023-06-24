const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    compName: {
      type: String,
      required: true,
    },
    compRegister: {
      type: String,
      required: true,
    },
    compAddr: {
      type: String,
      required: true,
    },
    compTel: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: ["Employee"],
    },
    deleted: { type: Boolean, required: true, default: false },
    created_user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    updated_user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
