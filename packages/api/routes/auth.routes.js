const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const { authMiddleware, authorize } = require("../middleware/authMiddleware");
const slowDown = require("express-slow-down");

const authLimiter = require("express-rate-limit")({
  windowMs: (process.env.AUTH_RATE_LIMIT_WINDOW_MINUTES || 60) * 60 * 1000,
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS || 10),
  message: {
    error:
      "Too many login attempts from this IP, please try again after an hour.",
  },
});

const speedLimiter = slowDown({
  windowMs: (process.env.SPEED_LIMIT_WINDOW_MINUTE || 15) * 60 * 1000,
  delayAfter: process.env.SPEED_LIMIT_DELAY || 3,
  delayMs: (hits) => {
    return Math.pow(2, hits - 5) * 500;
  },
  maxDelayMs: 60000,
});

router.use(speedLimiter, authLimiter);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/roles",
  authMiddleware,
  authorize(["ADMIN"]),
  authController.getRoleOptions
);

module.exports = router;
