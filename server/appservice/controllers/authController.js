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

const sentOTP = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP for Password Reset",
        text: `Your OTP for password reset is: ${otp}`,
    };
    await transporter.sendMail(mailOptions);
    return otp;
};

export const login = async (request, response) => {
    const { email, password } = request.body;
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE user_email = ?", [email]);
        if (rows.length === 0) {
            return response.status(401).json({ message: "user not found, please register" });
        }
        const isPasswordValid = await bcrypt.compare(password, rows[0].user_password);
        if (!isPasswordValid) {
            return response.status(401).json({ message: "invalid password, please check" });
        }
        const token = jwt.sign({ userId: rows[0].user_id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        response.status(200).json({ message: "login successful", token });
    } catch (err) {
        response.status(500).json({ message: "server error", error: err.message });
    }
};

export const register = async (request, response) => {
    const { user_name, email, password } = request.body;
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE user_email = ?", [email]);
        if (rows.length > 0) {
            return response.status(401).json({ message: "user already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            "INSERT INTO users (user_name, user_email, user_password, biography, image) VALUES (?, ?, ?, ?, ?)",
            [user_name, email, hashedPassword, "The Trend Matrix user", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZG3qkyaZZsnYyKv3-iTLyK_WT6QFmBQz3IQ&s"]
        );
        response.status(201).json({ message: "user registered successfully" });
    } catch (err) {
        response.status(500).json({ message: "server error", error: err.message });
    }
};

export const forgotPassword = async (request, response) => {
    const { email } = request.body;
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE user_email = ?", [email]);
        if (rows.length === 0) {
            return response.status(401).json({ message: "user not found" });
        }
        const otp = await sentOTP(email);
        await pool.query("UPDATE users SET otp = ? WHERE user_email = ?", [otp, email]);
        response.status(200).json({ message: "OTP sent to email" });
    } catch (err) {
        response.status(500).json({ message: "Failed to send OTP", error: err.message });
    }
};

export const resetPassword = async (request, response) => {
    const { email, otp, newPassword } = request.body;
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE user_email = ?", [email]);
        if (rows.length === 0) {
            return response.status(401).json({ message: "user not found, please register" });
        }
        if (rows[0].otp !== otp || !otp) {
            return response.status(401).json({ message: "invalid OTP" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query("UPDATE users SET user_password = ?, otp = NULL WHERE user_email = ?", [hashedPassword, email]);
        response.status(200).json({ message: "password reset successful" });
    } catch (err) {
        response.status(500).json({ message: "server error", error: err.message });
    }
};