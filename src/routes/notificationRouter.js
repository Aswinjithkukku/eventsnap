const express = require("express");
const restrictTo = require("../middlewares/restrict");
const authorize = require("../middlewares/authorize");
const notificationController = require("../controllers/notificationController");

const router = express.Router();

router.post(
    "/create",
    authorize,
    restrictTo("admin"),
    notificationController.createNotificationByAdmin
);
router.delete(
    "/delete/:id",
    authorize,
    restrictTo("admin"),
    notificationController.deleteNotificationByAdmin
);
router.get("/", authorize, notificationController.getNotifiactions);
router
    .route("/:id")
    .get(authorize, notificationController.getSingleNotification)
    .patch(authorize, notificationController.makeReadByNotification);

module.exports = router;
