import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

const ProductComparisonPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/compare-prices",
          { product: name }
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [name]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        Loading prices...
      </div>
    );
  }

  if (!data || data.prices.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        No products found.
      </div>
    );
  }

  const bestPrice = data.best_price.price;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <h1 className="text-3xl mb-8">
        {decodeURIComponent(name)}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {data.prices.map((item, index) => (
          <div
            key={index}
            className={`border p-6 rounded-lg ${item.price === bestPrice
                ? "border-green-500"
                : "border-zinc-800"
              }`}
          >

            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-contain mb-4"
            />

            <h3 className="text-sm mb-2">
              {item.title}
            </h3>

            <p className="text-xl font-semibold mb-2">
              {item.price ? `₹${item.price}` : "Price not available"}
            </p>

            {item.price === bestPrice && (
              <p className="text-green-400 text-xs mb-3">
                Best Price Available
              </p>
            )}

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white text-black text-center py-2 rounded hover:opacity-80 transition"
            >
              Buy Now
            </a>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComparisonPage;