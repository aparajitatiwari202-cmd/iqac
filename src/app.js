import express from "express";
import "./db/index.js"; // triggers DB connection
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Optional: test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// API routes
app.use("/api", userRoutes);

export default app;
