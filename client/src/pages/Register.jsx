import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, Link } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          user_name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 201) {
        setStep(2);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setMessage("Enter complete 6-digit OTP");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/verify-otp",
        {
          email: formData.email,
          otp: enteredOtp,
        }
      );

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // ================= OTP INPUT HANDLER =================
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 text-zinc-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md p-10 bg-zinc-900/20"
      >
        <div className="absolute inset-0 border border-zinc-800 pointer-events-none" />
        <div className="relative z-10">

          <AnimatePresence mode="wait">

            {/* ================= REGISTER STEP ================= */}
            {step === 1 && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <header className="text-center mb-10">
                  <div className="inline-flex p-3 border border-zinc-800 mb-4">
                    <UserPlus size={24} className="text-zinc-400" />
                  </div>
                  <h1 className="text-2xl font-light tracking-widest uppercase">
                    Create Account
                  </h1>
                </header>

                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="space-y-4">

                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                        size={16}
                      />
                      <input
                        type="text"
                        placeholder="USER ID"
                        required
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-transparent border border-zinc-800 py-3 pl-10 pr-4 outline-none focus:border-zinc-100 text-xs tracking-widest"
                      />
                    </div>

                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                        size={16}
                      />
                      <input
                        type="email"
                        placeholder="EMAIL ADDRESS"
                        required
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-transparent border border-zinc-800 py-3 pl-10 pr-4 outline-none focus:border-zinc-100 text-xs tracking-widest"
                      />
                    </div>

                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                        size={16}
                      />
                      <input
                        type="password"
                        placeholder="PASSWORD"
                        required
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                        className="w-full bg-transparent border border-zinc-800 py-3 pl-10 pr-4 outline-none focus:border-zinc-100 text-xs tracking-widest"
                      />
                    </div>

                  </div>

                  <button
                    disabled={loading}
                    className="w-full bg-zinc-100 text-zinc-950 py-4 font-bold uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-2"
                  >
                    {loading ? "Processing..." : "Sign Up"}
                    <ArrowRight size={14} />
                  </button>
                </form>
              </motion.div>
            )}

            {/* ================= OTP STEP ================= */}
            {step === 2 && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <header className="text-center mb-10">
                  <div className="inline-flex p-3 border border-zinc-800 mb-4 text-zinc-400">
                    <ShieldCheck size={24} />
                  </div>
                  <h1 className="text-2xl font-light tracking-widest uppercase">
                    Verify
                  </h1>
                  <p className="text-zinc-500 text-xs mt-2 uppercase tracking-tighter">
                    Code sent to {formData.email}
                  </p>
                </header>

                <form onSubmit={handleVerifyOtp} className="space-y-8">
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) =>
                          handleOtpChange(e.target.value, index)
                        }
                        className="w-full aspect-square text-center bg-transparent border border-zinc-800 focus:border-zinc-100 outline-none text-lg"
                      />
                    ))}
                  </div>

                  <button
                    disabled={loading}
                    className="w-full bg-zinc-100 text-zinc-950 py-4 font-bold uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-2"
                  >
                    {loading ? "Verifying..." : "Confirm Code"}
                    <ArrowRight size={14} />
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>

          {message && (
            <p className="text-center text-red-500 text-xs mt-4">
              {message}
            </p>
          )}

          <div className="mt-10 pt-6 border-t border-zinc-900/50 flex justify-center">
            <Link
              to="/login"
              className="flex items-center gap-2 text-[10px] text-zinc-500 hover:text-zinc-100 uppercase tracking-widest"
            >
              <ArrowLeft size={12} /> Back to Sign In
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
