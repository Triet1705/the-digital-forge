const prisma = require("../lib/prisma");

const getVersionDetails = async (req, res) => {
  try {
    const { versionId } = req.params;
    const version = await prisma.version.findUnique({
      where: { id: versionId },
      select: {
        id: true,
        sku: true,
        name: true,
        basePrice: true,
        variantGroup: true,
        carId: true,
        specs: true,
        showcaseImages: true,
        description: true,
        galleryImages: true,
      },
    });

    if (!version) {
      return res
        .status(404)
        .json({ error: `Version with ID '${versionId}' not found.` });
    }
    res.status(200).json(version);
  } catch (error) {
    console.error("Error fetching version details:", error);
    res.status(500).json({ error: "Failed to retrieve data from the server." });
  }
};

const getVersionTechnicalDetail = async (req, res) => {
  try {
    const { versionId } = req.params;
    const version = await prisma.version.findUnique({
      where: { id: versionId },
      select: {
        technicalDetails: true,
        detailedSpecs: true,
      },
    });

    if (!version) {
      return res
        .status(404)
        .json({ error: `Version with ID '${versionId}' not found.` });
    }
    res.status(200).json(version);
  } catch (error) {
    console.error("Error fetching version technical details: ", error);
    res.status(500).json({ error: "Failed to retrieve data from the server." });
  }
};

module.exports = {
  getVersionDetails,
  getVersionTechnicalDetail,
};
