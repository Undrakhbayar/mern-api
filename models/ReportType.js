const mongoose = require('mongoose')

const reportTypeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ReportType', reportTypeSchema)