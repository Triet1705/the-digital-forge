const configuratorService = require("../services/configurator.service");

const calculateConfiguration = (prisma, Prisma) => async (req, res) => {
  try {
    const { versionId } = req.params;
    const { selectedOptionIds } = req.body;

    if (!Array.isArray(selectedOptionIds)) {
      return res
        .status(400)
        .json({ error: "selectedOptionIds must be an array." });
    }

    const priceDetails = await configuratorService.calculatePrice(
      versionId,
      selectedOptionIds
    );
    res.status(200).json({
      ...priceDetails,
      updatedSpecs: {},
    });
  } catch (error) {
    if (error.message.startsWith("ValidationError:")) {
      return res.status(400).json({ error: error.message });
    }
    if (error.message === "VersionNotFound") {
      return res.status(404).json({
        error: `Version with ID '${req.params.versionId}' not found.`,
      });
    }
    res.status(500).json({ error: "Calculation failed." });
  }
};

module.exports = {
  calculateConfiguration,
};
