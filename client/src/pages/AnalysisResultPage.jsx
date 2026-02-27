import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Sparkles,
  Palette,
  Shirt,
  Glasses,
  Scissors,
  ArrowLeft,
} from "lucide-react";

const AnalysisResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const requestData =
    location.state ||
    JSON.parse(sessionStorage.getItem("analysis_data"));

  const [data, setData] = useState(null);
  const [loadingCollection, setLoadingCollection] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!requestData) return;

    const fetchData = async () => {
      try {
        const formData = new FormData();

        formData.append("gender", requestData.gender);
        formData.append("height", requestData.height);
        formData.append("weight", requestData.weight);
        formData.append("hips", requestData.hips);
        formData.append("waist", requestData.waist);

        // Convert base64 image to Blob
        const base64 = requestData.image.split(",")[1];
        const byteCharacters = atob(base64);
        const byteNumbers = [];

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers.push(byteCharacters.charCodeAt(i));
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/jpeg" });

        formData.append("file", blob, "image.jpg");

        const response = await axios.post(
          "http://127.0.0.1:8000/analyze",
          formData
        );

        console.log("Backend Response:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching analysis:", error);
      }
    };

    fetchData();
  }, [requestData]);

  if (!requestData) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <button onClick={() => navigate("/")}>
          No Data Found. Go Back.
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-400 flex items-center justify-center text-xs uppercase tracking-widest">
        Analyzing your style...
      </div>
    );
  }

  const handleViewDetails = (itemName) => {
    const formattedName = itemName.trim().replace(/\s+/g, "_");
    navigate(`/wiki/${encodeURIComponent(formattedName)}`);
  };

  const handleAddToCollection = async () => {
    setLoadingCollection(true);
    setMessage("");

    try {
      const payload = { analysis: data };

      await axios.post(
        "http://localhost:8000/api/collection/add-to-collection",
        payload
      );

      setMessage("Added to collection successfully!");
    } catch (error) {
      console.error("Error adding to collection:", error);
      setMessage("Failed to add to collection.");
    } finally {
      setLoadingCollection(false);
    }
  };

  const Section = ({ icon, title, children }) => (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6 border-b border-zinc-900 pb-2">
        {icon}
        <h3 className="uppercase text-sm font-bold tracking-widest">
          {title}
        </h3>
      </div>
      {children}
    </section>
  );

  const Pill = ({ text }) => (
    <div className="border border-zinc-800 px-4 py-2 text-xs uppercase tracking-wider hover:border-zinc-100 transition-colors flex justify-between items-center gap-3">
      <span>{text}</span>
      <button
        onClick={() => handleViewDetails(text)}
        className="text-[10px] text-zinc-500 hover:text-zinc-100 transition"
      >
        View
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12">
      {/* Header */}
      <header className="mb-16">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-100 mb-6 text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back
        </motion.button>

        <h1 className="text-4xl font-light tracking-tight mb-3">
          Style Intelligence Report
        </h1>

        <p className="text-zinc-500">
          Confidence Score:{" "}
          <span className="text-zinc-100 font-semibold">
            {data?.confidence_score}%
          </span>
        </p>
      </header>

      {/* Facial Analysis */}
      <Section
        icon={<Sparkles size={18} className="text-zinc-400" />}
        title="Facial Analysis"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-[10px] uppercase text-zinc-500 mb-2">
              Face Shape
            </p>
            <div className="border border-zinc-800 p-4 text-sm">
              {data?.face_shape}
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase text-zinc-500 mb-2">
              Skin Tone
            </p>
            <div className="border border-zinc-800 p-4 text-sm">
              {data?.skin_tone}
            </div>
          </div>
        </div>
      </Section>

      {/* Hairstyles */}
      <Section
        icon={<Scissors size={18} className="text-zinc-400" />}
        title="Recommended Hairstyles"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.hairstyles?.map((style, index) => (
            <Pill key={index} text={style} />
          ))}
        </div>
      </Section>

      {/* Glasses */}
      <Section
        icon={<Glasses size={18} className="text-zinc-400" />}
        title="Recommended Frames"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.specs?.map((spec, index) => (
            <Pill key={index} text={spec} />
          ))}
        </div>
      </Section>

      {/* Hats */}
      <Section
        icon={<Palette size={18} className="text-zinc-400" />}
        title="Hat Styles"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.hats?.map((hat, index) => (
            <Pill key={index} text={hat} />
          ))}
        </div>
      </Section>

      {/* Clothing */}
      <Section
        icon={<Shirt size={18} className="text-zinc-400" />}
        title="Clothing Recommendations"
      >
        <div className="mb-6">
          <p className="text-[10px] uppercase text-zinc-500 mb-2">
            Recommended Colors
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {data?.clothing_colors?.map((color, index) => (
              <Pill key={index} text={color} />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-[10px] uppercase text-zinc-500 mb-2">
            Fit Suggestion
          </p>
          <div className="border border-zinc-800 p-4 text-sm">
            {data?.fit}
          </div>
        </div>

        <motion.button
          onClick={handleAddToCollection}
          disabled={loadingCollection}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 inline-flex items-center gap-2 border border-zinc-800 px-6 py-3 text-xs uppercase tracking-widest hover:border-zinc-100 transition-colors disabled:opacity-50"
        >
          {loadingCollection ? "Adding..." : "Add to Collection"}
        </motion.button>

        {message && (
          <p className="mt-2 text-xs text-zinc-400">{message}</p>
        )}
      </Section>
    </div>
  );
};

export default AnalysisResultPage;
