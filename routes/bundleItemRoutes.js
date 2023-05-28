const express = require("express");
const router = express.Router();
const bundleItemsController = require("../controllers/bundleItemsController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(bundleItemsController.getAllBundleItems)
  .post(bundleItemsController.createNewBundleItem)
  .patch(bundleItemsController.updateBundleItem)
  .delete(bundleItemsController.deleteBundleItem);

module.exports = router;
