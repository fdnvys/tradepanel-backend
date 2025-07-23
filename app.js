const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const accountsRouter = require("./routes/accounts");
const pairsRouter = require("./routes/pairs");

const app = express();

// Production için CORS ayarları
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? [
          "https://tradepanel-frontend.vercel.app",
          "https://tradepanel-frontend-git-main-fdnvys.vercel.app",
          "https://tradepanel-frontend-fdnvys.vercel.app",
        ]
      : "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

module.exports = app;
