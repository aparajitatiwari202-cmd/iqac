import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,               // VERY IMPORTANT
  waitForConnections: true,
  connectionLimit: 10,
});

// 🔴 FORCE DB CONNECTION TEST
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Database Connected Successfully");
    connection.release();
  } catch (error) {
    console.error("❌ MySQL Connection Failed");
    console.error(error.message);
  }
})();

export default pool;


