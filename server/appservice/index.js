import express from 'express';

// application configuration imports
import cors from "cors";
import "dotenv/config";
import axios from 'axios';

// router imports
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import collectionRouter from './routes/collectionRouter.js';

// gloabal rate limiter
import { globalLimiter } from './middlewares/rateLimiters.js';

// application configuration
const app = express();

app.use(globalLimiter);
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// development/production setup
const port = process.env.PORT;

// checking the application status
app.get("/", (request, response) => {
    response.status(200).send("<h1>Server Running</h1>");
})


// routing setup
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/collection", collectionRouter);

// temp ai

app.get("/analyse", (request, response) => {
    return response.status(200).json({
        message: "analysis successful",
        suggestion: {
            "facial_morphology": {
                "face_ratio": 1.618,
                "jawline": "45° Angularity",
                "eye_spacing": "Symmetrical",
                "brow_type": "Prominent",
                "face_shape": "Oval"
            },
            "color_analysis": {
                "skin_undertone": "Cool / Neutral",
                "contrast_level": "High",
                "color_season_archetype": "Deep Winter"
            },
            "recommendations": {
                "suited_colors": ["#000000", "#4A4A4A", "#000080", "#013220", "#0047AB"], // Using Hex for UI rendering
                "eyewear": {
                    "style_type": ["Angular", "Aviator", "Wayfarer"],
                    "frame_finish": ["Matte", "Brushed Metal"],
                    "visual_weight": ["Bold"]
                },
                "footwear": {
                    "silhouette": ["Technical High-top", "Chunky Runner"],
                    "design_language": ["Functional", "Industrial"]
                },
                "apparel": {
                    "outerwear_fit": ["Oversized", "Boxy", "Drop-shoulder"],
                    "aesthetic_tags": ["Gorpcore", "Techwear"]
                }
            }
        }
    });
});


// Change :name to :name(*) to capture everything including special characters
// This regex allows letters, numbers, underscores, dots, and parentheses
app.get("/api/wiki/:name", async (req, res) => {
  // Capture name immediately so it's available in the entire function scope
  const rawName = req.params.name || "";

  try {
    // 1. Format for Wikipedia (Handle spaces and specific naming)
    const wikiTitle = encodeURIComponent(rawName.trim().replace(/\s+/g, "_"));

    console.log(`[Wiki Request]: https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`);

    const response = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`,
      {
        headers: {
          // Identify your app to Wikipedia to prevent 403 Forbidden errors
          'User-Agent': 'TrendMatrixStyleApp/1.0 (kdlphani916@gmail.com) Axios/1.6.0'
        }
      }
    );

    // 2. Map the data to your frontend schema
    res.json({
      title: response.data.title,
      description: response.data.extract,
      image: response.data.thumbnail?.source || null,
      source: response.data.content_urls?.desktop?.page || null,
    });

  } catch (error) {
    // Log details for debugging
    const status = error.response?.status;
    console.error(`[Wiki Error]: ${status || 'Network Error'} - ${error.message}`);

    // Fallback: If Wikipedia doesn't have the page, return a graceful response
    res.status(status === 403 ? 403 : 200).json({
      title: rawName.replace(/_/g, " "),
      description: status === 403
        ? "Access to Wikipedia was denied. Check your server headers."
        : "We couldn't find a specific Wikipedia summary for this style, but it's a great look for your features!",
      image: null,
      source: null
    });
  }
});
// application listening
app.listen(4000, () => console.log(`server running on http://localhost:${port}`));
