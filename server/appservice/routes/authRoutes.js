import express from "express";
import {
  login,
  register,
  verifyOtp,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import { authLimiter, otpLimiter } from "../middlewares/rateLimiters.js";

const authRouter = express.Router();


authRouter.post("/register", authLimiter, register);
authRouter.post("/verify-otp", otpLimiter, verifyOtp);
authRouter.post("/login", authLimiter, login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
