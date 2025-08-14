const express = require("express");
const optionController = require("../controllers/optionController");
const upload = require("../middleware/uploadMulter");
const router = express.Router();

router.post("/", upload.single("swatchImage"), optionController.createOption);

module.exports = router;
