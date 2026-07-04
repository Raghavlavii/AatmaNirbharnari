const Business = require("../../../models/Business");

const getBusinesses = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = {};

    // Search by business name
    if (search) {
      query.businessName = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by category
    if (category && category !== "All") {
      query.category = category;
    }

    const businesses = await Business.find(query).populate(
      "owner",
      "fullName email"
    );

    res.json({
      success: true,
      count: businesses.length,
      businesses,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = getBusinesses;