const express = require("express");
const versionController = require("../controllers/versionController");
const router = express.Router();
const configuratorController = require("../controllers/configuratorController");
const prisma = require("../lib/prisma");
const { Prisma } = require("@prisma/client");

router.get("/:versionId", versionController.getVersionDetails);
router.get(
  "/:versionId/technical-details",
  versionController.getVersionTechnicalDetail
);

router.post(
  "/:versionId/calculate",
  configuratorController.calculateConfiguration(prisma, Prisma)
);

module.exports = router;
