const Branch = require("../models/Branch");
const User = require("../models/User");

const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find({ compRegister: req.query.compreg, deleted: false });
    if (!branches?.length) {
      return res.status(400).json({ message: "Салбарын мэдээлэл олдсонгүй." });
    }
    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createNewBranch = async (req, res) => {
  const branch = new Branch({
    ...req.body,
  });
  console.log(req.body);
  const duplicate = await Branch.findOne({ $and: [{ compRegister: branch.compRegister, branchCode: branch.branchCode, deleted: false }] })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "ААН-ийн регистр болон салбарын код давхцаж байна." });
  }

  try {
    const newBranch = await branch.save();
    res.status(201).json(newBranch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBranch = async (req, res) => {
  console.log(req.body);
  try {
    const updatedBranch = await Branch.findByIdAndUpdate(req.body.id, req.body, { new: true });
    res.json(updatedBranch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBranch = async (req, res) => {
  console.log(req.body);
  try {
    const branch = await Branch.findById(req.body.id);
    if (branch == null) {
      return res.status(404).json({ message: "Салбар олдсонгүй." });
    }

    branch.deleted = true;

    await branch.save();
    res.json({ message: "Салбарыг амжилттай устгалаа." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBranches,
  createNewBranch,
  updateBranch,
  deleteBranch,
};
