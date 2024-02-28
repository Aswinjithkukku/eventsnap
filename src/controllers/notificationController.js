const catchAsyncError = require("../utils/catchAsyncError");
const Notifiaction = require("../models/notification.model");
const AppError = require("../utils/appError");
const { isValidObjectId } = require("mongoose");

module.exports = {
    createNotificationByAdmin: catchAsyncError(async (req, res, next) => {
        const { title, description } = req.body;

        if (!title && !description) {
            return next(new AppError("Title and description is mandatory", 400));
        }

        const notifiaction = await Notifiaction.create(req.body);

        res.status(201).json({
            status: "success",
            data: notifiaction,
        });
    }),

    deleteNotificationByAdmin: catchAsyncError(async (req, res, next) => {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return next(new AppError("Invalid Id. Please try again", 400));
        }

        const notification = await Notifiaction.findById(id);

        if (!notification) {
            return next(new AppError("No such notification found", 404));
        }

        await Notifiaction.deleteOne({ _id: id });

        res.status(200).json({
            status: "success",
            message: "Notification deleted successfully",
        });
    }),

    getNotifiactions: catchAsyncError(async (req, res, next) => {
        const notifications = await Notifiaction.find().sort({ createdAt: -1 });

        if (!notifications) {
            return next(new AppError("Notifiactions are empty", 404));
        }

        res.status(200).json({
            status: "success",
            message: notifications,
        });
    }),

    getSingleNotification: catchAsyncError(async (req, res, next) => {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return next(new AppError("Invalid ID. Please try again", 400));
        }

        const notification = await Notifiaction.findById(id);

        if (!notification) {
            return next(new AppError("No such notification", 404));
        }

        res.status(200).json({
            status: "success",
            message: notification,
        });
    }),

    makeReadByNotification: catchAsyncError(async (req, res, next) => {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return next(new AppError("Invalid ID. Please try again", 400));
        }

        const notification = await Notifiaction.findById(id);

        notification.seenBy.push(req.user.id);

        await notification.save();

        res.status(200).json({
            status: "success",
            message: notification,
        });
    }),
};
