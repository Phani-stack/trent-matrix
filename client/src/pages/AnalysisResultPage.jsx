import axios from "axios";
import {
  ArrowLeft,
  Glasses,
  Palette,
  Scissors,
  Shirt,
  Sparkles,
  Download,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const AnalysisResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const requestData =
    location.state || JSON.parse(sessionStorage.getItem("analysis_data"));

  const [data, setData] = useState(null);

  const generatePercentages = (length) => {
    const percentages = [];
    let max = 95;
    let min = 60;
    for (let i = 0; i < length; i++) {
      const perc = Math.random() * (max - min) + min;
      percentages.push(Number(perc.toFixed(0)));
      max -= 5;
      min -= 5;
      if (min < 50) min = 50;
      if (max < 55) max = 55;
    }
    return percentages.sort((a, b) => b - a);
  };

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
          "http://127.0.0.1:5000/analyze",
          formData
        );

        const result = response.data;

        const hairstyleRatings = generatePercentages(result.hairstyles.length);
        const specRatings = generatePercentages(result.specs.length);
        const hatRatings = generatePercentages(result.hats.length);
        const colorRatings = generatePercentages(result.clothing_colors.length);

        result.hairstyles = result.hairstyles.map((item, idx) => ({
          name: item,
          rating: hairstyleRatings[idx],
        }));
        result.specs = result.specs.map((item, idx) => ({
          name: item,
          rating: specRatings[idx],
        }));
        result.hats = result.hats.map((item, idx) => ({
          name: item,
          rating: hatRatings[idx],
        }));
        result.clothing_colors = result.clothing_colors.map((item, idx) => ({
          name: item,
          rating: colorRatings[idx],
        }));

        setData(result);
      } catch (error) {
        console.error("Error fetching analysis:", error);
      }
    };

    fetchData();
  }, [requestData]);

  // ✅ FULL PDF FUNCTION (WITH PAGE BREAK SUPPORT)


