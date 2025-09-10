const express = require("express");
const cors = require("cors");
const carRoutes = require("./routes/car.routes");
const versionRoutes = require("./routes/version.routes");
const optionRoutes = require("./routes/option.routes");
const optionCategoryRoutes = require("./routes/optionCategory.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: (process.env.API_RATE_LIMIT_WINDOW_MINUTES || 15) * 60 * 1000,
  max: parseInt(process.env.API_RATE_LIMIT_MAX_REQUESTS || 100),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests from this IP, please try again after 15 minutes.",
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
app.use("/api/auth", authRoutes);
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
