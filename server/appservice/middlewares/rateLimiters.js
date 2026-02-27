import rateLimit from "express-rate-limit";


export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    message: "Too many requests. Try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});


export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "Too many authentication attempts. Try again later.",
  },
});


export const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many OTP attempts. Please wait 5 minutes.",
  },
});
