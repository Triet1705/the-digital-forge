const express = require("express");
const showroomController = require("../controllers/showroomController");
const {
  authMiddleware,
  checkPermission,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  checkPermission("showroom:create"),
  showroomController.createShowroom
);
router.get(
  "/",
  checkPermission("showroom:read"),
  showroomController.getAllShowroom
);
router.get(
  "/:id",
  checkPermission("showroom:read"),
  showroomController.getShowroomDetails
);
router.put(
  "/:id",
  checkPermission("showroom:update"),
  showroomController.updateShowroom
);
router.delete(
  "/:id",
  checkPermission("showroom:delete"),
  showroomController.removeShowroom
);

module.exports = router;
