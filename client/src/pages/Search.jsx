import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, UserPlus, Filter, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function SearchUsersPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      console.log("Searching for:", query);
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/api/user/search?query=${encodeURIComponent(query)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setResults(data);
      } catch (error) {
        console.error("Database connection failure:", error);
      } finally {
        setLoading(false);
      }
    }, 400);

    // 3. Cleanup: If the user types another letter before 400ms,
    // this clears the previous timer and starts a new one.
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-16">
      <div className="max-w-5xl mx-auto">

        {/* Search Header */}
        <header className="mb-12 space-y-6">
          <div className="flex items-center gap-3 text-zinc-600">
            <Search size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Global Directory</span>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="ENTER IDENTITY KEYCODE"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-b border-zinc-900 py-6 text-2xl font-light tracking-tight outline-none focus:border-zinc-100 transition-colors uppercase placeholder:text-zinc-800"
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-4">
               {loading && <Loader2 size={18} className="animate-spin text-zinc-500" />}
               <button className="text-zinc-600 hover:text-white transition-colors">
                  <Filter size={18} />
               </button>
            </div>
          </div>
        </header>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {results.map((user) => (
              <motion.div
                key={user.user_id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-zinc-900/20 border border-zinc-900 p-6 flex items-center justify-between group hover:border-zinc-700 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="relative w-16 h-16 shrink-0">
                    <div className="absolute inset-0 border border-zinc-800 rounded-full scale-110" />
                    <img
                      src={user.image || "https://i.sstatic.net/l60Hf.png"}
                      className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500"
                      alt={user.name}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold uppercase tracking-widest">{user.user_name}</h3>
                      {user.status === "Verified" && <ShieldCheck size={12} className="text-zinc-500" />}
                    </div>
                    <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">
                      Name: <span className="text-zinc-400">{user.user_name}</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="p-3 border border-zinc-800 hover:bg-zinc-100 hover:text-zinc-950 transition-all rounded-full group/btn">
                    <UserPlus size={16} />
                  </button>
                  <button
                    onClick={() => navigate(`/public-profile/${user.user_id}`)}
                    className="p-3 border border-zinc-800 hover:border-zinc-500 transition-all rounded-full"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {!loading && query && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 border border-dashed border-zinc-900"
          >
            <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-[0.4em]">No Identities Located in This Sector</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
