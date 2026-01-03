import "dotenv/config";
import mysql from "mysql2/promise";


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
import express from "express";
import pool from "./db/index.js";
import "dotenv/config";

const app = express();

app.use(express.json());

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL connected to merit_portal");
    connection.release();
  } catch (error) {
    console.error("❌ MySQL connection failed:", error.message);
  }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
