const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCarVersions = async (req, res) => {
  try {
    const { carId } = req.params;

    const versions = await prisma.version.findMany({
      where: {
        carId: carId,
      },
      select: {
        id: true,
        sku: true,
        name: true,
        basePrice: true,
        specs: true,
        showcaseImages: true,
      },
    });

    if (versions.length === 0) {
      return res
        .status(404)
        .json({ error: `No versions found for car with ID: ${carId}` });
    }

    res.status(200).json(versions);
  } catch (error) {
    console.error("Error fetching car versions:", error);
    res.status(500).json({ error: "Failed to retrieve data from the server." });
  }
};

module.exports = {
  getCarVersions,
};
