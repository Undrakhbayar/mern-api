const express = require("express");
const router = express.Router();
const outersController = require("../controllers/outersController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(outersController.getAllOuters)
  .post(outersController.createNewOuter)
  .patch(outersController.updateOuter)
  .delete(outersController.deleteOuter);

module.exports = router;
