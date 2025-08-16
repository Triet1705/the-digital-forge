const express = require("express");
const cors = require("cors");
const carRoutes = require("./routes/carRoutes");
const versionRoutes = require("./routes/versionRoutes");
const optionRoutes = require("./routes/optionRoutes");
const optionCategoryRoutes = require("./routes/optionCategoryRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Call API of Project TDFORGE successfully" });
});

app.use("/api/cars", carRoutes);
app.use("/api/versions", versionRoutes);
app.use("/api/options", optionRoutes);
app.use("/api/option-categories", optionCategoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Backend server is running at http:localhost:${PORT}`);
});
