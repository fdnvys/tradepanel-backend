const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

// API Routes
console.log("Loading API routes...");

try {
  var indexRouter = require("./routes/index");
  var usersRouter = require("./routes/users");
  const authRouter = require("./routes/auth");
  const accountsRouter = require("./routes/accounts");
  const pairsRouter = require("./routes/pairs");

  console.log("Routes loaded successfully");

  // API routes
  app.use("/api", indexRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/accounts", accountsRouter);
  app.use("/api/pairs", pairsRouter);

  console.log("API routes setup complete");
} catch (error) {
  console.error("Error loading routes:", error);
}

console.log("App.js loaded successfully!");

module.exports = app;
