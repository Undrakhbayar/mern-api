const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    compName: {
      type: String,
      required: true
    },
    compRegister: {
      type: String,
      required: true
    },
    compAddr: {
      type: String,
      required: true
    },
    compTel: {
      type: String,
      required: true
    },
    roles: {
      type: [String],
      default: ["Employee"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
