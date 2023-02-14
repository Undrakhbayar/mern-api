const ReportType = require('../models/ReportType')

const getAllReportTypes = async (req, res) => {
    const reportTypes = await ReportType.find().lean()
    
    if (!reportTypes?.length) {
        return res.status(400).json({ message: 'No reportTypes found' })
    }

    res.json(reportTypes)
}



module.exports = {
    getAllReportTypes
}