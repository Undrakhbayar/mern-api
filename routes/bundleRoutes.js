const express = require("express");
const router = express.Router();
const bundlesController = require("../controllers/bundlesController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(bundlesController.getAllBundles)
  .post(bundlesController.createNewBundle)
  .patch(bundlesController.updateBundle)
  .delete(bundlesController.deleteBundle);

module.exports = router;
