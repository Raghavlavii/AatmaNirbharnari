const Complaint = require("../../models/Complaint");

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
