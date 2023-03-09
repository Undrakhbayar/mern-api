const express = require("express");
const router = express.Router();
const packageesController = require("../controllers/packageesController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(packageesController.getAllPackagees)
  .post(packageesController.createNewPackagee)
  .patch(packageesController.updatePackagee)
  .delete(packageesController.deletePackagee);

router.route("/send").post(packageesController.sendPackagee);

module.exports = router;
