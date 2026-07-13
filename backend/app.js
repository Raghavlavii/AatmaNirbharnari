const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./src/config/db");

const authRoutes = require("./routes/authRoutes");
const businessRoutes = require("./routes/businessRoutes");
const adminRoutes = require("./routes/adminRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

// ─── Security Middleware ───────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// ─── DB Connection Middleware (ensures connection before every request) ───
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DB connection failed:", error.message);
    res.status(503).json({ message: "Service temporarily unavailable" });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/complaints", complaintRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Aatmanirbhar Nari API Running 🚀");
});

module.exports = app;
