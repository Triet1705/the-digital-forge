const express = require("express");
const inventoryController = require("../controllers/inventory.controller");
const {
  authMiddleware,
  checkPermission,
} = require("../middleware/authMiddleware");

const adminRouter = express.Router();
const publicRouter = express.Router();

adminRouter.get(
  "/",
  checkPermission("inventory:read"),
  inventoryController.getAllInventory
);
adminRouter.post(
  "/",
  checkPermission("inventory:create"),
  inventoryController.createInventory
);
adminRouter.put(
  "/:id",
  checkPermission("inventory:update"),
  inventoryController.updateInventory
);
adminRouter.delete(
  "/:id",
  checkPermission("inventory:delete"),
  inventoryController.removeInventory
);

publicRouter.post(
  "/check",
  authMiddleware,
  inventoryController.checkInventoryForUser
);

module.exports = { adminRouter, publicRouter };
