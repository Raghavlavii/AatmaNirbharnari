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
    // In a real app, you would fetch the business's actual email from the Business model here
    const businessEmail = "owner@example.com"; 

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
