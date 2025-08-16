const express = require("express");
const versionController = require("../controllers/versionController");
const router = express.Router();
const configuratorController = require("../controllers/configuratorController");

router.get("/:versionId", versionController.getVersionDetails);
router.get(
  "/:versionId/technical-details",
  versionController.getVersionTechnicalDetail
);

router.post(
  "/:versionId/calculate",
  configuratorController.calculateConfigurator
);

module.exports = router;
