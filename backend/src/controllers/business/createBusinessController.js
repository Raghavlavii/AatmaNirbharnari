const Business = require("../../../models/Business");

const createBusiness = async (req, res) => {
  try {
    const {
      businessName,
      category,
      description,
      location,
      phone,
      email,
      website,
    } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const business = await Business.create({
      businessName,
      category,
      description,
      location,
      phone,
      email,
      website,
      image,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      business,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = createBusiness;