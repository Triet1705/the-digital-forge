const express = require("express");
const userController = require("../controllers/userController");
const { authMiddleware, authorize } = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware, authorize(["ADMIN"]));

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.resetUserPassword);
router.post("/", userController.createUser);

module.exports = router;
