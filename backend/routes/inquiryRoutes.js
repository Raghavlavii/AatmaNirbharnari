const express = require("express");
const router = express.Router();
const inquiryController = require("../src/controllers/inquiryController");

router.post("/", inquiryController.submitInquiry);
router.get("/", inquiryController.getInquiries);

module.exports = router;
