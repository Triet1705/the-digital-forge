const express = require("express");
const versionController = require("../controllers/version.controller");
const router = express.Router();
const configuratorController = require("../controllers/configurator.controller");
const prisma = require("../lib/prisma");
const { Prisma } = require("@prisma/client");

router.get("/:sku", versionController.getVersionBySku);
router.get(
  "/:sku/technical-details",
  versionController.getVersionTechnicalDetailBySku
);

router.post(
  "/:versionId/calculate",
  configuratorController.calculateConfiguration(prisma, Prisma)
);

module.exports = router;
