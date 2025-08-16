const express = require("express");
const userController = require("../controllers/userController");
const { authMiddleware, authorize } = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
  "/",
  authMiddleware,
  authorize(["ADMIN"]),
  userController.getAllUsers
);

module.exports = router;
