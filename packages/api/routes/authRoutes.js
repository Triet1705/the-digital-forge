const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const { authMiddleware, authorize } = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/roles",
  authMiddleware,
  authorize(["ADMIN"]),
  authController.getRoleOptions
);

module.exports = router;
