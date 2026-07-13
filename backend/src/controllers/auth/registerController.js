const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../../utils/generateToken");
const { sendEmail } = require("../../../utils/emailService");

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    // Send Welcome Email
    await sendEmail({
      to: email,
      subject: "Welcome to Aatmanirbhar Nari!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #f0f0f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(to right, #ec4899, #f43f5e); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Welcome, ${fullName}!</h1>
          </div>
          <div style="padding: 30px; background-color: #fffaf9;">
            <p style="font-size: 16px; color: #4b5563;">Thank you for registering with Aatmanirbhar Nari. We're thrilled to have you join our empowering community!</p>
            <p style="font-size: 16px; color: #4b5563;">As a <strong>${role}</strong>, you can now explore the platform and take full advantage of our features.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://aatma-nirbharnari.vercel.app/" style="background: #e11d48; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Explore Now</a>
            </div>
          </div>
        </div>
      `,
    });

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = registerUser;