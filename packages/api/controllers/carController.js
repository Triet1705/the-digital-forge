const carService = require("../services/car.service");
const { carSkuSchema } = require("../validators/car.validator");
const { z } = require("zod");

const getAllCars = async (req, res) => {
  try {
    const cars = await carService.getAll();
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars: ", error);
    res.status(500).json({ error: "Failed to retrive data from server." });
  }
};

const getCarVersions = async (req, res) => {
  try {
    const { carSku } = carSkuSchema.shape.params.parse(req.params);

    const versions = await carService.getVersionsByCarSku(carSku);
    res.status(200).json(versions);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    if (error.message === "CarNotFound") {
      return res
        .status(404)
        .json({ error: `Car with SKU '${req.params.carSku}' not found.` });
    }
    console.error("Error fetching car versions:", error);
    res.status(500).json({ error: "Failed to retrieve versions." });
  }
};

module.exports = {
  getCarVersions,
  getAllCars,
};
