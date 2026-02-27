import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pool from "../config/db.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendEmail = async (email, subject, text) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text,
  });
};


export const register = async (req, res) => {
  const { user_name, email, password } = req.body;

  try {
    const [existing] = await pool.query(
      "SELECT * FROM users WHERE user_email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }


    const profilePictureUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbSYAgHI38DctxxtEawjjNzeRxrpGuprgDTQ&s";
    const biography = "The trend matrix user";
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

    await pool.query(
      `INSERT INTO users
       (user_name, user_email, user_password, biography, image, otp, otp_expiry, is_verified)
       VALUES (?, ?, ?, ?, ?, ?, ?, false)`,
      [user_name, email, hashedPassword, biography, profilePictureUrl, otp, otpExpiry]
    );

    await sendEmail(
      email,
      "Verify Your Email - Trend Matrix",
      `Your OTP is: ${otp}. It expires in 5 minutes.`
    );

    res.status(201).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE user_email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = rows[0];

    if (user.is_verified) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > new Date(user.otp_expiry)) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await pool.query(
      `UPDATE users
       SET is_verified = true, otp = NULL, otp_expiry = NULL
       WHERE user_email = ?`,
      [email]
    );

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE user_email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = rows[0];

    if (!user.is_verified) {
      return res.status(401).json({ message: "Please verify your email first" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.user_password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE user_email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await pool.query(
      "UPDATE users SET otp = ?, otp_expiry = ? WHERE user_email = ?",
      [otp, otpExpiry, email]
    );

    await sendEmail(
      email,
      "Password Reset OTP - Trend Matrix",
      `Your password reset OTP is: ${otp}. It expires in 5 minutes.`
    );

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};


export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE user_email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = rows[0];

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > new Date(user.otp_expiry)) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE users
       SET user_password = ?, otp = NULL, otp_expiry = NULL
       WHERE user_email = ?`,
      [hashedPassword, email]
    );

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
