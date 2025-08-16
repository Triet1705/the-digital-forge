const express = require("express");
const optionController = require("../controllers/optionController");
const upload = require("../middleware/uploadMulter");
const router = express.Router();

router.post("/", upload.single("swatchImage"), optionController.createOption);
router.put("/:id", optionController.updateOption);
router.get("/", optionController.getAllOptions);
router.get("/:id", optionController.getOptionById);
router.delete("/:id", optionController.deleteOption);

module.exports = router;
