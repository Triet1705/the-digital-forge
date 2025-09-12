const express = require("express");
const categoryController = require("../controllers/optionCategory.controller");
const router = express.Router();
const { authMiddleware, authorize } = require("../middleware/authMiddleware");

router.get("/", categoryController.getAllCategories);

module.exports = router;
