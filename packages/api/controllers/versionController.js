const versionService = require("../services/version.service");
const { versionIdSchema } = require("../validators/version.validator");
const { z } = require("zod");

const getVersionDetails = async (req, res) => {
  try {
    const { versionId } = versionIdSchema.shape.params.parse(req.params);
    const version = await versionService.getDetailsById(versionId);
    res.status(200).json(version);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    if (error.message === "VersionNotFound") {
      return res.status(404).json({
        error: `Version with ID '${req.params.versionId}' not found.`,
      });
    }
    res.status(500).json({ error: "Failed to retrieve data from the server." });
  }
};

const getVersionTechnicalDetail = async (req, res) => {
  try {
    const { versionId } = versionIdSchema.shape.params.parse(req.params);
    const specs = await versionService.getTechnicalSpecsById(versionId);
    res.status(200).json(specs);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    if (error.message === "VersionNotFound") {
      return res.status(404).json({
        error: `Version with ID '${req.params.versionId}' not found.`,
      });
    }
    res.status(500).json({ error: "Failed to retrieve data from the server." });
  }
};

module.exports = {
  getVersionDetails,
  getVersionTechnicalDetail,
};
