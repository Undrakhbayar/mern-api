const express = require('express')
const router = express.Router()
const referencesController = require('../controllers/referencesController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .get(referencesController.getReferencesByType)
    .post(referencesController.createNewReference)
    .delete(referencesController.deleteReference)

module.exports = router