const express = require("express");

const registerUser = require("../src/controllers/auth/registerController");
const loginUser = require("../src/controllers/auth/loginController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;