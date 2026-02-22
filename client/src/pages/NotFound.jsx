import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Compass, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-zinc-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative p-12 text-center max-w-lg w-full"
      >
        {/* Broken Outline Background */}
        <div className="absolute inset-0 border border-zinc-800" />
        <div className="absolute -top-px left-1/3 right-1/3 h-px bg-zinc-950" />
        <div className="absolute -bottom-px left-1/3 right-1/3 h-px bg-zinc-950" />
        <div className="absolute -left-px top-1/3 bottom-1/3 w-px bg-zinc-950" />
        <div className="absolute -right-px top-1/3 bottom-1/3 w-px bg-zinc-950" />

        <div className="relative z-10">
          <div className="mb-6 flex justify-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Compass className="w-16 h-16 text-zinc-700" strokeWidth={1} />
            </motion.div>
          </div>

          <h1 className="text-6xl font-light mb-2 tracking-tighter">404</h1>
          <h2 className="text-xl font-medium text-zinc-400 mb-4 uppercase tracking-widest">
            Non-Endpoint Reached
          </h2>

          <p className="text-zinc-500 mb-8 text-sm leading-relaxed">
            The route you are looking for does not exist or has been moved to a
            different directory.
          </p>

          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 mx-auto bg-zinc-100 text-zinc-950 px-6 py-3 rounded-full font-semibold hover:bg-white transition-all active:scale-95"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Safety
          </button>
        </div>
      </motion.div>

      <div className="mt-8 text-[10px] text-zinc-800 uppercase tracking-[0.2em]">
        System Error: Route_Not_Defined
      </div>
    </div>
  );
}

export default NotFoundPage;
