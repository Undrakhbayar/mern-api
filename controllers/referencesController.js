const Reference = require("../models/Reference");

const getReferencesByType = async (req, res) => {
  //const { type } = req.body;
  const type = req.originalUrl.split("?")[1]; 
  console.log(req.type);
/*   const references = await Reference.find({
    type,
  }); */
  const references = await Reference.find();
  if (!references?.length) {
    return res.status(400).json({ message: "No references found" });
  }

  res.json(references);
};
const createNewReference = async (req, res) => {
  const { type, value, description } = req.body;

  // Confirm data
  if (!type || !value) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await Reference.findOne({ $and: [{ type, value }] })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate type and value" });
  }

  // Create and store new user
  const user = await Reference.create({ type, value, description });

  if (user) {
    //created
    res
      .status(201)
      .json({ message: `New ${type} with value ${value} created` });
  } else {
    res.status(400).json({ message: "Invalid type and value data received" });
  }
};

const deleteReference = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Reference ID Required' })
    }

    // Does the user exist to delete?
    const user = await Reference.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'Reference not found' })
    }

    const result = await user.deleteOne()

    const reply = `Reference ${result.value} with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
  getReferencesByType,
  createNewReference,
  deleteReference
};
