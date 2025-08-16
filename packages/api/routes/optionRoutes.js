const express = require("express");
const optionController = require("../controllers/optionController");
const upload = require("../middleware/uploadMulter");
const router = express.Router();
const { authMiddleware, authorize } = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  authorize(["ADMIN"]),
  upload.single("swatchImage"),
  optionController.createOption
);
router.put(
  "/:id",
  authMiddleware,
  authorize(["ADMIN"]),
  optionController.updateOption
);
router.get("/", optionController.getAllOptions);
router.get("/:id", optionController.getOptionById);
router.delete(
  "/:id",
  authMiddleware,
  authorize(["ADMIN"]),
  optionController.deleteOption
);

module.exports = router;
