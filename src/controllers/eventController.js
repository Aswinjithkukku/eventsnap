const catchAsyncError = require("../utils/catchAsyncError");
const Event = require("../models/event.model");
const AppError = require("../utils/appError");
const { createEventSchema, updateEventSchema } = require("../validations/event.schema");
const { isValidObjectId } = require("mongoose");

module.exports = {
    addEvent: catchAsyncError(async (req, res, next) => {
        const { _, error } = createEventSchema.validate(req.body);
        if (error) {
            return next(
                new AppError(error.details ? error?.details[0]?.message : error?.message, 400)
            );
        }

        let images = [];
        let image = req.files["images"];
        if (image || image?.length > 0) {
            for (let i = 0; i < image?.length; i++) {
                const img = "/" + image[i]?.path?.replace(/\\/g, "/");
                images.push({
                    isApproved: false,
                    image: img,
                });
            }
        }

        const event = new Event({ ...req.body, images: images, user: req.user._id });

        await event.save();

        res.status(201).json({
            status: "success",
            data: event,
        });
    }),

    viewEvents: catchAsyncError(async (req, res, next) => {
        const { title, date } = req.query;

        let query = {
            isApproved: true,
            eventDate: { $gte: new Date() },
        };

        if (title) {
            query.title = { $regex: new RegExp(title, "i") };
        }

        if (date) {
            query.eventDate = { $gte: new Date(date) };
        }

        const events = await Event.find(query)
            .select("title eventDate location images user")
            .populate({
                path: "user",
                select: "name",
            })
            .sort({ eventDate: 1 })
            .exec();

        if (!events || events.length === 0) {
            return next(new AppError("No events found", 404));
        }

        res.status(200).json({
            status: "success",
            data: events,
        });
    }),

    viewSingleEvent: catchAsyncError(async (req, res, next) => {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return next(new AppError("Invalid event. Please try again", 400));
        }

        const event = await Event.findById(id)
            .select("-__v")
            .populate({
                path: "user",
                select: "-__v -updatedAt -createdAt -avatar",
            })
            .lean();

        if (!event) {
            return next(new AppError("No events found", 404));
        }

        res.status(200).json({
            status: "success",
            data: event,
        });
    }),

    updateEvent: catchAsyncError(async (req, res, next) => {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return next(new AppError("Invalid event. Please try again", 400));
        }

        const { _, error } = updateEventSchema.validate(req.body);
        if (error) {
            return next(
                new AppError(error.details ? error?.details[0]?.message : error?.message, 400)
            );
        }

        let images = [];
        let image = req.files["images"];
        if (image || image?.length > 0) {
            for (let i = 0; i < image?.length; i++) {
                const img = "/" + image[i]?.path?.replace(/\\/g, "/");
                images.push({
                    isApproved: false,
                    image: img,
                });
            }
        }

        const event = await Event.findByIdAndUpdate(
            id,
            {
                ...req.body,
                images: images,
                user: req.user._id,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!event) {
            return next(new AppError("Invalid Event ID.", 404));
        }

        res.status(200).json({
            status: "success",
            data: event,
        });
    }),

    getUpCommingEvents: catchAsyncError(async (req, res, next) => {
        const query = { eventDate: { $gt: new Date() } };

        const events = await Event.find(query)
            .select("title eventDate location images user")
            .populate({
                path: "user",
                select: "name",
            })
            .sort({ eventDate: 1 })
            .exec();

        if (!events || events.length === 0) {
            return next(new AppError("No events found", 404));
        }

        res.status(200).json({
            status: "success",
            data: events,
        });
    }),

    getPresentEvents: catchAsyncError(async (req, res, next) => {
        const query = { eventDate: { $eq: Date.now() } };

        const events = await Event.find(query)
            .select("title eventDate location images user")
            .populate({
                path: "user",
                select: "name",
            })
            .sort({ eventDate: 1 })
            .exec();

        if (!events || events.length === 0) {
            return next(new AppError("No events found", 404));
        }

        res.status(200).json({
            status: "success",
            data: events,
        });
    }),
};
