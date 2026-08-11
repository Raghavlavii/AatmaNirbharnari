const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const createBusiness = require("../src/controllers/business/createBusinessController");
const getBusinesses = require("../src/controllers/business/getBusinessesController");
const getBusinessById = require("../src/controllers/business/getBusinessByIdController");
// Get all businesses
router.get("/", getBusinesses);

// Get a specific business
router.get("/:id", getBusinessById);

// Add business
router.post("/", protect, upload.single("image"), createBusiness);

module.exports = router;