import express from 'express';

// application configuration imports
import cors from "cors";
import "dotenv/config";


// router imports
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

// application configuration
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use('/uploads', express.static('uploads'));

// development/production setup
const port = process.env.PORT;

// database connection


// checking the application status
app.get("/", (request, response) => {
    response.status(200).send("<h1>Server Running</h1>");
})


// routing setup
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);




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



// application listening
app.listen(8000, () => console.log(`server running on http://localhost:${port}`));
