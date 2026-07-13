const User = require("../../../models/User");
const Business = require("../../../models/Business");
const Message = require("../../../models/Message");

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEntrepreneurs = await User.countDocuments({ role: "entrepreneur" });
    const totalBusinesses = await Business.countDocuments();
    const totalInquiries = await Message.countDocuments();
    
    // Simulate MAU (users created in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const monthlyActiveUsers = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

    // Profile completion rate (businesses with a website added)
    const completeProfiles = await Business.countDocuments({ 
      website: { $ne: "" } 
    });
    const completionRate = totalBusinesses > 0 
      ? Math.round((completeProfiles / totalBusinesses) * 100) 
      : 100;

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalEntrepreneurs,
        totalBusinesses,
        totalInquiries,
        monthlyActiveUsers,
        completionRate,
        pendingApprovals: 5, // Mock pending approvals
        monthlyGrowth: "+15.2%" // Mock growth
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAdminStats;
