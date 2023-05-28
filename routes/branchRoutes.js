const express = require("express");
const router = express.Router();
const branchesController = require("../controllers/branchesController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(branchesController.getAllBranches)
  .post(branchesController.createNewBranch)
  .patch(branchesController.updateBranch)
  .delete(branchesController.deleteBranch);

module.exports = router;
