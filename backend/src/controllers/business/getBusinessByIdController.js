const Business = require("../../../models/Business");

const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id).populate(
      "owner",
      "fullName email"
    );

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    res.json({
      success: true,
      business,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = getBusinessById;