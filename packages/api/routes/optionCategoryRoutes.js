const express = require("express");
const categoryController = require("../controllers/optionCategoryController");
const router = express.Router();

router.get("/", categoryController.getAllCategories);

module.exports = router;
