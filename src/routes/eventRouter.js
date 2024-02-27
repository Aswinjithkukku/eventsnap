const express = require("express");
const multer = require("multer");
const path = require("path");
const eventController = require("../controllers/eventController");
const authorize = require("../middlewares/authorize");

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

router.post("/create", authorize, upload.single("image"), eventController.addEvent);
router.get("/", authorize, eventController.viewEvents);
router.get("/present", authorize, eventController.getPresentEvents);
router.get("/upcomming", authorize, eventController.getUpCommingEvents);

// generated idees would be here.
router.get("/:id", authorize, eventController.viewSingleEvent);
router.patch("/:id", authorize, upload.single("thumbnail"), eventController.updateEvent);

module.exports = router;
