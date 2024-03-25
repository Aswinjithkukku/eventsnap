const express = require("express");
const multer = require("multer");
const path = require("path");
const restrictTo = require("../middlewares/restrict");
const authorize = require("../middlewares/authorize");
const adminEventController = require("../controllers/adminEventController");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/event");
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});

const upload = multer({
    limits: {
        fileSize: 20000000,
    },
    fileFilter: (req, file, cb) => {
        const allowed = [".jpg", ".jpeg", ".png", ".webp"];
        const ext = path.extname(file.originalname);
        if (!allowed.includes(ext)) {
            return cb(new Error("Please upload jpg, jpeg, webp, or png"));
        }
        cb(undefined, true);
    },
    storage: storage,
});

router.post(
    "/create",
    authorize,
    restrictTo("admin"),
    upload.single("image"),
    adminEventController.addEventByAdmin
);
router.patch(
    "/update/:id",
    authorize,
    restrictTo("admin"),
    upload.single("thumbnail"),
    adminEventController.updateEventByAdmin
);
router.get("/", authorize, restrictTo("admin"), adminEventController.viewEventsByAdmin);
router
    .route("/:id")
    .get(authorize, restrictTo("admin"), adminEventController.viewSingleEventByAdmin)
    .patch(authorize, restrictTo("admin"), adminEventController.approveEventByAdmin);
    router.delete(
        "/delete/:id",
        authorize,
        restrictTo("admin"),
        adminEventController.deleteEventByAdmin
    );
module.exports = router;
