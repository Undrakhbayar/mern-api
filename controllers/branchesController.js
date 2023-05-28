const Branch = require("../models/Branch");
const User = require("../models/User");

const getAllBranches = async (req, res) => {
  console.log(req.query.compreg);
  const branches = await Branch.find({compRegister: req.query.compreg});
  if (!branches?.length) {
    return res.status(400).json({ message: "No branches found" });
  }

  res.json(branches);
};
const createNewBranch = async (req, res) => {
  const { compRegister, branchCode, branchName, branchCurr, branchCountry, branchAddr, user } = req.body;

  const duplicate = await Branch.findOne({ $and: [{ compRegister, branchCode }] })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "ААН-ийн регистр болон салбарын код давхцаж байна." });
  }

  const branch = await Branch.create({ compRegister, branchCode, branchName, branchCurr, branchCountry, branchAddr, user });

  if (branch) {
    res.status(201).json({ message: `${branchName} салбар амжилттай хадгаллаа.` });
  } else {
    res.status(400).json({ message: "Алдаа гарлаа." });
  }
};

const updateBranch = async (req, res) => {
  const { type, value, description } = req.body;

  // Confirm data
  if (!type || !value) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await Branch.findOne({ $and: [{ type, value }] })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate type and value" });
  }

  // Create and store new user
  const user = await Branch.create({ type, value, description });

  if (user) {
    //created
    res.status(201).json({ message: `New ${type} with value ${value} created` });
  } else {
    res.status(400).json({ message: "Invalid type and value data received" });
  }
};

const deleteBranch = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Branch ID Required" });
  }

  // Does the user exist to delete?
  const user = await Branch.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "Branch not found" });
  }

  const result = await user.deleteOne();

  const reply = `Branch ${result.value} with ID ${result._id} deleted`;

  res.json(reply);
};

module.exports = {
  getAllBranches,
  createNewBranch,
  updateBranch,
  deleteBranch,
};
