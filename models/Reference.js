const mongoose = require('mongoose')

const referenceSchema = new mongoose.Schema({
    type: { 
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('reference', referenceSchema)