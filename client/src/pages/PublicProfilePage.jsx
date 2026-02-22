import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  ShoppingBag,
  Globe,
  MapPin
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PublicProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("PublicProfilePage mounted with ID:", id);
  const publicUser = {

    verified: true,
    products: [
      // { category: "Eyewear", name: "Lesser Series 01", brand: "Kuboraum", price: "€450", url: "#" },
      // { category: "Apparel", name: "Objective Gilet", brand: "A-COLD-WALL*", price: "€620", url: "#" },
      // { category: "Footwear", name: "Bamba 2 High", brand: "11 by Boris Bidjan Saberi", price: "€585", url: "#" },
      // { category: "Accessories", name: "Modular Belt", brand: "Orbit Gear", price: "€110", url: "#" },
      // { category: "Outerwear", name: "Technical Shell", brand: "Arc'teryx", price: "€750", url: "#" },
      // { category: "Timepiece", name: "F-91W Custom", brand: "Casio", price: "€45", url: "#" }
    ]
  };

  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/public/" + id);
        console.log("Public profile data fetched:", response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching public profile:", error);
      }
    };

    fetchProfile();
  }, [id]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-16">
      <div className="max-w-7xl mx-auto">

        {/* Top Header Navigation */}
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Directory
          </button>
        </div>

        {/* Hero Section: Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-5">
            <div className="relative border border-zinc-900 p-2">
              <img
                src={profileData.image}
                className="w-full aspect-square object-cover grayscale"
                alt={profileData.user_name}
              />
              <div className="absolute top-6 right-6 bg-zinc-950/90 border border-zinc-800 p-2">
                <Globe size={16} className="text-zinc-500" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-5xl font-light uppercase tracking-tighter">{profileData.user_name}</h1>
                {profileData.verified && <ShieldCheck size={24} className="text-zinc-500" />}
              </div>
              <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.4em] flex items-center gap-2">
                <MapPin size={12} /> {profileData.location} — {profileData.style_type}
              </p>
            </div>

            <p className="max-w-xl text-lg font-light leading-relaxed text-zinc-400 italic">
              "{profileData.biography}"
            </p>

            <div className="flex gap-4">
              <button className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
                Connect
              </button>
              <button className="px-8 py-3 border border-zinc-800 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-900 transition-colors">
                Follow Archive
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Product Grid */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <ShoppingBag size={18} className="text-zinc-600" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-500">Current Equipment Loadout</h2>
            <div className="h-px flex-1 bg-zinc-900" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
            {publicUser.products.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-zinc-950 p-8 group hover:bg-zinc-900 transition-all flex flex-col justify-between aspect-square lg:aspect-auto min-h-[220px]"
              >
                <div className="space-y-1">
                  <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">{item.category}</p>
                  <h3 className="text-sm font-medium uppercase tracking-wider group-hover:text-white transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[10px] text-zinc-500 uppercase">{item.brand}</p>
                </div>

                <div className="flex items-end justify-between">
                  <span className="text-xs font-light text-zinc-400">{item.price}</span>
                  <div className="p-2 border border-zinc-900 group-hover:border-zinc-500 transition-colors">
                    <ExternalLink size={14} className="text-zinc-800 group-hover:text-white" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
