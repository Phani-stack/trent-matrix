import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const WikiPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchWiki = async () => {
      try {
        // Decode URL (Spiky%20Hair → Spiky Hair)
        const decodedName = decodeURIComponent(name);

        const response = await axios.get(
          `http://localhost:8000/api/wiki/${decodedName}`
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching wiki data:", error);
        setData({ title: "Not Found", description: "No details available." });
      }
    };

    fetchWiki();
  }, [name]);

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-400 flex items-center justify-center text-xs uppercase tracking-widest">
        Loading Wikipedia details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-100 mb-6 text-xs uppercase tracking-widest"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <h1 className="text-4xl font-light tracking-tight mb-6">{data.title}</h1>

      {data.image ? (
        <img
          src={data.image}
          alt={data.title}
          className="mb-6 w-72 border border-zinc-800"
        />
      ) : (
        <div className="mb-6 w-72 h-48 bg-zinc-800 flex items-center justify-center text-zinc-500">
          No Image
        </div>
      )}

      <p className="text-zinc-400 leading-relaxed">{data.description}</p>

      {data.source && (
        <a
          href={data.source}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-6 text-blue-400 text-sm"
        >
          Read more on Wikipedia
        </a>
      )}
    </div>
  );
};

export default WikiPage;
