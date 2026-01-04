import express from "express";
import "./db/index.js"; // IMPORTANT: this triggers DB connection
import cors from "cors";
import cookieParser from "cookie-parser"
import multer from "multer"

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running");
});
const express = require("express");
const app = express();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

module.exports = app;

export default app;
