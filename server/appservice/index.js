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


app.get("/api/wiki/:name", async (req, res) => {
  try {
    const { name } = req.params;
    // Replace spaces with _, encode special chars
    const wikiTitle = encodeURIComponent(name.trim().replace(/\s+/g, "_"));

    console.log("Fetching Wikipedia URL:", `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`);

    const response = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`
    );

    res.json({
      title: response.data.title,
      description: response.data.extract,
      image: response.data.thumbnail?.source || null,
      source: response.data.content_urls?.desktop?.page || null,
    });
  } catch (error) {
    console.error("Wiki fetch error:", error.message);
    res.status(404).json({ error: "Details not found" });
  }
});

// application listening
app.listen(8000, () => console.log(`server running on http://localhost:${port}`));
