import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "Profile", path: "/profile" },
    { name: "Analyze", path: "/selection" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-zinc-950 border-b border-zinc-900/50 h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

        {/* Brand Identity */}
        <div
          onClick={() => navigate("/")}
          className="text-sm font-light tracking-[0.5em] uppercase cursor-pointer hover:text-zinc-400 transition-colors"
        >
          The Trend Matrix
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`text-[10px] font-bold uppercase tracking-[0.25em] transition-colors ${
                  isActive(link.path) ? "text-white" : "text-zinc-600 hover:text-zinc-300"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="h-3 w-px bg-zinc-800" />

          <button
            onClick={() => navigate("/login")}
            className="text-zinc-600 hover:text-red-500 transition-colors"
            aria-label="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-zinc-500 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-20 bg-zinc-950 z-50 flex flex-col p-8 gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`text-left text-lg font-light uppercase tracking-widest ${
                  isActive(link.path) ? "text-white" : "text-zinc-600"
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="mt-auto flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-red-900/80 border-t border-zinc-900 pt-8"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
