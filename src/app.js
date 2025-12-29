import express from "express";
import "./db/index.js"; // IMPORTANT: this triggers DB connection

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

export default app;
