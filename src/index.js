import express from "express";
import "dotenv/config";
import pool from "./db/db.js";
import usersRoute from "./routes/users.js";

const app = express();

app.use(express.json());

// ✅ mount users route
app.use("/api/students", usersRoute(pool));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
