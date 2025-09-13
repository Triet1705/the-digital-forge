const express = require("express");
const configController = require("../controllers/configuration.controller");
const {
  authMiddleware,
  authorize,
  checkPermission,
} = require("../middleware/authMiddleware");

const router = express.Router();

// --- Public Route ---
router.get("/:shareableCode", configController.getConfigurationByCode);

// --- User Routes (require login) ---
router.use(authMiddleware);
router.post("/", configController.createConfiguration);
router.get("/me/list", configController.getMyConfigurations);

// --- Admin Routes ---
router.delete(
  "/admin/:id",
  authorize(["SUPER_ADMIN"]),
  configController.deleteConfiguration
);

module.exports = router;
