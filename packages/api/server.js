const express = require("express");
const cors = require("cors");
const carRoutes = require("./routes/carRoutes");
const versionRoutes = require("./routes/versionRoutes");
const optionRoutes = require("./routes/optionRoutes");
const optionCategoryRoutes = require("./routes/optionCategoryRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests from this IP, please try again after 15 minutes.",
  },
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    error:
      "Too many login attempts from this IP, please try again after an hour.",
  },
});

app.get("/", (req, res) => {
  res.json({ message: "Call API of Project TDFORGE successfully" });
});
app.use("/api", apiLimiter);
app.use("/api/cars", carRoutes);
app.use("/api/versions", versionRoutes);
app.use("/api/options", optionRoutes);
app.use("/api/option-categories", optionCategoryRoutes);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/users", userRoutes);

// app.listen(PORT, () => {
//   console.log(`Backend server is running at http:localhost:${PORT}`);
// });

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Backend server is running at http://localhost:${PORT}`);
  });
}

module.exports = app;
