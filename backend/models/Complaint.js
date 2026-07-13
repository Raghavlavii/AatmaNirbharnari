const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: String,
      required: true,
    },
    reporterEmail: {
      type: String,
      required: true,
    },
    targetBusinessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: false,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "investigating", "resolved", "dismissed"],
      default: "open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
