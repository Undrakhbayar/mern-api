const express = require('express')
const router = express.Router()
const reportTypesController = require('../controllers/reportTypesController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .get(reportTypesController.getAllReportTypes)

module.exports = router