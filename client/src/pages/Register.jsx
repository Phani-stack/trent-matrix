import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight } from "lucide-react";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = axios.post("http://localhost:8000/api/auth/register", {
      user_name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 text-zinc-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md p-10 bg-zinc-900/20"
      >
        {/* Broken Outline Effect */}
        <div className="absolute inset-0 border border-zinc-800 pointer-events-none" />
        <div className="absolute -top-px left-1/4 right-1/4 h-px bg-zinc-950" />
        <div className="absolute -bottom-px left-1/4 right-1/4 h-px bg-zinc-950" />

        <div className="relative z-10">
          <header className="text-center mb-10">
            <div className="inline-flex p-3 border border-zinc-800 mb-4">
              <UserPlus size={24} className="text-zinc-400" />
            </div>
            <h1 className="text-2xl font-light tracking-widest uppercase">Create Account</h1>
            <p className="text-zinc-500 text-xs mt-2 uppercase tracking-tighter">Join the modeling collective</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input
                  type="text"
                  placeholder="USER ID"
                  className="w-full bg-transparent border border-zinc-800 py-3 pl-10 pr-4 outline-none focus:border-zinc-100 transition-colors text-xs tracking-widest"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
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
              Sign Up <ArrowRight size={14} />
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-zinc-600 uppercase tracking-widest">
            Already a member? <Link to="/login" className="text-zinc-100 hover:underline underline-offset-4">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default RegisterPage;