const handleDownloadPDF = () => {
  if (!data) return;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.height;

  // --- Style Configuration ---
  const colors = {
    primary: [44, 62, 80],    // Dark Navy
    accent: [108, 92, 231],   // Soft Purple
    text: [60, 60, 60],       // Dark Grey
    light: [180, 180, 180],   // Light Grey
    white: [255, 255, 255]
  };

  let y = 0;

  // --- Helper: Page Break Logic ---
  const checkPageBreak = (neededSpace) => {
    if (y + neededSpace > pageHeight - 20) {
      doc.addPage();
      drawHeader(); // Re-draw header on new page if desired
      y = 30;
    }
  };

  // --- Helper: Decorative Header ---
  const drawHeader = () => {
    doc.setFillColor(...colors.primary);
    doc.rect(0, 0, pageWidth, 25, 'F');

    doc.setTextColor(...colors.white);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("STYLE INTELLIGENCE", 14, 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(new Date().toLocaleDateString(), pageWidth - 40, 16);
  };

  // --- Start Drawing ---
  drawHeader();
  y = 40;

  // --- Profile Summary Section ---
  doc.setTextColor(...colors.primary);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Style Profile Analysis", 14, y);
  y += 12;

  // Confidence Badge
  doc.setFillColor(...colors.accent);
  doc.roundedRect(14, y, 45, 10, 2, 2, 'F');
  doc.setTextColor(...colors.white);
  doc.setFontSize(10);
  doc.text(`Score: ${data.confidence_score}% Match`, 18, y + 6.5);
  y += 18;

  // Horizontal Info Bar
  doc.setDrawColor(...colors.light);
  doc.line(14, y, pageWidth - 14, y);
  y += 10;

  doc.setTextColor(...colors.text);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("FACE SHAPE:", 14, y);
  doc.setFont("helvetica", "normal");
  doc.text(String(data.face_shape), 45, y);

  doc.setFont("helvetica", "bold");
  doc.text("SKIN TONE:", 100, y);
  doc.setFont("helvetica", "normal");
  doc.text(String(data.skin_tone), 128, y);
  y += 12;

  // --- Section Generator ---
  const addBeautifulSection = (title, items) => {
    checkPageBreak(40);

    // Section Title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.primary);
    doc.text(title.toUpperCase(), 14, y);

    // Accent Underline
    y += 2;
    doc.setDrawColor(...colors.accent);
    doc.setLineWidth(1);
    doc.line(14, y, 30, y);
    y += 10;

    // List Items
    items.forEach((item) => {
      checkPageBreak(10);

      // Bullet point (circle)
      doc.setFillColor(...colors.accent);
      doc.circle(16, y - 1, 0.8, 'F');

      // Name
      doc.setTextColor(...colors.text);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(item.name, 22, y);

      // Rating / Percentage (right aligned)
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...colors.light);
      doc.text(`${item.rating}% Compatibility`, pageWidth - 55, y);

      y += 8;
    });

    y += 5; // Spacing between sections
  };

  addBeautifulSection("Recommended Hairstyles", data.hairstyles);
  addBeautifulSection("Recommended Frames", data.specs);
  addBeautifulSection("Hat Styles", data.hats);
  addBeautifulSection("Clothing Colors", data.clothing_colors);

  // --- Final Fit Suggestion (Footer Box) ---
  checkPageBreak(30);
  y += 10;
  doc.setFillColor(245, 246, 250); // Very light grey background
  doc.rect(14, y, pageWidth - 28, 20, 'F');

  doc.setTextColor(...colors.primary);
  doc.setFont("helvetica", "bold");
  doc.text("PRO STYLE TIP:", 20, y + 8);

  doc.setFont("helvetica", "italic");
  doc.setTextColor(...colors.text);
  doc.setFontSize(10);
  doc.text(data.fit, 20, y + 14);

  // --- Footer Page Numbers ---
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...colors.light);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: "center" });
  }

  doc.save(`Style-Report-${data.face_shape}.pdf`);
};

  if (!requestData) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <button onClick={() => navigate("/")}>No Data Found. Go Back.</button>
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
    navigate(`/wiki/${encodeURIComponent(itemName)}`);
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

  const Pill = ({ text, rating }) => (
    <div className="border border-zinc-800 px-4 py-2 text-xs uppercase tracking-wider hover:border-zinc-100 transition-colors flex justify-between items-center gap-3">
      <span>{text}</span>
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-zinc-400">{rating}%</span>
        <button
          onClick={() => handleViewDetails(text)}
          className="text-[10px] text-zinc-500 hover:text-zinc-100 transition"
        >
          View
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12">
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

      {/* Facial */}
      <Section icon={<Sparkles size={18} />} title="Facial Analysis">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-[10px] uppercase text-zinc-500 mb-2">Face Shape</p>
            <div className="border border-zinc-800 p-4 text-sm">{data?.face_shape}</div>
          </div>
          <div>
            <p className="text-[10px] uppercase text-zinc-500 mb-2">Skin Tone</p>
            <div className="border border-zinc-800 p-4 text-sm">{data?.skin_tone}</div>
          </div>
        </div>
      </Section>

      {/* Hairstyles */}
      <Section icon={<Scissors size={18} />} title="Recommended Hairstyles">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.hairstyles?.map((style, index) => (
            <Pill key={index} text={style.name} rating={style.rating} />
          ))}
        </div>
      </Section>

      {/* Frames */}
      <Section icon={<Glasses size={18} />} title="Recommended Frames">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.specs?.map((spec, index) => (
            <Pill key={index} text={spec.name} rating={spec.rating} />
          ))}
        </div>
      </Section>

      {/* Hats */}
      <Section icon={<Palette size={18} />} title="Hat Styles">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.hats?.map((hat, index) => (
            <Pill key={index} text={hat.name} rating={hat.rating} />
          ))}
        </div>
      </Section>

      {/* Clothing */}
      <Section icon={<Shirt size={18} />} title="Clothing Recommendations">
        <div className="mb-6">
          <p className="text-[10px] uppercase text-zinc-500 mb-2">Recommended Colors</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {data?.clothing_colors?.map((color, index) => (
              <Pill key={index} text={color.name} rating={color.rating} />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-[10px] uppercase text-zinc-500 mb-2">Fit Suggestion</p>
          <div className="border border-zinc-800 p-4 text-sm">{data?.fit}</div>
        </div>

        {/* ✅ REPLACED BUTTON */}
        <motion.button
          onClick={handleDownloadPDF}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 inline-flex items-center gap-2 border border-zinc-800 px-6 py-3 text-xs uppercase tracking-widest hover:border-zinc-100 transition-colors"
        >
          <Download size={16} />
          Download PDF Report
        </motion.button>
      </Section>
    </div>
  );
};

export default AnalysisResultPage;
