const Message = require("../../models/Message");

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
    return res.status(201).json({ success: true, message: "Inquiry sent successfully" });
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
