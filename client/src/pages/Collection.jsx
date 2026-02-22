import { motion } from "motion/react";
import {
  ExternalLink,
  Layers,
  Trash2,
  Palette,
  Shirt,
  Glasses,
  Footprints,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

export default function CollectionsPage() {
  const collections = [
    {
      id: 1,
      name: "Pawan Kalyan",
      date: "2026.02.15",
      image: "https://i.pinimg.com/736x/7e/d3/58/7ed358e010e9d7c33c02e29f7d388025.jpg",
      parameters: {
        height: "182cm",
        weight: "75kg",
        chest: "98cm",
        waist: "80cm",
        hips: "96cm",
        face: "Oval"
      },
      analysis: {
        description: "A high-contrast aesthetic leveraging structured shoulders to complement the oval face shape. Recommended fabrics include matte nylon and technical wool.",
        styleType: "Tech-Minimalism" ,
        colorPalette: ["#09090b", "#27272a", "#52525b", "#e4e4e7"],
        undertone: "Cool / Olive",
      },
      // Categorized E-Commerce Links
      curation: {
        eyewear: [
          { label: "Matte Aviators", site: "Gentle Monster", url: "https://gentlemonster.com" },
          { label: "Tech Frames", site: "Oakley", url: "https://oakley.com" }
        ],
        headwear: [
          { label: "Structural Cap", site: "New Era", url: "https://neweracap.com" }
        ],
        apparel: [
          { label: "Shell Jacket", site: "Arc'teryx", url: "https://arcteryx.com" },
          { label: "Cargo Pants", site: "Stone Island", url: "https://stoneisland.com" }
        ],
        footwear: [
          { label: "Technical Boots", site: "Nike ACG", url: "https://nike.com" },
          { label: "Minimalist Runners", site: "SSENSE", url: "https://ssense.com" }
        ]
      }
    }
  ];

  const CategorySection = ({ icon: Icon, title, items }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
        <Icon size={14} className="text-zinc-500" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">{title}</span>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3 bg-zinc-900/30 border border-zinc-900 hover:border-zinc-500 transition-all"
          >
            <div className="flex flex-col">
              <span className="text-[10px] text-white font-medium uppercase tracking-wider">{link.label}</span>
              <span className="text-[8px] text-zinc-600 uppercase font-bold">{link.site}</span>
            </div>
            <ExternalLink size={12} className="text-zinc-700 group-hover:text-white transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-16">
      <div className="space-y-40">
        {collections.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-zinc-900 pt-16"
          >
            {/* LEFT: Image & Technical Data */}
            <div className="lg:col-span-4 space-y-12">
              <div className="relative aspect-[3/4] border border-zinc-800 bg-zinc-900">
                <img src={item.image} className="w-full h-full object-cover grayscale opacity-70" alt={item.name} />
                <div className="absolute bottom-4 left-4 flex gap-1">
                  {item.analysis.colorPalette.map((c, i) => (
                    <div key={i} className="w-4 h-4 border border-zinc-950" style={{ background: c }} />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <CheckCircle2 size={12} /> Body Geometry
                </h3>
                <div className="grid grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
                  {Object.entries(item.parameters).map(([key, val]) => (
                    <div key={key} className="bg-zinc-950 p-4">
                      <p className="text-[8px] text-zinc-600 uppercase font-bold mb-1">{key}</p>
                      <p className="text-xs font-medium uppercase">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Curation & Categories */}
            <div className="lg:col-span-8 space-y-12">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-4xl font-light tracking-tight uppercase">{item.name}</h2>
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Analysis Type: {item.analysis.styleType}</p>
                </div>
              </div>

              <div className="p-6 border-l-2 border-zinc-900 italic text-zinc-400 text-sm leading-relaxed font-light">
                "{item.analysis.description}"
              </div>

              {/* Departmental Links Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                <CategorySection title="Eyewear / Specs" icon={Glasses} items={item.curation.eyewear} />
                <CategorySection title="Apparel / Style" icon={Shirt} items={item.curation.apparel} />
                <CategorySection title="Footwear / Shoes" icon={Footprints} items={item.curation.footwear} />
                <CategorySection title="Accessories / Cap" icon={Layers} items={item.curation.headwear} />
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
