const MOCK_CARS = [
  { id: "porsche-911", name: "Porsche 911" },
  { id: "porsche-taycan", name: "Porsche Taycan" },
];

const getAllCars = (req, res) => {
  res.status(200).json(MOCK_CARS);
};

module.exports = {
  getAllCars,
};
