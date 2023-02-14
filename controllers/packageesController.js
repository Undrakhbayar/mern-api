const Packagee = require('../models/Packagee')
const User = require('../models/User')

// @desc Get all packagees 
// @route GET /packagees
// @access Private
const getAllPackagees = async (req, res) => {
    // Get all packagees from MongoDB
    const packagees = await Packagee.find().lean()

    // If no packagees 
    if (!packagees?.length) {
        return res.status(400).json({ message: 'No packagees found' })
    }

    // Add username to each packagee before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const packageesWithUser = await Promise.all(packagees.map(async (packagee) => {
        const user = await User.findById(packagee.user).lean().exec()
        return { ...packagee, username: user.username }
    }))

    res.json(packageesWithUser)
}

// @desc Create new packagee
// @route POST /packagees
// @access Private
const createNewPackagee = async (req, res) => {
    const { user, houseSeq, mailId, blNo, netWgt, wgt, qty, transFare, price1, goodsNm, shipperNm, consigneeCntryNm, consigneeNm, consigneeReg, consigneeTel, compName, compRegister, compAddr, compTel } = req.body
    console.log(req.body);

    // Confirm data
    if (!user) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Packagee.findOne({ mailId }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate packagee title' })
    }

    // Create and store the new user 
    const packagee = await Packagee.create({ user, houseSeq, mailId, blNo, netWgt, wgt, qty, transFare, price1, goodsNm, shipperNm, consigneeCntryNm, consigneeNm, consigneeReg, consigneeTel, compName, compRegister, compAddr, compTel })

    if (packagee) { // Created 
        return res.status(201).json({ message: 'New packagee created' })
    } else {
        return res.status(400).json({ message: 'Invalid packagee data received' })
    }

}

// @desc Update a packagee
// @route PATCH /packagees
// @access Private
const updatePackagee = async (req, res) => {
    const { id, user, title, text, completed } = req.body

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm packagee exists to update
    const packagee = await Packagee.findById(id).exec()

    if (!packagee) {
        return res.status(400).json({ message: 'Packagee not found' })
    }

    // Check for duplicate title
    const duplicate = await Packagee.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original packagee 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate packagee title' })
    }

    packagee.user = user
    packagee.title = title
    packagee.text = text
    packagee.completed = completed

    const updatedPackagee = await packagee.save()

    res.json(`'${updatedPackagee.title}' updated`)
}

// @desc Delete a packagee
// @route DELETE /packagees
// @access Private
const deletePackagee = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Packagee ID required' })
    }

    // Confirm packagee exists to delete 
    const packagee = await Packagee.findById(id).exec()

    if (!packagee) {
        return res.status(400).json({ message: 'Packagee not found' })
    }

    const result = await packagee.deleteOne()

    const reply = `Packagee '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllPackagees,
    createNewPackagee,
    updatePackagee,
    deletePackagee
}