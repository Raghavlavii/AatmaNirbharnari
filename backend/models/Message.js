const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread",
    },
    category: {
      type: String,
      required: true,
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
