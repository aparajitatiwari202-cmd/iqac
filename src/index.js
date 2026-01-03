import express from "express";
import mysql from "mysql2/promise";
import "dotenv/config";

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 🔹 TEST ROUTE
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS result");
    res.json({
      success: true,
      message: "MySQL connected successfully",
      rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot connect to test db",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


