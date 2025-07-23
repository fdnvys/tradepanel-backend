const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

console.log("App.js loading...");

const corsOptions = {
  origin: [
    "https://tradepanel-frontend.vercel.app",
    "https://tradepanel-frontend-git-main-fdnvys.vercel.app",
    "https://tradepanel-frontend-fdnvys.vercel.app",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();

console.log("Setting up middleware...");

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight için

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Test endpoint
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const accountsRouter = require("./routes/accounts");
const pairsRouter = require("./routes/pairs");

console.log("Setting up routes...");

// API routes
app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/accounts", accountsRouter);
app.use("/api/pairs", pairsRouter);

// Production'da sadece API serve et, frontend build dosyalarını arama
if (process.env.NODE_ENV === "production") {
  // Sadece API endpoint'leri
  app.get("/", (req, res) => {
    res.json({ status: "OK", message: "Trade Panel API is running" });
  });
} else {
  app.use(express.static(path.join(__dirname, "public")));
}

console.log("App.js loaded successfully!");

module.exports = app;
