const configurationService = require("../services/configuration.service");
const {
  createConfigurationSchema,
  getConfigurationByCodeSchema,
} = require("../validators/configuration.validator");
const { z } = require("zod");

const createConfiguration = async (req, res) => {
  try {
    const { versionId, optionIds } = createConfigurationSchema.shape.body.parse(
      req.body
    );
    const userId = req.user.userId;

    const newConfiguration = await configurationService.create(
      userId,
      versionId,
      optionIds
    );

    res.status(201).json(newConfiguration);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    if (error.message === "VersionNotFound") {
      return res.status(404).json({ error: `Version not found.` });
    }
    console.error("Error creating configuration:", error);
    res.status(500).json({ error: "Failed to save configuration." });
  }
};

const getConfigurationByCode = async (req, res) => {
  try {
    const { shareableCode } = getConfigurationByCodeSchema.shape.params.parse(
      req.params
    );
    const config = await configurationService.getByShareableCode(shareableCode);
    res.status(200).json(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    if (error.message === "ConfigurationNotFound") {
      return res.status(404).json({ error: "Configuration not found." });
    }
    console.error("Error fetching configuration:", error);
    res.status(500).json({ error: "Failed to retrieve configuration." });
  }
};

const getMyConfigurations = async (req, res) => {
  try {
    const userId = req.user.userId;
    const configs = await configurationService.getByUserId(userId);
    res.status(200).json(configs);
  } catch (error) {
    console.error("Error fetching user configurations:", error);
    res.status(500).json({ error: "Failed to retrieve configurations." });
  }
};

const deleteConfiguration = async (req, res) => {
  try {
    const { id } = req.params;
    await configurationService.remove(id);
    res.status(204).send();
  } catch (error) {
    if (error.message === "ConfigurationNotFound") {
      return res.status(404).json({ error: "Configuration not found." });
    }
    if (error.message === "CannotDelete, ConfigurationInUse") {
      return res.status(400).json({
        error:
          "Cannot delete a configuration that is already linked to an order.",
      });
    }
    console.error("Error deleting configuration:", error);
    res.status(500).json({ error: "Failed to delete configuration." });
  }
};

module.exports = {
  createConfiguration,
  getConfigurationByCode,
  getMyConfigurations,
  deleteConfiguration,
};
