const nodemailer = require("nodemailer");

/**
 * Sends an email using Nodemailer.
 * 
 * In production, configure SMTP_* env variables (e.g. Gmail App Password, SendGrid, etc).
 * In development without variables, it will use Ethereal Mail to generate a test email link.
 */
const sendEmail = async ({ to, subject, html }) => {
  try {
    let transporter;

    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      // Use real SMTP config
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Fallback to Ethereal Mail for testing
      console.log("No SMTP credentials found, generating Ethereal test account...");
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME || 'Aatmanirbhar Nari'}" <${process.env.FROM_EMAIL || 'no-reply@aatmanirbharnari.com'}>`,
      to,
      subject,
      html,
    });

    console.log("Message sent: %s", info.messageId);
    
    // If using ethereal, output the preview URL
    if (info.messageId && !process.env.SMTP_HOST) {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email: ", error);
    return { success: false, error };
  }
};

module.exports = { sendEmail };
