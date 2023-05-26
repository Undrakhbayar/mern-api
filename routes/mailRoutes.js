const express = require("express");
const router = express.Router();
const mailsController = require("../controllers/mailsController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(mailsController.getAllMails)
  .post(mailsController.createNewMail)
  .patch(mailsController.updateMail)
  .delete(mailsController.deleteMail);

router.route("/send").post(mailsController.sendMail);

module.exports = router;
