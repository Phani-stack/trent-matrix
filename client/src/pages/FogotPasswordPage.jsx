import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, Link } from "react-router-dom";
import { KeyRound, Mail, ArrowLeft, Send, ShieldCheck, ArrowRight } from "lucide-react";
import axios from "axios";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/auth/forgot-password", { email });
      localStorage.setItem("resetEmail", email);
    } catch (error) {
      console.error("Failed to send OTP:", error);
      setMessage(error.response.data.message || "server error");
      setLoading(false);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setStep(2);
  };

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    localStorage.setItem("resetOTP", newOtp.join(""));
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    navigate("/reset-password");
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 text-zinc-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md p-10 bg-zinc-900/20"
      >
        {/* Broken Outline Effect */}
        <div className="absolute inset-0 border border-zinc-800 pointer-events-none" />
        <div className="absolute -top-px left-1/4 right-1/4 h-px bg-zinc-950" />
        <div className="absolute -bottom-px left-1/4 right-1/4 h-px bg-zinc-950" />

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="email-step"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <header className="text-center mb-10">
                  <div className="inline-flex p-3 border border-zinc-800 mb-4 text-zinc-400">
                    <KeyRound size={24} />
                  </div>
                  <h1 className="text-2xl font-light tracking-widest uppercase">Recovery</h1>
                  <p className="text-zinc-500 text-xs mt-2 uppercase tracking-tighter">Enter email for OTP</p>
                </header>

                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ACCOUNT EMAIL"
                      className="w-full bg-transparent border border-zinc-800 py-3 pl-10 pr-4 outline-none focus:border-zinc-100 transition-colors text-xs tracking-widest"
                      required
                    />
                  </div>
                  <button disabled={loading} className="w-full bg-zinc-100 text-zinc-950 py-4 font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                    {loading ? "Sending..." : "Request Code"} <Send size={14} />
                  </button>
                  {message && <p className="text-center text-zinc-500 text-xs uppercase tracking-tighter">{message}</p>}
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <header className="text-center mb-10">
                  <div className="inline-flex p-3 border border-zinc-800 mb-4 text-zinc-400">
                    <ShieldCheck size={24} />
                  </div>
                  <h1 className="text-2xl font-light tracking-widest uppercase">Verify</h1>
                  <p className="text-zinc-500 text-xs mt-2 uppercase tracking-tighter">Code sent to {email}</p>
                </header>

                <form onSubmit={handleVerifyOtp} className="space-y-8">
                  <div className="flex justify-between gap-2">
                    {otp.map((data, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={data}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        className="w-full aspect-square text-center bg-transparent border border-zinc-800 focus:border-zinc-100 outline-none text-lg font-light transition-colors"
                      />
                    ))}
                  </div>

                  <button disabled={loading} className="w-full bg-zinc-100 text-zinc-950 py-4 font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all flex items-center justify-center gap-2">
                    {loading ? "Verifying..." : "Confirm Code"} <ArrowRight size={14} />
                  </button>
                </form>
                <p className="mt-6 text-center text-[10px] text-zinc-600 uppercase tracking-widest">
                  Didn't receive code? <button onClick={() => setStep(1)} className="text-zinc-300 hover:underline underline-offset-4">Resend</button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 pt-6 border-t border-zinc-900/50 flex justify-center">
            <Link to="/login" className="flex items-center gap-2 text-[10px] text-zinc-500 hover:text-zinc-100 uppercase tracking-widest transition-colors">
              <ArrowLeft size={12} /> Back to Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPasswordPage;
