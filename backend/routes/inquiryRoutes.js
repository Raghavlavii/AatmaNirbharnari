const express = require("express");
const router = express.Router();
const inquiryController = require("../src/controllers/inquiryController");
const protect = require("../middleware/authMiddleware");

router.post("/", inquiryController.submitInquiry);
router.get("/", inquiryController.getInquiries);
router.get("/my-inquiries", protect, inquiryController.getMyInquiries);

module.exports = router;
