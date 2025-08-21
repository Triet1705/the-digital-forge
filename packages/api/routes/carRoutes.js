const express = require("express");
const carController = require("../controllers/carController");

const router = express.Router();

router.get("/", carController.getAllCars);
router.get("/:carId/versions", carController.getCarVersions);

module.exports = router;
