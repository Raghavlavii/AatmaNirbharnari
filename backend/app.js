const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const businessRoutes = require("./routes/businessRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/business", businessRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Aatmanirbhar Nari API Running 🚀");
});

module.exports = app;
