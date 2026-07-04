const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../../utils/generateToken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {
      return res.json({
        success: true,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user._id),
      });
    }

    res.status(401).json({
      message: "Invalid email or password",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = loginUser;