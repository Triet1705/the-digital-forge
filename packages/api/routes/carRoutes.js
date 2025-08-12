const express = require("express");
const carController = require("../controllers/carController");

const router = express.Router();

// router.get("/", carController.getAllCars);
router.get("/:cardId/versions", carController.getCarVersions);

module.exports = router;
