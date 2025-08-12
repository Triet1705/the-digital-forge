const express = require("express");
const cors = require("cors");
const carRoutes = require("./routes/carRoutes");

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Call API of Project TDFORGE successfully" });
});

app.use("/api/cars", carRoutes);

app.listen(PORT, () => {
  console.log(`Backend server is running at http:localhost:${PORT}`);
});
