const catchAsyncError = require("../utils/catchAsyncError");
const Event = require("../models/event.model");
const AppError = require("../utils/appError");
const { isValidObjectId, Types } = require("mongoose");
const { createAdminEventSchema } = require("../validations/adminEvent.schema");

module.exports = {
    addEventByAdmin: catchAsyncError(async (req, res, next) => {
        const { _, error } = createAdminEventSchema.validate(req.body);
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
                    isApproved: true,
                    image: img,
                });
            }
        }

        const event = new Event({
            ...req.body,
            isApproved: true,
            images: images,
            user: req.user._id,
        });

        await event.save();

        res.status(201).json({
            status: "success",
            data: event,
        });
    }),

    viewEventsByAdmin: catchAsyncError(async (req, res, next) => {
        const { title, date } = req.query;

        let query = {
            isApproved: false,
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

    approveEventSingleImageByAdmin: catchAsyncError(async (req, res, next) => {
        const { id, image_id } = req.params;

        if (!isValidObjectId(id)) {
            return next(new AppError("Invalid event. Please try again", 400));
        }

        const event = await Event.findById(id);

        if (!event) {
            return next(new AppError("No events found", 400));
        }

        const imageArray = event.images;

        const image = imageArray.find((data) => data._id?.toString() === image_id?.toString());

        if (!image) {
            return next(new AppError("No image found", 404));
        }

        image.isApproved = true;

        event.images = imageArray;

        await event.save();

        res.status(200).json({
            status: "success",
            data: event,
            message: "Event image approved successfully",
        });
    }),
};
