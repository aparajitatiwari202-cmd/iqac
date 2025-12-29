import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.localhost,
  user: process.env.root,
  password: process.env.Aparajita123,
  database: process.env.merit_portal,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ MySQL connected successfully");
    connection.release();
  }
});

export default db;


import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
