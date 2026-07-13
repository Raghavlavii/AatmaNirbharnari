const Complaint = require("../../models/Complaint");
const { sendEmail } = require("../utils/emailService");

// Submit a new complaint
exports.submitComplaint = async (req, res) => {
  try {
    const { reportedBy, reporterEmail, targetBusinessId, subject, description } = req.body;
    
    if (!reportedBy || !reporterEmail || !subject || !description) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newComplaint = new Complaint({
      reportedBy,
      reporterEmail,
      targetBusinessId: targetBusinessId || null,
      subject,
      description
    });

    await newComplaint.save();

    // Alert the system admin
    sendEmail({
      to: "admin@aatmanirbharnari.com",
      subject: `URGENT: New Complaint Submitted - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #fee2e2; background-color: #fef2f2;">
          <h2 style="color: #dc2626;">New Complaint/Report Received</h2>
          <p><strong>Reported By:</strong> ${reportedBy} (${reporterEmail})</p>
          <p><strong>Target Business ID:</strong> ${targetBusinessId || 'N/A'}</p>
          <p><strong>Reason:</strong> ${subject}</p>
          <hr style="border-color: #fca5a5;"/>
          <p style="white-space: pre-wrap;">${description}</p>
          <hr style="border-color: #fca5a5;"/>
          <p>Please log in to the Admin Dashboard to review and take action.</p>
        </div>
      `
    });

    return res.status(201).json({ success: true, message: "Report submitted successfully" });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all complaints for admin
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
