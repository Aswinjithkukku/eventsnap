const catchAsyncError = require("../utils/catchAsyncError");
const Event = require("../models/event.model");
const AppError = require("../utils/appError");
const { isValidObjectId, Types } = require("mongoose");
const {
    createAdminEventSchema,
    updateAdminEventSchema,
} = require("../validations/adminEvent.schema");

module.exports = {
    addEventByAdmin: catchAsyncError(async (req, res, next) => {
        const { _, error } = createAdminEventSchema.validate(req.body);
        if (error) {
            return next(
                new AppError(error.details ? error?.details[0]?.message : error?.message, 400)
            );
        }

        let image;
        if (req.file?.path) {
            image = "/" + req.file.path.replace(/\\/g, "/");
        }

        const event = new Event({
            ...req.body,
            isApproved: true,
            thumbnail: {
                isApproved: true,
                image: image,
            },
            user: req.user._id,
        });

        await event.save();

        res.status(201).json({
            status: "success",
            data: event,
        });
    }),

    updateEventByAdmin: catchAsyncError(async (req, res, next) => {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return next(new AppError("Invalid event. Please try again", 400));
        }

        const { _, error } = updateAdminEventSchema.validate(req.body);
        if (error) {
            return next(
                new AppError(error.details ? error?.details[0]?.message : error?.message, 400)
            );
        }

        let image;
        if (req.file?.path) {
            image = "/" + req.file.path.replace(/\\/g, "/");
        }

        let event;
        if (image) {
            event = await Event.findByIdAndUpdate(
                id,
                {
                    ...req.body,
                    thumbnail: {
                        isApproved: true,
                        image: image,
                    },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        } else {
            event = await Event.findByIdAndUpdate(
                id,
                {
                    ...req.body,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        }

        if (!event) {
            return next(new AppError("Invalid Event ID.", 404));
        }

        res.status(200).json({
            status: "success",
            data: event,
        });
    }),

    viewEventsByAdmin: catchAsyncError(async (req, res, next) => {
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
            .select("title eventDate location thumbnail user")
            .populate({
                path: "user",
                select: "name",
            })
            .sort({ eventDate: 1 })
            .exec();

        if (!events || events.length === 0) {
            return next(new AppError("No events found", 400));
        }

        res.status(200).json({
            status: "success",
            data: events,
        });
    }),

    viewSingleEventByAdmin: catchAsyncError(async (req, res, next) => {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return next(new AppError("Invalid event. Please try again", 400));
        }

        const event = await Event.findById(id).select("-__v").populate({
            path: "user",
            select: "-__v -updatedAt -createdAt -avatar",
        });

        if (!event) {
            return next(new AppError("No events found", 400));
        }

        res.status(200).json({
            status: "success",
            data: event,
        });
    }),

    approveEventByAdmin: catchAsyncError(async (req, res, next) => {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return next(new AppError("Invalid event. Please try again", 400));
        }

        const event = await Event.findById(id);

        if (!event) {
            return next(new AppError("No events found", 400));
        }

        event.isApproved = true;

        await event.save();

        res.status(200).json({
            status: "success",
            data: event,
            message: "Event Approved Successfully",
        });
    }),
};
