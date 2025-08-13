const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient();

const getVersionDetails = async (req, res) => {
  try {
    const { versionId } = req.params();
    const versions = await prisma.version.findUnique({
      where: {
        id: versionId,
      },
    });
    if (!versionId) {
      return res
        .status(400)
        .json({ error: `Version with ID '${versionId}' not found` });
    }
    res.status(200).json(version);
  } catch (error) {
    console.error("Error fetching version details:", error);
    res.status(500).json({ error: "Failed to retrieve data from the server." });
  }
};

module.exports = {
  getVersionDetails,
};
