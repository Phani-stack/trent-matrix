import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Lock, ShieldCheck, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import axios from "axios";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isMatch = formData.password && formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isMatch) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/auth/reset-password", {
        email: localStorage.getItem("resetEmail"),
        otp: localStorage.getItem("resetOTP"),
        newPassword: formData.password,
      });
    } catch (error) {
      console.error("Password reset failed:", error);
      setMessage(error.response.data.message || "server error");
      setLoading(false);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);

    navigate("/login");
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
        <div className="absolute -left-px top-1/4 bottom-1/4 w-px bg-zinc-950" />
        <div className="absolute -right-px top-1/4 bottom-1/4 w-px bg-zinc-950" />

        <div className="relative z-10">
          <header className="text-center mb-10">
            <div className="inline-flex p-3 border border-zinc-800 mb-4 text-zinc-400">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-2xl font-light tracking-widest uppercase">New Credentials</h1>
            <p className="text-zinc-500 text-xs mt-2 uppercase tracking-tighter">Secure your account access</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* New Password Input */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="NEW PASSWORD"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-transparent border border-zinc-800 py-3 pl-10 pr-12 outline-none focus:border-zinc-100 transition-colors text-xs tracking-widest"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="CONFIRM PASSWORD"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full bg-transparent border py-3 pl-10 pr-12 outline-none transition-colors text-xs tracking-widest ${formData.confirmPassword
                      ? (isMatch ? "border-emerald-900/50 focus:border-emerald-500" : "border-red-900/50 focus:border-red-500")
                      : "border-zinc-800 focus:border-zinc-100"
                    }`}
                  required
                />
                {isMatch && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" size={16} />
                )}
              </div>
            </div>
            {message && <p className="text-center text-zinc-500 text-xs uppercase tracking-tighter">{message}</p>}
            <div className="pt-4">
              <button
                disabled={loading || !isMatch}
                className="group w-full bg-zinc-100 text-zinc-950 py-4 font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Password"}
                {!loading && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </form>

          {!isMatch && formData.confirmPassword && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-[10px] text-red-500 uppercase tracking-widest"
            >
              Passwords do not match
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ResetPasswordPage;
