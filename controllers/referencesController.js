const Reference = require("../models/Reference");
const Branch = require("../models/Branch");

const getReferencesByType = async (req, res) => {
  //const { type } = req.body;
  const type = req.query.compreg;
  console.log(type);
  /*   const references = await Reference.find({
    type,
  }); */
  const references = await Reference.find({}, "-_id type code name").sort("type order");
  const branches = await Branch.aggregate([
    {
      $match: {
        compRegister: type, // Replace 'type' with the actual value you're filtering on
      },
    },
    {
      $project: {
        type: "branch",
        code: "$branchCode", // Rename 'branchName' to 'value'
        name: "$branchName",
        _id: 0, // Exclude the _id field from the result
      },
    },
  ]).exec();
  for (let i = 0; i < branches.length; i++) {
    references.push(branches[i]);
  }

  if (!references?.length) {
    return res.status(400).json({ message: "No references found" });
  }
  res.json(references);
};
const createNewReference = async (req, res) => {
  const { type, code, name } = req.body;

  // Confirm data
  if (!type || !code) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await Reference.findOne({ $and: [{ type, code }] })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate type and value" });
  }

  // Create and store new user
  const user = await Reference.create({ type, code, name });

  if (user) {
    //created
    res.status(201).json({ message: `New ${type} with value ${code} created` });
  } else {
    res.status(400).json({ message: "Invalid type and value data received" });
  }
};

const deleteReference = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Reference ID Required" });
  }

  // Does the user exist to delete?
  const user = await Reference.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "Reference not found" });
  }

  const result = await user.deleteOne();

  const reply = `Reference ${result.value} with ID ${result._id} deleted`;

  res.json(reply);
};

module.exports = {
  getReferencesByType,
  createNewReference,
  deleteReference,
};
