const Message = require("../../models/Message");
const { sendEmail } = require("../utils/emailService");

// Submit a new inquiry
exports.submitInquiry = async (req, res) => {
  try {
    const { customerName, customerEmail, subject, message, category, businessId } = req.body;
    
    if (!customerName || !customerEmail || !message || !category) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newInquiry = new Message({
      customerName,
      customerEmail,
      subject: subject || "No Subject",
      message,
      category,
      businessId
    });

    await newInquiry.save();

    // Fire-and-forget email alert to the business owner
    const Business = require("../../models/Business");
    const business = await Business.findById(businessId).populate("owner");
    const businessEmail = business?.owner?.email || "owner@example.com"; 

    sendEmail({
      to: businessEmail,
      subject: `New Inquiry from ${customerName}: ${subject || 'No Subject'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #6b21a8;">You have a new inquiry!</h2>
          <p><strong>From:</strong> ${customerName} (${customerEmail})</p>
          <p><strong>Category:</strong> ${category}</p>
          <hr />
          <p style="white-space: pre-wrap;">${message}</p>
          <hr />
          <p>Please reply directly to ${customerEmail} to assist this customer.</p>
        </div>
      `
    });

    // Real-time socket emission
    const io = req.app.get("io");
    if (io && business && business.owner) {
      io.to(business.owner._id.toString()).emit("newInquiry", newInquiry);
    }

    return res.status(201).json({ success: true, message: "Inquiry sent successfully", inquiry: newInquiry });
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get inquiries (optionally filtered by businessId)
exports.getInquiries = async (req, res) => {
  try {
    const { businessId } = req.query;
    const filter = businessId ? { businessId } : {};
    
    const inquiries = await Message.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, inquiries });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get inquiries for the authenticated user's businesses
exports.getMyInquiries = async (req, res) => {
  try {
    const Business = require("../../models/Business");
    
    // Find all businesses owned by the user
    const myBusinesses = await Business.find({ owner: req.user._id }).select("_id");
    const businessIds = myBusinesses.map(b => b._id);
    
    // Find all inquiries (messages) for these businesses
    const inquiries = await Message.find({ businessId: { $in: businessIds } }).sort({ createdAt: -1 });
    
    const unreadCount = inquiries.filter(inq => inq.status === "unread").length;
    
    return res.status(200).json({ success: true, inquiries, unreadCount, totalInquiries: inquiries.length });
  } catch (error) {
    console.error("Error fetching my inquiries:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
