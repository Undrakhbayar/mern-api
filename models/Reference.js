const mongoose = require('mongoose')

const referenceSchema = new mongoose.Schema({
    type: { 
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    order : {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('reference', referenceSchema)