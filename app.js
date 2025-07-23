const express = require("express");
const cors = require("cors");

console.log("App.js loading...");

const app = express();

// Basit CORS ayarları
app.use(
  cors({
    origin: ["https://tradepanel-frontend.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

console.log("Middleware setup complete");

// Test endpoint
app.get("/test", (req, res) => {
  console.log("Test endpoint called");
  res.json({ message: "Backend is working!" });
});

// Health check endpoint
app.get("/health", (req, res) => {
  console.log("Health check called");
  res.json({ status: "OK", message: "Health check passed" });
});

// Root endpoint
app.get("/", (req, res) => {
  console.log("Root endpoint called");
  res.json({ status: "OK", message: "Trade Panel API is running" });
});

console.log("Routes setup complete");

module.exports = app;
