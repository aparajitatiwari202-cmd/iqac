
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db/db.js";
import usersRoute from "./routes/users.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors()); // allow frontend calls
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// API routes
app.use("/api/students", usersRoute(pool)); // full endpoint: /api/students

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
