const versionService = require("../services/version.service");
const {
  versionIdSchema,
  versionSkuSchema,
} = require("../validators/version.validator");
const { z } = require("zod");

const getVersionBySku = async (req, res) => {
  try {
    const { sku } = versionSkuSchema.shape.params.parse(req.params);
    const version = await versionService.getDetailsBySku(sku);
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

const getVersionTechnicalDetailBySku = async (req, res) => {
  try {
    const { sku } = versionSkuSchema.shape.params.parse(req.params);
    const specs = await versionService.getTechnicalSpecsBySku(sku);
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
  getVersionBySku,
  getVersionTechnicalDetailBySku,
};
