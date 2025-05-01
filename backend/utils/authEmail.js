import nodemailer from "nodemailer";

// OTP generator function
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
};

// Send OTP function
const sendOTPEmail = async (email, otp) => {
  // Create reusable transporter object using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your Gmail address
      pass: process.env.EMAIL_PASS, // your Gmail app password (not normal password)
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    html: `<h1>Verify Your Email</h1><p>Your OTP code is <b>${otp}</b></p>`,
  };

  // Send mail
  await transporter.sendMail(mailOptions);
};

export { generateOTP, sendOTPEmail };
