import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Ruler, Sparkles, ArrowRight, Camera } from "lucide-react";

const BodyDetailsPage = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    chest: "",
    waist: "",
    hips: "",
    gender: "male",
  });

  // Load captured image
  useEffect(() => {
    const storedImg = sessionStorage.getItem("captured_image");
    if (storedImg) setPreviewImage(storedImg);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      image: previewImage,
    };

    console.log("Submitting:", finalData);

    // Backup for refresh safety
    sessionStorage.setItem("analysis_data", JSON.stringify(finalData));

    // Pass state properly
    navigate("/analysis-result", { state: finalData });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 lg:flex gap-12">

      {/* Image Preview */}
      <div className="lg:w-1/3 mb-12 lg:mb-0">
        <div className="sticky top-12">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-6">
            Reference Media
          </h2>

          <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Reference"
                className="w-full h-full object-cover grayscale opacity-60"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700">
                <Camera size={48} strokeWidth={1} />
                <p className="text-xs mt-4 uppercase tracking-widest">
                  No Image Found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="lg:w-2/3 max-w-2xl">
        <header className="mb-12">
          <h1 className="text-4xl font-light tracking-tight mb-2">
            Technical Profile
          </h1>
          <p className="text-zinc-500">
            Provide measurements for high-accuracy fitment matching.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12">

          {/* Measurements */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-zinc-900 pb-2">
              <Ruler size={18} className="text-zinc-400" />
              <h3 className="uppercase text-sm font-bold tracking-widest">
                Anatomy (cm)
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: "Height", name: "height" },
                { label: "Weight (kg)", name: "weight" },
                { label: "Chest", name: "chest" },
                { label: "Waist", name: "waist" },
                { label: "Hips", name: "hips" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-zinc-500 font-bold">
                    {field.label}
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    className="bg-transparent border border-zinc-800 p-3 focus:border-zinc-100 outline-none text-sm"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Gender */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-zinc-900 pb-2">
              <Sparkles size={18} className="text-zinc-400" />
              <h3 className="uppercase text-sm font-bold tracking-widest">
                Aesthetic Profile
              </h3>
            </div>

            <div className="flex flex-col gap-2 max-w-xs">
              <label className="text-[10px] uppercase text-zinc-500 font-bold">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="bg-zinc-950 border border-zinc-800 p-3 focus:border-zinc-100 outline-none text-sm"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </section>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-zinc-100 text-zinc-950 py-4 flex items-center justify-center gap-3 font-bold uppercase text-xs tracking-[0.2em]"
          >
            Generate Fitting Profile <ArrowRight size={16} />
          </motion.button>

        </form>
      </div>
    </div>
  );
};

export default BodyDetailsPage;
