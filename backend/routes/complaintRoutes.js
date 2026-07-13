const express = require("express");
const router = express.Router();
const complaintController = require("../src/controllers/complaintController");

router.post("/", complaintController.submitComplaint);
router.get("/", complaintController.getComplaints);

module.exports = router;
