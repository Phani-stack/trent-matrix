import { motion } from "motion/react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/");
      }

    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.response.data.message || "server error");
    }
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
        <div className="absolute -left-px top-1/4 bottom-1/4 w-px bg-zinc-950" />
        <div className="absolute -right-px top-1/4 bottom-1/4 w-px bg-zinc-950" />

        <div className="relative z-10">
          <header className="text-center mb-10">
            <div className="inline-flex p-3 border border-zinc-800 mb-4">
              <ShieldCheck size={24} className="text-zinc-400" />
            </div>
            <h1 className="text-2xl font-light tracking-widest uppercase">Welcome Back</h1>
            <p className="text-zinc-500 text-xs mt-2 uppercase tracking-tighter">Enter your credentials</p>
          </header>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input
                  type="email"
                  placeholder="EMAIL"
                  className="w-full bg-transparent border border-zinc-800 py-3 pl-10 pr-4 outline-none focus:border-zinc-100 transition-colors text-xs tracking-widest"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input
                  type="password"
                  placeholder="PASSWORD"
                  className="w-full bg-transparent border border-zinc-800 py-3 pl-10 pr-4 outline-none focus:border-zinc-100 transition-colors text-xs tracking-widest"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <button className="w-full bg-zinc-100 text-zinc-950 py-4 font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all flex items-center justify-center gap-2">
              Authorize <ArrowRight size={14} />
            </button>
          </form>

          {
            message && <p className="text-center mt-4 text-xs text-zinc-600 uppercase tracking-widest">{message}</p>
          }

          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-xs text-zinc-600 uppercase tracking-widest">
              New here? <Link to="/register" className="text-zinc-100 hover:underline underline-offset-4">Register</Link>
            </p>
            <button className="text-[10px] text-zinc-700 hover:text-zinc-400 uppercase tracking-widest" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
