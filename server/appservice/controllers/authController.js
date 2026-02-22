import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pool from "../config/db.js";

export const login = async (request, response) => {
    const { email, password } = request.body;

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE user_email = ?", [email]);
        if (rows.length === 0) {
            return response.status(400).json({
                message: "user not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, rows[0].user_password);
        if (!isPasswordValid) {
            return response.status(400).json({
                message: "invalid password",
            });
        }

        const token = jwt.sign({ userId: rows[0].user_id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        response.status(200).json({
            message: "login successful",
            token,
        });
    } catch (err) {
        response.status(500).json({
            message: "server error",
            error: err,
        });
    }
}

export const register = async (request, response) => {
    const { user_name, email, password } = request.body;
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE user_email = ?", [email]);
        if (rows.length > 0) {
            return response.status(400).json({
                message: "user already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query("INSERT INTO users (user_name, user_email, user_password, biography, image) VALUES (?, ?, ?, ?, ?)", [user_name, email, hashedPassword, "The Trend Matrix user", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZG3qkyaZZsnYyKv3-iTLyK_WT6QFmBQz3IQ&s"]);
        response.status(201).json({
            message: "user registered successfully",
        });
    } catch (err) {
        response.status(500).json({
            message: "server error",
            error: err,
        });
    }
};
