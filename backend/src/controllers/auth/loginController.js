const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../../utils/generateToken");
const { sendEmail } = require("../../utils/emailService");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {
      // Send Sign-in Alert Email asynchronously (non-blocking)
      sendEmail({
        to: user.email,
        subject: "New Login to Aatmanirbhar Nari",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #f0f0f0; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(to right, #ec4899, #f43f5e); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">New Login Alert</h1>
            </div>
            <div style="padding: 30px; background-color: #fffaf9;">
              <p style="font-size: 16px; color: #4b5563;">Hello ${user.fullName},</p>
              <p style="font-size: 16px; color: #4b5563;">We noticed a new login to your Aatmanirbhar Nari account.</p>
              <p style="font-size: 16px; color: #4b5563;">If this was you, no further action is required. If you did not authorize this login, please secure your account immediately or contact support.</p>
            </div>
          </div>
        `,
      });

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