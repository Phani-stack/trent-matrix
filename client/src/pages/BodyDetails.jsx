import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Ruler, User, Sparkles, ArrowRight, Camera } from "lucide-react";

const BodyDetailsPage = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    chest: "",
    waist: "",
    hips: "",
    faceShape: "Oval",
    skinTone: "Neutral",
  });

  useEffect(() => {
    const storedImg = sessionStorage.getItem("captured_image");
    if (storedImg) setPreviewImage(storedImg);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Model Data:", { ...formData, image: previewImage });
    // Navigate to results or processing
    navigate("/analysis-result");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 lg:flex gap-12">

      {/* Left Column: Image Preview */}
      <div className="lg:w-1/3 mb-12 lg:mb-0">
        <div className="sticky top-12">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-6">Reference Media</h2>
          <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden">
            {/* Broken Outline */}
            <div className="absolute inset-0 border border-zinc-800 z-10 pointer-events-none" />
            <div className="absolute -top-px left-1/4 right-1/4 h-px bg-zinc-950 z-20" />
            <div className="absolute -bottom-px left-1/4 right-1/4 h-px bg-zinc-950 z-20" />

            {previewImage ? (
              <img src={previewImage} alt="Reference" className="w-full h-full object-cover grayscale opacity-60" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700">
                <Camera size={48} strokeWidth={1} />
                <p className="text-xs mt-4 uppercase tracking-widest">No Image Found</p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="lg:w-2/3 max-w-2xl">
        <header className="mb-12">
          <h1 className="text-4xl font-light tracking-tight mb-2">Technical Profile</h1>
          <p className="text-zinc-500">Provide measurements for high-accuracy fitment matching.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12">

          {/* Section: Body Measurements */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-zinc-900 pb-2">
              <Ruler size={18} className="text-zinc-400" />
              <h3 className="uppercase text-sm font-bold tracking-widest">Anatomy (cm)</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: "Height", name: "height", placeholder: "180" },
                { label: "Weight (kg)", name: "weight", placeholder: "75" },
                { label: "Chest", name: "chest", placeholder: "96" },
                { label: "Waist", name: "waist", placeholder: "82" },
                { label: "Hips", name: "hips", placeholder: "98" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-zinc-500 font-bold">{field.label}</label>
                  <input
                    type="number"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="bg-transparent border border-zinc-800 p-3 focus:border-zinc-100 outline-none transition-colors text-sm"
                    required
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Section: Aesthetic Details (Manual) */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-zinc-900 pb-2">
              <Sparkles size={18} className="text-zinc-400" />
              <h3 className="uppercase text-sm font-bold tracking-widest">Aesthetic Profile</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-zinc-500 font-bold">Face Shape</label>
                <select
                  name="faceShape"
                  onChange={handleChange}
                  className="bg-zinc-950 border border-zinc-800 p-3 focus:border-zinc-100 outline-none text-sm appearance-none"
                >
                  <option>Oval</option>
                  <option>Square</option>
                  <option>Round</option>
                  <option>Heart</option>
                  <option>Diamond</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-zinc-500 font-bold">Skin Undertone</label>
                <select
                  name="skinTone"
                  onChange={handleChange}
                  className="bg-zinc-950 border border-zinc-800 p-3 focus:border-zinc-100 outline-none text-sm appearance-none"
                >
                  <option>Cool</option>
                  <option>Warm</option>
                  <option>Neutral</option>
                  <option>Olive</option>
                </select>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-zinc-100 text-zinc-950 py-4 flex items-center justify-center gap-3 font-bold uppercase text-xs tracking-[0.2em] hover:bg-white transition-colors"
          >
            Generate Fitting Profile <ArrowRight size={16} />
          </motion.button>
        </form>
      </div>
    </div>
  );
}

export default BodyDetailsPage;
