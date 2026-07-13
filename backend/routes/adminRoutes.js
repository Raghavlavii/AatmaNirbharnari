const express = require("express");
const router = express.Router();

const getAdminStats = require("../src/controllers/admin/getStatsController");

// Get Admin Dashboard Stats
router.get("/stats", getAdminStats);

module.exports = router;
