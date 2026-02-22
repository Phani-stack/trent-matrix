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


// application listening
app.listen(8000, () => console.log(`server running on http://localhost:${port}`));
