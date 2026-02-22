import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-100 selection:text-zinc-950">
      <nav className="flex justify-between items-center p-8 md:px-16 border-b border-zinc-900/50">
        <div className="text-xl font-light tracking-[0.4em] uppercase">The Trend Matrix</div>
        <div className="flex gap-8">
          <button onClick={() => navigate("/login")} className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Login</button>
          <button onClick={() => navigate("/register")} className="text-[10px] font-bold uppercase tracking-widest bg-white text-black px-4 py-1 hover:bg-zinc-200 transition-colors">Join</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="px-8 md:px-16 pt-20 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-none">
              Digital <br />
              <span className="text-zinc-500 italic">Dimensions.</span>
            </h1>
            <p className="text-zinc-400 max-w-md text-sm leading-relaxed uppercase tracking-wide">
              A professional platform for precise body modeling, vision-based analysis, and seamless asset collection.
            </p>
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => navigate("/register")}
                className="bg-zinc-100 text-zinc-950 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-white transition-all active:scale-95"
              >
                Get Started <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>

          {/* Hero Visual: Broken Outline Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square max-w-md ml-auto"
          >


            <div className="absolute inset-0 overflow-hidden -z-10">
                 <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-transparent opacity-50" />
            </div>
          </motion.div>
        </div>
      </main>


      <footer className="p-8 border-t border-zinc-900 text-center">
        <p className="text-[10px] text-zinc-700 uppercase tracking-[0.5em]">
          &copy; 2026 The Trend Matrix
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
