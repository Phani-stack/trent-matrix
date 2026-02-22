import { useState, useEffect } from "react";
import { Plus, FolderPlus, Ghost } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";


const Collections = () => {
    const navigate = useNavigate();
    const [collections, setCollections] = useState([
        { id: 1, name: "Pawan Kalyan's Collection" },
    ]);

    const addCollection = () => {
        navigate("/selection");
    };

    return (
        <div className="min-h-screen bg-zinc-950 p-8 md:p-16 text-zinc-100">
            <header className="mb-12 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-light tracking-tight">My Library</h1>
                    <p className="text-zinc-500 text-sm mt-1">
                        {collections.length} {collections.length === 1 ? 'Collection' : 'Collections'}
                    </p>
                </div>
            </header>

            {collections.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-2xl"
                >
                    <Ghost className="w-12 h-12 text-zinc-700 mb-4" />
                    <h2 className="text-xl font-medium text-zinc-400">Zero Collections</h2>
                    <p className="text-zinc-600 mb-6">Start by creating your first folder</p>
                    <button
                        onClick={addCollection}
                        className="flex items-center gap-2 bg-zinc-100 text-zinc-950 px-6 py-2 rounded-full font-medium hover:bg-white transition-colors"
                    >
                        <Plus size={18} /> Create Collection
                    </button>
                </motion.div>
            ) : (
                /* Grid Display */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {collections.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={() => navigate("/collection/" + item.id)}
                                className="group relative aspect-square cursor-pointer flex items-center justify-center bg-zinc-900/20 hover:bg-zinc-900/40 transition-all"
                            >
                                {/* Breaked Line Outline Effect */}
                                <div className="absolute inset-0 border border-zinc-800" />
                                <div className="absolute -top-[1px] left-1/3 right-1/3 h-[2px] bg-zinc-950" />
                                <div className="absolute -bottom-[1px] left-1/3 right-1/3 h-[2px] bg-zinc-950" />
                                <div className="absolute -left-[1px] top-1/3 bottom-1/3 w-[2px] bg-zinc-950" />
                                <div className="absolute -right-[1px] top-1/3 bottom-1/3 w-[2px] bg-zinc-950" />

                                <div className="text-center z-10 px-4">
                                    <div className="relative mb-4 flex justify-center">
                                        <Plus className="w-6 h-6 text-zinc-600 group-hover:text-zinc-100 transition-colors" />
                                    </div>
                                    <span className="block text-sm font-medium tracking-wide text-zinc-400 group-hover:text-white uppercase truncate">
                                        {item.name}
                                    </span>
                                </div>
                            </motion.div>
                        ))}

                        {/* "Add Collection" Box Beside Existing Ones */}
                        <motion.div
                            layout
                            onClick={addCollection}
                            className="group relative aspect-square cursor-pointer flex flex-col items-center justify-center border border-dashed border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900/30 transition-all"
                        >
                            <FolderPlus className="w-8 h-8 text-zinc-600 group-hover:text-zinc-300 mb-2" />
                            <span className="text-xs font-bold text-zinc-500 group-hover:text-zinc-300 uppercase tracking-widest">
                                Add Collection
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
export default Collections;
