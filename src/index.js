import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./db/mysql.js";
import usersRoute from "./routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/users", usersRoute(pool));

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});



app.use(
  cors({
    origin: "http://localhost:3000", // or 5173 if Vite
    credentials: true
  })
);
app.use(cors());
