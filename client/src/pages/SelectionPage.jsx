import { useRef, useState } from "react";
import { Monitor, ScanEye, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const SelectionPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [processing, setProcessing] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProcessing(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      // Storing the image in browser storage (sessionStorage)
      sessionStorage.setItem("captured_image", base64String);

      // Navigate to body details after a slight delay for visual feedback
      setTimeout(() => {
        navigate("/body-details");
      }, 800);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-zinc-100 font-sans">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-light tracking-widest uppercase">Select Method</h1>
        <p className="text-zinc-500 text-sm mt-2">Choose how you want to process your media</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

        {/* Option 1: Local Computer Upload */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => !processing && fileInputRef.current.click()}
          className="group relative aspect-video md:aspect-square cursor-pointer flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Broken Outline Effect */}
          <div className="absolute inset-0 border border-zinc-800 group-hover:border-zinc-600 transition-colors" />
          <div className="absolute -top-px left-1/4 right-1/4 h-px bg-zinc-950" />
          <div className="absolute -bottom-px left-1/4 right-1/4 h-px bg-zinc-950" />
          <div className="absolute -left-px bottom-1/4 top-1/4 w-px bg-zinc-950" />
          <div className="absolute -right-px bottom-1/4 top-1/4 w-px bg-zinc-950" />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*"
          />

          <div className="z-10 text-center">
            {processing ? (
              <Loader2 className="w-12 h-12 text-zinc-400 animate-spin mx-auto mb-4" />
            ) : (
              <Monitor className="w-12 h-12 text-zinc-600 group-hover:text-zinc-100 transition-colors mx-auto mb-4" />
            )}
            <h2 className="text-lg font-medium tracking-tight">Upload from Computer</h2>
            <p className="text-xs text-zinc-500 mt-2 uppercase tracking-tighter">
              {processing ? "Processing File..." : "Native File Explorer"}
            </p>
          </div>
        </motion.div>

        {/* Option 2: Computer Vision Navigation */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate("/computer-vision")}
          className="group relative aspect-video md:aspect-square cursor-pointer flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Broken Outline Effect */}
          <div className="absolute inset-0 border border-zinc-800 group-hover:border-zinc-600 transition-colors" />
          <div className="absolute -top-px left-1/4 right-1/4 h-px bg-zinc-950" />
          <div className="absolute -bottom-px left-1/4 right-1/4 h-px bg-zinc-950" />
          <div className="absolute -left-px bottom-1/4 top-1/4 w-px bg-zinc-950" />
          <div className="absolute -right-px bottom-1/4 top-1/4 w-px bg-zinc-950" />

          <div className="z-10 text-center">
            <ScanEye className="w-12 h-12 text-zinc-600 group-hover:text-zinc-100 transition-colors mx-auto mb-4" />
            <h2 className="text-lg font-medium tracking-tight">Computer Vision</h2>
            <p className="text-xs text-zinc-500 mt-2 uppercase tracking-tighter">AI Analysis Tools</p>
          </div>
        </motion.div>

      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-12 text-zinc-600 hover:text-zinc-300 text-xs tracking-widest uppercase transition-colors"
      >
        Go Back
      </button>
    </div>
  );
}

export default SelectionPage;
