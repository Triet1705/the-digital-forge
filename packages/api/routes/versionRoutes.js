const express = require("express");
const versionController = require("../controllers/versionController");
const router = express.Router();

router.get("/:versionId", versionController.getVersionDetails);

module.exports = router;
