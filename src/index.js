import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./db/mysql.js";
import usersRoute from "./routes/users.js";

/* =========================
   Load Environment Variables
========================= */
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* =========================
   Global Middlewares
========================= */
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // React + Vite
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   Health Check (PERMANENT)
========================= */
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({
      success: true,
      message: "Backend & MySQL connected successfully"
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res.status(500).json({
      success: false,
      message: "MySQL connection failed"
    });
  }
});

/* =========================
   API Routes
========================= */
app.use("/api/users", usersRoute(pool));

/* =========================
   Handle Unknown Routes
========================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

/* =========================
   Start Server
========================= */
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

